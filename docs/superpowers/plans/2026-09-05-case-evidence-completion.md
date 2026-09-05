# Three Case Evidence Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 依次完成陌生仓库迁移实验、单视频原始链补证和 WPS 参考到运行证据链。

**Architecture:** 三个阶段各自产生独立 evidence slice、原始或机器可读证据、证据边界和导航更新。所有外部仓库、媒体及依赖只放入已忽略的 `tmp/`，正式资料只保存必要的小型日志、脚本、哈希、截图和 Markdown；每阶段验证后单独提交。

**Tech Stack:** Git、Markdown、shell、Node.js、目标仓库原生测试工具、可用的视频下载/转写工具、WPS 项目现有 pnpm/Vitest/浏览器测试设施。

**Spec:** `docs/00-研究计划.md`、`docs/24-调研可复现性与证据谱系.md`、`docs/templates/evidence-lineage.md`

## Global Constraints

- 严格按任务 1→2→3 执行，不并行跳步。
- `tmp/` 中外部材料只读；实验脚本与结果写到本仓库 `docs/evidence/`。
- 事实、推断和未验证项分开；不能恢复的原始材料不得写成已验证。
- 新增媒体、依赖、缓存或超过 10 MiB 的文件不得提交，除非明确判断为必要演示资产。
- 不泄露转写服务凭据、浏览器凭据、个人令牌或机器配置秘密。
- 每阶段结束运行与风险相称的验证，并更新 evidence index、claim ledger 或 gap matrix。

---

### Task 1: 陌生仓库迁移实验

**Files:**
- Create: `tmp/p-limit/`（外部仓库，不提交）
- Create: `docs/evidence/experiments/p-limit/concurrency-change.mjs`
- Create: `docs/evidence/experiments/p-limit/runtime-report.json`
- Create: `docs/evidence/X01-p-limit陌生仓库迁移实验.md`
- Modify: `docs/evidence/README.md`
- Modify: `docs/sources/claim-ledger.md`
- Modify: `docs/sources/gap-matrix.md`

**Interfaces:**
- Consumes: `docs/templates/evidence-lineage.md` 六节点格式。
- Produces: 精确版本、搜索日志、源码/测试位置、运行事件序列和迁移实验复盘。

- [x] **Step 1: 固定 Research Brief 与版本**

研究问题固定为：“`p-limit` 运行中把 `limit.concurrency` 调低到当前 `activeCount` 以下时，已经运行的任务是否取消，新任务何时继续启动？”记录候选答案、排除范围、所需证据和停止条件；clone 后保存 commit SHA、许可证和 package version。

- [x] **Step 2: 先做地图与第一轮定位**

只读取目录、README、`package.json`、入口和测试布局；保存实际使用的 `rg` 查询、命中数、候选文件及错误跳转，不先阅读全文。

- [x] **Step 3: 用第一轮真实词汇进行第二轮检索**

沿 `concurrency` setter、`activeCount`、`pendingCount`、queue resume 和相应测试定位实现；记录新符号怎样改变查询，并把“文档承诺、源码行为、测试覆盖”分开。

- [x] **Step 4: 编写最小运行实验**

脚本创建受控 deferred tasks，初始并发设为 3，三个任务启动后降为 1，逐个释放活跃任务；JSON 记录 `start/end` 顺序、每一步 `activeCount/pendingCount/concurrency`，并断言活跃任务未被取消且队列只在活跃数回落后继续。

- [x] **Step 5: 运行原仓测试与最小实验**

使用仓库声明的 package manager 安装和执行相关测试；再运行 `concurrency-change.mjs`。若安装或全量测试不可行，保存失败原因并至少执行独立实验，不能把静态阅读写成运行事实。

- [x] **Step 6: 写证据切片并审计**

在 X01 中记录六节点谱系、两轮查询、源码/测试精确位置、commit、文件哈希、JSON 结果、错误路径、人工判断和证据上限。更新导航与缺口矩阵。

- [x] **Step 7: 验证并提交**

运行 JSON 解析、脚本断言、链接/路径检查和 `git diff`/`git diff --check`；确认没有提交 `tmp/p-limit` 或依赖目录后提交本阶段。

### Task 2: 单视频原始链补证

**Files:**
- Create: `tmp/video-evidence/BV1DVwLz2EGv/`（下载/转写临时材料，不提交）
- Create: `docs/evidence/V02-BV1DVwLz2EGv单视频原始链.md`
- Create: `docs/evidence/video/BV1DVwLz2EGv/manifest.json`
- Create when small and lawful: `docs/evidence/video/BV1DVwLz2EGv/transcript-excerpt.md`
- Modify: `docs/evidence/V01-视频从候选到外证回链.md`
- Modify: `docs/evidence/README.md`
- Modify: `docs/sources/gap-matrix.md`

**Interfaces:**
- Consumes: B 站 BV 标识、现有下载/ASR Skill 与作者文章。
- Produces: 获取尝试日志、媒体元数据、哈希、转写来源、时间戳抽样和外部回链裁决。

- [x] **Step 1: 审计可用工具与公开资源**

检查 `yt-dlp`/`ffmpeg`、视频页面、公开字幕、作者文章和现有脚本；只读取凭据是否存在，不输出其值。先尝试公开字幕或平台元数据，再考虑下载音频。

- [x] **Step 2: 获取一个合法的最小原始样本**

将媒体放入 `tmp/video-evidence/`；记录 URL、BV、标题、作者、发布日期、获取时间、工具版本、媒体哈希和实际命令。若平台阻止获取，保存 HTTP/工具错误并停止重复尝试。

- [x] **Step 3: 生成或恢复带时间戳转写**

优先使用公开字幕；否则在已有授权和本机可用服务下运行项目 ASR 流程。不得在仓库写入密钥。保留原始转写于 `tmp/`，正式仓库仅保存短小、必要、可合理引用的片段及哈希。

- [x] **Step 4: 抽样回听与外证回链**

至少抽查开头、核心工作流段和结尾三个片段，记录时间戳、ASR 文本、人工修正及是否被作者文章支持。数字、产品名和逐字引语单独核验。

- [x] **Step 5: 裁决完整度并写 V02**

若链完整，明确哪些主张可升级；若仍失败，把每个失败点、已完成动作和可安全展示内容写成证据断链案例。更新 V01、manifest、导航和缺口矩阵。

- [x] **Step 6: 验证并提交**

校验 manifest JSON、哈希、URL、时间戳格式、版权边界和文件大小；确保未提交整段音视频、凭据或大文件后提交本阶段。

### Task 3: WPS 参考到运行证据链

**Files:**
- Create: `docs/evidence/W04-WPS模板迁移到运行门禁.md`
- Create: `docs/evidence/runtime/wps/`（仅小型日志/JSON/截图）
- Create when needed: `docs/evidence/scripts/wps_template_capture.*`
- Modify: `docs/evidence/W01-WPS参考项目到可迁移资产.md`
- Modify: `docs/evidence/README.md`
- Modify: `docs/sources/gap-matrix.md`

**Interfaces:**
- Consumes: Phase 02 筛选文档、`themes.ts`、`apply_template` schema/adapter、现有测试和构建命令。
- Produces: “外部模式→筛选→代码→自动测试→目标宿主边界”的单路线证据。

- [x] **Step 1: 选择最小纵向切片并建立映射**

以 `Design Token/Content Schema → themeToPrompt/apply_template → adapter` 为主线，列出研究文档、代码、测试和运行入口的精确位置；不扩大到整个插件。

- [x] **Step 2: 审计依赖与现有测试能力**

读取 workspace package 配置、锁文件和相关测试，确认当前可运行的 Node/pnpm 版本及是否已有浏览器 mock。先运行最窄测试，再决定是否安装依赖或补脚本。

- [x] **Step 3: 执行结构、单元与构建门禁**

验证 `apply_template` schema、参数容错、adapter 调用和主题文本输出；运行目标包类型检查/测试/构建。保存命令、退出码、测试数和失败日志摘要。

- [x] **Step 4: 尝试目标运行环境取证**

若当前机器可启动 WPS 且已有安全的演示文档，执行一次模板生成并保存截图/文档结果；若无法自动操作或缺 WPS 运行入口，明确记录“自动测试已完成、真机未验证”，不得用 mock 代替真机事实。

- [x] **Step 5: 写 W04 并回填 W01**

用六节点谱系写清外部参考如何改变代码、哪些门禁已通过、视觉/WPS 兼容性仍由什么证据裁决。把具体 API 和长日志留在附录。

- [x] **Step 6: 最终验证并提交**

检查运行产物、文档链接、事实措辞、文件大小和 `git diff --check`；运行可重复命令后提交，并在研究计划中标记 1–3 的真实完成状态。
