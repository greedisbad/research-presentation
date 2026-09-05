# 书签与来源评分

评分说明：S＝核心证据，A＝推荐，B＝备选，C＝背景，D＝不采用。

## 第一轮权威来源

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [Douglas Engelbart：Augmenting Human Intellect](https://www.dougengelbart.org/content/view/138/) | 原始研究报告 | 把人、工具、方法和训练视为共同的智力增强系统 | 演讲最高层理论依据，不当作现代 AI 效率证明 |
| A | [Vannevar Bush：As We May Think](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/) | 经典原文 | 用 associative trails 保存可重走、可共享的知识路径 | 开场或结尾点题 |
| S | [Kitchenham 等：Evidence-Based Software Engineering](https://www.st.cs.uni-saarland.de/edu/empirical-se/2006/PDFs/kitchenham04_.pdf) | ICSE 原论文 | 软件工程决策也需要把最佳证据与具体情境结合 | 支撑“从决策问题出发” |
| S | [Kitchenham & Charters：SLR Guidelines](https://www.cin.ufpe.br/~in1037/leitura/kitchenham2007guidelines.pdf) | 技术报告 | 预先定义问题、协议、筛选和质量评价，形成可审计研究 | 借用原则，不声称完成系统综述 |
| S | [S. Keshav：How to Read a Paper](https://cs.uwaterloo.ca/~Brecht/courses/856/readings/how-to-read/keshav-paper-reading.pdf) | 作者方法论文 | 三遍阅读按相关性、理解和复现逐步增加成本 | 转成 AI 分层阅读协议 |
| S | [Wineburg & McGrew：Lateral Reading](https://papers.ssrn.com/sol3/Delivery.cfm/SSRN_ID3701739_code2785140.pdf?abstractid=3048994&mirid=1) | 原始观察研究 | 专业事实核查者会离开原站调查发布者与外部评价 | 来源筛选核心研究 |
| A | [Mike Caulfield：SIFT](https://hapgood.us/2019/06/19/sift-the-four-moves/) | 实践方法 | Stop、调查来源、找更好覆盖、追到原始语境 | 便于听众记忆的操作口诀 |
| A | [Wilson 等：Best Practices for Scientific Computing](https://doi.org/10.1371/JOURNAL.PBIO.1001745) | 同行评审论文 | 自动化重复工作、保存命令、小步修改、版本控制与测试 | 支撑可复跑的研究管线 |
| S | [OpenAI：Deep research in ChatGPT](https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt) | 官方产品文档 | 深度研究包含目标描述、来源选择、计划、多步执行、结构化报告和可核验引用 | 用于定义“Agentic Research”与普通搜索的差异 |
| S | [GitHub：Finding and understanding example code](https://docs.github.com/en/get-started/learning-to-code/finding-and-understanding-example-code) | 官方技术文档 | 先读仓库结构，再用 `repo:` 和独特字符串定位具体实现 | 用于源码调研实操页 |
| S | [Wohlin：Guidelines for Snowballing in Systematic Literature Studies](https://www.wohlin.eu/ease14.pdf) | 软件工程论文 | 从种子材料做向后引用和向前引用扩展，可形成系统化搜索过程 | 将学术 snowballing 转译成“从种子项目扩展技术生态” |
| A | [Lewis et al.：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) | 原始论文 | 参数化模型在知识访问、来源追溯和更新方面有限；外部检索可补足 | 用于解释为什么不能只信模型记忆 |
| A | [Google：Learn about NotebookLM](https://support.google.com/notebooklm/answer/16164461) | 官方产品文档 | 基于用户提供来源回答并给出行内引用；支持网页、PDF、视频、音频等来源 | 用于说明“先建语料库，再基于来源提问” |
| A | [Google：Add or discover new sources for NotebookLM](https://support.google.com/notebooklm/answer/16215270) | 官方产品文档 | YouTube 仅导入字幕文本；本地音频会被转写；不同来源有明确限制 | 与 B 站自建下载+ASR 流程做对照 |
| S | [WPS：加载项概述](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/wps-integration-mode/wps-addin-development/addin-overview) | 官方技术文档 | WPS 加载项本质是网页，并通过 JavaScript 与文档交互 | 用于验证 WPS 案例的总体技术模型 |
| S | [WPS：加载项开发说明](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/wps-integration-mode/wps-addin-development/wps-addin-development-instructions) | 官方技术文档 | `ribbon.xml`、网页逻辑、`window.wps` API 与调试方式 | 对照项目中的 Ribbon 踩坑与修复 |
| A | [WPS：Application 对象](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/jsapi/addin-api/Application/obj) | 官方 API 文档 | `Application`/`wps` 是根对象，提供任务窗格和对话框等能力 | 用于 API 证据卡和案例核验 |

## 第二轮：AI 研究系统与工程实践

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [Anthropic：How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | 官方工程复盘 | 主代理规划，子代理独立搜索，动态补充研究，CitationAgent 对齐引用；并披露成本与不适用场景 | 作为“真正的 AI 研究流水线”架构案例 |
| S | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 官方工程复盘 | 用高信号地图、按需检索和结构化笔记管理有限上下文 | 支撑“摘要是地图，原文按需回读” |
| S | [Anthropic：Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方跨客户总结 | 从简单可组合模式开始，按任务确定性选择 workflow 或 agent | 支撑轻量 Agent 五文件协议 |
| S | [Anthropic：Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) | 官方工程指南 | 推荐 Explore → Plan → Code → Commit；先读文件和 URL，明确要求暂不写代码 | 与本项目的“先调研后动手”形成直接对应 |
| S | [OpenAI：Harness engineering](https://openai.com/index/harness-engineering/) | 官方工程复盘 | 仓库内知识、可执行反馈与架构约束决定 Agent 能否可靠工作；应提供地图而非巨型说明书 | 支持“调研结果要沉淀进仓库” |
| S | [OpenAI：Sora Android in 28 days](https://openai.com/index/shipping-sora-for-android-with-codex/) | 官方工程复盘 | Agent 用于理解代码、规划和实现，但基础架构、关键权衡与最终评审仍由人负责 | 用于解释人机责任边界 |
| S | [Spotify：1,500+ PRs with a background coding agent](https://www.engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1) | 企业工程复盘 | 从确定性迁移脚本转为基于上下文的 Agent；交互 Agent 先收集任务信息，再交给编码 Agent | 大规模“理解后修改”案例 |
| A | [Spotify：Dataset migrations with Honk](https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4) | 企业工程复盘 | 先通过 lineage 与 code search 识别范围，再让 Agent 迁移，并把人工判断边界写入细粒度指令 | 展示“搜索范围就是实施范围”的案例 |
| S | [Google Research：Empirical Research Assistance](https://research.google/blog/empirical-research-assistance-era-from-nature-publication-to-catalyzing-computational-discovery/) | 官方研究系统 | 给定科学问题和成功度量后，系统搜索文献、写代码、组合技术并评价结果 | 最贴近“先找资料，再动手验证”的高级案例 |
| A | [Google DeepMind：AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) | 官方研究系统 | LLM 生成候选代码，自动 evaluator 运行评分，优秀候选进入下一轮 | 支持“自动化必须绑定可量化评价” |
| A | [Google Research：DS-STAR](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/) | 官方研究系统 | 先检查目录与数据文件形成摘要，再循环进行规划、编码和验证 | 数据分析领域的“先理解材料再执行”案例 |
| A | [GitHub：Secret Protection with Copilot](https://github.blog/ai-and-ml/github-copilot/how-we-accelerated-secret-protection-engineering-with-copilot/) | 官方工程案例 | 人先完成研究和规划，再由 coding agent 转成可评审 PR | 可作为短例子，不必展开 |

## 第三轮：验证、检索与反例

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [Gao et al.：Enabling LLMs to Generate Text with Citations](https://aclanthology.org/2023.emnlp-main.398/) | EMNLP 原始论文 | 回答正确、引用正确、引用完整是不同评价维度；有引用不等于所有陈述有支持 | 反幻觉页核心证据 |
| S | [Google DeepMind：Long-form factuality / SAFE](https://deepmind.google/research/publications/85420/) | 原始研究 | 把长回答拆成原子事实，再逐项搜索与判断支持关系 | 直接转化成演示中的验证流程 |
| S | [Google DeepMind：FACTS Grounding](https://deepmind.google/blog/facts-grounding-a-new-benchmark-for-evaluating-the-factuality-of-large-language-models/) | 原始研究与 benchmark | 评价回答是否忠实于给定来源，并避免超出资料编造 | 支持 source-grounded 概念 |
| S | [NIST：Generative AI Profile, AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | 政府风险框架 | 持续核验来源、引用、RAG 数据与输出 grounding | 将验证从个人习惯提升为治理要求 |
| S | [METR：Experienced Open-Source Developer Productivity](https://metr.org/Early_2025_AI_Experienced_OS_Devs_Study-paper.pdf) | 随机对照研究 | 在特定人群、工具和任务条件下，AI 可能使开发者变慢 | 打破“AI 必然提效”的核心反例 |
| S | [DORA：State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/) | 行业研究 | AI 更像组织能力放大器，底层系统决定收益 | 用于总结“先改善环境，再谈 Agent” |
| S | [Wineburg & McGrew：Lateral Reading](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3048994) | 原始研究 | 专业事实核查者跨站检查来源背景，而不是只在原网页内深读 | 来源鉴别实操方法 |
| A | [Azad & Deepak：Query Expansion survey](https://arxiv.org/abs/1708.00247) | 信息检索综述 | 多查询和相关词扩展可缓解词汇不匹配，但也可能引入噪声 | 为“关键词矩阵”提供理论支撑 |
| A | [DeepResearch Bench](https://arxiv.org/abs/2506.11763) | Benchmark 论文 | 深度研究需分别评价报告质量、检索有效性和引用可信度 | 用于设计自己的研究验收表 |
| A | [OpenScholar, Nature](https://www.nature.com/articles/s41586-025-10072-4) | 同行评审原始研究 | 专用语料、检索、重排和自反馈可提高多论文综合质量与引用准确性 | 说明“通用聊天”与“研究系统”的差别 |

## 可作为扩展阅读的工具化案例

| 等级 | 来源 | 价值 | 注意事项 |
|:---:|---|---|---|
| A | [Elicit Systematic Review](https://elicit.com/blog/systematic-review/) | 把搜索、纳排筛选、全文提取和报告拆成透明步骤，并提供支持原文 | 厂商自述效果数字需独立验证 |
| A | [PaperQA2](https://arxiv.org/abs/2409.13740) | 文献搜索、证据收集、引用遍历和回答生成形成 Agent 流程 | 聚焦科学论文，不等同一般 Web 技术调研 |
| A | [Stanford STORM](https://github.com/stanford-oval/storm) | 用多视角提问先构建大纲，再生成带引用长文 | 更适合材料组织，而非最终事实裁决 |
| B | [Deep Research Bench: Evaluating AI Web Research Agents](https://arxiv.org/abs/2506.06287) | 提供多个商业研究产品的统一评价框架 | 产品版本变化快，演示时不展示静态排行榜 |

## 开源参考、许可证与供应链

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [GitHub：Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) | 官方文档 | 公开仓库无许可证时仍适用默认版权，查看/fork 不等于获得复制和分发许可 | 反驳“GitHub 上的代码都能直接用” |
| S | [GitHub：Code Search syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax) | 官方文档 | 可用 repo/path/language/symbol/license 等限定符把泛搜转成实现证据搜索 | 源码检索现场演示候选 |
| A | [GitHub：Dependency graph](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph) | 官方文档 | manifest 与 lockfile 可转成直接/传递依赖图，并连接告警与 SBOM | 解释“安装一个包实际引入什么” |
| A | [OpenSSF Scorecard](https://scorecard.dev/) | 基金会项目 | 自动检查维护、评审、危险 workflow、依赖固定、签名发布等供应链信号 | 仓库安全初筛，不展示为认证分数 |
| A | [OSV](https://google.github.io/osv.dev/) | 开放漏洞基础设施 | 按精确包版本或 commit 查询权威漏洞数据 | 依赖候选验收与自动化检查 |
| S | [GitHub：Filtering and searching issues and pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests) | 官方文档 | 可区分 completed/not planned、linked PR、review 与 CI 状态 | 从问题追到修复证据链 |
| A | [GitHub：About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) | 官方文档 | Release 基于 tag，但 tag 日期与发布日期可能不同 | 防止把 merged 误判为已交付 |
| A | [GitHub：Viewing and understanding files](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files) | 官方文档 | Blame 可沿逐行历史追到 commit 与旧版本 | 回答“这段代码为何存在” |
| A | [CHAOSS：Starter Project Health](https://www.chaoss.community/starter-project-health-metrics-model/) | 开源社区度量框架 | 首次响应、变更关闭、Bus Factor 与发布频率比单看 star 更接近维护风险 | 仓库健康筛选，需结合上下文 |

## 搜索停止与研究预算

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| A | [Cochrane Handbook Chapter 4](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-04) | 系统综述方法指南 | 停止理由应被记录；引用追踪仍大量产生新增相关材料时，原搜索可能不足 | 为“不是无限搜”提供严谨依据 |
| A | [Cochrane Qualitative Evidence Synthesis Chapter 5](https://www.cochrane.org/ru/authors/handbooks-and-manuals/cochrane-campbell-handbook-qualitative-evidence-synthesis/qeschapter5serv0240823) | 系统综述方法指南 | bibliographic sufficiency：扩展术语和来源不再带来新的相关材料 | 转化为技术调研的饱和检查 |

## 搜索 Agent 的安全边界

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | 政府风险框架 | 间接提示注入可藏在将被检索的数据中，并导致数据窃取或恶意代码执行 | 把搜索风险从“答错”扩展到“被资料劫持” |
| S | [Anthropic：Prompt injection defenses](https://www.anthropic.com/research/prompt-injection-defenses) | 官方安全研究 | 每个网页和嵌入内容都可能成为攻击向量；不存在免疫的浏览器 Agent | 核心风险证据，避免宣称检测可彻底解决 |
| A | [Microsoft：Defend against indirect prompt injection](https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection) | 官方安全指南 | 内容隔离、计划漂移、工具链分析、信息流控制和最小权限应组合使用 | 转化成七层控制清单 |
| A | [OWASP：LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 社区安全标准 | 注入可能导致信息泄露、越权工具调用和决策操纵 | 风险影响分类 |
| A | [NIST SP 800-218A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218A.pdf) | 政府安全开发指南 | 跟踪数据 provenance，并安全获取维护第三方软件组件 | 连接资料来源治理与软件供应链 |

## 视频完整证据链

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [tyk：独立开发者的文档驱动 AI 编程实践](https://tyksworks.com/posts/ai-coding-workflow-zh/) | 视频作者原始文章 | 六阶段文档工作流、PRD 三要素、原型/文档两种模式与人工 Review 边界 | 与 `BV1DVwLz2EGv` 聚合转写做回链核验 |
| B | [B站：BV1DVwLz2EGv](https://www.bilibili.com/video/BV1DVwLz2EGv) | 作者视频 | 视频管线的真实输入，且简介链接作者原文 | 回听后补时间戳；成本与效果仅作为作者自述 |

## 企业内部资料治理

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [NIST SP 800-207：Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) | 政府标准指南 | 不因网络位置或归属默认信任，访问资源前进行认证与授权 | 支持 Agent 工具最小权限与逐资源授权 |
| A | [NIST SP 800-171r3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/800-171r3/NIST.SP.800-171r3.html) | 政府标准指南 | 最小权限、权限复核以及审计信息保护 | 企业研究 Agent 上线清单 |
| A | [OpenAI：Business data privacy](https://openai.com/business-data/) | 官方产品政策 | 企业产品与 API 默认不使用业务数据训练模型 | 必须与具体 API 数据控制页面并读 |
| S | [OpenAI API：Data controls](https://developers.openai.com/api/docs/guides/your-data) | 官方技术文档 | 不同 endpoint 的滥用日志、应用状态和保留控制不同 | 证明“不训练”不等于所有功能零留存 |
| A | [Anthropic：Organization data retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) | 官方隐私文档 | API 与保存会话的商业产品有不同保留方式 | 要按产品/功能核验，不能只看厂商品牌 |
| A | [CISA：Logging on Business Systems](https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/use-logging-on-business-systems) | 政府安全指南 | 应记录访问、配置变化和异常活动，并保护日志 | 支持研究 Agent 的操作审计 |

## WPS 外部参考仓库复核

| 等级 | 来源 | 借鉴价值 | 不直接采用的原因 |
|:---:|---|---|---|
| A | [PPTAgent](https://github.com/icip-cas/PPTAgent) | 布局选择、编辑式生成、生成后评价 | Python/模型/浏览器/容器/MCP 依赖面过大，未验证 WPS |
| A | [PptxGenJS](https://github.com/gitbrent/PptxGenJS) | JS/浏览器侧 OOXML 与 slide API，适合做 spike | 跨渲染器 Issue、偏手工测试与当前依赖告警需验收 |
| S | [Marp CLI converter](https://github.com/marp-team/marp-cli/blob/main/src/converter.ts) | 清楚展示 Markdown→渲染→PPTX 管线 | 默认 PPTX 为逐页位图；editable 路径依赖 LibreOffice 且不保证完全可复现 |

## 信息觅食与程序理解

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [Pirolli & Card：The Sensemaking Process](https://www.researchgate.net/profile/Peter-Pirolli/publication/215439203_The_sensemaking_process_and_leverage_points_for_analyst_technology_as_identified_through_cognitive_task_analysis/links/02bfe50f09ca94efc0000000/The-sensemaking-process-and-leverage-points-for-analyst-technology-as-identified-through-cognitive-task-analysis.pdf) | 原始认知任务研究 | 信息觅食与意义建构是相互作用的循环；证据需要被重组为 schema 才能形成洞察 | 核心方法论页，明确从情报分析迁移 |
| S | [Ko 等：Information Needs in Collocated Software Development Teams](https://www.cs.cmu.edu/~marmalade/papers/Ko2007InformationNeeds.pdf) | ICSE 观察研究 | 开发者的信息需求包括设计缘由、程序行为和状态因果，且会被信息不可得阻塞 | 支撑“先提出可回答的源码问题” |
| S | [Sillito 等：Questions Programmers Ask](https://citeseerx.ist.psu.edu/document?doi=3dda5d9a5e4eb27760e8a4a381a1057ce0ba7d65&repid=rep1&type=pdf) | FSE 定性研究 | 44 类问题可归为焦点、扩展、局部子图和跨子图整合 | 转译成 AI 源码问题树，不在主 PPT 罗列全集 |
| A | [LaToza 等：Software Development at Microsoft Observed](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2005-140.pdf) | 企业现场研究报告 | 源码、调试器、变更历史、运行结果与社会知识共同参与理解；设计缘由常未沉淀 | 支撑多证据载体和负知识归档 |
| A | [Wyrich：Source Code Comprehension](https://arxiv.org/abs/2310.11301) | 概念研究论文 | “理解”必须通过任务和测量具体化，不能由一段摘要替代 | 用于约束“模型理解源码”的过强表述 |

## 引用归因与 Deep Research 审计

| 等级 | 来源 | 类型 | 支持的观点 | 建议用法 |
|:---:|---|---|---|---|
| S | [Gao et al.：ALCE](https://aclanthology.org/2023.emnlp-main.398/) | EMNLP 2023 论文 | 流畅度、答案正确性和引用质量需要分开评价；引用还要检查覆盖和相关性 | 支撑“有引用不等于完整支持” |
| S | [Rashkin et al.：AIS](https://aclanthology.org/2023.cl-4.2/) | Computational Linguistics 论文 | 外部世界主张应能归因到明确、独立提供的来源 | 支撑主张—来源逐项审计 |
| A | [DeepResearch Bench](https://arxiv.org/abs/2506.11763) | 2025 预印本 | 把报告质量与有效引用、引用准确性分开评价 | 展示新兴评价框架，不引用产品排名 |
| B | [DeepTRACE](https://arxiv.org/abs/2509.04499) | 2025 预印本 | statement-level 分解和 citation/factual-support 矩阵 | 转译为本项目审计表 |
| B | [DeepFact](https://arxiv.org/abs/2603.05912) | 2026 预印本 | 分歧提交证据、审计裁决并版本化修订 benchmark | 支撑“人是审计员，不是永不犯错的金标准” |

## 本地案例书签

| 推荐度 | 来源 | 类型 | 回答什么问题 | 演示用途 |
|:---:|---|---|---|---|
| S | `/Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md` | 本地工程复盘 | 生成失败后，如何用文档、同版本源码和对照实验完成定向调研 | Deck.gl 核心案例；正文讲方法，具体 API 留附录 |
| A | `/Users/wang/Documents/ChatGPT/deckgl-rotation/.ua/knowledge-graph.json` | 本地知识图谱 | 实验入口、共享运行时、测试和研究文档如何关联 | 课后导航或备份页，不作为事实来源替代原文件 |
| A | `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-08-31-session-retrospective.md` | 本地会话复盘 | 从视觉审计、外部调研到规格、计划和交接的完整链条 | 提取研究—实施—验证转换，不讲游戏代码 |
| A | `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-01-session-retrospective.md` | 本地会话复盘 | 风险优先纵向切片、避免重复搜索和 fallback 如何落地 | Dice 短案例核心材料 |
| A | `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-02-session-retrospective.md` | 本地会话复盘 | 任务 brief、评审证据裁决和跨模块验收如何组织 | 用于“评审也是待核验信息”与交接方法 |
| B | `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/.ua/knowledge-graph.json` | 本地知识图谱 | 调研证据、计划、复盘和配置文档的关系 | 课后资料导航；游戏实现已在扫描中降权 |

| 等级 | 文件 | 支持的观点 |
|:---:|---|---|
| S | `tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-RESEARCH.md` | AI 可以批量分析参考项目，并按可借用能力拆解，而不是只做摘要 |
| S | `tmp/wps-ai-plugin-main/.planning/phases/02-ppt-design-research/02-FEASIBLE-PLANS.md` | 搜索结果必须再经过运行环境和实施成本筛选 |
| S | `tmp/wps-ai-plugin-main/.planning/phases/09-excel-word-agent/09-LEARNINGS.md` | 运行时验证可以纠正文档缺失、提示词无效和 API 误判 |
| S | `tmp/wps-ai-plugin-main/.planning/phases/07-ppt-charts/07-PLAN.md` | “已放弃”的技术方案也是可复用结论 |
| A | `tmp/wps-ai-plugin-main/.planning/tmp-reference-index.md` | 项目把参考资料按阶段、用途和价值组织为索引 |
| S | `tmp/docs-ditto/docs/superpowers/plans/2026-08-07-bilibili-ai-game-research.md` | 查询矩阵、筛选字段、降级策略和结构化输出的完整设计 |
| A | `tmp/docs-ditto/.claude/skills/bilibili-audio-download/SKILL.md` | 视频资料获取过程可以被脚本化和复用 |
| A | `tmp/docs-ditto/.claude/skills/volcengine-audio-transcribe/SKILL.md` | 非文本资料可通过 ASR 转换为可检索语料 |

## 待核验或暂不采用

| 等级 | 项目 | 原因 |
|:---:|---|---|
| C | WPS 项目调研表中的 GitHub Stars | 数值具有时效性，若进入演示必须重新查询 |
| C | “WPS Word API 完全无文档” | 本地经验很有价值，但表述过强；应改成“目标版本缺少可直接使用的 TypeScript 声明或完整文档”，并保留运行时证据 |
| D | `docs1.zip` 与 `docs2.zip` 作为两个案例 | 两个压缩包哈希一致，不能重复计数 |
