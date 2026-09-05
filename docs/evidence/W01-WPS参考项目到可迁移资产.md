# W01：WPS 从参考项目到可迁移资产

## 要支持的演讲主张

“不要重复造轮子”并不等于复制一个开源仓库。AI 更有价值的工作是批量发现候选，按当前约束拆解资产，再选择直接复用、翻译模式或仅保留假设。

## 证据链

### 1. 先建立候选池

- 原文件：`tmp/wps-ai-plugin-main/.planning/tmp-reference-index.md`
- 记录了 PPT 设计、演示框架、Agent、表格引擎和文档处理等参考项目。
- Phase 02 的详细报告称分析 11 个 PPT 相关项目，并按实现方式和 WPS 价值整理。

候选数量属于本地研究记录；Stars 是当时快照，正式演讲不使用为当前实时数据。

### 2. 用当前环境约束筛选，而不是按热度排序

- 原文件：`tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-FEASIBLE-PLANS.md`
- 核心约束：WPS 插件运行在浏览器 JavaScript 环境，通过 WPS 形状和文本对象工作。
- 因此，HTML/CSS 主题、Slidev/Marp、Python 引擎和完整多 Agent 系统大多不能直接接入；但其中的设计参数、布局 schema、prompt 和质量门禁仍可迁移。

这一步把候选项目拆成三类：

| 迁移等级 | 例子 | 行动 |
|---|---|---|
| 直接使用或低成本接入 | JavaScript 数据结构、部分工具接口 | 做依赖与目标环境 spike |
| 模式翻译 | Content Schema、Bento Grid、Agent Loop | 用 WPSJS 重新实现 |
| 只借鉴设计原则 | Python 引擎、HTML 渲染管线 | 提取参数、门禁与流程，不搬运行时 |

### 3. 研究资产进入当前源码

#### Content Schema → 语义模板工具

- 研究来源：PPTAgent 等项目的 Layout / Content Schema 思路。
- 当前代码：`tmp/wps-ai-plugin-main/wps-plugin-ppt/src/agent/tools.ts` 第 234–250、430–446 行附近。
- 可见变化：工具从自由坐标操作提升为 `apply_template`，输入是带 `type` 的幻灯片数组，并由 adapter 渲染。

#### Design Token → 共享主题数据

- 当前代码：`tmp/wps-ai-plugin-main/shared/agent/themes.ts`。
- 文件注释明确记录借鉴 html-ppt-skill 的 Design Token 与 slidev-ppt-agent 的 archetype 匹配。
- 可见变化：配色、字号和使用场景进入结构化 Theme，由 `themeToPrompt()` 转为模型上下文。

这不是证明最终视觉一定优秀；它证明外部参考确实改变了工具抽象和共享代码，而非停在调研报告里。

## 事实、推断与证据上限

| 类型 | 内容 |
|---|---|
| 当前事实 | 参考索引、可行性筛选、`apply_template` 和 `themes.ts` 均存在 |
| 历史记录 | Phase 02 报告记录各项目特性、当时 Stars 和建议路线 |
| 方法推断 | 将参考拆成“代码 / 参数 / 模式 / 假设”比整仓复制更适合异构环境 |
| 证据上限 | 下载包没有原始 Git 历史，无法精确证明每一行代码由哪个仓库首次触发；W04 已重跑 mock 测试和生产构建，但仍没有 WPS 真机渲染证据 |

## 2026-09-05 运行补证

[`W04`](W04-WPS模板迁移到运行门禁.md) 已把其中一条路线补成“筛选文档 → Theme/SlideSpec → apply_template → Browser/WPS adapter → 自动门禁”的纵向链。当前快照的 58 项 PPT agent 测试和生产构建通过；这些结果证明协议和 mock 渲染可运行，不能替代 WPS 真机兼容性与视觉验收。

## 最小上台画面

```text
11 个项目
  ↓ 当前环境约束
可直接用 / 要翻译 / 只借思想 / 不采用
  ↓
apply_template + themes.ts + adapter
```

配一张 `FEASIBLE-PLANS.md` 排除清单和一小段 `apply_template` schema。不要展示长代码。

## 可迁移方法

为每个候选项目强制回答五问：

1. 它解决的子问题是什么？
2. 它依赖的运行环境与许可证是什么？
3. 可迁移的是代码、数据、接口还是工作方法？
4. 在当前项目中落到哪个文件或决策？
5. 用什么实验判断迁移成功？
