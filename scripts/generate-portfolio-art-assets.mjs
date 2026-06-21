import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('public/assets');

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const grid = (width, height, color = 'rgba(255,255,255,0.08)') => `
  <g opacity="0.48">
    ${Array.from({ length: 7 }, (_, i) => `<path d="M ${Math.round((width / 6) * i)} 0 V ${height}" stroke="${color}" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 6 }, (_, i) => `<path d="M 0 ${Math.round((height / 5) * i)} H ${width}" stroke="${color}" stroke-width="1"/>`).join('')}
  </g>`;

const grain = (id, opacity = 0.18) => `
  <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.74" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="table" tableValues="0 ${opacity}"/>
    </feComponentTransfer>
  </filter>`;

const galleryAssets = [
  ['gallery-art-01.svg', '#b8ff20', '#7557ff', 18, 74],
  ['gallery-art-02.svg', '#78d7ff', '#b8ff20', 68, 28],
  ['gallery-art-03.svg', '#e86fb3', '#b8ff20', 30, 42],
  ['gallery-art-04.svg', '#e8c35d', '#b8ff20', 58, 66],
  ['gallery-art-05.svg', '#9b78ff', '#74e2ff', 46, 22],
  ['gallery-art-06.svg', '#b8ff20', '#e86fb3', 78, 52]
];

const projectAssets = [
  {
    file: 'project-consumer-abstract.svg',
    accent: '#b8ff20',
    second: '#7f60ff',
    kind: 'soft orbit',
    shapes: [
      '<circle cx="940" cy="470" r="122" fill="url(#orbA)" opacity="0.86"/>',
      '<circle cx="1018" cy="388" r="68" fill="url(#orbB)" opacity="0.72"/>',
      '<path d="M168 510 C310 374 442 608 592 454 C684 360 776 338 892 416" fill="none" stroke="#b8ff20" stroke-width="18" stroke-linecap="round" opacity="0.64"/>'
    ]
  },
  {
    file: 'project-business-abstract.svg',
    accent: '#78d7ff',
    second: '#b8ff20',
    kind: 'dashboard lattice',
    shapes: [
      '<rect x="142" y="150" width="360" height="150" rx="28" fill="rgba(255,255,255,0.12)"/>',
      '<rect x="558" y="150" width="500" height="150" rx="28" fill="rgba(120,215,255,0.14)"/>',
      '<rect x="142" y="360" width="290" height="230" rx="28" fill="rgba(255,255,255,0.1)"/>',
      '<rect x="478" y="360" width="580" height="230" rx="28" fill="rgba(184,255,32,0.11)"/>',
      '<path d="M185 650 C340 520 500 660 665 520 C790 414 902 442 1045 318" fill="none" stroke="#78d7ff" stroke-width="16" stroke-linecap="round" opacity="0.7"/>'
    ]
  },
  {
    file: 'project-operation-abstract.svg',
    accent: '#e8c35d',
    second: '#b8ff20',
    kind: 'growth signal',
    shapes: [
      '<path d="M150 586 C270 514 328 398 464 428 C610 458 650 252 796 270 C904 284 954 210 1060 152" fill="none" stroke="#e8c35d" stroke-width="22" stroke-linecap="round" opacity="0.72"/>',
      '<circle cx="284" cy="420" r="88" fill="url(#orbA)" opacity="0.48"/>',
      '<circle cx="774" cy="280" r="116" fill="url(#orbB)" opacity="0.42"/>',
      '<rect x="168" y="626" width="712" height="38" rx="19" fill="rgba(255,255,255,0.12)"/>'
    ]
  },
  {
    file: 'project-brand-abstract.svg',
    accent: '#9b78ff',
    second: '#b8ff20',
    kind: 'brand monolith',
    shapes: [
      '<path d="M660 142 L1018 302 L830 654 L472 494 Z" fill="url(#panel)" opacity="0.72"/>',
      '<circle cx="356" cy="342" r="112" fill="url(#orbA)" opacity="0.66"/>',
      '<rect x="120" y="576" width="420" height="54" rx="27" fill="rgba(184,255,32,0.52)"/>',
      '<path d="M705 256 L880 330 L788 516 L612 440 Z" fill="rgba(255,255,255,0.16)"/>'
    ]
  }
];

function gallerySvg(file, accent, second, x, y) {
  const id = file.replace(/[^a-z0-9]/gi, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    ${grain(`grain-${id}`, 0.14)}
    <radialGradient id="glowA" cx="${x}%" cy="${y}%" r="58%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.62"/>
      <stop offset="0.35" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#030506" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="${100 - x}%" cy="${100 - y}%" r="48%">
      <stop offset="0" stop-color="${second}" stop-opacity="0.42"/>
      <stop offset="0.42" stop-color="${second}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#030506" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="base" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#05080a"/>
      <stop offset="0.5" stop-color="#10181a"/>
      <stop offset="1" stop-color="#020405"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.03"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1200" fill="url(#base)"/>
  <rect width="900" height="1200" fill="url(#glowA)"/>
  <rect width="900" height="1200" fill="url(#glowB)"/>
  ${grid(900, 1200, 'rgba(255,255,255,0.075)')}
  <g opacity="0.82">
    <rect x="110" y="162" width="620" height="126" rx="38" fill="rgba(255,255,255,0.08)"/>
    <rect x="110" y="342" width="280" height="260" rx="34" fill="url(#glass)"/>
    <rect x="442" y="342" width="330" height="260" rx="34" fill="url(#glass)"/>
    <rect x="110" y="675" width="662" height="315" rx="38" fill="rgba(255,255,255,0.07)"/>
  </g>
  <path d="M150 915 C264 790 342 860 440 742 C540 620 650 732 752 568" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.68"/>
  <path d="M0 1080 C220 1010 285 1152 512 1040 C700 947 752 1018 900 932 V1200 H0 Z" fill="#000" opacity="0.46"/>
  <rect width="900" height="1200" filter="url(#grain-${id})"/>
</svg>`;
}

function projectSvg({ file, accent, second, kind, shapes }) {
  const safeKind = escapeXml(kind);
  const id = file.replace(/[^a-z0-9]/gi, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    ${grain(`grain-${id}`, 0.13)}
    <radialGradient id="orbA" cx="36%" cy="42%" r="72%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="0.46" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbB" cx="62%" cy="34%" r="70%">
      <stop offset="0" stop-color="${second}" stop-opacity="0.74"/>
      <stop offset="0.48" stop-color="${second}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${second}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.72"/>
      <stop offset="0.58" stop-color="#f6f8f4" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${second}" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="base" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#060a0b"/>
      <stop offset="0.58" stop-color="#111818"/>
      <stop offset="1" stop-color="#020405"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#base)"/>
  <rect width="1200" height="800" fill="url(#orbA)" opacity="0.28"/>
  <rect width="1200" height="800" fill="url(#orbB)" opacity="0.22"/>
  ${grid(1200, 800, 'rgba(255,255,255,0.065)')}
  <g opacity="0.98">${shapes.join('')}</g>
  <rect x="0" y="0" width="1200" height="800" fill="url(#grain-${id})"/>
  <metadata>${safeKind}</metadata>
</svg>`;
}

await mkdir(outDir, { recursive: true });

await Promise.all([
  ...galleryAssets.map(([file, accent, second, x, y]) =>
    writeFile(path.join(outDir, file), gallerySvg(file, accent, second, x, y))
  ),
  ...projectAssets.map((asset) => writeFile(path.join(outDir, asset.file), projectSvg(asset)))
]);
