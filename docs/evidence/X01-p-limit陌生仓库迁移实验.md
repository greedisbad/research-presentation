# X01：p-limit 陌生仓库迁移实验

## Research Brief

- 决策问题：`p-limit` 运行中把 `limit.concurrency` 调低到当前 `activeCount` 以下时，已经运行的任务是否取消，新任务何时继续启动？
- 选择理由：仓库小、问题有状态变化、README/源码/测试/运行实验四种证据可在一次短实验中闭环；开始前未研究过该仓库。
- 候选答案：A. 立即取消超额活跃任务；B. 活跃任务继续，队列等活跃数低于新上限；C. 新上限只影响以后新建的 limiter。
- 排除范围：吞吐量评测、`clearQueue()`、`rejectOnClear`、所有 Node/浏览器版本兼容性。
- 完成标准：固定版本；记录两轮查询；定位公开契约、源码和上游测试；用受控任务序列运行断言；说明未验证边界。
- 停止条件：源码、测试和独立实验对同一行为给出一致结果，且没有相反证据。

## 固定对象

| 对象 | 值 |
|---|---|
| 仓库 | https://github.com/sindresorhus/p-limit |
| tag / package version | `v7.3.2` / `7.3.2` |
| commit | `783068bb9e967fd7bea8642e1bf5a3627fe38bdf` |
| 运行时要求 | `package.json` 声明 Node `>=20` |
| 许可证 | MIT |
| 唯一生产依赖 | `yocto-queue ^1.2.1`；实验固定到 tag `v1.2.1` commit `ce72d41de87b2a4ec7c50e10480300bee674d845` |

访问与实验日期：2026-09-05。

## 第一轮：先画地图，不先通读

最初只读文件列表、`package.json`、README 标题和测试布局。仓库只有入口、类型、测试、README、recipes 与 benchmark 等少量文件，候选入口立即收敛为：

```text
readme.md       公开契约
index.js        真实状态机
test.js         上游行为断言
recipes.md      动态调整使用场景
```

第一轮查询：

```bash
rg -n '^#{1,3} |concurrency|activeCount|pendingCount|clearQueue' tmp/p-limit/readme.md
```

该文件命中 23 行。README 88–109 行只承诺 `activeCount`、`pendingCount` 和 concurrency 可读写；102 行关于“不取消运行任务”的说明属于 `clearQueue()`，不能直接当作降低并发的契约。这是第一轮最重要的防误读点。

## 第二轮：用真实符号收窄

从第一轮得到 `activeCount`、`pendingCount`、setter 等真实词汇后查询：

```bash
rg -n 'concurrency|activeCount|pendingCount|resumeNext|queueMicrotask' \
  tmp/p-limit/index.js tmp/p-limit/test.js
```

### 源码位置

- `index.js` 19–25：`resumeNext()` 仅在 `activeCount < concurrency` 时从队列启动任务。
- `index.js` 27–30：任务结束先减少 `activeCount`，再调用 `resumeNext()`。
- `index.js` 91–104：setter 校验并替换上限，在 microtask 中只尝试补充队列；没有取消或中断活跃任务的路径。

### 上游测试位置

- `test.js` 337–354：从 4 降到 2；日志先出现 1、2、3、4，随后才稳定为 2，说明已运行的四个任务没有被削减到两个。
- `test.js` 356–373：升高并发时立即补充任务，作为 setter 的另一方向对照。

这一轮将答案 B 提升为强假设，并排除了 A、C。

## 独立最小实验

脚本：[`concurrency-change.mjs`](experiments/p-limit/concurrency-change.mjs)
结果：[`runtime-report.json`](experiments/p-limit/runtime-report.json)

实验把 5 个任务放入初始并发为 3 的 limiter。前三个任务启动后把并发降为 1，再由测试代码逐个释放：

```text
初始：active=3, pending=2, concurrency=3
降级：active=3, pending=2, concurrency=1
任务1结束：active=2, pending=2
任务2结束：active=1, pending=2
任务3结束：任务4才启动，active=1, pending=1
任务4结束：任务5启动
完成：active=0, pending=0
```

运行命令：

```bash
PATH=/Users/wang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH \
  node docs/evidence/experiments/p-limit/concurrency-change.mjs
```

脚本使用 Node 24.19.0，直接导入固定 commit 的 `index.js`，并对事件顺序和每一步计数执行断言；结果 `passed: true`。

## 环境失败路径

系统默认 Node 为 14.17.6，不满足项目声明的 Node `>=20`。使用系统 npm 安装依赖后没有得到可用依赖树；切换 Node 24 后尝试 pnpm 全量及 production-only 安装，解析数百个开发依赖时多次出现 registry `ECONNRESET`，约数分钟无稳定完成，因此主动停止。

为避免把“安装失败”误写成“项目测试失败”，本轮明确区分：

- 上游完整 `xo && ava && tsd`：**未运行**；
- `test.js` 中对应测试：**已静态定位，未执行 AVA**；
- 固定源码 + 固定唯一生产依赖 + 独立断言实验：**已运行通过**。

这条失败路径本身说明：先读取 `engines` 与依赖结构应当成为陌生仓库实验的前置门禁。

## 六节点证据谱系

| 节点 | 本实验内容 |
|---|---|
| 决策问题 | 降低 concurrency 是否取消活跃任务，队列何时恢复 |
| 查询/定位 | README 初筛 → 用真实状态/函数名搜源码与测试 |
| 原始来源 | p-limit v7.3.2 的 README、`index.js`、`test.js` |
| 证据片段 | setter、`resumeNext()`、降低并发的上游测试 |
| 转换规则 | 从控制流推导可观察事件序列，并设计 deferred tasks 隔离时间因素 |
| 验证结果 | 事件 JSON 与 Node assert 一致支持答案 B |

## 文件指纹

| 文件 | SHA-256 |
|---|---|
| `tmp/p-limit/index.js` | `63239cd9ae80b1433e05014fe6ec501475c6fa59fad06418cb5972dbc7cc14e2` |
| `tmp/p-limit/test.js` | `9c9fe3a3d5054ac742d60db9684f076fe9f3ac538eba5c2884944caa418d1a52` |
| `tmp/p-limit/readme.md` | `d319b5cd690ff94a7957a225aa449b297e8bfc545767d8fa23dbb11c6a2afc85` |

## 裁决与证据上限

- 当前问题：**FULL**。文档、源码、上游测试意图和本地运行实验一致支持：降低并发不取消活跃任务；只有当完成使 `activeCount` 低于新上限，队列才继续。
- 上游完整测试状态：**UNKNOWN**，依赖安装未完成；不能声称 v7.3.2 全部测试在本机通过。
- 外推限制：没有测试 `Infinity`、异常任务、`clearQueue()`、并发多次震荡、浏览器或旧 Node。
- 因果限制：单次案例不能证明这套调研协议普遍节省时间。

## 对演讲的价值

这是第一条不依赖用户既有案例的迁移实验。最值得上台的不是 p-limit 结论，而是查询如何进化：

```text
自然语言问题
→ README 暴露真实概念
→ 状态名/函数名收窄源码与测试
→ 控制流变成可观察事件
→ 最小实验裁决
```

推荐度：A。可作为 Deck.gl 之后的 60 秒短证据，证明方法不是只对熟悉案例进行事后包装。
