# 证据缺口矩阵

| 主张族 | 当前证据 | 信心 | 矛盾/局限 | 下一步 |
|---|---|:---:|---|---|
| AI 深度研究是多步过程，不是一次搜索 | OpenAI Deep Research 官方文档 | 高 | 产品文档不能证明结果始终准确 | 补独立引用正确性研究 |
| 查询扩展能提高技术资料发现率 | Query Expansion 综述；本地 65 词矩阵 | 中高 | 扩展词也可能引入漂移 | 已补饱和与停止条件；仍可补 relevance feedback 实验 |
| 从种子资料滚雪球适合软件工程调研 | Wohlin 论文 | 高 | 原本用于系统文献研究，迁移到开源生态属于推论 | 在演讲中明确为方法迁移 |
| 基于来源回答仍可能出现引用错位或缺失支持 | FACTS Grounding、LongFact/SAFE、ALCE、AIS、DeepResearch Bench/DeepTRACE；A01 本项目审计 | 高（问题存在） | 首批 10 条为人为选择的高影响样本，不能视为仓库准确率 | 已修订 C01；下一步抽查长尾主张并在最终 PPT 逐条复核 |
| AI 编程收益依赖任务和组织环境 | DORA 2025、METR RCT、微软现场实验 | 高 | 工具版本与人群差异大 | 并列呈现，不给统一效率数字 |
| 仓库内知识和反馈回路提高 Agent 能力 | OpenAI Harness、Sora Android、Anthropic best practices | 中高 | 厂商自述，有选择偏差 | 用本地 WPS 案例佐证 |
| AI 可从资料搜索进入科学/工程执行 | Google ERA、AlphaEvolve、OpenAI scientific computing | 高 | 先进实验与日常开发差距大 | 只用于展示上限与设计原则 |
| 视频可转换为 source-grounded 语料 | NotebookLM 官方文档、本地 B 站管线；V01 证据切片 | 中高 | 当前压缩包缺原始音频、转写、日志与 API 响应，无法独立复核 123/123 和逐字时间戳 | 找回一个原始样本补链；否则只展示流程和外证回链，不称完整证据链 |
| “不造轮子”应理解为局部模式复用 | WPS 11 项目调研→可行方案→实现映射 | 高 | 下载包缺原始 Git 历史，部分版本信息不可恢复 | 继续补 commit/tag 或明确证据上限 |
| 公开仓库不等于可直接复制或依赖 | GitHub Licensing、Dependency Graph、OpenSSF、OSV；PPTAgent/PptxGenJS/Marp 实例 | 高 | 自动评分和漏洞库存在盲区；不是法律意见 | 已补真实样例；下一步在 WPS 做 PptxGenJS spike |
| Code/Issue/PR/Release 可组成实现证据链 | GitHub Code Search、Issue Search、Blame、Release 文档 | 高 | 并非所有项目用 GitHub Release | 在 WPS 或外部库上跑通一个完整例子 |
| 搜索 Agent 会遭遇间接提示注入 | NIST AI 600-1、Anthropic、Microsoft、OWASP | 高 | 防御持续变化，没有单项措施可保证安全 | 设计一个无害注入演示与工具层阻断 |
| AI 调研效果必须测速度、证据与下游结果 | METR RCT、NIST AI RMF、DORA | 中高 | 本项目的 rubric 尚未经团队任务校准 | 用 6–10 个真实任务做小规模对照 |
| 企业资料“不训练”不等于零留存 | OpenAI、Anthropic 官方数据政策；NIST 最小权限/零信任 | 高 | 产品、端点、合同和租户配置持续变化 | 演示前重查，并补中国境内组织的合规责任人访谈 |
| 失败驱动的文档—源码—实验链能帮助 Agent 收敛 | Deck.gl 本地工程复盘、四条实验和运行记录；D01 证据切片；结构测试 9/9 与四页浏览器门禁本轮通过 | 中高 | 单案例、多个流程因素同时变化；目录无历史提交；一次浏览器快照不代表全部环境 | 浏览器快照已补；未来用另一个陌生库复跑五文件协议 |
| 负知识与任务 brief 能减少跨会话重复劳动 | Dice 三份复盘、Harness Engineering | 中 | 目前缺少重复搜索次数、人工时间或 token 的对照数据 | 先作为实践建议；后续小任务记录有/无 LEARNINGS 的差异 |
| 决策上下文与变更 rationale 值得独立于源码保存 | Nygard ADR、Safwan & Servant、LaToza、软件知识管理综述 | 高（需求与格式来源） | ADR 效果多为实践经验；显性文档不能替代隐性知识和协作 | 在陌生库迁移实验中使用 FACTS/DECISIONS/LEARNINGS/OPEN-QUESTIONS 并记录维护成本 |
| AI 评审需要证据裁决 | Dice 的误报与真实问题并存记录 | 中高 | 不能由单次事件估算评审准确率 | 演示只讲裁决协议，不给准确率数字 |
| AI 技术调研可借用系统综述的可审计原则 | Kitchenham 2004/2007、Wohlin 2014 | 高（原则来源） | 日常工程研究预算小、开放 Web 持续变化，不能宣称达到系统综述完备性 | 明确表述为“轻量迁移”，展示 Research Brief 和停止记录 |
| 地图 + 按需回读优于只看摘要或一次塞入全部原文 | Anthropic context engineering、本项目分层资料库 | 中高 | 官方工程复盘并非独立对照；最优上下文策略随模型变化 | 用演示素材层实际展示一次按需追溯过程 |
| 技术调研需要在信息觅食与意义建构之间往返 | Pirolli & Card 2005；本项目资料卡、账本和缺口矩阵 | 高（理论结构） | 原研究面向情报分析员，不直接测 AI 技术调研 | 以 Deck.gl 的失败触发重新拆题作为本地过程证据，不宣称效率因果 |
| AI 阅读源码应由问题树驱动并组合多种证据 | Ko、Sillito、LaToza、Wyrich；Deck.gl/WPS 本地案例 | 高（人类程序理解）/中（AI 迁移） | 经典研究工具环境较旧，AI 跨工具综合的收益尚无本项目对照 | 在新陌生库实验中记录问题树、错误跳转、人工修正和最终验证 |
| AI 调研应保存来源、转换活动与责任主体的证据谱系 | W3C PROV-O；PRISMA-S；P01 对 Deck.gl、WPS、视频三条主张的谱系审计 | 高（标准概念）/中（工程迁移） | 两套规范都不直接评价 AI 技术调研质量；记录完整不代表结论正确；尚无独立冷读者测试 | 三条谱系已完成自审；下一步测试他人能否据此回查并记录卡点 |
| AI 在大仓库中应分层定位并让初次结果驱动后续检索，而非一次塞入全部上下文 | RepoCoder、Agentless、SWE-agent；Deck.gl/WPS；X01 p-limit 陌生仓库实验 | 中高 | 三项研究任务是代码补全或修复；X01 仓库很小且没有人工对照，不能推断效率收益 | 在更大陌生仓库记录候选收窄率与误跳转；X01 已证明流程可执行 |
