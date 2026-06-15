# UUU Portfolio

UUU 作品集网站，使用 React、Vite 和 OGL 构建。页面内容已做占位脱敏处理。

## 环境要求

- Node.js 18 或更高版本
- npm

## 安装依赖

```bash
npm install
```

## 本地启动

```bash
npm run dev
```

默认本地地址：

```text
http://localhost:5173/
```

## 生产构建

```bash
npm run build
```

构建产物会输出到 `dist/`，该目录由构建命令生成，不提交到仓库。

## 本地预览构建产物

```bash
npm run preview
```

## 资源说明

- 页面源码在 `src/`
- 静态资源在 `public/assets/`
- 当前字体使用 CSS 字体栈和组件内 canvas 文本配置，没有单独提交字体文件
- 首屏背景视频已预留为纯色占位，后续可在 `src/App.jsx` 的 `Hero` 组件中替换为视频层
