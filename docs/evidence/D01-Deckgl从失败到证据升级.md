# D01：Deck.gl 从生成失败到证据升级

## 要支持的演讲主张

当 AI 连续生成的实现“看起来差不多、但就是不工作”时，继续修改提示词的边际收益会迅速下降。此时应该把问题拆成可核验的 API、版本、源码和运行时问题。

## 一句话故事

```text
多个 HTML 未达到旋转效果
→ 从视觉描述拆出属性名、角度单位、图层生命周期和更新成本
→ 查官方契约与 9.1.12 源码
→ 设计四条独立路线和错误基线
→ 用结构测试、像素变化、picking 和初始化计数验证
```

## 原始证据清单

### E1：问题与约束被显式化

- 原文件：`/Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md`
- 位置：第 1–27 行附近。
- 可证明：目标版本固定为 Deck.gl 9.1.12；PNG、持续旋转、可拾取、不能全局刷新、接近 60 FPS 和多路线验证都是任务约束。
- 不能证明：这些约束来自何时、哪一份最初用户文档；实验目录未保存原始聊天记录。

### E2：模型假设被拆成两个独立问题

- 原文件：同上，第 29–59 行附近。
- 问题 A：直接使用 `IconLayer` 时，旋转 accessor 是 `getAngle`；`getIconAngle` 属于 `GeoJsonLayer` 上层接口。
- 问题 B：`getAngle` 接收 degree，调用端再次乘 `Math.PI / 180` 会把 360 度压缩成约 6.28 度。
- 展示原则：主讲时不突出 API 名称本身，而突出“把一个模糊失败拆成两个可独立证伪的假设”。

### E3：文档不足时继续查目标版本源码

- 原文件：同上，第 63–104 行附近。
- 官方入口：IconLayer、GeoJsonLayer、Layer Lifecycle、Performance、Writing Shaders。
- 源码证据：目标版本 shader 内执行 degree → radian 转换。
- 反例：GPU 路线最初使用旧式裸 uniform，静态检查看似合理，但 9.1.12 浏览器运行出现 shader linking 错误；继续查同版本 `BrushingExtension` 和 shader module 后修复。

这是本切片最强的“巨人肩膀”证据：不是找到一篇教程照抄，而是把官方文档、版本源码和同仓库范式分别用于不同问题。

### E4：最小实验将多个变量隔离

| 文件 | 被隔离的问题 | 演示意义 |
|---|---|---|
| `01-update-triggers.html` | CompositeLayer 内部更新 | 推荐路线与局部失效机制 |
| `02-transitions.html` | 低频提交 + 插值 | 对照应用层提交频率 |
| `03-shader-animation.html` | GPU uniform | 展示性能路线与版本耦合 |
| `04-baseline-radians.html` | radians vs degrees | 证明单位错误，而非肉眼猜测 |

### E5：验证媒介与主张匹配

- `tests/html-contract.test.js`：证明页面结构、版本、关键 API 和诊断控件存在。
- `lab-common.js`：提供像素签名、自动 picking 和静态层初始化计数。
- 历史复盘记录：四页浏览器运行满足帧数、像素变化、picking、静态层初始化和控制台门禁。
- 2026-09-05 本次复核：使用 Codex 工作区 Node 运行结构测试，结果 `9 passed / 0 failed`。
- 2026-09-05 本次浏览器复核：Chromium 依次加载四页，四页均通过 HTTP、帧推进、像素变化、静态层只初始化一次、自动 picking、暂停控件、Deck.gl 错误、页面错误、资源错误和控制台错误门禁。
- 可复核产物：[`runtime-report.json`](runtime/deckgl/runtime-report.json) 保存机器可读指标；[`01-update-triggers.png`](runtime/deckgl/01-update-triggers.png) 至 [`04-baseline-radians.png`](runtime/deckgl/04-baseline-radians.png) 保存四张静态快照；[`deckgl_runtime_capture.py`](scripts/deckgl_runtime_capture.py) 保存采集逻辑。

本次采集还暴露了一次验证器自身的问题：浏览器最初把无关的 favicon 404 计作页面失败。修正方式不是手工宣告“忽略错误”，而是先把功能资源错误与非功能资源错误分开，再由明确规则处理 favicon。这个插曲适合支撑一个更普遍的观点：**验证器也需要可检查的判定规则，门禁变绿不等于规则天然正确。**

复核命令：

```bash
/Users/wang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --test /Users/wang/Documents/ChatGPT/deckgl-rotation/tests/html-contract.test.js
```

## 事实、推断与证据上限

| 类型 | 内容 |
|---|---|
| 当前事实 | 四个实验文件和九项结构测试存在；本次结构测试与四页浏览器运行门禁全部通过 |
| 历史记录 | 复盘称四页曾在 Codex 浏览器通过运行门禁，GPU 初版曾出现 linking error |
| 方法推断 | 失败驱动的“文档—源码—同仓库范式—实验”能帮助调研收敛 |
| 证据上限 | 目录没有 Git commit，无法从历史 diff 独立重建初版失败；当前截图证明一次目标环境运行，不代表所有浏览器、GPU 或网络环境 |

## 最小上台画面

建议做三联图：

1. 左：原始错误基线或失败描述；
2. 中：`04-baseline-radians.html` 中左右对照的两行关键表达；
3. 右：`04-baseline-radians.png` 或 `runtime-report.json` 的浏览器门禁结果。

页面标题可用：**“提示词开始打转时，让证据链接管。”**

## 现场讲法

> 我没有让 AI 继续凭感觉改动画，而是让它把失败拆成属性、单位、生命周期和性能四个问题。文档告诉我们公开契约，目标版本源码消除版本歧义，同仓库实现给出正确范式，最后由运行实验裁决。具体 API 不重要，重要的是搜索对象随着证据不断升级。

## 后续补证任务

- 若需要展示“初版 shader 失败”，从旧任务记录或终端日志找原始错误；找不到就只作口头复盘并标为历史记录。
- 给实验目录建立 Git 历史只能从现在开始，不能伪造过去提交。
