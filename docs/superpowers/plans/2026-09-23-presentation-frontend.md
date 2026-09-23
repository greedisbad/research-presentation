# 演讲前端工程 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从最新 24 页文稿交付编辑部风格的演讲前端，完整包包含四个静态 Demo，单文件包只含可独立播放的演讲页。

**Architecture:** 仓库根目录使用 Vite + TypeScript。`src/presentation` 保存屏幕文案、经审核的资产声明、幻灯片渲染和导航；`scripts/sync-demos.mjs` 从四个兄弟项目构建或复制静态资源；两份 Vite 配置共享演讲源码，分别生成完整多文件包与内联单 HTML。

**Tech Stack:** Vite、TypeScript、原生 DOM/CSS、vite-plugin-singlefile、Node.js 20、Playwright 浏览器验收。

**Spec:** [`../specs/2026-09-23-presentation-frontend-design.md`](../specs/2026-09-23-presentation-frontend-design.md)

## Global Constraints

- 演讲页固定 1920×1080 舞台、等比缩放；不按手机宽度重新排版。
- 口播、页面任务、内部画面建议不得进入前端构建产物。
- 全量构建的 Demo 新标签打开；失败不能使主讲页退出或失去导航。
- 单 HTML 构建不包含 Demo 资源或失效 Demo 链接。
- 不使用已知错误图片；真实截图与示意图保持可辨边界。
- 不修改四个源项目；完整包构建从同级目录读取它们。

## Review Focus

- WPS 页面误用浏览器适配截图：资产映射测试必须固定真机截图路径。
- 旧 28 页审稿 JSON 泄漏到新项目：内容测试必须检查 24 页标题和禁用口播标记。
- Vite 子目录部署的资源路径：Demo smoke 必须用完整包 HTTP 服务逐个检查入口和相对资源。
- CDN/GPU 失败：主讲页仍能显示备用静态证据并继续切页。
- 单文件移动到其他目录：离线打开仍有完整样式、图片和导航。

---

### Task 1: 演讲项目骨架与导航

**Files:** `package.json`, `index.html`, `vite.config.ts`, `vite.single.config.ts`, `src/main.ts`, `src/presentation/stage.ts`, `src/presentation/styles.css`, `tests/presentation.test.mjs`

**Interfaces:** `createStage(slides: Slide[], mode: 'full' | 'single'): void` 渲染与切换幻灯片；`Slide` 在 Task 2 定义。

- [ ] 先写结构测试：根目录存在启动/双构建脚本；stage 使用 1920×1080；导航支持键盘；无口播标记。
- [ ] 运行 `node --test tests/presentation.test.mjs`，确认新文件缺失导致失败。
- [ ] 建立 Vite 项目、固定舞台和导航，沿用暖纸色/深墨色/朱红色编辑部视觉。
- [ ] 运行结构测试与 `npm run build:single`，确认页面可构建。
- [ ] 提交这一可运行骨架。

### Task 2: 24 页屏幕内容与可信素材

**Files:** `src/presentation/slides.ts`, `src/presentation/assets.ts`, `src/presentation/layouts.ts`, `src/presentation/styles.css`, `assets/presentation/frontend-asset-audit.md`, `tests/presentation.test.mjs`

**Interfaces:** `slides: Slide[]`，每项包含 `id/title/kicker/layout/points/media/demo?`；`assets` 将稳定资源 ID 映射为构建期 URL。

- [ ] 测试固定 24 页、顺序匹配最新 42 文稿，并拒绝 `**口播**`、`页面任务`、`画面建议` 等内部标签。
- [ ] 审核并记录每张入选图片的原始文件、真实/示意边界和所在页面。
- [ ] 编写每页简短屏幕内容，以图片、HTML 图解和少量文字组成 24 个版式；WPS 页固定为真机截图。
- [ ] 构建并用 Playwright 在 1280×720 和手机视口检查重叠、裁切和导航。
- [ ] 提交幻灯片与审计记录。

### Task 3: 四个静态 Demo 完整包

**Files:** `scripts/sync-demos.mjs`, `src/presentation/slides.ts`, `src/presentation/stage.ts`, `tests/demo-sync.test.mjs`, `.gitignore`, `README.md`

**Interfaces:** `syncDemos({ sourceRoot, outputRoot }): Promise<DemoReport[]>` 构建/复制四个源项目并检查入口；演讲页 CTA 使用 `demo.path`。

- [ ] 写失败测试：缺少来源目录要明确报错；不接受旧同步目录；完整包必须有四个入口。
- [ ] 实现 Vite 项目 `npm run build -- --base=./` 与静态项目文件白名单复制，生成目标 `demos/`。
- [ ] `npm run dev` 和 `npm run build:full` 执行同步；浏览器逐个打开入口。对 CDN 依赖如实标注，不把它说成完全离线。
- [ ] 演讲页 Demo CTA 使用新标签；单文件模式显示“未包含现场演示”而不是无效链接。
- [ ] 提交脚本、测试和使用说明，不提交缓存、依赖或构建产物。

### Task 4: 单文件构建与完整验收

**Files:** `vite.single.config.ts`, `scripts/check-builds.mjs`, `tests/builds.test.mjs`, `README.md`

**Interfaces:** `npm run build:full` 输出 `dist/full/`，`npm run build:single` 输出 `dist/single/index.html`。

- [ ] 测试单文件构建只生成一个 HTML；内容中没有 `/demos/`、口播或外链脚本/样式。
- [ ] 内联精选图像、CSS、JS；确保单文件不依赖本机相对资源。
- [ ] 在静态 HTTP 服务下测试完整包的四个 Demo，并把单 HTML 移到临时目录断网打开测试。
- [ ] 检查 24 页跳转、演示失败兜底、资源许可证与图片审计，修复发现的问题。
- [ ] 提交验收后的最终工程。
