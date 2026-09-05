# 案例一：从陌生 WPS API 到可运行插件

## 案例的演讲价值

这个案例不应被概括为“AI 写了一个 WPS 插件”。它真正展示的是：面对资料稀疏、API 不完整、参考实现分散的技术环境，AI 如何搜索多种参考、拆解可复用资产、提出方案、运行实验并把失败经验写回知识库。

## 可追溯证据链

### 1. 明确目标与约束

项目目标不是生成静态图片，而是在 WPS 的 Word、Excel、PPT 中提供 AI Agent，并通过 WPSJS 操作文档对象。技术约束包括 Vue 3、Vite、pnpm monorepo、WPSJS API，以及浏览器测试环境。

本地证据：

- `tmp/wps-ai-plugin-main/.planning/PROJECT.md`
- `tmp/wps-ai-plugin-main/README.md`
- `tmp/wps-ai-plugin-main/pnpm-workspace.yaml`

WPS 官方文档确认加载项本质上是网页，通过 JavaScript API 与 WPS 应用交互，并支持 Ribbon、任务窗格和 Web 对话框。[WPS 加载项概述](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/wps-integration-mode/wps-addin-development/addin-overview)

### 2. 建立参考项目池

Phase 02 对 11 个 PPT 相关项目进行分析，包括 PPTAgent、PptxGenJS、Slidev、Marp、python-pptx 和多个设计 Skill。分析不是复制 README，而是提取：

- 生成管线；
- 布局与主题资产；
- 编辑模型；
- 质量评估；
- 与 WPS 环境的兼容性；
- 移植难度。

本地证据：`tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-RESEARCH.md`

### 3. 从“好项目”筛成“可行方案”

调研进一步形成三个方案：参数化增强、布局模板系统、PptxGenJS 导出。Python、HTML/CSS 等方案即使设计能力强，也因 WPSJS 运行环境或可编辑性要求被降级或排除。

本地证据：`tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-FEASIBLE-PLANS.md`

这一段适合演示“来源评分”和“方案评分”不是同一件事：一个 S 级来源，可能只贡献一个局部思想，而不能直接成为实施方案。

### 4. 局部复用，而非整包照搬

项目分别借用了：

- PPTAgent 的内容 Schema 和多步工作流；
- HTML PPT 项目的 Design Tokens；
- Mck 项目的布局坐标、字符预算和 QA 门禁；
- page-agent 的状态重组思路；
- openpyxl、XlsxWriter、python-docx 的对象模型与工具语义。

但运行时代码仍被翻译成 WPSJS 适配器和项目自身的 Agent 工具。这正是“不重复造轮子”更精确的含义：复用经过验证的认知和结构，不盲目复制技术栈。

### 5. 用双适配器把未知环境变成可测环境

项目使用统一接口连接两种实现：

```text
Tool / AgentLoop
    ↓
SlideToolAdapter / ExcelAdapter / WordAdapter
    ├─ WPS Adapter：真实运行环境
    └─ Browser Adapter：内存 mock 与单元测试
```

这让 AI 可以在浏览器和 CI 中验证工具协议、参数和状态变化，再把少量环境相关风险留给 WPS 真机测试。

本地证据：

- `tmp/wps-ai-plugin-main/shared/agent/`
- `tmp/wps-ai-plugin-main/wps-plugin-excel/src/agent/adapters/`
- `tmp/wps-ai-plugin-main/wps-plugin-ppt/src/agent/adapters/`

### 6. 失败实验纠正“看起来合理”的结论

最值得讲的失败包括：

#### PPT 图表

最初计划通过 WPS PPT 的 Chart API 注入数据，但多图表冲突、数据范围绑定和对象模型差异导致方案不可靠，最终 Phase 07 被明确标记为放弃。

本地证据：`tmp/wps-ai-plugin-main/.planning/phases/07-ppt-charts/07-PLAN.md`

#### Word 段落

`Range.InsertAfter('\r' + text)` 看似符合 VBA 经验，但在目标环境没有创建可被段落集合识别的新段落，导致 Agent 重复调用。实际修复是先 `InsertParagraphAfter()`，再设置新段落文本。

本地证据：`tmp/wps-ai-plugin-main/.planning/phases/09-excel-word-agent/09-LEARNINGS.md`

#### 批量格式化

Prompt 已要求模型批量操作，但模型仍逐段调用。最后把 `paragraphIndex` 从单值改成数组，让能力由工具接口强制提供，而不是依赖模型服从。

这三个例子共同证明：**文档和相邻经验只能生成假设，运行结果才决定能否进入工程资产。**

### 7. 把经验写回下一轮上下文

项目根 `AGENTS.md` 记录了 MsoChart 与 Excel Chart 的区别、Ribbon 新增按钮需要修改的文件、TypeScript `export type` 陷阱等。这些不是通用教程，而是由实际失败提炼出的高价值局部地图。

## 适合现场展示的材料

| 推荐度 | 材料 | 展示目的 |
|:---:|---|---|
| S | Phase 02 的 11 项目对比表 → 三方案表 | 展示“搜得多”如何收敛成“做什么” |
| S | Phase 07 顶部“已放弃”结论 | 证明研究允许否定原计划 |
| S | `09-LEARNINGS.md` 中 Prompt 批量规则失效 | 说明规则应下沉到工具和测试 |
| A | 双适配器架构与对应测试 | 展示如何为 AI 创建反馈回路 |
| A | 项目 `AGENTS.md` 中的 API 陷阱 | 展示经验如何沉淀并影响未来任务 |
| B | 最终插件界面 | 证明结果真实，但不要占用过多时间 |

## 需要进一步核验

- 调研报告中的 GitHub Stars 必须按演讲日期重新查询；
- “WPS Word API 完全无文档”应避免绝对化，改为目标版本下缺少完整、可直接使用的类型声明和文档；
- 如果展示 API 错误，应保留目标 WPS 版本与运行平台；
- 如果声称 AI 完成了某个比例的代码，需要有提交记录或清晰口径，否则只说“AI 深度参与”。
