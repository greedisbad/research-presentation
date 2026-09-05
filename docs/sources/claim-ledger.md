# 主张—来源账本

访问日期：2026-09-05。

| ID | 材料中的主张 | 主要来源 | 来源日期 | 证据性质 | 适用边界 |
|---|---|---|---|---|---|
| C01 | Deep Research 让用户明确目标和来源、检查计划、跟踪多步研究，并输出带引用或来源链接的结构化报告供用户核验 | [OpenAI Deep Research](https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt) | 持续更新；2026-09-05 复核 | 官方产品流程 | 文档没有证明系统已自动检查每条引用正确性，也不能证明输出总是准确 |
| C02 | 多代理研究适合可并行的广度问题，并需要明确分工、CitationAgent、评测和成本控制 | [Anthropic multi-agent research](https://www.anthropic.com/engineering/multi-agent-research-system) | 2025-06-13 | 官方工程复盘 | 内部评价与成本数据未必迁移到其他系统 |
| C03 | 查询扩展用于解决用户查询与文档词汇不匹配 | [Query Expansion survey](https://arxiv.org/abs/1708.00247) | 2019 | 同行评审综述 | 扩展可能带来 query drift |
| C04 | 从种子资料做前后向引用追踪可系统扩展文献集合 | [Wohlin snowballing](https://www.wohlin.eu/ease14.pdf) | 2014 | 软件工程论文 | 迁移到 GitHub 生态属于方法类比 |
| C05 | 有引用不代表回答获得完整支持 | [ALCE](https://aclanthology.org/2023.emnlp-main.398/) | 2023-12 | EMNLP 论文 | 数值对应当时模型与特定数据集 |
| C06 | 长回答可拆成原子事实后逐项搜索核验 | [SAFE / LongFact](https://deepmind.google/research/publications/85420/) | 2024-03-27 | 原始研究 | 自动 judge 仍需抽样人工检查 |
| C07 | 资深开发者在熟悉仓库中使用早期 2025 工具可能变慢 | [METR RCT](https://metr.org/Early_2025_AI_Experienced_OS_Devs_Study-paper.pdf) | 2025-07-10 | 随机对照研究 | 16 人、特定旧工具和成熟仓库，不可泛化为所有场景 |
| C08 | AI 的组织收益依赖底层流程与系统能力 | [DORA 2025](https://dora.dev/research/2025/dora-report/) | 2025 | 行业研究 | 聚合数据不能替代团队自身测量 |
| C09 | 仓库内可版本化知识、约束和反馈循环提高 coding agent 可用性 | [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/) | 2026-02-11 | 官方内部复盘 | 高投入的 Agent-first 项目，不是零配置方案 |
| C10 | Agent 可以搜索科学文献后写代码、组合方法并按目标评价 | [Google ERA](https://research.google/blog/empirical-research-assistance-era-from-nature-publication-to-catalyzing-computational-discovery/) | 2026-05-19 | 官方研究系统与 Nature 论文导读 | 科学 benchmark 与普通应用开发不同 |
| C11 | 大规模代码迁移先需要确定依赖和搜索范围，再由 Agent 修改和验证 | [Spotify Honk Part 4](https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4) | 2026-04 | 企业工程复盘 | 企业内部平台与标准化环境投入很高 |
| C12 | 视频/音频可以转为基于来源的语料，但字幕、权限和时效有限制 | [NotebookLM source docs](https://support.google.com/notebooklm/answer/16215270) | 持续更新 | 官方产品文档 | YouTube 与 B 站能力不同；平台条款需分别核验 |
| C13 | WPS 加载项是基于 Web 技术并通过 JavaScript 与应用交互 | [WPS 加载项概述](https://open.wps.cn/documents/app-integration-dev/wps365/client/wpsoffice/wps-integration-mode/wps-addin-development/addin-overview) | 访问于 2026-09-03 | 官方技术文档 | 具体 API 仍受客户端和版本影响 |
| C14 | 专业事实核查者倾向 lateral reading，跨站核验发布者与背景 | [Wineburg & McGrew](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3048994) | 2017 | 对比观察研究 | 样本较小，需作为策略而非普遍定律 |
| C15 | 公开可见的 GitHub 仓库若无许可证，并不自动授予复制、分发或制作衍生作品的权利 | [GitHub Licensing](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) | 持续更新 | 官方平台文档 | 不是具体项目的法律意见，仍需核对实际许可证与组织政策 |
| C16 | 源码搜索可以用 repo、path、language、symbol、license 等限定符收窄到可验证实现 | [GitHub Code Search syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax) | 持续更新 | 官方技术文档 | symbol 支持依语言而异，搜索命中不证明运行时有效 |
| C17 | 依赖风险核验应落到精确版本、传递依赖与项目供应链实践，而非只看仓库热度 | [GitHub Dependency graph](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph)、[OpenSSF Scorecard](https://scorecard.dev/)、[OSV](https://google.github.io/osv.dev/) | 持续更新 | 官方/基金会基础设施 | 自动检查和漏洞库都有盲区，不能替代评审与运行验证 |
| C18 | 源码、Issue、linked PR 与 Release/tag 应串成证据链；PR 合并不自动证明修复已进入用户安装版本 | [GitHub Issue search](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests)、[About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) | 持续更新 | 官方平台文档与方法推导 | 有些项目不使用 GitHub Release，需改查其实际发布渠道 |
| C19 | 搜索停止应给出可记录理由，可参考饱和度、引用追踪新增产出和 bibliographic sufficiency | [Cochrane Handbook Chapter 4](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-04)、[QES Chapter 5](https://www.cochrane.org/ru/authors/handbooks-and-manuals/cochrane-campbell-handbook-qualitative-evidence-synthesis/qeschapter5serv0240823) | 2025/2023 | 权威方法指南 | 从医学/定性综述迁移到工程研究属于方法类比，不主张同等完备性 |
| C20 | 自动读取网页和文档的 Agent 会暴露于间接提示注入，风险可包括信息外泄、恶意代码或越权动作 | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)、[Anthropic defense research](https://www.anthropic.com/research/prompt-injection-defenses) | 2024/2025 | 政府框架与厂商安全研究 | 攻击成功率随模型、工具与防护变化，不应引用单一静态数字泛化 |
| C21 | 搜索 Agent 需要模型外的分层控制，包括内容隔离、最小权限、工具链/数据流约束和高后果确认 | [Microsoft defense guidance](https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection)、[NIST SP 800-218A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218A.pdf) | 2026/2024 | 官方安全指南 | 具体控制需依据组织架构和威胁模型实现 |
| C22 | AI 调研不能只用主观提效或产出数量衡量，应在真实上下文记录时间并评价证据、风险和下游结果 | [METR RCT](https://metr.org/Early_2025_AI_Experienced_OS_Devs_Study-paper.pdf)、[NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 2025/持续更新 | 现场随机研究与政府评价框架的综合推导 | 本项目提出的具体指标仍需用团队任务校准 |
| C23 | `BV1DVwLz2EGv` 作者采用发散需求、人工 PRD、Plan/Review、实现、测试迭代和人工 Review 的文档主导流程 | [tyk 原始文章](https://tyksworks.com/posts/ai-coding-workflow-zh/) | 2026-03-13 | 视频作者一手实践 | 是单个独立开发者/三人团队背景，不代表普遍最佳流程 |
| C24 | 企业 AI 的“不用于训练”不能推导出零留存；数据处理结论必须绑定具体产品、功能/端点和配置 | [OpenAI Business Data](https://openai.com/business-data/)、[OpenAI API Data controls](https://developers.openai.com/api/docs/guides/your-data)、[Anthropic retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) | 访问于 2026-09-03 | 厂商官方政策与技术文档的对照 | 政策可能更新，合同与租户配置优先于公共网页 |
| C25 | 企业研究 Agent 应按最小权限授权并保留受保护的操作审计 | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)、[NIST SP 800-171r3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/800-171r3/NIST.SP.800-171r3.html) | 2020/2024 | 政府安全指南 | 具体控制需映射组织数据分类和威胁模型 |
| C26 | Marp CLI 的普通 PPTX 导出本质上是逐页图像写入，而实验性 editable 路径依赖 LibreOffice 且有可复现性限制 | [Marp converter source](https://github.com/marp-team/marp-cli/blob/main/src/converter.ts) | 访问于 2026-09-03 | 当前官方仓库源码 | 实现会变化；结论绑定核验日和当前分支 |
| C27 | PptxGenJS 更接近 WPS 插件的 JavaScript/OOXML 环境，但跨渲染器兼容和依赖风险仍需目标环境 spike | [PptxGenJS source](https://github.com/gitbrent/PptxGenJS)、[Issue #1531](https://github.com/gitbrent/PptxGenJS/issues/1531)、[Issue #1532](https://github.com/gitbrent/PptxGenJS/issues/1532) | 访问于 2026-09-03 | 源码、Issue 与本次依赖审计 | 尚未在 WPS 目标版本实测，不能写成兼容结论 |
| C28 | 生成失败可以通过“模型假设→官方契约→目标版本源码→同仓库范式→运行实验”逐级收敛为工程决策 | [Deck.gl 本地来源卡](cards/local-deckgl-research-loop.md) | 访问于 2026-09-05 | 本地工程复盘、源码与运行记录 | 单案例方法抽象；不能用于模型排名或普遍效率推断 |
| C29 | 保存已确认、已排除和待验证内容，可为跨会话 Agent 提供比完整聊天更明确的调研记忆 | [Dice 本地来源卡](cards/local-dice-retrospectives.md)、[OpenAI Harness Engineering](cards/openai-harness-engineering.md) | 2026-08-31 至 2026-09-05 | 本地连续复盘与官方工程复盘互证 | “更明确”是可检查性判断，不代表已测得时间收益 |
| C30 | AI 评审意见应作为待核验 finding，经文件、diff、测试或复现后再裁决 | [Dice 本地来源卡](cards/local-dice-retrospectives.md) | 访问于 2026-09-05 | 本地评审误报与真实问题并存案例 | 个案只支持工作规则，不能估计 AI 评审准确率 |
| C31 | 搜索收敛后从最高风险处做最小纵向切片，可在扩大实现前验证资产、接口和 fallback 边界 | [Dice 本地来源卡](cards/local-dice-retrospectives.md) | 访问于 2026-09-05 | 本地工程决策与运行记录 | 未与其他实施顺序做受控比较，作为风险管理建议使用 |
| C32 | 人机增强应被视为人、工具、方法和训练共同组成的系统，而不只是机器替代单项劳动 | [Engelbart 1962](https://www.dougengelbart.org/content/view/138/) | 1962 | 原始研究报告与概念框架 | 历史理论框架，不是现代 LLM 效果实证 |
| C33 | 软件工程研究可借鉴证据化实践，预先定义问题、协议、筛选和质量评价以提高可审计性 | [Kitchenham et al. 2004](https://www.st.cs.uni-saarland.de/edu/empirical-se/2006/PDFs/kitchenham04_.pdf)、[Kitchenham & Charters 2007](https://www.cin.ufpe.br/~in1037/leitura/kitchenham2007guidelines.pdf) | 2004/2007 | ICSE 论文与 EBSE 技术报告 | 日常技术调研不等同于系统综述，只迁移其透明与可审计原则 |
| C34 | 分遍阅读可先判断相关性，再逐层增加理解与复现成本 | [Keshav: How to Read a Paper](https://cs.uwaterloo.ca/~Brecht/courses/856/readings/how-to-read/keshav-paper-reading.pdf) | 2007/2016 版本 | 作者方法论文 | 主要面向论文阅读，迁移到文档、源码和视频属于方法类比 |
| C35 | 专业事实核查者通过离开原站、调查来源并跨站比较来提高在线来源判断 | [Wineburg & McGrew](https://papers.ssrn.com/sol3/Delivery.cfm/SSRN_ID3701739_code2785140.pdf?abstractid=3048994&mirid=1)、[SIFT](https://hapgood.us/2019/06/19/sift-the-four-moves/) | 2017/2019 | 观察研究与实践框架 | 样本为 45 人且任务不是软件资料；用于启发来源核验协议 |
| C36 | 研究自动化应保存命令、增量修改、使用版本控制并通过断言/测试提高可复现性 | [Wilson et al. 2014](https://doi.org/10.1371/JOURNAL.PBIO.1001745) | 2014 | 开放获取同行评审论文 | 面向科学计算；不是 AI Agent 专属证据 |
| C37 | Agent 上下文应保留高信号地图并按需加载原文，长任务使用结构化笔记等方式控制上下文污染 | [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 2025-09-29 | 官方工程复盘 | 厂商实践；具体策略随模型和工具变化 |
| C38 | Agent 架构应从最简单可行模式开始，明确任务优先固定 workflow，开放问题才增加自主循环 | [Anthropic Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | 2024-12-19 | 官方跨客户工程总结 | 不是独立对照研究，但包含适用边界与成本权衡 |
| C39 | 专业分析过程可理解为信息觅食与意义建构两个相互作用的循环，资料需要被重组到适合任务的表示中才能支持洞察与产出 | [Pirolli & Card 2005](cards/pirolli-card-sensemaking.md) | 2005 | 情报分析认知任务研究 | 迁移到 AI 技术调研属于方法类比，不是 AI 效率实证 |
| C40 | 程序理解由任务相关的问题驱动，开发者会从定位焦点逐步扩展到关系、局部行为与跨模块模型，并组合源码、历史和运行证据 | [开发者源码信息需求来源卡](cards/developer-code-information-needs.md) | 2005–2023 | 多项观察、定性与概念研究的综合 | 样本与工具环境不同；只使用问题结构，不外推固定频率或 AI 理解能力 |
| C41 | 引用存在、引用对主张的支持程度和重要主张的引用覆盖率是不同维度，不能因报告带链接就视为证据完整 | [引用归因与 Deep Research 审计来源卡](cards/citation-attribution-audit.md) | 2023–2026 | 同行评审研究与新兴预印本的综合 | 旧 benchmark 和当前产品不同；预印本数值不用于产品准确率结论 |
| C42 | 技术报告可拆为原子主张，通过 FULL/PARTIAL/CONFLICT/NONE 记录来源支持并修订表述 | [AIS](https://aclanthology.org/2023.cl-4.2/)、[ALCE](https://aclanthology.org/2023.emnlp-main.398/)、[DeepTRACE](https://arxiv.org/abs/2509.04499) | 2023–2025 | 归因框架、citation metrics 与 statement-level 审计的工程转译 | 四档协议是本项目设计，尚未进行跨审计员一致性测量 |
