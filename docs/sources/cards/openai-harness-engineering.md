# 来源卡：OpenAI Harness Engineering

- 标题：Harness engineering: leveraging Codex in an agent-first world
- 发布者：OpenAI
- 日期：2026-02-11
- 链接：https://openai.com/index/harness-engineering/
- 来源等级：L2 官方工程复盘
- 演示推荐度：S

## 回答的问题

当 Agent 大量承担编码工作后，人类工程师真正要建设什么？

## 可用证据

- 团队把仓库内知识作为 system of record。
- 一个巨大的 AGENTS.md 会挤占上下文；代理更需要可导航地图和按需文档。
- 文档不足以保证架构，需要通过依赖规则、Schema、测试和工具强制不变量。
- 人负责优先级、验收标准和结果验证，Agent 执行大量实现、测试、文档和维护任务。
- 错误模式会被 Agent 复制，因此需要持续“垃圾回收”和质量评估。

## 与本地案例的连接

WPS 项目已经出现同样模式：阶段研究、计划、测试、Learnings 与根 AGENTS.md 共同组成下一轮 Agent 可读取的仓库知识。

## 局限

这是高度 Agent-first 的内部实验，组织投入、工具链和吞吐量都不能视为普通团队默认条件。
