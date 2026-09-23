# 《用 AI 完成技术参考搜索、筛选与结构化整理》HTML 配图包

本目录是 [`docs/42-口播反馈重写版逐页演讲稿.md`](../../../docs/42-口播反馈重写版逐页演讲稿.md) 的 HTML 制作素材入口。

## 使用方式

HTML 中直接引用 `source/` 和 `web/` 下的文件，例如：

```html
<img src="assets/presentation/42/source/p13-jspreadsheet.png" alt="Jspreadsheet 合并实验">
```

`manifest.json` 是机器可读的逐页映射；其中 `original` 保留了每张图在研究资料库中的原始位置，便于回查。

当前逐页映射按新版 28 页文稿排列。已有图片文件名中的 `pNN` 仍表示最初采集时的页码，以 `manifest.json` 的映射为准。

## 当前收录

- `source/`：从现有项目截图、证据切片和案例渲染中精选出的稳定副本。
- `web/`：2026-09-22 重新截取的官方网页画面，包含 Microsoft Learn Word JavaScript API 与 WPS 开放平台加载项概述。
- `diagrams/`：预留给 HTML/CSS 绘制的关系图，不把流程图伪装成网页截图。

这些图片服务于演示，不改变 `assets/screenshots/` 和 `assets/cases/` 中的原始资料。图片本身不能替代来源、版本和运行报告；具体证据边界写在 `manifest.json` 和原始 `MANIFEST.md` 中。

## 明确不伪造的画面

- WPS Office 宿主内的真机截图：现有 WPS 图像是浏览器适配层或证据裁切，不冒充真机。
- Google 检索结果页：现有检索截图只保留为方法反例，不能当作“Google 已验证”的正例。
- Dice/大话骰：已收录早期占位版本和后续亮色酒馆/KayKit 优化版本，均保留提交边界；它们是视觉反馈对照，不等同于完整产品验收。
- ECharts 公司项目：没有公开源码或截图，只能制作明确标注“示意，非公司截图”的 HTML 图形。
- 口播稿中要求的漏斗、时间线、工具环和证据阶梯：优先用 HTML/CSS 现场绘制，避免生成无法回查的装饰性图片。

## 维护规则

补采网页或项目截图时，新增文件名用 `pNN-用途.png`，并同步更新 `manifest.json` 的 `original`、`source_url`、`captured_at`、`status` 和 `notes` 字段。不要覆盖原始截图，也不要把示意图标记为 `real-screenshot`。
