#!/usr/bin/env node
/**
 * 代码/文档证据裁切渲染器：把真实文件里的片段渲染成风格统一的截图。
 * 用于「本地项目真实截图、渲染、日志或文件裁切」这一类画面。
 *
 * 用法: node evidence-shot.mjs <config.json>
 * 配置: { project, outDir, items: [{ shot, title, sourcePath, from, to, note }] }
 */
import { chromium } from '/Users/wang/Documents/ChatGPT/cba-demo-3d/node_modules/playwright/index.mjs'
import { mkdir, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const cfg = JSON.parse(await readFile(resolve(process.argv[2]), 'utf8'))
const outDir = join(HERE, cfg.outDir || cfg.project)
await mkdir(outDir, { recursive: true })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
  args: ['--hide-scrollbars'],
})

for (const item of cfg.items) {
  let full = await readFile(item.sourcePath, 'utf8')
  if (item.sourcePath.endsWith('.json')) {
    try {
      full = JSON.stringify(JSON.parse(full), null, 2)
    } catch {
      /* 非法 JSON 就按原文渲染 */
    }
  }
  const lines = full.split('\n')
  const from = item.from || 1
  const to = item.to || lines.length
  const slice = lines.slice(from - 1, to)
  const numbered = slice
    .map((l, i) => `<tr><td class="ln">${from + i}</td><td class="code">${esc(l) || '&nbsp;'}</td></tr>`)
    .join('\n')

  const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 28px 32px; background: #f6f7f9; font-family: -apple-system, "PingFang SC", "Helvetica Neue", sans-serif; }
    .card { background: #fff; border: 1px solid #e3e6ea; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
    .head { padding: 14px 20px; border-bottom: 1px solid #eceef1; background: #fbfcfd; }
    h1 { margin: 0 0 4px; font-size: 17px; color: #16202b; letter-spacing: .2px; }
    .path { font-family: "SF Mono", Menlo, monospace; font-size: 12.5px; color: #5b6b7c; }
    .path b { color: #0d4f8b; }
    table { border-collapse: collapse; width: 100%; }
    td { vertical-align: top; padding: 1px 0; }
    .ln { width: 56px; text-align: right; padding-right: 16px; color: #9aa7b4; font-family: "SF Mono", Menlo, monospace; font-size: 12.5px; user-select: none; }
    .code { font-family: "SF Mono", Menlo, monospace; font-size: 13px; color: #1d2733; white-space: pre-wrap; word-break: break-word; line-height: 1.55; }
    .hl { background: #fff6d6; }
    .note { padding: 12px 20px; border-top: 1px solid #eceef1; background: #fbfcfd; font-size: 13px; color: #45535f; line-height: 1.6; }
    .note b { color: #b45309; }
  </style></head><body>
    <div class="card">
      <div class="head">
        <h1>${esc(item.title)}</h1>
        <div class="path">${esc(item.sourceLabel || item.sourcePath).replace(/^([^:]+)(:.*)?$/, '<b>$1</b>$2')}</div>
      </div>
      <table>${numbered}</table>
      ${item.note ? `<div class="note">${item.note}</div>` : ''}
    </div>
  </body></html>`

  const page = await browser.newPage({ viewport: { width: item.width || 1100, height: 600 }, deviceScaleFactor: 2 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.screenshot({ path: join(outDir, item.shot), fullPage: true })
  console.log(`  -> ${item.shot}`)
  await page.close()
}

await browser.close()
console.log('完成')
