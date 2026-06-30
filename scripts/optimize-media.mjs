import { execFile } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicAssets = path.join(root, 'public', 'assets');
const thumbRoot = path.join(publicAssets, 'thumbs');
const mediaDirs = [
  'C端作品',
  'B端作品',
  '运营作品',
  '品牌作品',
  '暑期活动',
  '超漫俱乐部',
  '个人照片',
];
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.gif']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (imageExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function generateThumbnail(source) {
  const rel = path.relative(publicAssets, source);
  const parsed = path.parse(rel);
  const output = path.join(thumbRoot, parsed.dir, `${parsed.name}.jpg`);
  await mkdir(path.dirname(output), { recursive: true });
  await execFileAsync('/usr/bin/sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', '72',
    '-Z', '1200',
    source,
    '--out',
    output,
  ]);
}

const files = (await Promise.all(mediaDirs.map((dir) => walk(path.join(publicAssets, dir))))).flat();
let thumbs = 0;

for (const file of files) {
  await generateThumbnail(file);
  thumbs += 1;
}

console.log(`Generated ${thumbs} thumbnails.`);
