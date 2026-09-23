import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverPath = path.join(appDir, 'server.mjs');
const tempDir = await mkdtemp(path.join(tmpdir(), 'ai-research-review-'));
const tempStatePath = path.join(tempDir, 'review-state.json');
const port = 18760 + Math.floor(Math.random() * 100);

const seedState = {
  version: 1,
  chapters: Array.from({ length: 28 }, (_, index) => ({
    page: index + 1,
    title: `测试章节 ${index + 1}`,
    body: index === 0 ? '页面任务' : '',
    images: [],
  })),
};
await writeFile(tempStatePath, JSON.stringify(seedState));

const server = spawn(process.execPath, [serverPath], {
  cwd: appDir,
  env: {
    ...process.env,
    REVIEW_PORT: String(port),
    REVIEW_STATE_PATH: tempStatePath,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

const stop = () => server.kill('SIGTERM');
process.on('exit', stop);

async function get(url) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      return await fetch(url);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  throw new Error(`server did not start: ${url}`);
}

try {
  const htmlResponse = await get(`http://127.0.0.1:${port}/`);
  assert.equal(htmlResponse.status, 200);
  const html = await htmlResponse.text();
  assert.match(html, /id="export-md"/);
  assert.match(html, /class="chapter-body"/);
  assert.match(html, /id="save-status"/);

  const stateResponse = await fetch(`http://127.0.0.1:${port}/api/state`);
  assert.equal(stateResponse.status, 200);
  const state = await stateResponse.json();
  assert.equal(state.chapters.length, 28);
  assert.equal(state.chapters[0].page, 1);
  assert.match(state.chapters[0].body, /页面任务/);

  const edited = structuredClone(state);
  edited.chapters[0].title = '审稿测试标题';
  edited.chapters[0].body += '\n\n审稿测试修改。';
  const saveResponse = await fetch(`http://127.0.0.1:${port}/api/state`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(edited),
  });
  assert.equal(saveResponse.status, 200);

  const savedOnDisk = JSON.parse(await readFile(tempStatePath, 'utf8'));
  assert.equal(savedOnDisk.chapters[0].title, '审稿测试标题');
  assert.match(savedOnDisk.chapters[0].body, /审稿测试修改/);

  console.log('review app smoke test passed');
} finally {
  stop();
  await rm(tempDir, { recursive: true, force: true });
}
