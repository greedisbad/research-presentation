import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(appDir, '../..');
const sourceDocPath = path.join(projectDir, 'docs/42-口播反馈重写版逐页演讲稿.md');
const manifestPath = path.join(projectDir, 'assets/presentation/42/manifest.json');
const outputPath = path.join(appDir, 'review-state.json');

const sourceText = await readFile(sourceDocPath, 'utf8');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const lines = sourceText.replaceAll('\r\n', '\n').split('\n');
const chapters = [];

for (let index = 0; index < lines.length; index += 1) {
  const match = lines[index].match(/^### (\d+)｜(.+)$/);
  if (!match) continue;

  const page = Number(match[1]);
  const nextHeading = lines.findIndex((line, nextIndex) => nextIndex > index && /^### /.test(line));
  const end = nextHeading === -1 ? lines.length : nextHeading;
  const slide = manifest.slides.find((item) => item.page === page);
  if (!slide) throw new Error(`manifest slide not found: ${page}`);
  if (slide.title !== match[2].trim()) throw new Error(`manifest title differs from manuscript on page ${page}`);
  const images = slide.assets.map((assetId) => {
    const asset = manifest.assets.find((item) => item.id === assetId);
    if (!asset) throw new Error(`manifest asset not found: ${assetId}`);
    const fileName = path.posix.basename(asset.file);
    return {
      file: `images/${fileName}`,
      label: asset.label || assetId,
    };
  });

  chapters.push({
    page,
    title: match[2].trim(),
    body: lines.slice(index + 1, end).join('\n').trim(),
    images,
    imageNote: slide.notes || '',
  });
}

if (chapters.length !== manifest.slides.length || chapters.some((chapter, index) => chapter.page !== index + 1)) {
  throw new Error(`manuscript and manifest page lists differ: ${chapters.length} chapters, ${manifest.slides.length} slides`);
}

const state = {
  version: 1,
  source: 'docs/42-口播反馈重写版逐页演讲稿.md',
  updatedAt: new Date().toISOString(),
  chapters,
};

await writeFile(outputPath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
console.log(`wrote ${chapters.length} chapters to ${outputPath}`);
