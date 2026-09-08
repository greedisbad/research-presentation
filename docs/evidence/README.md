# 演示证据切片索引

证据切片不是案例摘要，而是能够支持一个具体演讲主张的最小证据组合。制作演示时先从这里选切片，再按记录的位置回读原文件；不把本目录当成原始证据的替代品。

统一的原始位置、候选截图/重画素材、缺口和捕获优先级见 [`visual-source-inventory.md`](visual-source-inventory.md)。

统一的 S/A/B/D 裁决、重复观点簇和主/辅证据归属见 [`priority-and-overlap-audit.md`](priority-and-overlap-audit.md)。

5 个 S 级切片逐句能说到什么强度、哪些表述必须降级，见 [`S-level-claim-audit-2026-09-08.md`](S-level-claim-audit-2026-09-08.md)。

产品能力、官方链接、目标版本、依赖、许可证与动态数字的冻结日检查见 [`../sources/volatile-fact-check-2026-09-08.md`](../sources/volatile-fact-check-2026-09-08.md)。

## 当前切片

| ID | 案例 | 支持的演讲主张 | 完整度 | 上台推荐度 |
|---|---|---|:---:|:---:|
| D01 | Deck.gl | 失败现象应先重写为可证伪的信息缺口 | 较完整 | S |
| D02 | Deck.gl | 文档、同版本源码、相邻实现与运行实验各自回答不同问题 | 较完整 | S |
| D03 | Deck.gl | 多条可行路线应在共享约束与门禁中比较，再结合当前架构决策 | 完整 | B |
| DI01 | Dice | 用已确认、已排除与待验证保存调研状态，并转换为下一个 Agent 的任务 brief | 较完整 | A |
| W01 | WPS | 开源参考的价值在于拆成可迁移资产，而不是整仓照搬 | 较完整 | A |
| W02 | WPS | 提示词约束失败时，应把规则下沉到工具接口 | 较完整 | A |
| W03 | WPS | 失败路线和运行时反证也应成为可复用知识 | 较完整 | B |
| W04 | WPS | 搜索结果需经宿主约束筛选，并沉淀为协议、实现和分层门禁 | 较完整 | S |
| V01 | B 站视频 | 视频要经过发现、转写、主题重组和外证回链才能成为技术资料 | 部分完整 | A |
| V02 | B 站单视频 | 网页失败后可经 API、音频、本地 ASR 与作者文章恢复部分证据链 | 较完整 | S |
| A01 | 全资料库 | 带链接不等于主张获得完整支持，审计会直接改变表述 | 完整 | B |
| P01 | Deck.gl / WPS / 视频 | 谱系审计能区分完整闭环、历史缺口与原始链断裂 | 完整 | B |
| X01 | p-limit | 陌生仓库可由地图、迭代检索和最小实验收敛为可核验结论 | 完整 | A |
| T01 | Tabloom | 先把决策拆成信息缺口，再把问题路由到匹配证据源 | 较完整 | S |
| T02 | Tabloom | mock 与结构校验通过不等于真实模型结果具有业务价值 | 较完整 | B |

## 可重复运行的证据

- Deck.gl：[`scripts/deckgl_runtime_capture.py`](scripts/deckgl_runtime_capture.py) 重跑四个浏览器实验；[`runtime/deckgl/runtime-report.json`](runtime/deckgl/runtime-report.json) 与同目录截图记录 2026-09-05 的一次通过结果。
- WPS：[`runtime/wps/runtime-report.json`](runtime/wps/runtime-report.json) 保存源码指纹、主题 smoke、测试/构建结果和未执行的真机边界。
- WPS 真机：[`runtime/wps/true-host-capture-protocol.md`](runtime/wps/true-host-capture-protocol.md) 记录已探测宿主版本、固定输入、隐私边界、截图清单和升级门禁。
- Tabloom：[`runtime/tabloom/source-and-runtime-report.json`](runtime/tabloom/source-and-runtime-report.json) 保存本地原始材料指纹，以及默认旧 Node 失败、Node 24 下 37 项测试和扩展验证通过的结果。
- 运行快照只证明当次目标环境结果；脚本、指标和错误列表一并保留，便于演示前重新采集，而不是把截图当永久事实。

## 完整度定义

- **完整**：问题、原始证据、转化、当前可重复验证和边界齐全。
- **较完整**：源码/文档证据齐全，但缺原始会话、目标应用真机或版本历史的一部分。
- **部分完整**：聚合产物存在，但原始响应、音频或逐字转写缺失；只能展示流程，不能引用为完全闭合证据。

## 进入演示前的门禁

每个被选中的切片至少准备：

1. 一张“问题或失败现象”；
2. 一张“原始证据或代码位置”；
3. 一张“验证结果或工程变化”；
4. 一句可迁移方法；
5. 一条明确的证据边界。
