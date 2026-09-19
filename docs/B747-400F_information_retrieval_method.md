# B747-400F 货舱资料：检索方法、关键词设计与 Google 复刻指南

> 目标：说明本次 B747-400F 主货舱/下货舱资料是如何一步步检索出来的，重点不是最终数据，而是“如何从一张舱位图反推出正确的行业关键词，再找到高质量原始资料”的方法。
>
> 本文可以直接作为以后查询飞机装载、ULD、Cargo Loading Manual、Weight & Balance、Contour 等技术资料的检索模板。

---

## 1. 这次检索的核心思路

这次最有效的方法不是直接搜索：

```text
B747-400F 每个货舱尺寸
```

这种自然语言查询太宽泛，Google 很容易给出：

- 航空公司宣传页
- 机型参数
- 最大载重
- 舱门尺寸
- ULD 通用介绍
- 货运代理复制粘贴的数据

但这些并不能回答：

> LR、LL、PL、A1、A2 到底是什么形状？
> 每个 position 应该使用哪一种 contour？
> H4M 和 HPL 有什么区别？

真正有效的方法是：

**先从已知图片中提取专有名词 → 用专有名词搜索 → 从搜索结果中发现新的专有名词 → 再继续反查。**

本次检索链条大致是：

```text
顺丰 B747-400F 舱位图
        ↓
发现位置代码：
A1 / A2 / B1 / CR / CL / LR / LL / PR / PL / QR / QL / 11P...
        ↓
搜索：
"B747-400F" "LR" "LL" "PL"
        ↓
找到其他航空公司/货运资料
        ↓
发现 contour 名称：
Q6 / Q7 / PA1 / PA2 / PMD / H4M / HPL / PEB
        ↓
再用 contour 名称搜索：
"B747-400F" "H4M"
"B747-400F" "HPL"
"PA1" "1.55" "1.22" "747-400F"
        ↓
找到中国货运航空 CKair 的官方设备说明
        ↓
得到：
位置 → contour code → 尺寸 → 收口参数
        ↓
继续搜索下舱：
"SIZE CODES A, M & N"
"11P" "12P" "21P" B747-400F
        ↓
找到 Cargo Handling Manual / 学术资料 / 其他运营商配置
```

这就是整个过程最重要的检索逻辑。

---

# 2. 第一阶段：从用户给的顺丰图片出发

原始图片：

```text
https://www.sf-airlines.com/sf/upload/2026-07-21/17846255080528a3887529ed38db5957019f83f82ed44fd2.png
```

首先不要急着搜索尺寸，而是观察图片上的**稀有字符串**。

比如：

```text
A1
A2
B1

CR CL
DR DL
ER EL
FR FL
GR GL
HR HL
IR IL
KR KL
LR LL
MR ML
PR PL
RR RL
SR SL
T

QR QL

11P
12P
21P
22P
23P

SIZE CODES A, M & N
```

这些字符串比“747货舱”有价值得多。

原因是：

`LR`、`PL`、`11P` 这样的代码很可能直接来自 Boeing 的 Weight & Balance / Loading Manual。

当你把它们和机型名称放在一起搜索时，就能进入真正的专业资料层。

---

# 3. 第一批实际使用的搜索关键词

最开始针对顺丰自身进行了搜索，例如：

```text
site:sf-airlines.com "B747-400F" "M11" LR
```

以及：

```text
site:sf-airlines.com "B747-400F" "A1" "PL" "QR"
```

这里用了 Google 的：

```text
site:
```

操作符。

它的意义是：

> 只在指定网站内部搜索。

例如：

```text
site:sf-airlines.com B747-400F
```

只搜索顺丰航空网站。

---

# 4. 为什么搜索多个位置代码，而不是单独搜 “B747-400F”

因为：

```text
B747-400F
```

结果太多。

而：

```text
"B747-400F" "LR" "LL" "PL"
```

会极大降低无关结果数量。

这是信息检索中一个非常重要的技巧：

## 使用“低频共现词”

比如以下三个字符串单独看都很普通：

```text
LR
LL
PL
```

但：

```text
"B747-400F" "LR" "LL" "PL"
```

一起出现时，几乎肯定是在讨论：

```text
B747-400F cargo loading positions
```

而不是普通网页。

Google 对这种查询特别有效。

---

# 5. 第二阶段：开始搜索 position / contour

使用过的查询包括：

```text
"B747-400F" "LR" "LL" pallet position contour
```

以及：

```text
"B747-400F" "PL" "113" "118" main deck pallet
```

为什么会想到 `113` 和 `118`？

因为在查询过程中发现：

- B747-400F 普通主货舱高板常见最大高度为 118 in
- 主货舱侧门附近存在 113 in 限制

所以数字本身也变成搜索关键词。

这是第二个重要方法：

> **当你在一份可信资料里发现一个罕见数字，把这个数字反过来当搜索关键词。**

例如：

```text
"B747-400F" "113" "118"
```

比：

```text
B747 cargo height
```

精准得多。

---

# 6. 第三个突破点：发现 contour code

真正让检索进入高质量资料层的是这些词：

```text
PA1
PA2
PMD
H4M
HPL
PEB
```

尤其是：

```text
H4M
HPL
```

这两个词非常罕见。

于是进一步搜索：

```text
"B747-400F" "H4M" "HPL" "PA1" "PA2"
```

以及：

```text
"H4M" "3.18" "2.44" 747-400F cargo
```

```text
"HPL" "2.87" 747-400F
```

```text
"PA1" "1.55" "1.22" 747-400F
```

```text
"PA2" "1.70" "0.40" 747-400F
```

这类查询最终非常容易命中：

## 中国货运航空设备说明

```text
https://www.ckair.com/equipment-specification-400F.html
```

该页面非常关键，因为它不是只告诉你“ULD 多高”，而是直接提供：

```text
版型
代码
装载位置
尺寸限制
正视图
侧视图
```

也就是：

```text
Position → Contour Code → Geometry
```

这正是我们要找的数据结构。

---

# 7. CKair 页面解决了什么问题

该页面公开给出了：

## PEB

```text
位置：Q
尺寸：
2.23 × 1.34 × 1.50 m
```

## PMD

```text
位置：
A2, B1, C, D

高度：
2.44 m

无收口
```

## PA1

```text
位置：
A1

尺寸：
3.18 × 2.44 × 2.44 m

1.55 m 处开始收口
短边两侧各收 1.22 m
```

## PA2

```text
位置：
A2

尺寸：
3.18 × 2.44 × 2.44 m

1.70 m 处开始收口
短边两侧各收 0.40 m

仅从鼻门装载时使用
```

## H4M

```text
位置：
E 至 T
不含 PL

尺寸：
3.18 × 2.44 × 3.00 m

2.44 m 处收口
收 78 cm
```

## HPL

```text
位置：
PL

尺寸：
3.18 × 2.44 × 2.87 m

2.44 m 处收口
收 78 cm
```

这就是为什么这个网页比很多所谓“747 cargo dimensions”网页价值高得多。

它直接使用了运营和装载部门的语言。

---

# 8. 如何想到搜索 H4M

这也是整个检索过程中最值得学习的一步。

假设 Google 搜索结果或者网页中出现：

```text
H4M
```

不要把它当成一个普通型号看过去。

应该立即判断：

> 这个字符串是不是一个“内部分类代码”？

判断标准：

- 很短
- 字母数字混合
- 在表格“代码”栏出现
- 跟具体舱位对应
- 普通英语中没有意义

满足这些特征，就非常值得单独搜索。

例如：

```text
"H4M"
```

结果可能还是比较杂。

于是增加上下文：

```text
"H4M" 747
```

再进一步：

```text
"H4M" "747-400F"
```

再进一步：

```text
"H4M" "3.18" "2.44"
```

这种做法可以称为：

## “术语锁定”

先找到罕见术语，再逐步增加已知约束。

---

# 9. 为什么数字也是很强的关键词

例如：

```text
HPL = 2.87 m
```

2.87 不是航空货运网页中随处出现的数字。

所以：

```text
"HPL" "2.87"
```

是非常强的查询。

同理：

```text
PA1
1.55
1.22
```

一起搜索：

```text
"PA1" "1.55" "1.22" "747-400F"
```

几乎形成了一个“数字指纹”。

这个方法特别适合：

- 工程参数
- 标准
- 机械规格
- 航空资料
- 法规
- 产品零件
- 学术论文

可以称为：

## 数值指纹检索

---

# 10. 第四阶段：搜索下货舱 Size Code

顺丰图里有一段非常关键：

```text
SIZE CODES A, M & N
```

这种完整短语非常适合直接加引号搜索。

实际检索：

```text
"747-400F" "SIZE CODES A, M & N"
```

以及：

```text
"B747-400F" "Size Code A" "Size Code M" "Size Code N" lower deck
```

这比：

```text
747 lower cargo pallet size
```

强很多。

因为 `Size Code A/M/N` 是 Boeing cargo handling 体系中的技术术语。

---

# 11. 搜索具体下舱位置

然后进一步查询：

```text
"11P" "Size Code" 747
```

```text
"31P" "Size Code" 747
```

以及：

```text
"B747-400F" "11P" "12P" "21P" "22P" "23P"
```

```text
"B747-400F" "31P" "32P" "41P" lower deck
```

这些查询帮助确认：

```text
11P
12P
21P
22P
23P
```

确实是 747 下货舱 position 编号，而不是顺丰自己创造的编号。

---

# 12. 后货舱编号为什么又继续搜索

顺丰图里还出现：

```text
31
32
33
41
42
43
44
45
```

但其他资料经常出现：

```text
31P
32P
41P
42P
```

甚至：

```text
43L
43R
44L
44R
```

这说明可能存在：

```text
不同 ULD configuration
```

于是继续搜索：

```text
"B747-400F" "33" "43" "44" "45" lower cargo AKE
```

```text
"B747-400F" lower deck "45" "AKE" position
```

```text
"B747-400F" "43L" "43R" "44L" "44R"
```

```text
"B747-400F" "11P" "31P" "43L" "44L"
```

这一步非常重要。

因为如果只找到一个资料就停止，很容易错误地认为：

```text
31～45 都是 PMC pallet position
```

实际上：

> 下舱编号会随着 ULD/配置模式发生变化。

---

# 13. 找到了哪些网站

## 13.1 顺丰航空

用途：

- 确认你所研究的具体机队/运营商布局
- 确认 M 编号和 position code 的关系
- 确认图中实际存在 QR/QL、PL、11P 等位置

域名：

```text
sf-airlines.com
```

---

## 13.2 中国货运航空 CKair

这是本次主货舱 contour 最重要的资料之一。

用途：

- PA1
- PA2
- PMD
- H4M
- HPL
- PEB
- position → contour
- size
- 收口参数
- 正视图 / 侧视图

网址：

```text
https://www.ckair.com/equipment-specification-400F.html
```

Google 可以直接搜索：

```text
site:ckair.com "H4M" "HPL"
```

或者：

```text
site:ckair.com "PA1" "PA2" "747"
```

---

## 13.3 Cargo Handling Manual PDF

检索下舱 Size Code 时找到了公开的：

```text
B747-400 Cargo Handling Manual
```

其中可查：

```text
Size Code A
Size Code M
Size Code N
Size Code K
Size Code L
```

以及 lower deck configuration。

一个公开副本位于：

```text
asiandragonintl.com
```

搜索方式可以是：

```text
"B747-400 Cargo Handling Manual" PDF
```

或：

```text
"B747-400" "Size Code M" "96 x 125"
```

---

## 13.4 UTLink

网址：

```text
https://www.utlink.com/fleet
```

这里可以交叉确认 747-400F 的：

```text
A1
A2
B1
CR CL
LR LL
PL
QR QL
T
```

以及：

```text
Q6
Q7
PMC
PYB
Max Height
Max GW
```

特别适合作为：

> 第二来源交叉验证。

Google：

```text
site:utlink.com "B747-400F" "LR" "LL"
```

---

## 13.5 学术论文

搜索 position 编号时还会出现航空配载优化论文。

例如搜索：

```text
"B747-400F" "11P" "12P" "21P"
```

可以找到哈尔滨工业大学相关论文。

这类论文价值在于：

- 很可能直接引用 Boeing Weight & Balance / Loading Manual
- 会列出 position station
- 会列出重量限制
- 会提供完整 position 表

但论文属于：

## 二级来源

即：

```text
Boeing Manual
↓
学术论文引用
↓
我们
```

因此用于交叉验证很有价值，但如果能找到原始 Boeing 手册，应优先使用原始手册。

---

# 14. 我使用了什么工具

检索过程中主要使用的是：

## Web 搜索引擎

功能类似于：

```text
Google / Bing
```

用于：

- 搜索网页
- 搜索 PDF
- 限定域名
- 查罕见关键词组合

比如：

```text
"B747-400F" "H4M" "HPL"
```

---

## 网页正文读取

找到网页以后，不只是看 Google 摘要，而是进入网页正文，搜索：

```text
H4M
HPL
Position PL
Size Code M
```

这相当于浏览器里的：

```text
Ctrl + F
```

---

## PDF 页面分析

对于 Cargo Handling Manual / 学术论文这种 PDF：

1. 搜索 PDF
2. 打开 PDF
3. 查关键词
4. 定位到对应页
5. 查看该页表格和图

这一步很重要。

只看 Google 搜索摘要不够，因为很多：

- 表格
- 图
- contour
- configuration

不会完整出现在搜索摘要里。

---

## 图片搜索

针对：

```text
H4M
HPL
PA1
PA2
PMD
PEB
```

还进行了图片搜索。

例如：

```text
"H4M" pallet contour 747
```

```text
"HPL" pallet contour 747
```

```text
"PA1" pallet contour 747 cargo
```

这样做的目的不是找漂亮图片，而是：

> 找那些被其他航空公司、货代、训练资料转载过的 contour diagram。

因为原站有时正文能搜到，但图片资源不容易直接读取。

---

# 15. 如何判断一个来源值得信任

我会大致按以下优先级：

## 第一层

### 飞机制造商原始文件

例如：

```text
Boeing Weight and Balance Control Manual
Boeing Cargo Loading Manual
Boeing Weight & Balance Manual
```

这是最高优先级。

---

## 第二层

### 实际运营 B747-400F 的航空公司

例如：

```text
China Cargo Airlines
SF Airlines
Qantas Freight
Martinair
Atlas Air
Cargolux
```

尤其是：

```text
Aircraft Loading Specification
Cargo Equipment Specification
ULD Contour
Loading Configuration
```

这种页面。

---

## 第三层

### Cargo Handling Manual / Ground Handling Manual

如果能确认是针对真实机型/运营方制作的，也非常有价值。

---

## 第四层

### 学术论文

论文如果明确说：

```text
数据来自 B747-400F Weight and Balance Control and Loading Manual
```

可以作为强交叉验证。

---

## 第五层

### 货代 / Aircraft database

适合找线索，但不适合单独作为最终依据。

---

# 16. 搜索中最重要的原则：不要搜“问题”，要搜“答案可能使用的语言”

普通用户会搜：

```text
747货机每个仓位是什么形状
```

但 Boeing 或航空公司不会这样写。

它们会写：

```text
ULD Position
Contour Code
Main Deck Cargo Loading
Pallet Contour
Size Code
Recommended Loading Configuration
Weight and Balance
Cargo Handling Manual
```

因此你应该搜索：

```text
"B747-400F" "pallet contour"
```

而不是：

```text
747 pallet shape
```

搜索：

```text
"B747-400F" "ULD position"
```

而不是：

```text
747 每个仓在哪
```

搜索：

```text
"B747-400F" "loading configuration"
```

而不是：

```text
747 能放多少托盘
```

---

# 17. 英文关键词非常重要

即使目标资料来自中国航空公司，也推荐优先使用英文行业术语。

建议记住：

| 中文概念 | 推荐检索词 |
|---|---|
| 舱位 | position / cargo position / ULD position |
| 货盘 | pallet |
| 集装器 | ULD |
| 轮廓 | contour |
| 限制轮廓 | allowable contour / pallet contour |
| 主货舱 | main deck cargo |
| 下货舱 | lower deck cargo / lower hold |
| 装载构型 | loading configuration |
| 重量平衡 | weight and balance |
| 装载手册 | loading manual |
| 地面操作手册 | cargo handling manual |
| 最大高度 | max height / maximum height |
| 收口 | taper / contour / chamfer |
| 舱门 | cargo door |
| 机身站位 | fuselage station / station |
| 最大毛重 | max gross weight / maximum gross weight |

---

# 18. Google 完全可以复刻

可以。

推荐直接按照下面顺序搜索。

---

## Step 1：找 B747 的 position code

```text
"B747-400F" "LR" "LL" "PL"
```

---

## Step 2：加入具体运营商

```text
site:sf-airlines.com "B747-400F" "PL"
```

---

## Step 3：搜索 contour

```text
"B747-400F" "pallet contour"
```

---

## Step 4：搜罕见 contour code

```text
"B747-400F" "H4M"
```

```text
"B747-400F" "HPL"
```

```text
"B747-400F" "PA1"
```

---

## Step 5：加入多个代码

```text
"B747-400F" "H4M" "HPL" "PA1" "PA2"
```

这个查询非常强。

---

## Step 6：搜索数值指纹

```text
"H4M" "3.18" "2.44"
```

```text
"HPL" "2.87"
```

```text
"PA1" "1.55" "1.22"
```

```text
"PA2" "1.70" "0.4"
```

---

## Step 7：下货舱

```text
"B747-400F" "SIZE CODES A, M & N"
```

---

## Step 8：具体 position

```text
"B747-400F" "11P" "12P" "21P" "22P" "23P"
```

---

## Step 9：后下货舱

```text
"B747-400F" "31P" "32P" "41P" "42P"
```

---

## Step 10：寻找原始手册

```text
"B747-400F" "Weight and Balance Control Manual" PDF
```

```text
"B747-400F" "Cargo Loading Manual" PDF
```

```text
"B747-400" "Cargo Handling Manual" PDF
```

---

# 19. Google 高级搜索操作符

## 精确短语

```text
"Size Code M"
```

意味着要求完整短语出现。

---

## 指定网站

```text
site:ckair.com H4M
```

---

## 指定文件格式

```text
filetype:pdf "B747-400F" "Cargo Loading Manual"
```

这个对找手册非常重要。

---

## 排除结果

例如不想看模型玩具：

```text
"B747-400F" "pallet contour" -model -toy
```

---

## 限定标题

```text
intitle:"B747-400F" "loading manual"
```

---

## 多条件组合

例如：

```text
site:ckair.com "H4M" "3.18" "2.44"
```

这是非常精准的搜索。

---

# 20. 如果让我重新从零搜索，我会采用这套顺序

### 第 1 层：识别代码

从用户图片抄出所有罕见代码：

```text
LR LL
PR PL
QR QL
11P
SIZE CODE M
```

### 第 2 层：确认代码属于标准体系

```text
"B747-400F" "LR" "LL"
```

### 第 3 层：发现行业术语

找到：

```text
Contour
Q6
Q7
H4M
HPL
```

### 第 4 层：术语锁定

```text
"B747-400F" "H4M"
```

### 第 5 层：数值指纹

```text
"H4M" "3.18" "2.44" "3.00"
```

### 第 6 层：来源升级

尽量找到：

```text
Boeing
Airline
Cargo Handling Manual
```

而不是停在博客。

### 第 7 层：交叉验证

至少找两个来源验证：

```text
position
height
base size
contour
```

### 第 8 层：发现冲突就继续搜索

例如：

```text
PEB 高度
```

不同来源出现：

```text
1.50 m
2.13 m
```

不要立即判断谁错。

先考虑：

```text
ULD physical dimension
vs
position operational build-up limit
```

也就是说两个数字可能描述的根本不是同一件事。

---

# 21. 这次搜索中容易犯的错误

## 错误 1：看到 L/R 就自行解释形状

例如：

```text
LR
LL
```

不能直接推断：

```text
L = 左削角
R = 右削角
```

必须继续找 contour diagram。

---

## 错误 2：把 ULD 本身尺寸与位置允许尺寸混在一起

例如：

```text
PEB
```

ULD 标准物理尺寸可能是一组数值。

航空公司在某个 position 的 operational limit 又可能是另一组。

一定要区分：

```text
ULD specification
```

和：

```text
position envelope
```

---

## 错误 3：只看一个航空公司的资料

B747-400F 虽然机体一样，但不同运营商可能：

- 安装不同货物处理系统
- 使用不同 ULD
- 设置不同运营限制
- 对特殊位置设置更保守限制

所以最好：

```text
顺丰布局
+
Boeing 原始资料
+
另一家 747-400F 运营商
```

三者交叉。

---

## 错误 4：看到搜索摘要就认为已经验证

搜索摘要通常会丢失：

- 单位
- 脚注
- 条件
- “仅鼻门装载”
- “不含 PL”
- 配置模式

必须打开原网页/PDF。

---

# 22. 从本次案例可以提炼出的通用检索能力

真正高效的信息检索通常是：

```text
自然语言问题
↓
找到领域术语
↓
找到缩写/代码
↓
用代码搜索
↓
找到标准/手册
↓
从手册发现更专业的关键词
↓
继续搜索
↓
交叉验证
```

而不是：

```text
把完整问题复制进 Google
↓
看第一条结果
```

---

# 23. 一个很实用的“关键词树”

以后遇到任何专业设备，都可以建立这样的树。

以本题为例：

```text
B747-400F
│
├── cargo
│   ├── main deck
│   ├── lower deck
│   └── bulk
│
├── position
│   ├── A1
│   ├── LR / LL
│   ├── PL
│   └── 11P
│
├── ULD
│   ├── PMC
│   ├── PEB
│   └── AKE
│
├── contour
│   ├── Q6
│   ├── Q7
│   ├── PA1
│   ├── PA2
│   ├── H4M
│   └── HPL
│
├── size code
│   ├── A
│   ├── M
│   ├── N
│   ├── K
│   └── L
│
└── documents
    ├── Weight and Balance Manual
    ├── Cargo Loading Manual
    └── Cargo Handling Manual
```

以后搜索时从树上任意选 2～4 个节点组合：

```text
"B747-400F" "H4M" "main deck"
```

或者：

```text
"B747-400F" "11P" "Size Code M"
```

命中率会非常高。

---

# 24. 最重要的学习点

如果只记住一件事：

> **专业检索的关键不是会不会 Google，而是能不能找到这个行业自己使用的“语言”。**

本题开始时，我们只有：

```text
B747-400F 某个仓是什么形状？
```

后来把它转换成：

```text
B747-400F
ULD position
pallet contour
H4M
HPL
PA1
PA2
Size Code M
11P
```

从这一刻开始，Google 才真正变成技术资料搜索工具。

---

# 25. 推荐你自己实际复刻一次

建议依次把以下查询复制进 Google：

```text
"B747-400F" "LR" "LL" "PL"
```

然后：

```text
"B747-400F" "H4M" "HPL"
```

然后：

```text
site:ckair.com "H4M" "HPL"
```

然后：

```text
"PA1" "1.55" "1.22" "747-400F"
```

然后：

```text
"B747-400F" "SIZE CODES A, M & N"
```

然后：

```text
filetype:pdf "B747-400" "Cargo Handling Manual"
```

你会非常直观地看到：

**关键词越接近行业内部术语，搜索结果越从“普通网页”向“手册、航空公司、论文、技术资料”转变。**

---

# 26. 本次主要资料入口

## 顺丰航空

```text
https://www.sf-airlines.com/sf/upload/2026-07-21/17846255080528a3887529ed38db5957019f83f82ed44fd2.png
```

## 中国货运航空

```text
https://www.ckair.com/equipment-specification-400F.html
```

## UTLink B747-400F 配置资料

```text
https://www.utlink.com/fleet
```

## Cargo Handling Manual 公开副本

```text
https://www.asiandragonintl.com/inventory/other/2024/dragon-166535B.pdf
```

---

## 最后一句

搜索能力的提升，往往不是记更多搜索语法，而是养成三个习惯：

1. **看到罕见代码就单独搜索；**
2. **看到特殊数字就做“数值指纹”；**
3. **每找到一份好资料，都从里面提取下一轮搜索用的专业术语。**

这三个习惯比单纯掌握几十个 Google 高级操作符更重要。
