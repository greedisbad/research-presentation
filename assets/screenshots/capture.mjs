#!/usr/bin/env node
/**
 * 通用截图引擎：按 JSON 配置驱动无头 Chrome，执行「点哪里 → 等什么 → 截哪张」。
 *
 * 用法:  node capture.mjs <config.json>
 *
 * 配置格式见 configs/ 下的样例。关键设计：
 * - 统一用本机 Chrome（channel: 'chrome'），避免下载 playwright 浏览器二进制
 * - SwiftShader 软件渲染，保证无头模式下 WebGL/Three.js 正常出图
 * - 每个 step 的 shot 参数写明输出文件名，name 写明这张图截的是什么
 */
import { chromium } from '/Users/wang/Documents/ChatGPT/cba-demo-3d/node_modules/playwright/index.mjs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const configPath = process.argv[2]
if (!configPath) {
  console.error('用法: node capture.mjs <config.json>')
  process.exit(1)
}

const cfg = JSON.parse(await readFile(resolve(configPath), 'utf8'))
const outDir = cfg.outDir ? resolve(HERE, cfg.outDir) : join(HERE, cfg.project)
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'],
})
const page = await browser.newPage({
  viewport: cfg.viewport || { width: 1440, height: 940 },
  deviceScaleFactor: 1,
})

const errors = []
page.on('pageerror', (e) => errors.push(e.message))

const log = (...a) => console.log(...a)
const shots = []

async function runStep(step, i) {
  const tag = `[${i + 1}] ${step.name || step.action}`
  switch (step.action) {
    case 'goto':
      await page.goto(step.url, { waitUntil: step.waitUntil || 'networkidle', timeout: 45000 })
      break
    case 'reload':
      await page.reload({ waitUntil: step.waitUntil || 'networkidle' })
      break
    case 'clearStorage':
      await page.evaluate(() => localStorage.clear()).catch(() => {})
      break
    case 'click':
      await page.locator(step.selector).first().click({ timeout: step.timeout || 20000 })
      break
    case 'fill':
      await page.locator(step.selector).first().fill(step.value, { timeout: step.timeout || 20000 })
      break
    case 'press':
      await page.locator(step.selector).first().press(step.key, { timeout: step.timeout || 20000 })
      break
    case 'waitFor':
      await page.locator(step.selector).first().waitFor({ state: 'visible', timeout: step.timeout || 30000 })
      break
    case 'wait':
      await page.waitForTimeout(step.ms || 500)
      break
    case 'dragTo':
      await page
        .locator(step.from)
        .first()
        .dragTo(page.locator(step.to).first(), { timeout: step.timeout || 20000 })
      break
    case 'waitGone':
      await page.locator(step.selector).first().waitFor({ state: 'detached', timeout: step.timeout || 30000 })
      break
    case 'screenshot': {
      const file = join(outDir, step.shot)
      await page.screenshot({ path: file, fullPage: step.fullPage !== false })
      shots.push({ file: `${cfg.project || cfg.outDir}/${step.shot}`, name: step.name, src: 'live' })
      log(`  ${tag} -> ${step.shot}${step.fullPage === false ? ' (viewport)' : ''}`)
      return
    }
    default:
      throw new Error(`未知 action: ${step.action}`)
  }
  log(`  ${tag}`)
}

// 单步失败不中断整批：step.optional 或全局 cfg.continueOnError
const continueOnError = cfg.continueOnError !== false
for (let i = 0; i < cfg.steps.length; i++) {
  try {
    await runStep(cfg.steps[i], i)
  } catch (err) {
    const msg = `STEP ${i + 1} "${cfg.steps[i].name || cfg.steps[i].action}" 失败: ${err.message.split('\n')[0]}`
    errors.push(msg)
    log(`  !! ${msg}`)
    if (!continueOnError && !cfg.steps[i].optional) break
  }
}

await browser.close()

// 供 MANIFEST 汇总：每次运行追加一份记录
if (cfg.manifest !== false) {
  const recPath = join(outDir, '_shots.json')
  await writeFile(recPath, JSON.stringify({ project: cfg.project, ranAt: new Date().toISOString(), shots, errors }, null, 2))
}
log(errors.length ? `完成，但有错误: ${JSON.stringify(errors)}` : '完成，无页面错误')
