import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('presentation has development and two build commands', () => {
  const scripts = JSON.parse(read('package.json')).scripts
  assert.equal(typeof scripts.dev, 'string')
  assert.equal(typeof scripts['build:full'], 'string')
  assert.equal(typeof scripts['build:single'], 'string')
})

test('stage uses fixed 1920 by 1080 canvas and keyboard navigation', () => {
  const css = read('src/presentation/styles.css')
  const stage = read('src/presentation/stage.ts')
  assert.match(css, /width:\s*1920px/)
  assert.match(css, /height:\s*1080px/)
  assert.match(stage, /ArrowRight/)
  assert.match(stage, /ArrowLeft/)
  assert.match(stage, /touchstart/)
})

test('slide content is screen copy only and starts with the selected hook', () => {
  const slides = read('src/presentation/slides.ts')
  assert.match(slides, /AI 过上了打工人梦想中的生活/)
  assert.doesNotMatch(slides, /\*\*口播\*\*|\*\*页面任务\*\*|\*\*画面建议\*\*/)
})
