# WPS AI 插件：同题重搜对照实验

**检索日期：**2026-09-23

**实验问题：**如果今天从零开始，仍要在 WPS 文字、表格、演示中提供能读取并修改当前文档的 AI Agent，重新搜索开源参考项目，能否找到比旧候选池更贴题的项目？

## 结论

**能。**本轮至少找到两个直接面向 WPS 文字、表格、演示，且公开了 Agent 工具调用与文档操作代码的项目：[WPS-AI（灵犀AI）](https://github.com/lewis-hui1202/WPS-AI)和 [OpenCode WPS](https://github.com/lnxsun/opencode-wps)。其中 WPS-AI 与原需求的重合度最高：它在 WPS 的三个目标宿主内运行，公开的工具注册表和三个宿主工具文件可以直接研究“模型如何调用工具、工具如何落到 WPS 对象”。[项目说明](https://github.com/lewis-hui1202/WPS-AI)、[工具注册表源码](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/tools/registry.js)。

这回答的是**今天重新检索的结果**。它不能证明这些项目在 2026-05-26 的旧调研时已经存在或已达到今天的状态，也不能证明将其中任何一个仓库复制过来就能在原项目的目标版本中可靠运行。

## 对照口径

旧报告的 [11 项候选](../tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-RESEARCH.md) 是 **PPT 美化方案**调研，不是所有 WPS 插件项目的穷尽清单。其价值集中在 Agent 组织、内容 Schema、PPTX 生成、主题和布局；对于“WPS 三宿主中直接操作当前文档”的问题，匹配度天然较低。这里比较的是**对原需求的参考价值**，不是仓库的综合质量、受欢迎程度或代码成熟度。

本轮采用四个筛选条件：

1. **宿主吻合：**确实以 WPS 桌面加载项为目标，而非只处理 `.docx/.xlsx/.pptx` 文件。
2. **任务吻合：**AI 能通过工具读取或修改文档对象，而非仅在侧栏聊天。
3. **覆盖吻合：**优先覆盖文字、表格、演示三个宿主；单宿主项目仍可作为局部参考。
4. **证据可查：**能定位到仓库代码、工具定义、兼容限制或目标环境实验；README 的功能声明不等于本次亲自运行通过。

检索从 `WPS AI addin / WPS Office agent / WPS JSAPI tool calling / WPS MCP` 等词组出发，再用仓库主页、源码文件和项目自己的兼容记录复核。本次没有安装或运行这些候选，也没有对原插件做改动。

| 检索入口 | 本轮实际使用的查询示例 | 用途 |
|---|---|---|
| 网页与 GitHub 仓库 | `GitHub WPS Office add-in AI agent wpsjs word excel ppt open source` | 寻找直接同题的三宿主插件 |
| 网页与 GitHub 仓库 | `WPS 开放平台 JSAPI AI 智能体 插件 开源 GitHub` | 补中文项目与 WPS 专用术语 |
| 网页与 GitHub 仓库 | `site:github.com WPS Office AI assistant addin Word Excel PPT tool calling open source 2026` | 复核是否存在工具调用型加载项 |
| 网页与 GitHub 仓库 | `site:github.com WPS Office MCP server addin 2025 2026` | 查找外部 Agent 连接 WPS 的实现 |
| 相邻生态 | `GitHub office addin AI agent edit document tools Word Excel PowerPoint open source` | 仅补三宿主架构参考，单独标明非 WPS |

搜索结果中还出现直接生成 Office 文件的 CLI、OOXML 库和 HTML 演示项目；它们没有以 WPS 中的当前文档为操作对象，因此未进入“直接同题项目”的计数。此表记录关键查询与筛选逻辑，不声称穷尽 GitHub 项目。

## 新候选与旧候选相比

| 候选 | 与原需求的重合 | 这次实际核对到的参考价值 | 证据边界 | 判断 |
|---|---|---|---|---|
| [WPS-AI（灵犀AI）](https://github.com/lewis-hui1202/WPS-AI) | **WPS 文字、表格、演示；Agent 工具调用；读写文档** | 项目说明给出三宿主共用 TaskPane、JSAPI 桥、工具注册表、模型调用循环；仓库中确有 [注册表](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/tools/registry.js)及 [文字](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/tools/writer.js)、[表格](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/tools/spreadsheet.js)、[演示](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/tools/presentation.js)的工具实现。 | 源码存在且结构可查；README 所列跨平台能力未经本次运行验证。项目也列出特定 WPS 版本兼容问题。 | **最直接的整体参考对象** |
| [OpenCode WPS](https://github.com/lnxsun/opencode-wps) | **WPS 文字、表格、演示；AI 调用工具修改文档** | 仓库公开 WPS 插件、MCP 工具服务器和平台桥接的分层结构；能对照研究“外部 Agent → MCP → WPS”的另一条实现路径。[项目架构与安装说明](https://github.com/lnxsun/opencode-wps#readme) | 主要依据项目说明与仓库目录，工具数量、跨平台完整性没有独立实测；Windows 是侧栏，macOS/Linux 说明为浏览器对话加轮询桥，交互形态不同。 | **第二个直接同题项目** |
| [WordAgent](https://github.com/visresearch/WordAgent) | **WPS 文字；Agent 定位、读取、编辑段落** | 项目给出 `search_document → read_document → edit/delete/generate` 的段落操作链，以及内容与样式分离的结构表示，可参考“编辑已有文档”的工具语义。[项目说明](https://github.com/visresearch/WordAgent#readme) | 只覆盖 Word 方向；项目列明 WPS 支持版本与平台，不能据此推断 Excel/PPT 或所有 WPS 版本可用。 | **Word 局部参考强** |
| [Pi for Excel 的 WPS 分支](https://github.com/anhquan1301/AI-for-excel) | **WPS 表格；部分 Agent 工具已移植** | [WPS 支持记录](https://github.com/anhquan1301/AI-for-excel/blob/main/docs/wps-support.md)逐项标注 `read_range`、`write_cells` 等工具的实现范围，并记录 WPS 版本、架构、Ribbon 加载失败、最小复现与后续复测。它对“相邻 Office API 不能直接当 WPS 事实”的演讲论点尤其有价值。 | 这是 Excel 项目的分支；文档明确说 WPS 工具只是部分实现，完整侧栏到模型工具的产品级证明仍有边界。不能写成“三宿主已验证”。 | **Excel 与失败证据强** |
| [Office Agents](https://github.com/hewliyang/office-agents) | Microsoft Office 的 Word、Excel、PowerPoint Agent 加载项 | 把 Agent SDK、界面、宿主工具和实时调试桥拆成独立包，便于比较三宿主工具协议如何组织。[项目说明](https://github.com/hewliyang/office-agents#readme) | 使用 Office.js，项目自己也声明不是生产就绪；**不能**拿其中 API 行为证明 WPS。 | **架构参考，非 WPS 运行证据** |
| [office-kit/pptx](https://github.com/office-kit/pptx) | 浏览器或 Node 中读取、编辑、保存 PPTX 文件 | 相比旧清单中主要“从零生成 PPTX”的 PptxGenJS，它明确支持读取现有 PPTX、修改后保存；可用于比较“文件编辑”与“WPS 当前演示对象编辑”的边界。[能力范围](https://github.com/office-kit/pptx#scope) | 不是 WPS 加载项；项目标注 0.x、API 尚未冻结；不等于可在 WPS 内直接操作当前演示。 | **PPT 文件路线的补充** |

### 为什么 WPS-AI 比旧清单更有参考价值

旧 PPT 候选池中的 [PPTAgent](https://github.com/icip-cas/PPTAgent)、[PptxGenJS](https://github.com/gitbrent/PptxGenJS) 等项目回答的是“怎样规划或生成幻灯片”；原项目另行参考的 [PageAgent](https://github.com/alibaba/page-agent)回答的是浏览器任务循环和工具调用。WPS-AI 则把这几类问题放进了**同一个 WPS 加载项场景**：宿主识别、当前文档读写、工具参数、Agent 循环和侧栏交互都有可查的对应位置。[WPS-AI 项目结构](https://github.com/lewis-hui1202/WPS-AI#readme)、[WPS 桥接源码](https://github.com/lewis-hui1202/WPS-AI/blob/main/plugin/js/wps.js)。

这不意味着旧参考失去价值。PageAgent 仍可能是理解 Agent Loop 的好材料；PPTAgent、设计 Skill 仍可能提供内容协议与布局思路。**变化是：今天已经可以先研究直接同题的 WPS 插件，再用相邻项目补它没有解决的局部问题。**

### 最有用的反例：Pi for Excel 的 WPS 记录

这份记录并未简单宣称“支持 WPS”。它把 WPS 表格工具分成已实现与明确不支持的部分，写出 `write_cells` 的回读校验，同时公开某些 WPS 安装环境中 Ribbon 按钮不触发的失败。随后用官方样例和不同架构的 WPS 构建做隔离复测。这里的事实范围是**该仓库所记录的特定构建与测试环境**，而不是所有 WPS 用户的通用规律。[工具支持矩阵与实验记录](https://github.com/anhquan1301/AI-for-excel/blob/main/docs/wps-support.md)。

## 实验结论如何用于演讲

原叙述“当时没有找到特别贴切、可以直接搬过来的答案”可以保留为**当时的经历**，但需要带时间限定。若将其说成“现在仍找不到 WPS AI 插件开源项目”，本轮检索已经提供反例。更准确的对照说法是：

> 几个月前我的候选池主要来自相邻生态，尤其是 PPT 生成与设计项目。这次按同一需求重搜，已经能找到直接面向 WPS 文字、表格、演示的 AI 插件。检索能力和可见的项目生态都可能变化；即使有同题项目，仍要核对版本、宿主行为和实际运行结果。

这轮实验最适合支持两条结论：**第一，今天确实能搜到更贴题的“巨人”；第二，仓库名称与功能声明仍不能代替目标环境的运行验证。**

## 未验证事项

- 本次未安装候选、未做 WPS 真机操作，因此不评价视觉效果、稳定性或最终可用性。
- 未核定每个候选在 2026-05-26 的公开状态，因此不以今天的结果倒推旧检索一定遗漏。
- GitHub 页面与 README 会继续变化；演讲引用时以本页访问日期为准，展示前应复核项目入口和关键限制。

**本地对照材料：**[旧 PPT 候选报告](../tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-RESEARCH.md)、[原案例总结](02-案例-WPS插件.md)、[参考资产到代码的映射](02A-WPS参考到代码映射.md)。
