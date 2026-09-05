# 来源卡：开源参考与供应链安全

- 访问日期：2026-09-03
- 演示推荐度：A
- 回答的问题：AI 找到一个公开仓库以后，如何判断能否学习、复制或作为依赖引入？

## 已核验事实

1. GitHub 官方许可证说明指出，无许可证仓库仍适用默认版权；公开可见与 fork 权限不等同于获得复制、分发和衍生授权。
2. GitHub Code Search 支持精确短语、布尔表达式、正则及 repo、path、language、symbol、content、license、is 等限定符。
3. GitHub Dependency Graph 从支持的 manifest/lockfile 识别依赖关系，并连接依赖审查、安全告警与 SBOM 等能力。
4. OpenSSF Scorecard 对开源项目执行多项自动化供应链检查；检查结果是风险线索，而不是保证项目安全的认证。
5. OSV 提供按包版本和 commit 查询漏洞的开放接口，并强调精确表达受影响版本范围。

## 工程转化

- 将“仓库推荐”改造成有字段、有否决条件的候选表。
- 将“看起来安全”改成对精确依赖版本、传递依赖和单项安全证据的检查。
- 将许可证检查放在 AI 复制或改写代码之前，而非上线之前补做。

## 限制

- 自动化评分无法判断项目是否适合具体业务，也不能替代人工代码审查。
- 漏洞库可能存在披露延迟；查不到漏洞不等于没有漏洞。
- 本材料不是法律意见。

## 来源

- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
- https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax
- https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph
- https://scorecard.dev/
- https://google.github.io/osv.dev/
