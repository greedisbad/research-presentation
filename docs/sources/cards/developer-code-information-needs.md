# 来源卡：开发者的源码信息需求

- 主题：开发者如何寻找、关联并验证陌生代码信息
- 主要作者：Andrew J. Ko 等；Jonathan Sillito、Gail C. Murphy、Kris De Volder；Thomas D. LaToza 等
- 日期：2005–2008
- 来源等级：L1 原始观察与定性研究
- 演示推荐度：S

## 主要来源

1. [Information Needs in Collocated Software Development Teams](https://www.cs.cmu.edu/~marmalade/papers/Ko2007InformationNeeds.pdf)，ICSE 2007。
2. [Questions Programmers Ask During Software Evolution Tasks](https://citeseerx.ist.psu.edu/document?doi=3dda5d9a5e4eb27760e8a4a381a1057ce0ba7d65&repid=rep1&type=pdf)，FSE 2006。
3. [Software Development at Microsoft Observed](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2005-140.pdf)，Microsoft Research Technical Report，2005。
4. [Source Code Comprehension: A Contemporary Definition and Conceptual Model](https://arxiv.org/abs/2310.11301)，2023，作为概念边界补充。

## 回答的问题

开发者面对陌生代码或变更任务时会提出什么问题、依靠哪些证据，以及工具为何经常只能回答低层问题？

## 可用证据

- Ko 等观察 17 名开发者，识别 21 类信息需求；设计缘由和程序行为是较难获取的类别。
- 陌生代码调查至少涉及行为来源、静态关系和运行状态因果三类问题。
- Sillito 等从新人和有经验工业开发者的变更任务中整理 44 类问题，分为寻找焦点、围绕焦点扩展、理解子图和跨子图整合。
- 高层问题往往需要拼接多个工具的窄结果，工具可用不等于问题已获得回答。
- LaToza 等显示源码、调试器、变更历史、运行结果与同事知识共同参与代码理解；设计缘由常未被持久记录。

## 对演讲的价值

支撑“不要让 AI 总结整个仓库，而要让它沿问题树构建任务相关局部模型”；也能把 Deck.gl 的文档—源码—历史—运行证据链连接到程序理解研究。

## 不应过度外推

研究样本与工具环境较旧且范围有限；适合使用问题类别和多证据原则，不引用具体比例来代表今天所有团队。Wyrich 的工作定义的是人类源码理解，也不能据此宣称模型真正理解代码。
