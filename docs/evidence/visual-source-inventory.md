# 证据切片：精确来源与候选视觉素材清单

## 用途

本清单是从研究底稿到长版演示稿的制作接口。它不替代各个证据切片，而是统一回答三个制作问题：

1. 做这页时应回到哪个原始文件的哪个位置？
2. 哪些素材已经存在，哪些只能由文本或数据重画？
3. 这张画面能证明什么，不能证明什么？

本阶段只建候选池，不按 45 分钟时长删减。

## 状态定义

| 状态 | 含义 | 后续动作 |
|---|---|---|
| `READY-SCREENSHOT` | 已有当次运行截图 | 制作时剪裁、加标注和来源页脚 |
| `READY-CROP` | 可从现有 Markdown、源码或 JSON 精确裁切 | 使用实际文本，不重写成伪截图 |
| `DIAGRAM` | 主要是方法关系，应由已核验数据重画 | 保留数据到图形的对应表 |
| `NEEDS-CAPTURE` | 需要原应用、浏览器或宿主环境的新截图 | 冻结前重跑，失败时使用静态降级 |
| `UNAVAILABLE` | 原始对象未归档 | 不伪造，明确标为历史记录或缺口 |

## 总表

| ID | 第一候选画面 | 状态 | 主体/附录建议 |
|---|---|---|---|
| D01 | “不转”现象被改写成五类信息缺口 | `DIAGRAM` + `READY-SCREENSHOT` | 主体 S |
| D02 | 假设—文档—版本源码—相邻范式—运行实验梯 | `DIAGRAM` + `READY-CROP` | 主体 S |
| D03 | 三条生产路线与一条诊断基线的决策矩阵 | `READY-SCREENSHOT` + `DIAGRAM` | 长版 A，现场可附录 |
| DI01 | Confirmed / Rejected / Unverified 三栏和状态迁移 | `DIAGRAM` + `READY-CROP` | 短案例 A |
| W01 | 11 个参考项目经宿主约束后分为四类可迁移资产 | `READY-CROP` + `DIAGRAM` | 主体 S |
| W02 | Prompt 约束与工具 schema 约束的前后对照 | `READY-CROP` + `DIAGRAM` | 主体 S/A |
| W03 | 相邻 API 假设—WPS 反证—修复—项目规则 | `READY-CROP` + `DIAGRAM` | 主体 A |
| W04 | 候选筛选—Token/Schema—adapter—自动门禁—WPS 真机缺口 | `READY-CROP` + `NEEDS-CAPTURE` | 主体 S |
| V01 | 65 查询—候选—ASR—问题视图，并把缺失原始转写标成断点 | `READY-CROP` + `DIAGRAM` | 主体 S |
| V02 | 412—API—无字幕—音频—抽样 ASR—作者文章回链 | `READY-CROP` + `DIAGRAM` | 主体 S |
| T01 | 问题类型到官方文档/用户/源码/运行/Git/Skill 的路由表 | `READY-CROP` + `DIAGRAM` | 方法论 S |
| T02 | mock 全绿、schema 合法，但真实 JSON 为空分组 | `READY-CROP` + `DIAGRAM` | 验证段 A |
| X01 | README 词汇—源码符号—上游测试—本地事件序列 | `READY-CROP` + `DIAGRAM` | 60 秒迁移证据 A |
| A01 | “提供引用供用户验证”被误升级为“系统已检查引用” | `READY-CROP` + `DIAGRAM` | 审计示例 A |
| P01 | Deck.gl / WPS / 视频的 FULL / PARTIAL / 断点比较 | `READY-CROP` + `DIAGRAM` | 附录 A/B |

## Deck.gl

### D01：失败现象与问题重写

- 原始实验复盘：`/Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md` 第 14–59 行。
- 可直接裁切：第 18–25 行硬约束；第 31–59 行两个竞争假设。
- 已有截图：[`04-baseline-radians.png`](runtime/deckgl/04-baseline-radians.png)。
- 推荐重画：以“对象边界 / 数据语义 / 生命周期 / 版本 / 非功能”为五条分支，不在主图展开 API 答案。
- 证据边界：当前基线页不是已保存的原始生成失败物；只能作为后来构建的对照实验。

### D02：证据升级

- 官方文档索引：复盘第 61–72 行。
- 目标版本 shader 片段：第 74–82 行。
- 旧 uniform 失败、同版本范式与修复：第 84–104 行。
- 运行门禁：第 153–238 行与 [`runtime-report.json`](runtime/deckgl/runtime-report.json)。
- 已有截图：[`03-shader-animation.png`](runtime/deckgl/03-shader-animation.png)。
- 缺失素材：初版 shader linking error 的原始控制台日志未保存，不制作伪终端截图。

### D03：候选路线比较

- 四路线定义：复盘第 106–151 行。
- 共享验收指标：第 153–198 行。
- 最终建议与触发升级条件：第 308–325 行。
- 已有截图：[`01`](runtime/deckgl/01-update-triggers.png)、[`02`](runtime/deckgl/02-transitions.png)、[`03`](runtime/deckgl/03-shader-animation.png)、[`04`](runtime/deckgl/04-baseline-radians.png)。
- 可用数据：报告中约 5.2 秒观测的 submit 计数 315 / 2 / 0，必须标“非性能基准”。

## Dice

### DI01：跨会话调研状态

- 08-31 交接：`/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-08-31-session-retrospective.md` 第 556–592 行。
- 09-01 单角色纵向切片：`2026-09-01-session-retrospective.md` 第 56–80 行；“不重复工作”与风险：第 396–443 行。
- 09-02 评审误报裁决：`2026-09-02-session-retrospective.md` 第 200–212 行；交接：第 628–675 行。
- 推荐重画 1：Confirmed / Rejected / Unverified 三栏，每栏只放一个方法层例子。
- 推荐重画 2：真实 GLB 从未知到试点、已确认，再产生移动端新未知的时间线。
- 缺失素材：本资料库没有对应会话截图；不用游戏画面代替调研状态证据。

## WPS

### W01：参考项目到可迁移资产

- 候选池：`tmp/wps-ai-plugin-main/.planning/tmp-reference-index.md`。
- 宿主约束与排除逻辑：`.planning/phases/02-ppt-design-research/02-FEASIBLE-PLANS.md` 第 1–51 行。
- Content Schema 实现映射：`wps-plugin-ppt/src/agent/tools.ts` 第 234–250、430–446 行。
- Design Token 实现映射：`shared/agent/themes.ts` 第 1–149 行。
- 推荐裁切：可行方案的排除表 + `apply_template` 的 schema + `Theme` 片段。
- 推荐重画：候选项目 → 低成本接入 / 模式翻译 / 只借原则 / 不采用 → 当前文件。
- 缺失素材：没有原始搜索结果页截图和可追溯 Git 历史。

### W02：从 Prompt 约束到工具约束

- 失败记录：`.planning/phases/09-excel-word-agent/09-LEARNINGS.md` 第 50–55、161–165 行。
- 结构修复：`wps-plugin-word/src/agent/tools.ts` 第 180–185 行。
- 推荐裁切：“Prompt 已要求批量，仍逐段调用”的 Learnings 文本与 `getIndices()` 实现。
- 推荐重画：Prompt（意图）→ Schema（可表达能力）→ Executor（强制实施）。
- 证据边界：“60 次”来自历史 Learnings，不是本轮调用日志重放。

### W03：失败路线与项目规则

- 段落插入反证：`09-LEARNINGS.md` 第 43–48、75–80 行。
- 当前修复：`wps-plugin-word/src/agent/adapters/wps-word-adapter.ts` 第 145–160 行。
- PPT 图表放弃路线：`.planning/phases/07-ppt-charts/07-CONTEXT.md`、`07-PLAN.md` 和 `.planning/ROADMAP.md` Phase 07。
- 项目规则：`tmp/wps-ai-plugin-main/AGENTS.md` 中 WPS 插件案例部分。
- 推荐重画：相邻生态经验（候选）→ 目标宿主异常（反证）→ adapter 修复（当前实现）→ Learnings/AGENTS（启动约束）。
- 缺失素材：原始 WPS 真机错误截图与历史 diff 不在归档中。

### W04：模板迁移到运行门禁

- 宿主筛选：`02-FEASIBLE-PLANS.md` 第 1–51 行。
- Theme：`shared/agent/themes.ts` 第 8–149 行。
- SlideSpec：`wps-plugin-ppt/src/agent/slide-tool-adapter.ts` 第 152–310 行。
- 工具到 adapter：`wps-plugin-ppt/src/agent/tools.ts` 中 `apply_template`。
- 当次门禁：[`runtime-report.json`](runtime/wps/runtime-report.json)。
- 推荐裁切：报告中 theme smoke、49/58 项测试和构建结果，与 `wpsHostRun: not-run` 或等价缺口并列。
- 必补截图：若 WPS 案例进入正文，冻结前在目标 WPS 版本中保存一张实际生成结果与版本信息；在此之前不由 mock 截图代替真机证据。

## 视频

### V01：候选池到问题视图

- 查询矩阵：`tmp/docs-ditto/docs/superpowers/plans/2026-08-07-bilibili-ai-game-research.md` 第 75–96 行。
- 筛选标准：同上第 100–113 行。
- 归档自述：`tmp/docs-ditto/docs/research/B站AI游戏开发-总览.md` 第 3–6 行的覆盖量，以及第 95–97 行的“123 个视频口播转写”声明。
- 问题视图：`docs/research/_insights/工作流-洞察.md` 及按工具、引擎、资源组织的其他文件。
- 推荐重画：65 查询 → 约 400 候选 → 元数据筛选 → 音频/ASR → 问题视图 → 外证。
- 必须标注：“约 400”、“123”是原聚合文档记录；旧原始音频和转写不在当前归档。
- 缺失素材：不存在旧批处理的真实候选列表界面、转写目录截图或运行日志。

### V02：单视频恢复链

- 平台、音频和 ASR 指纹：[`manifest.json`](video/BV1DVwLz2EGv/manifest.json) 第 2–64 行。
- 三段抽样及裁决：[`transcript-excerpt.md`](video/BV1DVwLz2EGv/transcript-excerpt.md) 第 5–58 行。
- 候选裁切 1：`pageFetchStatus: 412`、`publicSubtitleCount: 0`、音频时长/哈希和三个抽样时间窗。
- 候选裁切 2：抽样 A 的 `2025 → 2005`，抽样 B 的术语近音错误，抽样 C 的“仅保留为待复核线索”。
- 推荐重画：红色中断节点与降级箭头，而非一条全绿成功流程。
- 缺失素材：原始音频和 ASR JSON 被有意留在 Git 忽略区；演示若要播放音频，必须在本机另行准备并保留授权边界。

## Tabloom

### T01：信息缺口与来源路由

- 来源分类：`/Users/wang/Documents/ChatGPT/chrome-ai-tab-grouper/docs/AGENT-RESEARCH-TRACE.md` 第 29–73 行。
- 关键阶段：阶段 1 第 99 行起，阶段 6 第 237 行起，阶段 7 第 264 行起，阶段 12 第 378 行起，阶段 14 第 426 行起。
- 方法结论：第 562–580 行。
- 推荐裁切：`U / K / D-doc / D-code / D-runtime / D-git / S` 分类表，以及一个平台问题与一个产品问题的对照。
- 推荐重画：问题类型在左，最能直接观测它的信息源在右，禁止画成单一权威排行榜。
- 当次运行记录：[`source-and-runtime-report.json`](runtime/tabloom/source-and-runtime-report.json)。

### T02：真实边界与业务有效性

- 非 Thinking 现象及最终 JSON：`AGENT-RESEARCH-TRACE.md` 第 378–405 行，其中第 395 行记录 `groups: []` 与全部 tab ID 进入 `ungroupedTabIds`。
- 信息获取方法结论：第 572–574 行。
- 推荐裁切：原追踪文档的第 395 行与本切片的四层门禁。
- 推荐重画：传输完整 → 结构合法 → 业务有效 → 人工有用，并在“结构合法”与“业务有效”之间标出本案例失败点。
- 缺失素材：用户当时提供的完整原始 JSON 未单独收录为脱敏附件；只能引用追踪文档的同时期摘要。

## 独立迁移实验

### X01：p-limit 陌生仓库

- 公开契约：`tmp/p-limit/readme.md` 第 88–109 行。
- 状态机：`tmp/p-limit/index.js` 第 19–30、91–104 行。
- 上游断言：`tmp/p-limit/test.js` 第 337–373 行。
- 独立脚本：[`concurrency-change.mjs`](experiments/p-limit/concurrency-change.mjs)。
- 当次结果：[`runtime-report.json`](experiments/p-limit/runtime-report.json)。
- 推荐重画：第一轮自然语言查询产生真实符号，第二轮用 `activeCount / pendingCount / resumeNext` 收窄，最后把控制流转成事件时间线。
- 候选裁切：报告中 active/pending 的 3→2→1 变化，与“上游完整测试未运行”边界并列。

## 审计型切片

### A01：引用存在不等于主张获得完整支持

- 审计记录：[`A01-十项高影响主张引用审计.md`](A01-十项高影响主张引用审计.md) 中 C01 和“本轮实际修订”。
- 原始外部证据：OpenAI Help Center `Deep research in ChatGPT`，冻结前需重开官方页面并保存当日访问记录。
- 推荐画面：左侧原主张“系统检查引用”，中间官方原意“提供引用供用户验证”，右侧降级后表述。
- 证据边界：演示时若展示外部页面，必须是重新打开的官方页，不用自己的摘要伪装成原文。

### P01：证据谱系横向比较

- 原始结构：[`P01-三条主张的证据谱系审计.md`](P01-三条主张的证据谱系审计.md) 中“横向结论”表。
- 源节点：Deck.gl 复盘第 29–104 行；WPS `02-FEASIBLE-PLANS.md` 第 12–15、43–45、92 行；视频计划第 75–113 行与总览第 95–97 行。
- 推荐重画：三列对照，只放“来源可定位 / 转换可解释 / 当前可重跑 / 关键断点”。
- 用法：它不是第四个案例，而是说明为什么三个案例需要使用不同强度的表述。

## 演示制作前的捕获队列

### P0：必须捕获

1. **WPS 真机结果**：当前 W04 只到 mock 与构建，WPS 是主案例，不宜缺最终宿主画面。
2. **A01 官方原页快照**：如果决定现场做引用降级示例，需要冻结日的官方原文、访问日期与离线降级图。

### P1：推荐捕获

1. **WPS 失败与修正的可见对照**：若原项目仍可重现，录制一个小片段；不可重现就使用 Learnings + 当前 adapter 的静态取证。
2. **单视频音频/ASR 对照**：若授权和现场环境允许，只播放一个很短的术语识别错误片段；否则使用 manifest 与抽样审计。
3. **Tabloom 结构合法但无用的脱敏 JSON**：若原输出仍可找回，只保留假 tab ID 和组摘要。

### P2：可由已有材料重画

- D01/D02 问题树与证据梯；
- D03 候选路线矩阵；
- DI01 三栏状态与状态转换；
- W01 迁移资产分类；
- W02 从 Prompt 到 schema 的责任下沉；
- W03 负知识阶梯；
- V01 视频批处理与原始链断点；
- V02 带失败分支的降级链；
- T01 信息源路由；
- T02 四层 AI 结果门禁；
- X01 查询演化和事件序列；
- A01 引用降级；
- P01 证据完整度比较。

## 制作规则

1. 截图必须保留来源、日期或版本，不把手工重打的文本冒充原始截图。
2. 运行截图与运行报告成对使用：截图负责可见性，JSON 负责精确数值与失败列表。
3. 方法图是证据的重组，必须能返查到本清单的原始节点。
4. `UNAVAILABLE` 不是待美化状态，而是不可越过的引用边界。
5. 主体页的具体 API、游戏业务和完整测试数量优先移到讲者备注或附录，但不从证据库删除。
