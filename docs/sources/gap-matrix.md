# 证据缺口矩阵

| 主张族 | 当前证据 | 信心 | 矛盾/局限 | 下一步 |
|---|---|:---:|---|---|
| AI 深度研究是多步过程，不是一次搜索 | OpenAI Deep Research 官方文档 | 高 | 产品文档不能证明结果始终准确 | 补独立引用正确性研究 |
| 查询扩展能提高技术资料发现率 | Query Expansion 综述；本地 65 词矩阵 | 中高 | 扩展词也可能引入漂移 | 已补饱和与停止条件；仍可补 relevance feedback 实验 |
| 从种子资料滚雪球适合软件工程调研 | Wohlin 论文 | 高 | 原本用于系统文献研究，迁移到开源生态属于推论 | 在演讲中明确为方法迁移 |
| 基于来源回答仍可能幻觉 | FACTS Grounding、LongFact/SAFE | 高 | benchmark 不完全等于真实工具 | 补真实 citation audit 研究 |
| AI 编程收益依赖任务和组织环境 | DORA 2025、METR RCT、微软现场实验 | 高 | 工具版本与人群差异大 | 并列呈现，不给统一效率数字 |
| 仓库内知识和反馈回路提高 Agent 能力 | OpenAI Harness、Sora Android、Anthropic best practices | 中高 | 厂商自述，有选择偏差 | 用本地 WPS 案例佐证 |
| AI 可从资料搜索进入科学/工程执行 | Google ERA、AlphaEvolve、OpenAI scientific computing | 高 | 先进实验与日常开发差距大 | 只用于展示上限与设计原则 |
| 视频可转换为 source-grounded 语料 | NotebookLM 官方文档、本地 B 站管线 | 高 | 文件名已恢复，但视频网页可能反爬，版权/服务条款和总结准确性仍需核验 | 抽一个完整样例并做三方对照 |
| “不造轮子”应理解为局部模式复用 | WPS 11 项目调研→可行方案→实现映射 | 高 | 下载包缺原始 Git 历史，部分版本信息不可恢复 | 继续补 commit/tag 或明确证据上限 |
| 公开仓库不等于可直接复制或依赖 | GitHub Licensing、Dependency Graph、OpenSSF、OSV；PPTAgent/PptxGenJS/Marp 实例 | 高 | 自动评分和漏洞库存在盲区；不是法律意见 | 已补真实样例；下一步在 WPS 做 PptxGenJS spike |
| Code/Issue/PR/Release 可组成实现证据链 | GitHub Code Search、Issue Search、Blame、Release 文档 | 高 | 并非所有项目用 GitHub Release | 在 WPS 或外部库上跑通一个完整例子 |
| 搜索 Agent 会遭遇间接提示注入 | NIST AI 600-1、Anthropic、Microsoft、OWASP | 高 | 防御持续变化，没有单项措施可保证安全 | 设计一个无害注入演示与工具层阻断 |
| AI 调研效果必须测速度、证据与下游结果 | METR RCT、NIST AI RMF、DORA | 中高 | 本项目的 rubric 尚未经团队任务校准 | 用 6–10 个真实任务做小规模对照 |
| 企业资料“不训练”不等于零留存 | OpenAI、Anthropic 官方数据政策；NIST 最小权限/零信任 | 高 | 产品、端点、合同和租户配置持续变化 | 演示前重查，并补中国境内组织的合规责任人访谈 |
| 失败驱动的文档—源码—实验链能帮助 Agent 收敛 | Deck.gl 本地工程复盘、四条实验和运行记录 | 中高 | 单案例、多个流程因素同时变化，无法证明因果或模型差异 | 保留为案例证据；未来用另一个陌生库复跑五文件协议 |
| 负知识与任务 brief 能减少跨会话重复劳动 | Dice 三份复盘、Harness Engineering | 中 | 目前缺少重复搜索次数、人工时间或 token 的对照数据 | 先作为实践建议；后续小任务记录有/无 LEARNINGS 的差异 |
| AI 评审需要证据裁决 | Dice 的误报与真实问题并存记录 | 中高 | 不能由单次事件估算评审准确率 | 演示只讲裁决协议，不给准确率数字 |
| AI 技术调研可借用系统综述的可审计原则 | Kitchenham 2004/2007、Wohlin 2014 | 高（原则来源） | 日常工程研究预算小、开放 Web 持续变化，不能宣称达到系统综述完备性 | 明确表述为“轻量迁移”，展示 Research Brief 和停止记录 |
| 地图 + 按需回读优于只看摘要或一次塞入全部原文 | Anthropic context engineering、本项目分层资料库 | 中高 | 官方工程复盘并非独立对照；最优上下文策略随模型变化 | 用演示素材层实际展示一次按需追溯过程 |
