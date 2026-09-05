# W03：WPS 把失败路线保存为可复用知识

## 要支持的演讲主张

技术调研的产物不只包含“最终怎么做”，还应保存“什么在什么条件下不工作”。负知识能避免下一个 Agent 重复走入看似合理的路线。

## 切片 A：相邻 API 只能产生假设

### 初始路线

Word 插入段落时借用了 VBA/Office 相邻经验：

```text
Range.InsertAfter('\r' + text)
```

### 运行时反证

- `tmp/wps-ai-plugin-main/.planning/phases/09-excel-word-agent/09-LEARNINGS.md` 第 43–48、75–80 行附近记录：文本进入已有段落末尾，`getParagraphs` 看不到新段落，Agent 因此重复操作。
- 当前修复：`wps-plugin-word/src/agent/adapters/wps-word-adapter.ts` 第 145–160 行附近先调用 `InsertParagraphAfter()`，再设置新段落文本。

### 可迁移结论

相邻生态的文档可以用于生成候选假设，但目标环境的运行证据负责升级为事实。尤其当 TypeScript 声明不完整时，编译通过或自然语言相似都不够。

## 切片 B：记录“放弃”也是工程成果

- `tmp/wps-ai-plugin-main/.planning/phases/07-ppt-charts/07-CONTEXT.md`
- `tmp/wps-ai-plugin-main/.planning/phases/07-ppt-charts/07-PLAN.md`
- `tmp/wps-ai-plugin-main/.planning/ROADMAP.md` Phase 07。

这些材料明确将 PPT 图表路线标为放弃：PPT `MsoChart` 与 Excel `Chart` 对象模型不同；COM Dispatch 虽能绕过部分限制，但多图表冲突与范围绑定不准确使数据注入不可靠。

应上台讲“为什么保存放弃路线”，不讲对象模型细节：

- 后续 Agent 搜索到 Excel 示例时会知道它不是已验证路径；
- 失败条件绑定具体对象和运行环境，而不是笼统写“图表做不了”；
- 如果版本升级，可以针对已知失败点重新做最小实验，而非从零调查。

## 切片 C：事故经验进入项目规则

根目录 `tmp/wps-ai-plugin-main/AGENTS.md` 固化了：

- PPT `MsoChart` 与 Excel `Chart` 的区别；
- Ribbon 新按钮需要同时贯穿 XML、handler、router 与 pane；
- 具体历史案例和检查位置。

这展示了从“会话里的教训”到“下一次 Agent 启动即读取的工作约束”的沉淀过程。

## 事实、推断与证据上限

| 类型 | 内容 |
|---|---|
| 当前事实 | 修复代码、放弃计划、Roadmap 状态和项目规则都存在 |
| 历史记录 | Learnings 描述了死循环、真机故障和多次修复过程 |
| 方法推断 | 保存负知识可降低未来重复探索 |
| 证据上限 | 缺原始会话日志和有/无负知识的对照数据，不能声称节省了具体时间或 token |

## 最小上台画面

用一个“假设升级阶梯”：

```text
相邻 API 经验（候选）
→ WPS 运行异常（反证）
→ 目标环境修复（事实）
→ LEARNINGS + AGENTS.md（可复用负知识）
```

页面标题：**“找到不能走的路，也是在站上巨人的肩膀。”**
