# D02：Deck.gl 从文档到源码与实验

## 要支持的演讲主张

证据不是一张简单的权威性排行榜。官方文档、目标版本源码、同仓库已运行范式和真实环境实验回答不同问题；调研收敛来自证据和问题的匹配。

## 证据升级链

```text
模型知识提出假设
→ 官方 API 文档确认公开契约
→ Deck.gl 9.1.12 源码确认版本实现
→ 同版本相邻扩展提供已运行范式
→ 真实浏览器裁决当前环境行为
→ 失败反过来触发新的定向检索
```

## 每层证据回答什么

| 证据层 | 本案例中的问题 | 产生的判断 | 它不能单独回答什么 |
|---|---|---|---|
| 模型通用知识 | 可能是 accessor、单位、生命周期还是 shader 问题？ | 快速建立候选假设 | 不能作为 9.1.12 的最终事实 |
| 官方 API 文档 | 公开属性名、参数单位和推荐更新方式是什么？ | 确认公开契约 | 不保证示例在当前项目中已正确运行 |
| 目标版本源码 | 角度转换实际发生在哪里？ | shader 内部执行 degree → radian | 不证明自定义 shader 扩展的所有写法都可用 |
| 同仓库相邻实现 | 9.x 如何声明和传递 shader uniform？ | 用已运行的 `BrushingExtension` 等实现作为版本范式 | 不保证移植时没有接线错误 |
| 真实浏览器 | shader 是否链接，画面是否变化，对象是否可 picking？ | 暴露初版 linking error，并裁决修正版 | 一次运行不能代表全部浏览器/GPU/网络环境 |

## 原始证据与精确位置

### E1：官方文档用于公开契约

- 原文：`/Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md`
- 位置：第 61–72 行。
- 记录的官方入口：IconLayer、GeoJsonLayer、Using Layers、Layer Lifecycle、Performance Optimization、Writing Shaders。
- 用途：分别确认 API 名称、角度单位、同 `id` 图层匹配、`updateTriggers` 与 GPU 动画方向。

### E2：同版本源码用于消除版本歧义

- 原文：同上，第 74–82 行。
- 记录的源码片段：`float angle_radian = angle * PI / 180.0;`
- 可证明：目标版本的 GPU 代码负责从 degree 换算为 radian，调用端不应重复换算。
- 引用限制：当前资料保留了片段与来源说明，未将当时下载的上游源文件快照存入本资料库。

### E3：运行失败促使检索转向“同版本相邻实现”

- 原文：同上，第 84–104 行。
- 历史现象：初版使用旧式裸 uniform，在 Deck.gl 9.1.12 出现 shader linking error。
- 新的检索对象：同版本 `@deck.gl/extensions` 中的 `BrushingExtension` 与 `shader-module.ts`。
- 证据对行动的影响：改为 uniform block、`uniformTypes`、`setShaderModuleProps` 模式后重跑。
- 边界：原始 linking error 日志未保存，只能标注为工程复盘中的历史记录。

### E4：当前可复核的运行结果

- 复盘位置：同上，第 153–238 行。
- 机器可读结果：[`runtime-report.json`](runtime/deckgl/runtime-report.json)。
- 可重跑采集器：[`deckgl_runtime_capture.py`](scripts/deckgl_runtime_capture.py)。
- 当次快照：四个路由都通过 HTTP、帧推进、像素变化、静态层只初始化一次、picking、暂停和无功能性错误等门禁。
- 时间：运行报告捕获于 2026-09-05T08:48:22Z。

## 验证器也需要被审查

首次采集曾把无关的 favicon 404 计为功能失败。修正不是手工忽略红色日志，而是把功能资源错误和非功能资源错误分类，再把判定规则写入采集器。

这支持一个额外但次要的主张：

> 证据是由观察器和规则产生的；门禁变绿不代表判定规则天然正确。

## 候选视觉素材

1. 五阶梯形：假设 → 文档 → 同版本源码 → 相邻实现 → 真实浏览器。
2. “静态看起来合理”与“浏览器 shader linking error”的转折；若无原始日志，必须标成复盘，不伪造截图。
3. [`runtime-report.json`](runtime/deckgl/runtime-report.json) 中任一 route 的 `checks` 字段。
4. [`03-shader-animation.png`](runtime/deckgl/03-shader-animation.png) 只用于展示最终运行台，不将静态截图当成动画证据。

## 候选讲述顺序

1. 承接 D01 的两个假设。
2. 先问“谁能回答这个问题”，再展示证据梯。
3. 在浏览器失败处打断线性叙事：运行结果又产生了一个新的版本问题。
4. 展示检索对象从“Deck.gl shader 教程”收窄为“9.1.12 官方仓库中已运行的 extension”。
5. 以运行报告收束，转入 D03 的多路线比较。

## 一句可迁移结论

> 教程告诉你“有人曾这样做”，同版本源码告诉你“它现在怎样做”，运行环境告诉你“在你的约束下能不能做”。

## 证据边界

- 当前上游文档页可能已变化，演示冻结前需按 9.1.12 版本重新核验。
- 当时的全部搜索式、网页快照和首次 linking error 日志未保存。
- 浏览器报告是一次目标环境快照，不是跨平台性能基准。
- 此切片支持“证据分工和升级”，不支持“读源码总比读文档好”。

2026-09-08 易变事实复核确认：官方 `v9.1.12` tag 仍存在，IconLayer shader 的 degree→radian、BrushingExtension 的 `setShaderModuleProps` 与相邻 shader module 的 `uniformTypes` 均可从该 tag 重新取得。当前官网已随主线版本演进，因此演讲中的实现事实继续绑定 9.1.12，而不以当前文档替代版本源码。详见[易变事实复核](../sources/volatile-fact-check-2026-09-08.md)。
