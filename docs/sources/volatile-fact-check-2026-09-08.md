# 易变事实复核（2026-09-08）

## 范围与原则

本轮只复核可能影响 S 级主线的易变事实：产品能力、官方链接、目标版本、依赖版本、外部仓库维护/许可证，以及会随时间变化的数字。Stars、播放量、点赞量等热度数字即使能够取得，也不进入核心论证。

时间口径均为 2026-09-08（Asia/Shanghai）。当前网页只能证明访问日状态；历史实现判断仍优先绑定目标版本源码和本地运行快照。

## 复核总表

| 对象 | 待核事实 | 当日结果 | 演讲处理 |
|---|---|---|---|
| Deck.gl | `v9.1.12` 是否存在 | 官方 Git tag 存在，commit `b68c74b…` | 继续固定 9.1.12，不拿最新文档代替版本事实 |
| Deck.gl IconLayer | 角度单位与 accessor | 当前官方文档仍为 `getAngle`、degree；9.1.12 shader 仍可读取到 degree→radian | 主体讲证据分工，API 名只留附录 |
| Deck.gl 9.1 | uniform block 迁移 | 官方 What's New 说明 9.1 shader 转向 uniform buffers；9.1.12 `BrushingExtension` 使用 `setShaderModuleProps`，shader module 有 `uniformTypes` | D02 的“相邻范式”成立，绑定 9.1.12 |
| Deck.gl 生命周期 | 同 `id` 新实例复用状态 | 当前官方 Using Layers 页面仍明确描述匹配与状态转移 | 可讲公开契约，不表述成性能基准 |
| Chrome Side Panel | API 入口 | 官方页面 HTTP 200 | T01 可继续把平台能力路由到官方文档 |
| Chrome tabGroups | 分组 API 与空组行为 | 官方文档可检索；`onRemoved` 仍说明组关闭或零标签时触发；一次 curl 超时不视为链接失效 | 空组语义继续标“平台事实 + 产品语义”双问题 |
| Chrome Service Worker | 动态 `import()` | 官方文档 HTTP 200，仍说明 dynamic import 不支持 | Tabloom 历史错误解释仍有官方支持 |
| WPS 加载模型 | 官方入口 | `open.wps.cn/previous/docs/client/wpsLoad` HTTP 200；页面路径本身标记 previous | 可作官方入口，但必须标旧版文档，真机仍是最终裁决 |
| WPS JS API v19 | API 参考入口 | `qn.cache.wpscdn.cn/encs/doc/office_v19/index.htm` HTTP 200 | 只用于对象检索，不据此声称当前 macOS 全兼容 |
| WPS 本机宿主 | 版本 | 本机 app bundle 为 `12.1.24031` / build `24031` | 真机报告必须绑定该版本 |
| WPS 工程依赖 | 安装解析版本 | lockfile：Vite 5.4.21、Vitest 2.1.9、Vue 3.5.29、wpsjs 2.2.3 | 不把 catalog 范围误写成实际解析版本 |
| B 站样本 | 标题、作者、时间、时长、字幕 | view/player API 当日返回 code 0；标题、作者、cid、1367 秒、单 P 与 0 条公共字幕均和 9 月 5 日一致 | V02 单样本主链保持可用 |
| 作者文章 | 回链可达性 | `tyksworks.com/posts/ai-coding-workflow-zh/` HTTP 200 | 仍标“同作者一手文字”，不是独立互证 |

## Deck.gl：当前文档与目标版本必须分开

### 当日官方状态

- [IconLayer 当前 API](https://deck.gl/docs/api-reference/layers/icon-layer) 仍把 `getAngle` 定义为 degree；
- [Using Layers](https://deck.gl/docs/developer-guide/using-layers) 仍说明创建同 `id` 的新 Layer 是更新方式，内部状态会匹配并转移；
- [v9.1 What's New](https://github.com/visgl/deck.gl/blob/master/docs/whats-new.md#deckgl-v91) 记录 9.1 shader 迁移到 uniform buffers；
- 官方仓库当前仍在维护且未归档，GitHub API 报告许可证为 MIT。

### 目标版本复核

`git ls-remote` 确认 `refs/tags/v9.1.12` 指向 `b68c74bb1b77ebaef88c66fa92368c3a9ceb1bec`。直接读取该 tag：

- `modules/layers/src/icon-layer/icon-layer-vertex.glsl.ts` 仍包含 `angle * PI / 180.0`；
- `modules/extensions/src/brushing/brushing-extension.ts` 使用 `setShaderModuleProps`；
- 相邻 `shader-module.ts` 声明 uniform block 与 `uniformTypes`；
- tag 下 LICENSE 为 MIT。

因此 D02 可以说“同版本源码消除了角度换算和 9.1 扩展接线的歧义”。不能说“当前最新版仍应照搬 9.1.12 内部实现”：当前官方主线已到更高版本，内部 API 可能继续变化。

## Chrome：三条平台事实仍成立

官方 Chrome 文档在访问日支持：

1. Side Panel 是扩展可用的界面容器；
2. `chrome.tabGroups` 操作浏览器原生标签组，零标签可导致组被移除；
3. Manifest V3 extension service worker 支持静态 module import 或 `importScripts()`，不支持 dynamic `import()`。

这三项只支持 Tabloom 中相应的平台边界。侧边栏里应该放什么、空组在产品上该如何呈现、模型输出是否有用，仍需要用户反馈和真实实验回答。

## WPS：链接可达不等于当前宿主兼容

两个本地记录的 WPS 官方入口在访问日均为 HTTP 200，但需要保留两层警告：

- `wpsLoad` URL 位于 `/previous/` 路径，是旧版文档入口；
- `office_v19` 是 API 参考版本名，页面可访问不能证明每个对象在 macOS WPS 12.1.24031 中行为一致。

本机 WPS 版本已冻结到真机采集协议。源码 lockfile 的实际解析值与声明范围不同，例如 catalog 写 Vue `^3.4.29`，lockfile 实际为 `3.5.29`；上台若必须讲版本，应使用 lockfile 和运行报告，而不是只读 `package.json`。

## 外部参考：维护状态和许可证是筛选字段

WPS 案例真正进入实现讨论的四个参考仓库，在 GitHub API 当日状态如下：

| 仓库 | 是否归档 | 最近 push（UTC） | API 许可证 | 处理 |
|---|:---:|---|---|---|
| `icip-cas/PPTAgent` | 否 | 2026-09-07 | MIT | 可继续作为 Content Schema/Agent 线索 |
| `yngyken/html-ppt-skill` | 否 | 2026-04-17 | MIT | 只提取 Design Token 思路 |
| `MoneyFool9/slidev-ppt-agent` | 否 | 2026-04-20 | 未检测到 | 只能借鉴思想；复制代码前必须人工核许可证 |
| `likaku/Mck-ppt-design-skill` | 否 | 2026-05-10 | Apache-2.0 | 可研究布局/门禁，复用时履行许可证要求 |

“未归档”和“最近有 push”只表示仓库状态，不证明质量、稳定性或适合 WPS。Stars 是极易变化的发现信号，不参与路线选择。尤其 `slidev-ppt-agent` 当前未被 API 识别出许可证，演讲中的“模式翻译而不是整仓复制”应把许可证也画成筛选条件。

## B 站样本：稳定字段与动态字段分离

9 月 8 日重新请求平台 view/player API：

- 标题、作者 `tyk233`、发布日期、cid、1367 秒、单 P 与公共字幕 0 条均与 9 月 5 日 manifest 一致；
- 当日 view 响应 SHA-256 为 `25f750066df8e6e43ff5d9f8bf8d614f62cce3d80cb57e92ddce511e99b0634d`；
- 当日 player 响应 SHA-256 为 `17bf701831f0c1310abad636dff19cab6020cb143098751a582cc7b026df3935`；
- 播放、点赞和收藏数也可取得，但它们会持续变化且与流程证据无关，不进入演讲。

注意：响应哈希变化并不自动表示核心元数据变化，动态统计字段本身就会改变。演示应引用字段值与采集日期，而不是要求整份 JSON 哈希永久相同。

## 数字与比较措辞清理规则

| 数字/表述 | 是否保留 | 安全写法 |
|---|:---:|---|
| Deck.gl 9.1.12 | 是 | 目标实验版本，不称“最新版” |
| 37/49/58 项测试 | 是 | 当次环境中通过的门禁数量，不代表方法提高了多少质量 |
| 4/4 浏览器路由 | 是 | 2026-09-05 一次采集，不外推跨浏览器/GPU |
| 接近 60 FPS | 否（主体） | 若需要，附测试环境和采样分布；否则只说帧推进 |
| 11 个 WPS 候选 | 是 | 本地研究记录的候选池规模，不称“全网 11 个” |
| 123 份视频 | 限定保留 | 原聚合文档记录；旧原始转写未恢复 |
| 270/1367 秒 | 是 | 当前单样本抽样范围，直观说明未全量转写 |
| Stars、播放/点赞/收藏 | 否（主体） | 只作发现信号，不作质量证据 |
| “最新”“最好”“显著提效” | 默认删除 | 除非冻结前有版本定义、比较基线和测量 |

## 结论

本轮没有发现会推翻 S 级主线的版本变化，但发现三个必须保留的时效边界：Deck.gl 当前文档不能替代 9.1.12 源码，WPS 可达的官方入口包含旧版路径且不能替代真机，外部参考中至少一个核心线索仓库没有检测到许可证。演示冻结时只需重跑本表的高影响字段，不必重新漫游全部书签。

