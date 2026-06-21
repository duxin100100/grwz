#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "🧹 清理无用文件..."
rm -f public/assets/contact-bg.svg \
  public/assets/gallery-art-01.svg \
  public/assets/gallery-art-02.svg \
  public/assets/gallery-art-03.svg \
  public/assets/gallery-art-04.svg \
  public/assets/gallery-art-05.svg \
  public/assets/gallery-art-06.svg \
  public/assets/hero-motion.gif \
  public/assets/hero-placeholder.png \
  public/assets/hero-poster.svg \
  "public/assets/photo-01.jpg.png" \
  "public/assets/photo-02.jpg.png" \
  "public/assets/photo-03.jpg.png" \
  "public/assets/photo-04.jpg.png" \
  public/assets/portrait.svg \
  public/assets/profile-gray.png \
  public/assets/project-ai.svg \
  public/assets/project-benefit.svg \
  public/assets/project-campaign.svg \
  public/assets/project-comic.svg \
  public/assets/project-saas.svg \
  public/assets/project-system.svg \
  src/components/BlurReveal.jsx \
  src/components/GlassSurface.jsx \
  src/components/GlassSurface.css

echo "🗑  清理 .DS_Store..."
find . -name ".DS_Store" -delete 2>/dev/null || true

grep -q ".DS_Store" .gitignore 2>/dev/null || echo ".DS_Store" >> .gitignore

echo "🔓 清理 git lock..."
rm -f .git/index.lock

echo "📦 git add & commit..."
git add -A
git commit -m "chore: 清理未使用资源和组件，更新作品集内容"

echo "🚀 推送到 GitHub..."
git push origin main

echo "✅ 完成！"
