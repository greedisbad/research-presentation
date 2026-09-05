# 来源卡：W3C PROV-O

- 标题：PROV-O: The PROV Ontology
- 机构：W3C Provenance Working Group
- 状态：W3C Recommendation，2013-04-30
- 链接：https://www.w3.org/TR/prov-o/
- 访问日期：2026-09-05
- 来源等级：L1，正式标准

## 支持的主张

- provenance 可以用 Entity、Activity、Agent 三类基本对象描述。
- `used`、`wasGeneratedBy`、`wasDerivedFrom` 等关系可以组成来源与加工链。
- 标准区分引用、修订、派生和 primary source 等不同关系。

## 对本项目的转化

不引入 RDF 实现，只借其概念模型审视资料库：网页、源码、转写和结论是实体；搜索、摘要和实验是活动；人、模型和脚本是责任主体。由此把“有来源”升级为“可重建的证据生产关系”。

## 局限

PROV-O 说明怎样表达 provenance，不评价技术结论是否真实，也不规定日常技术调研必须记录多少细节。本项目的六节点轻量链是方法迁移，不是 W3C 原文要求。

## 演示建议

推荐度：A。正文只展示 Entity—Activity—Agent 三节点与一条本地案例链；标准属性名放附录。
