# 源码、Issue 与 Release 调研手册

README 回答“项目声称自己能做什么”，源码回答“当前实现怎么做”，Issue/PR 回答“哪里坏过、为什么这样改”，Release 回答“哪个版本把变化交付给用户”。AI 技术调研要把这四层串起来。

## 1. 最小证据链

```text
目标能力
  → Code Search 定位 symbol / 独特字符串
  → 读取入口、调用方、错误处理和测试
  → Blame / commit 解释代码为何出现
  → Issue 发现限制、复现条件和维护者判断
  → linked PR 查看实际修复与 review
  → Release/tag 确认修复进入哪个可用版本
  → 在目标环境运行最小实验
```

任何一段缺失都要显式标注。例如“main 分支已有修复，但尚未发布”，与“安装最新版即可使用”是两个不同结论。

## 2. 给 AI 的检索任务格式

不要问：

> 这个仓库如何实现图表？

改为：

> 在 `owner/repo` 中定位创建图表对象的定义和全部调用方。返回文件、symbol、所处 tag/commit、相关测试、异常分支；再搜索包含相同 API 名称或错误文本的已关闭 Issue 和 merged PR，说明修复首次进入哪个 Release。事实与推断分栏，找不到时明确写“未找到”。

建议返回表：

| 证据类型 | 精确定位 | 支持的原子事实 | 未解决问题 |
|---|---|---|---|
| 源码 | repo、commit、path、symbol/line | 当前分支的行为 | 是否已发布 |
| 测试 | path、test name | 被维护者预期的行为 | 是否覆盖真实宿主 |
| Issue | 编号、状态、日期 | 复现条件与限制 | 是否被修复 |
| PR/commit | 编号/SHA | 具体改动与评审背景 | 是否含破坏性变化 |
| Release | tag、发布日期 | 用户可安装版本 | asset 是否对应 tag |
| 本地实验 | 环境、命令、结果 | 目标条件下实际行为 | 可重复性范围 |

## 3. Issue/PR 不是论坛帖子，而是项目的实验日志

GitHub 官方 Issue 搜索支持 `is:`、`state:`、`label:`、`author:`、`involves:`、`linked:`、`reason:`、`review:`、`status:` 等限定符。可用查询包括：

```text
repo:owner/project is:issue "exact error" sort:updated-desc
repo:owner/project is:issue is:closed reason:completed "APIName"
repo:owner/project is:issue is:closed reason:"not planned" "feature name"
repo:owner/project is:pr is:merged linked:issue "APIName"
repo:owner/project is:pr status:failure "platform name"
```

阅读顺序建议：

1. 先看原始复现环境与最小样例。
2. 区分维护者确认、社区猜测和提问者自我解决。
3. 检查关闭原因：`completed` 与 `not planned` 不能混为“已解决”。
4. 沿 linked PR/commit 查看实际代码，不只读最后一条评论。
5. 看 review 中被拒绝的方案，它往往暴露隐藏约束。
6. 再查 release/tag；merged 不等于已交付。

## 4. 用历史回答“为什么”

GitHub 的 Blame 视图提供逐行修订历史、commit 信息和文件旧版本。AI 可先定位关键行，再沿 commit 阅读上下文。但需防止三种误读：

- Blame 只显示最后修改者，不自动等于设计者。
- 格式化或搬迁 commit 会遮蔽真正的语义来源。
- Commit message 是作者说明，仍需与 diff、测试、Issue 互证。

调研输出应固定到 commit 或 tag。只给 main 分支 URL 会随时间漂移，几周后可能无法复核。

## 5. 判断仓库“活着”不能只看最后提交

GitHub Pulse 可按时间窗口汇总 open/merged PR、open/closed Issue 和默认分支 commit 活动。CHAOSS 的入门项目健康模型提出四类有用指标：首次响应时间、变更请求关闭情况、Bus Factor、发布频率。

这些指标要组合解释：

- 高频 commit 可能只是机器人更新。
- Issue 多可能代表受欢迎，也可能代表积压。
- 低发布频率对稳定库可能正常，对安全敏感依赖可能危险。
- Bus Factor 是持续性风险线索，不是对维护者个人的评价。

所以 AI 应报告时间窗口、样本和异常值，不生成脱离上下文的“健康分”。

## 6. Release 是证据链的交付边界

GitHub Release 基于 tag，而 tag 日期可以不同于 release 日期。检查时至少记录：

- 安装的版本号与 tag/SHA；
- release note 是否明确包含目标修复；
- 目标 PR merge 日期是否早于 tag；
- 是否有 pre-release、撤回或后续回归；
- 下载 asset 与源码归档的来源；
- 安全修复是否同时发布 advisory。

现场演示可以故意展示一次错误推断：只看到 merged PR 就宣布问题解决，然后再查 Release，发现当前安装版本尚未包含它。这比讲“要注意版本”更有记忆点。

## 7. 套到 WPS 案例

WPS 插件案例可选 `InsertParagraphAfter` 或图表能力作为完整演示：

1. 从错误行为或能力目标出发，而非从仓库首页出发。
2. 在参考代码、WPS 官方文档和本项目适配器中定位相同概念。
3. 检查参考项目针对的客户端版本与宿主类型。
4. 阅读本地计划、测试与 LEARNINGS，恢复“为什么改”的历史。
5. 在 WPS 真实客户端执行；Browser mock 只验证业务协议，不证明宿主 API 行为。
6. 把失败方案也写入资产库，避免下一位 Agent 重走。

## 来源

- [GitHub：Filtering and searching issues and pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests)
- [GitHub：Viewing and understanding files](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files)
- [GitHub：About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [GitHub：Using Pulse](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/using-pulse-to-view-a-summary-of-repository-activity)
- [CHAOSS：Starter Project Health Metrics Model](https://www.chaoss.community/starter-project-health-metrics-model/)
