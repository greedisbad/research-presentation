# 来源卡：决策理由与负知识记录

- 主题：Architecture Decision Records、commit rationale 与软件工程知识管理
- 日期范围：2005–2022
- 来源等级：L1 同行评审研究 + L2 原始实践文章
- 演示推荐度：A

## 核心来源

1. [Michael Nygard：Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)，2011。
2. [Safwan & Servant：Developers’ need for the rationale of code commits](https://doi.org/10.1016/j.jss.2022.111320)，Journal of Systems and Software，2022。
3. [LaToza et al.：Software Development at Microsoft Observed](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2005-140.pdf)，Microsoft Research，2005。
4. [Bjørnson & Dingsøyr：Knowledge management in software engineering](https://doi.org/10.1016/j.infsof.2008.03.006)，Information and Software Technology，2008。

## 回答的问题

为什么源码和 diff 不足以支撑未来维护者理解决策，以及如何用轻量记录保存上下文、状态与后果？

## 可用证据

- Nygard 提出短小、模块化 ADR，包含 Context、Decision、Status 和 Consequences；旧决策被替代后保留并标记 superseded。
- 实证研究显示开发者在多类任务中需要代码变更 rationale，并可能因获取困难而放弃。
- 企业开发观察显示设计缘由常需要询问同事，获得后却很少被持久记录。
- 软件工程知识管理系统综述提醒，不应只关注显性文档，也要考虑 tacit knowledge 与人的协作行为。

## 对演讲的价值

为 WPS 的 LEARNINGS/AGENTS 和 Dice 的 Confirmed/Rejected/Unverified 提供外部背景；说明 AI 调研沉淀的对象不只是事实，还包括决策上下文、失败条件和未解决问题。

## 不应过度外推

ADR 原文是实践报告；知识管理研究包含大量案例研究与 lessons learned。不能据此声称某种文件格式必然节省固定比例时间。
