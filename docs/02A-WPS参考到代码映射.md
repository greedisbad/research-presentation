# WPS 案例：参考资产到代码与验证的映射

本表用于回答一个关键问题：AI 找到的资料，最终在哪里改变了项目？

| 研究发现或参考资产 | 决策/转化 | 实现位置 | 验证或反证 | 演示度 |
|---|---|---|---|:---:|
| PPTAgent 的 Content Schema、布局选择思想 | 将自由坐标操作提升为语义模板工具 | `wps-plugin-ppt/src/agent/tools.ts` 中 `apply_template`；`slide-tool-adapter.ts` 中模板参数 | `wps-plugin-ppt/src/agent/__tests__/tools.test.ts` | S |
| Mck 设计 Skill 的布局坐标、字符预算与门禁 | 把视觉经验转成 `layout-rules.ts` 与 Prompt 约束 | `wps-plugin-ppt/src/agent/layout-rules.ts`、`prompts.ts` | Agent Loop 测试检查系统 Prompt 含模板工具；仍需渲染检查 | S |
| HTML PPT 的 Design Tokens | 抽象共享主题而非复制 HTML/CSS 运行时 | `shared/agent/themes.ts`；各插件 `prompts.ts` 调用 `themeToPrompt` | 代码级共享；视觉效果需 WPS 真机 | A |
| page-agent 的 Agent Loop/状态重组思想 | 形成共享 Agent 编排、步骤历史与工具适配 | `shared/agent/agent-loop.ts`、`step-history.ts`、`tool-adapter.ts` | `shared/agent/__tests__/step-history.test.ts` 和各插件 Agent 测试 | S |
| 测试环境不能依赖真实 WPS | 定义统一 Adapter，由 Browser mock 和 WPS 实现互换 | PPT `slide-tool-adapter.ts` + `adapters/*`；Word/Excel 同构目录 | Browser adapter 与 tools 单元测试 | S |
| python-docx 的 Document→Paragraph→Font 模型 | 只借用工具语义，用 WPS 运行时对象实现 | `wps-plugin-word/src/agent/word-adapter.ts`、`tools.ts`、`adapters/wps-word-adapter.ts` | Browser 测试 + 运行时日志；缺少完整 TS 类型 | S |
| 相邻 VBA 经验：`Range.InsertAfter('\r')` | 最初照用，实际不能创建预期的新段落；改为 `InsertParagraphAfter()` | `wps-plugin-word/src/agent/adapters/wps-word-adapter.ts` | 运行时故障是反证；Learnings 记录根因 | S |
| Prompt 中要求批量操作 | 实测模型仍逐段调用，改为接口接受索引数组 | `wps-plugin-word/src/agent/tools.ts` 中索引规范化与批量循环 | `tools.test.ts` 覆盖 `[1,2,3]` 等数组参数 | S |
| Excel Chart 经验被误用于 PPT MsoChart | 从类型声明定位对象模型差异，但最终发现数据注入仍不可靠 | 历史方案见 Phase 07；规则写入根 `AGENTS.md` | Phase 07 `PLAN.md` 标记放弃，多图表与范围绑定失败 | S |
| WPS 官方 Ribbon/加载项模型 | 新按钮必须贯穿 XML、handler、router 与 pane | 三个插件的 `public/ribbon.xml`、`components/ribbon.js`、`router`、Pane | 真机发现缺文件/路由后修复；根 `AGENTS.md` 固化四文件规则 | A |

## 映射中暴露的研究层级

### 直接复用

适用于工具签名、对象层级、设计常量等稳定且可翻译的资产。

### 借鉴模式

例如 Agent Loop、双适配器、Content Schema。需要根据当前代码边界重新实现。

### 产生假设

例如 VBA 和 Office 相邻 API。只能用来设计运行时探针，不能直接当成 WPS 事实。

### 被实验推翻

例如 PPT 图表数据注入和只依靠 Prompt 实现批量操作。被推翻的方案应保留原因，避免下次重复搜索和实现。

## 建议上台用的一张图

```text
11 个参考项目
      ↓ 评分与拆解
4 类可借用资产
  布局 / 主题 / Agent / QA
      ↓ 当前约束翻译
WPSJS Adapter + Tool Schema + Tests
      ↓ 运行时反馈
保留 / 修改 / 放弃
      ↓
AGENTS.md + Learnings + 下一阶段计划
```

这比展示最终代码量更能说明 AI 调研的复利价值。
