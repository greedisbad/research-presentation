# 来源卡：代码库上下文定位的三种研究路径

## 来源

### RepoCoder

- 作者：Fengji Zhang 等
- 会议：EMNLP 2023
- 链接：https://aclanthology.org/2023.emnlp-main.151/
- 类型：同行评审原始论文

### Agentless

- 作者：Chunqiu Steven Xia、Yinlin Deng、Soren Dunn、Lingming Zhang
- 版本：arXiv v2，2024-10-29
- 链接：https://arxiv.org/abs/2407.01489
- 类型：原始预印本与开源实现

### SWE-agent

- 作者：John Yang 等
- 会议：NeurIPS 2024
- 链接：https://papers.neurips.cc/paper_files/paper/2024/file/5a7c947568c1b1328ccc5230172e1e7c-Paper-Conference.pdf
- 类型：同行评审原始论文

访问日期：2026-09-05。

## 分别支持什么

| 来源 | 支持的机制 | 不应外推 |
|---|---|---|
| RepoCoder | 生成结果可以反过来改善下一轮代码检索；迭代优于该论文的一次检索基线 | 不能推出任何任务都应无限迭代 |
| Agentless | 固定的分层定位—修复—验证流程可以成为复杂 Agent 的有力基线 | 旧 SWE-bench Lite 成绩不是当前产品排名 |
| SWE-agent | 简单紧凑动作、简洁反馈和 guardrail 等接口设计会影响 Agent 行为与结果 | 一个 ACI 的命令设计不自动迁移到所有模型和环境 |

## 对演讲的综合

三者共同支持“代码搜索是一条逐步收窄并接受反馈的过程”。RepoCoder解释查询如何迭代，Agentless解释层级定位，SWE-agent解释为何工具返回格式和门禁也是调研系统的一部分。

## 适合演示的位置

推荐度：S。正文使用“目录 → 文件 → 符号 → 局部代码 → 测试”的漏斗；三篇论文只作为页脚证据，不展开 benchmark 数字。

## 局限

研究任务分别是代码补全与 Issue 修复，并不直接评价“AI 辅助技术调研”课程。本文档只做机制层迁移，并保留本项目案例作为实际支撑。
