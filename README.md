# Pocket Fridge

> 在线预览（GitHub Pages）：https://dreaminmaster.github.io/pocket-fridge/

一个可部署到 GitHub Pages 的 Low-poly 3D 冰箱互动网页原型，基于 **Vite + Three.js + HTML/CSS/JavaScript**。

## 功能

- Low-poly 卡通风格 3D 冰箱
- 上下双柜门独立点击开合
- 柜门绕侧边铰链旋转，带平滑动画
- 可见冷藏区 / 冷冻区 / 门内置物架 / 内部层架
- 右侧悬浮按钮展开食材面板
- 食材卡片滚动列表
- 点击卡片后自动生成对应 3D 食材并放到目标区域
- 同一区域支持连续添加多个食材并自动错位摆放
- 桌面端 / 手机端适配

## 本地运行

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```

打包产物会在 `dist/`。

## 部署到 GitHub Pages

如果仓库名是 `lowpoly-fridge`，建议：

1. 打开 `vite.config.js`
2. 把 `base` 改成：

```js
base: '/lowpoly-fridge/'
```

如果你打算部署到用户名主页仓库（如 `username.github.io`），则可以保留 `/`。

然后执行：

```bash
npm run build
```

把 `dist` 部署到 GitHub Pages 即可。

## 项目结构

```text
lowpoly-fridge/
├─ public/
├─ src/
│  ├─ main.js
│  ├─ style.css
│  ├─ scene/
│  │  ├─ createScene.js
│  │  ├─ createCamera.js
│  │  ├─ createLights.js
│  │  └─ createRenderer.js
│  ├─ fridge/
│  │  ├─ createFridge.js
│  │  ├─ createDoor.js
│  │  ├─ createShelves.js
│  │  └─ fridgeInteraction.js
│  └─ foods/
│     ├─ foodData.js
│     ├─ createFoodModel.js
│     ├─ foodModels.js
│     └─ placeFood.js
├─ index.html
├─ package.json
└─ vite.config.js
```
