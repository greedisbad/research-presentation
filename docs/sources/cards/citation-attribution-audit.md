# 来源卡：引用归因与 Deep Research 审计

- 主题：AI 长文本中的引用正确性、完整性与主张级审计
- 日期范围：2023–2026
- 来源等级：L1 同行评审论文 + 明确标注的预印本
- 演示推荐度：A

## 核心来源

1. [Gao et al.：Enabling Large Language Models to Generate Text with Citations](https://aclanthology.org/2023.emnlp-main.398/)，EMNLP 2023。
2. [Rashkin et al.：Measuring Attribution in Natural Language Generation Models](https://aclanthology.org/2023.cl-4.2/)，Computational Linguistics 2023。
3. [DeepResearch Bench](https://arxiv.org/abs/2506.11763)，2025 预印本。
4. [DeepTRACE](https://arxiv.org/abs/2509.04499)，2025 预印本。
5. [DeepFact](https://arxiv.org/abs/2603.05912)，2026 预印本。

## 回答的问题

为什么“报告带引用”不能直接等同于“主张有证据”，以及应当怎样把引用质量变成可检查对象？

## 可用证据

- ALCE 把流畅度、正确性和引用质量分开评价，并区分引用支持覆盖与引用相关性。
- AIS 要求涉及外部世界的生成内容能够归因到一个明确、独立提供的来源。
- Deep Research 评价研究开始使用有效引用数量、引用准确性、statement-level 支持矩阵等维度，而不只评报告整体观感。
- DeepFact 的 Audit-then-Score 把分歧提交证据、人工裁决和版本化修订连接起来。

## 对演讲的价值

可形成一句极易理解的质量门：**有链接，不等于链接支持这句话。** 同时为项目现有 claim ledger 与 gap matrix 提供外部方法支撑。

## 不应过度外推

2025–2026 三项 Deep Research 研究为预印本，系统和评测快速变化；具体准确率不进入主讲结论。引用 entailment 也不等于来源真实性、适用性或工程验证。
