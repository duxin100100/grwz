import { execFile } from 'node:child_process';
import { mkdir, readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicAssets = path.join(root, 'public', 'assets');
const thumbRoot = path.join(publicAssets, 'thumbs');
const videoRoot = path.join(publicAssets, 'videos');
const ffmpegPath = '/Users/dx/Library/Application Support/Adobe/CEP/extensions/GifGun2/.bin/ffmpeg';
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

async function generateVideo(source) {
  if (path.extname(source).toLowerCase() !== '.gif') return;
  const rel = path.relative(publicAssets, source);
  const parsed = path.parse(rel);
  const output = path.join(videoRoot, parsed.dir, `${parsed.name}.mp4`);
  await mkdir(path.dirname(output), { recursive: true });
  await execFileAsync('chmod', ['u+x', ffmpegPath]).catch(() => {});
  await execFileAsync(ffmpegPath, [
    '-y',
    '-hide_banner',
    '-loglevel', 'error',
    '-i', source,
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    output,
  ]);
  const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)]);
  if (outputStat.size >= sourceStat.size) {
    await unlink(output);
    return false;
  }
  return true;
}

const files = (await Promise.all(mediaDirs.map((dir) => walk(path.join(publicAssets, dir))))).flat();
let thumbs = 0;
let videos = 0;

for (const file of files) {
  await generateThumbnail(file);
  thumbs += 1;
  if (path.extname(file).toLowerCase() === '.gif') {
    if (await generateVideo(file)) {
      videos += 1;
    }
  }
}

console.log(`Generated ${thumbs} thumbnails and ${videos} smaller mp4 videos.`);
