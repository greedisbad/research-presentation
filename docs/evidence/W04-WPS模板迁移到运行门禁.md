# W04：WPS 模板迁移到运行门禁

## 要回答的问题

W01 已说明“不要整仓照搬”，本切片继续追问：外部项目中筛出的设计资产，是否真的进入了可运行代码，并经过了什么强度的验证？

## 一条纵向证据链

### 1. 候选先被宿主约束筛选

本地 `02-FEASIBLE-PLANS.md` 第 1–51 行先声明 WPS 插件运行在浏览器 JavaScript 环境、最终操作 WPS 原生形状和文本框，然后淘汰不能直接接入的 HTML、Slidev、Marp 和 Python 运行时。保留下来的不是“某个冠军仓库”，而是四类局部资产：JavaScript 代码、设计参数、布局模式和 Prompt/门禁。

这一步最值得上台的判断是：

> 搜索结果不是答案；当前项目的运行环境、输出格式和可编辑性要求，才是筛选函数。

### 2. Design Token 被翻译为共享数据

`shared/agent/themes.ts` 第 8–28 行把颜色、字号和使用场景定义为 `Theme`；第 30–121 行保存 8 套主题；第 129–149 行由 `getTheme()` 提供默认降级，并由 `themeToPrompt()` 把同一份结构化参数投影进模型上下文。

2026-09-05 的独立 smoke check 读取该快照并确认：

- 共 8 套主题；
- `tech` 选择为“科技暗”；
- Prompt 中出现预期背景 `#0a0a1a`；
- 未知主题退回“商务蓝”。

这说明调研材料没有只变成一段提示词，而是先变成可以被代码与模型共同消费的数据结构。

### 3. Content Schema 被翻译为语义协议

`slide-tool-adapter.ts` 第 152–304 行定义 15 种以 `type` 为判别键的 `SlideSpec`，第 310 行起执行字段校验；`tools.ts` 用一个 `apply_template` 工具接收 `slides[]`，把通过校验的数据交给 adapter。

与让模型逐个计算坐标相比，这个变化把责任重新分配为：

```text
模型：选择页面语义 + 填内容
协议：限制字段和类型
渲染器：决定坐标、字号、颜色
测试：检查协议和确定性渲染
```

这正是“AI 调研最终要沉淀成可执行资源”的具体形态：不是更多笔记，而是数据协议和稳定接口。

### 4. 同一协议落到两种 adapter

`BrowserSlideAdapter` 与 `WpsSlideAdapter` 都实现 `applyTemplate()`。前者在内存中构造可断言的 mock slide，后者最终访问 `window.Application.ActivePresentation`，调用 WPS 的 `Slides` 和 `Shapes` 对象。

本轮在不修改原案例的临时副本中执行：

| 门禁 | 结果 |
|---|---|
| `themeToPrompt` smoke check | 通过 |
| Browser adapter + tool 窄测试 | 2 个文件、49 个测试通过 |
| PPT agent 全量测试 | 3 个文件、58 个测试通过 |
| PPT 包生产构建 | 7018 modules，构建通过 |
| WPS 真机渲染 | 未执行 |

原始摘要和源文件指纹见 [`runtime-report.json`](runtime/wps/runtime-report.json)。依赖安装最终因 pnpm 的 ignored-build policy 返回 1，但依赖已完成链接；直接调用包内 Vitest 和 Vite 后，测试与构建均返回 0。这个安装警告不能被“后续能跑”抹掉。

## 六节点谱系

| 节点 | 本案例 |
|---|---|
| 决策问题 | 如何在 WPS 浏览器插件中复用外部 PPT 项目的设计能力 |
| 搜索/筛选 | 11 个候选 → 按 JS 宿主、原生可编辑输出和迁移成本筛选 |
| 原始证据 | Phase 02 调研、可行方案、主题与 adapter 源码快照 |
| 转换规则 | Design Token → `Theme`；Content Schema → `SlideSpec`；布局 → renderer |
| 自动门禁 | smoke、49 项窄测试、58 项全测、Vite 构建 |
| 人工/宿主门禁 | WPS 真机视觉、兼容性和编辑结果仍未验证 |

## 证据裁决

- “外部参考改变了项目的数据结构与工具抽象”：**FULL（对当前下载快照）**。
- “主题与语义模板在 Browser mock 中按现有测试工作”：**FULL**。
- “PPT 前端能够生产构建”：**FULL（当次环境）**，但存在 chunk 与依赖警告。
- “在真实 WPS 中能正确生成并保持视觉质量”：**NONE**，本轮没有真机证据。
- “可精确追溯到某个历史 commit”：**NONE**，下载快照没有独立 Git 元数据。

## 适合演讲的画面

建议用一页四列流水线，不展示具体 API 名：

```text
11 个候选
→ 宿主约束淘汰
→ Token + Schema
→ 共享数据 + 语义工具
→ 自动测试通过 / 真机仍待验收
```

推荐度：S。它把“AI 搜资料”与“AI 写代码”之间最容易被忽略的中间层讲清楚：先抽取可迁移资产，再把它压进协议和门禁。`apply_template`、类名、行号和测试详情留在附录或讲者备注。

2026-09-08 已确认本机安装 WPS `12.1.24031`，但插件配置当前为空，且真机生成需要用户模型端点。完整的固定输入、截图清单与成功/失败门禁见 [`true-host-capture-protocol.md`](runtime/wps/true-host-capture-protocol.md)；在该协议执行完成前，本切片仍不得声称**当前版本**真机结果。用户随后提供了 2026 年 5 月的真实 WPS 界面截图，见 [`W05`](W05-WPS历史真机截图.md)：它们补足历史画面，但不改变本轮当次门禁状态。
