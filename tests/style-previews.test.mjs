import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../prototypes/style-round-2')
const names = ['flight-ops', 'swiss-grid', 'documentary', 'zine-collage', 'quiet-keynote', 'retro-terminal']

test('second style round has six comparable three-slide decks', () => {
  const index = readFileSync(resolve(root, 'index.html'), 'utf8')
  for (const name of names) {
    const html = readFileSync(resolve(root, `${name}.html`), 'utf8')
    assert.match(index, new RegExp(`${name}\\.html`))
    assert.equal((html.match(/<section class="slide /g) ?? []).length, 3, name)
    assert.match(html, /AI 过上了打工人梦想中的生活/)
    assert.match(html, /WPS 客户端中的 AI 插件任务窗格/)
    assert.match(html, /PageAgent/)
    assert.doesNotMatch(html, /口播|页面任务|画面建议/)
    assert.match(html, /width: 1920px/)
  }
  assert.ok(existsSync(resolve(root, 'wps-client.png')))
})
