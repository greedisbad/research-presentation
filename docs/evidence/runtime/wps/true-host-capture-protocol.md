# WPS 真机证据采集协议

## 当前探测结果（2026-09-08）

| 项目 | 结果 |
|---|---|
| WPS 安装 | `/Applications/wpsoffice.app` |
| WPS 版本 | `12.1.24031`（bundle build `24031`） |
| macOS 插件配置 | `~/Library/Containers/com.kingsoft.wpsoffice.mac/Data/.kingsoft/wps/jsaddons/publish.xml` 存在，但当前无插件条目 |
| PPT 插件入口 | `wps-plugin-ppt`，`addonType: wpp`，开发端口 `3889` |
| 模型配置 | UI 需要 Base URL、Model、API Key；本资料库不保存密钥 |
| 可用旧截图 | 未发现能证明本插件在 WPS 中生成 PPT 的既有截图 |
| 本轮状态 | 未执行真机生成；没有用 Browser mock 替代宿主证据 |

当前阻塞不是“本机没有 WPS”，而是插件尚未登记到 WPS，且完成 AI 生成需要用户自己的模型端点与密钥。安装插件会修改用户的 WPS 配置，密钥输入也不应由研究资料库代管，因此本轮先冻结可复现的采集协议。

## 要验证的最小主张

只验证以下限定主张：

> 在 WPS 12.1.24031 的演示文稿宿主中，当前插件能加载，并能把一组固定的 `SlideSpec` 转换为原生、可再次编辑的幻灯片对象。

不在同一次实验中声称：视觉质量优秀、跨版本兼容、任意提示均能稳定生成、性能达到某个阈值。

## 固定输入

为减少模型随机性，优先绕过自由生成，使用与自动测试相同协议的一组固定 `SlideSpec`：

1. 封面：标题“AI 辅助技术调研实践”，副标题“证据链真机测试”；
2. 流程：5 个步骤“问题—搜索—筛选—验证—沉淀”；
3. 对比：左侧“网页摘要”，右侧“源码/运行证据”；
4. 结论：一句“搜索结果必须经过当前宿主约束筛选”。

若当前 UI 不能直接注入固定 spec，再使用模型输入，但必须保存模型、端点类型、提示词和最终工具参数；API Key 永不进入截图、日志或仓库。

## 操作步骤

1. 备份现有 `publish.xml`，再通过项目的 `wpsjs debug` 或等价本地插件条目登记 `wpp` 插件；记录实际 URL。
2. 启动开发服务，确认 `http://localhost:3889/` 与 `ribbon.xml` 可访问。
3. 打开 WPS 演示文稿，新建空白文件；在“关于 WPS”或应用信息中截取版本。
4. 确认加载项 Ribbon 出现，打开“AI 生成 PPT”面板。
5. 执行固定输入，保存从工具调用到 WPS 对象创建的控制台摘要；日志不得包含 Authorization header。
6. 对生成结果执行三项人工操作：选中标题文本并修改一个字、拖动一个形状、保存后重新打开。
7. 记录页面数量、每页主要对象数、三项编辑是否成功、控制台功能性错误。
8. 退出实验后，根据用户选择恢复原 `publish.xml` 或保留开发条目。

## 必备证据文件

建议统一保存到本目录，文件名不得含账户、内网域名或密钥：

| 文件 | 必须看到什么 | 能证明什么 |
|---|---|---|
| `wps-version.png` | WPS 应用与版本 `12.1.24031` | 宿主版本 |
| `wps-addon-loaded.png` | 演示文稿、Ribbon、插件面板同屏 | 插件在真实宿主加载 |
| `wps-generated-deck.png` | 缩略图栏与生成页面 | 生成结果存在于 WPS |
| `wps-object-edit.png` | 选中原生文本/形状后的编辑状态 | 结果不是不可编辑截图 |
| `wps-true-host-report.json` | 环境、输入哈希、结果、错误和人工检查 | 机器可读审计摘要 |

静态截图不能单独证明“生成过程稳定”。至少同时保留机器报告与保存/重开后的人工检查。

## 报告字段

```json
{
  "capturedAt": null,
  "osVersion": null,
  "wpsVersion": "12.1.24031",
  "wpsBuild": "24031",
  "pluginSourceSha256": null,
  "pluginUrl": null,
  "modelProviderType": null,
  "modelName": null,
  "promptOrSpecSha256": null,
  "slideCount": null,
  "editableText": null,
  "movableShape": null,
  "saveAndReopen": null,
  "functionalErrors": [],
  "visualReview": {
    "status": "NOT_RUN",
    "notes": []
  }
}
```

## 进入演示的门禁

- 四张必备截图与报告齐全：W04 可从 **CONDITIONAL** 升为 **READY**；
- 只证明插件加载、未生成：仅能讲宿主接入，不能讲模板落地；
- 生成成功但不能编辑或重开失败：保留为失败证据，不包装成成功案例；
- 未完成真机：W04 仍可讲“参考如何转成协议和 mock 门禁”，但必须在同页写“WPS 真机未验收”。
