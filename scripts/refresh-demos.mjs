import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const project = resolve(import.meta.dirname, '..')
const sourceRoot = resolve(project, '..')
const targetRoot = join(project, 'public', 'demos')

function buildVite(name, target) {
  const source = join(sourceRoot, name)
  if (!existsSync(join(source, 'package.json'))) throw new Error(`Missing local project: ${source}`)
  const result = spawnSync('npm', ['run', 'build', '--', '--base=./'], { cwd: source, stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`${name} build failed`)
  const built = join(source, 'dist')
  if (!existsSync(join(built, 'index.html'))) throw new Error(`Missing build entry: ${built}`)
  rmSync(target, { recursive: true, force: true })
  cpSync(built, target, { recursive: true })
}

function copyStatic(name, files, target) {
  const source = join(sourceRoot, name)
  rmSync(target, { recursive: true, force: true })
  mkdirSync(target, { recursive: true })
  for (const file of files) {
    const from = join(source, file)
    if (!existsSync(from)) throw new Error(`Missing demo file: ${from}`)
    cpSync(from, join(target, file), { recursive: true })
  }
}

mkdirSync(targetRoot, { recursive: true })
buildVite('cba-demo-3d', join(targetRoot, 'cba'))
buildVite('aircraft-modeling', join(targetRoot, 'aircraft'))
// The source app uses root-absolute runtime URLs for public assets. Its Vite base
// option does not rewrite URLs constructed in JS; make the frozen copy relocatable.
for (const file of readdirSync(join(targetRoot, 'aircraft', 'assets')).filter((name) => name.endsWith('.js'))) {
  const path = join(targetRoot, 'aircraft', 'assets', file)
  const js = readFileSync(path, 'utf8')
  writeFileSync(path, js.replaceAll('/brand/', './brand/').replaceAll('/models/', './models/'))
}
copyStatic('web-excel', ['index.html', 'demos'], join(targetRoot, 'web-excel'))
copyStatic('deckgl-rotation', ['index.html', '01-update-triggers.html', '02-transitions.html', '03-shader-animation.html', '04-baseline-radians.html', 'lab-common.js', 'lab.css'], join(targetRoot, 'deckgl'))

for (const name of readdirSync(targetRoot)) {
  const target = join(targetRoot, name)
  const size = (function total(path) { return statSync(path).isDirectory() ? readdirSync(path).reduce((sum, child) => sum + total(join(path, child)), 0) : statSync(path).size })(target)
  console.log(`${name}: ${(size / 1024 / 1024).toFixed(2)} MiB`)
}
