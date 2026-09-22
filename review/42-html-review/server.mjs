import { createServer } from 'node:http';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const statePath = process.env.REVIEW_STATE_PATH || path.join(rootDir, 'review-state.json');
const port = Number(process.env.REVIEW_PORT || 8765);
const maxBodyBytes = 4 * 1024 * 1024;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function send(response, status, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(status, {
    'content-type': contentType,
    'cache-control': 'no-cache',
  });
  response.end(body);
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath);
  const candidate = path.resolve(rootDir, `.${decoded}`);
  if (candidate !== rootDir && !candidate.startsWith(`${rootDir}${path.sep}`)) {
    return null;
  }
  return candidate;
}

async function readRequestBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBodyBytes) {
      throw new Error('request body too large');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function saveState(nextState) {
  if (!nextState || !Array.isArray(nextState.chapters)) {
    throw new Error('invalid review state');
  }
  const normalized = {
    ...nextState,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  const temporaryPath = `${statePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, statePath);
  return normalized;
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);

    if (requestUrl.pathname === '/api/state') {
      if (request.method === 'GET') {
        if (!existsSync(statePath)) {
          return send(response, 404, JSON.stringify({ error: 'review state not found' }), mimeTypes['.json']);
        }
        const state = await readFile(statePath, 'utf8');
        return send(response, 200, state, mimeTypes['.json']);
      }

      if (request.method === 'PUT') {
        const body = await readRequestBody(request);
        const nextState = JSON.parse(body);
        const savedState = await saveState(nextState);
        return send(response, 200, JSON.stringify({ ok: true, updatedAt: savedState.updatedAt }), mimeTypes['.json']);
      }

      response.setHeader('allow', 'GET, PUT');
      return send(response, 405, 'method not allowed');
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return send(response, 405, 'method not allowed');
    }

    const filePath = safeStaticPath(requestUrl.pathname);
    if (!filePath) {
      return send(response, 403, 'forbidden');
    }

    const content = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      'content-type': mimeTypes[extension] || 'application/octet-stream',
      'cache-control': 'no-cache',
    });
    if (request.method === 'HEAD') {
      return response.end();
    }
    return response.end(content);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return send(response, 404, 'not found');
    }
    if (error?.message === 'request body too large') {
      return send(response, 413, 'request body too large');
    }
    if (error instanceof SyntaxError || error?.message === 'invalid review state') {
      return send(response, 400, JSON.stringify({ error: error.message }), mimeTypes['.json']);
    }
    console.error(error);
    return send(response, 500, 'internal server error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`审稿页面：http://127.0.0.1:${port}/`);
  console.log(`保存文件：${statePath}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
