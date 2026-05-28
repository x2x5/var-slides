# VAR Slides 项目问题分析与改造方案

> 适用项目：`var.usegpt.top`  
> 技术栈：React + TypeScript + Vite + TailwindCSS v4  
> 当前目标：把现有“左侧目录 + 右侧垂直幻灯片”的网站，从“能用”改成“好看、好读、可持续扩展”的问答式论文知识库。

---

## 1. 结论先行

当前项目的问题不是某一个组件写得不好，而是缺少一套统一的“幻灯片产品设计系统”。

现在的页面已经具备基本功能：

- 左侧二级目录树
- 右侧纵向滑动 slide
- 键盘与滚动交互
- 多个问题、多页内容的数据结构
- 适合后续持续扩展的问答式知识库方向

但视觉效果和内容表达不佳，主要来自四个根因：

1. **布局没有建立舞台感**  
   目前只是简单 `flex`：左边目录、右边内容。右侧 slide 没有明确的画布边界、内容安全区、视觉焦点和阅读节奏。

2. **每页 slide 缺少模板约束**  
   内容基本靠 JSX 临时堆出来，导致大量页面都是“标题 + 卡片 + 列表”，看起来像 AI 自动生成的网页卡片，而不是精心设计过的幻灯片。

3. **信息密度过高，叙事节奏不清**  
   很多 slide 同时承担“解释概念、列举细节、做对比、讲结论”的任务。一页做太多事，用户很难形成记忆点。

4. **视觉系统没有被组件化**  
   虽然有暖米色、深棕、橙红、纸张纹理、衬线字体等元素，但这些只是零散样式，没有形成稳定的设计语言，也没有通过组件强制复用。

---

## 2. 推荐的产品定位

不要把它做成“论文笔记网页”，而应该做成：

> 一个面向中文读者的、可持续扩展的、论文问答式视觉讲解系统。

也就是说，每个问题不是普通文章，而是一组小型叙事：

```text
用户问题
  → 先给一句话答案
  → 再建立直觉
  → 再拆核心机制
  → 再用图解释
  → 再和旧方法对比
  → 再给结论和记忆点
```

每组问题控制在 8–12 页，每页只做一件事。

---

## 3. 总体改造方向

### 3.1 从“网页布局”改成“阅读舞台”

当前结构：

```text
Sidebar | SlideView
```

建议改成：

```text
AppShell
├── Sidebar：知识库导航，不抢主舞台
└── Stage：幻灯片舞台
    ├── TopBar：当前问题、进度、快捷提示
    ├── SlideCanvas：真正的 16:9 / 4:3 内容画布
    ├── ProgressRail：右侧页码进度
    └── ScrollHint：首次进入时提示可上下滑动
```

右侧不应该铺满所有空间，而应该有一个“舞台画布”的概念：

- 大屏：slide 内容区域最大宽度控制在 `1120px–1280px`
- 内容安全区：上下左右留足边距
- 背景可以是暖米色，但 slide 本身应有轻微卡纸感或投影
- 当前页要像一张精心排版的幻灯片，而不是一个普通网页 section

建议布局：

```tsx
<main className="relative flex-1 overflow-hidden bg-[var(--bg)]">
  <TopBar />
  <div className="h-full overflow-y-auto snap-y snap-mandatory">
    {slides.map(slide => (
      <section className="h-screen snap-start grid place-items-center px-8 py-20">
        <SlideCanvas>{slide.content}</SlideCanvas>
      </section>
    ))}
  </div>
  <ProgressRail />
</main>
```

`SlideCanvas` 可以统一控制视觉质感：

```tsx
function SlideCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      relative w-full max-w-[1180px] min-h-[680px]
      rounded-[32px] border border-stone-200/80
      bg-white/72 shadow-[0_24px_80px_rgba(55,38,22,0.10)]
      backdrop-blur-sm overflow-hidden
    ">
      {children}
    </div>
  )
}
```

这样右侧内容会立刻从“网页块”变成“演示舞台”。

---

## 4. 布局问题分析与解决方案

### 4.1 当前问题

现有布局的问题主要有：

- `flex` 平铺，没有空间层次
- Sidebar 和 SlideView 视觉权重接近，主次不清
- 右侧 slide 没有画布边界，内容像散落在页面上
- 顶部栏、进度点、正文内容之间缺少统一对齐
- 没有让用户第一眼知道“这是一个可上下滑动的知识库”

### 4.2 改造方案

#### 方案 A：保留左侧目录，但降低它的视觉存在感

Sidebar 应该像“书的目录”，而不是和幻灯片争夺注意力。

建议：

- 展开宽度从 `288px` 调整到 `260px–280px`
- 背景比主舞台更安静，减少渐变强度
- 分类标题使用小号、字重中等、字间距略大
- 问题标题使用无衬线，而不是全部 serif
- 当前问题用更强的选中状态：浅底色 + 左侧竖条 + 文字加深
- 折叠后不要只剩图标，建议保留一个垂直品牌标识或当前分类图标

#### 方案 B：右侧使用“画布 + 安全区”

每一页 slide 的内容不直接铺满屏幕，而是放在统一的画布中：

```text
浏览器窗口
└── Stage 背景
    └── SlideCanvas
        ├── SlideHeader
        ├── SlideBody
        └── SlideFooter / Key Takeaway
```

这样可以统一：

- 标题位置
- 页内边距
- 最大内容宽度
- 信息层级
- 不同 slide 模板之间的视觉一致性

#### 方案 C：建立 12 栏网格

不要在每页里随意使用 `grid-cols-2`、`grid-cols-3`。

建议统一为 12 栏：

```tsx
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-5">左侧主观点</div>
  <div className="col-span-7">右侧图解</div>
</div>
```

常用布局模板：

| 模板 | 用途 | 结构 |
|---|---|---|
| Hero | 每个问题的封面 | 大标题 + 一句话答案 + 关键词 |
| Split | 新旧方法对比 | 左 5 栏文字，右 7 栏图 |
| Diagram | 机制解释 | 上标题，下图解 |
| Timeline | 流程过程 | 横向或纵向步骤 |
| Pyramid | 多尺度结构 | 层级递进 |
| Matrix | 多维比较 | 表格 / 象限 |
| Code Lens | 代码解释 | 左代码，右注释 |
| Summary | 小结 | 3 个记忆点 |

---

## 5. Slide 排版问题分析与解决方案

### 5.1 当前问题

现在的 slide 很多像这样：

```text
标题
卡片 卡片 卡片
卡片 卡片 卡片
小标签 小标签 小标签
```

这会导致几个问题：

- 页面看起来相似，用户容易疲劳
- 没有明确的主视觉
- 信息没有优先级
- 每个模块都像重点，结果没有重点
- 缺少“读图”的乐趣

### 5.2 一页 slide 只允许一个核心任务

建议制定内容规则：

```text
每页 slide = 1 个问题 / 1 个判断 / 1 个图解 / 1 个记忆点
```

每页最多包含：

- 1 个主标题
- 1 句核心结论
- 1 个主要图形或结构
- 0–3 条辅助说明
- 1 个 takeaway

不要同时出现：

- 大段解释
- 多个卡片组
- 多层列表
- 复杂流程
- 多个颜色强调

### 5.3 标题改造

当前很多标题偏说明性，例如：

```text
传统方法的困境
核心思想 Next-Scale Prediction
两种范式对比
```

建议改成“结论型标题”：

```text
传统 AR 失败在：它把图像当成一长串像素
VAR 的核心转向：不是预测下一个像素，而是预测下一层尺度
真正的差别：扩散模型逐步去噪，VAR 逐级长大
```

标题应该直接传达观点，而不是只标注主题。

### 5.4 正文改造

正文不要写成解释段落，而是拆成三层：

```text
主句：一句话结论
图解：用视觉结构解释
注释：最多 2–3 条
```

示例：

```text
主句：
VAR 把生成过程从“逐 token 延长”改成“逐尺度扩展”。

图解：
16×16 → 32×32 → 64×64 → 128×128 → 256×256

注释：
- 先确定全局结构
- 再补充局部细节
- 每一步都能并行预测一整层 token
```

---

## 6. 内容质量问题分析与解决方案

### 6.1 当前内容的问题

当前内容覆盖面不错，但表达方式存在以下问题：

1. **解释顺序偏技术文档化**  
   比如先讲模块、目录、函数，再讲用户为什么要关心。对读者来说缺少“为什么这页重要”。

2. **缺少认知台阶**  
   直接出现 VQVAE、Transformer、Scaling Laws、FID、CFG 等术语，用户需要自己补上下文。

3. **图解不够强**  
   很多所谓图表其实是 div 拼出来的进度条或卡片，不能真正降低理解成本。

4. **没有记忆点**  
   看完一页之后，用户不一定知道应该记住哪一句。

### 6.2 每组问题的推荐叙事结构

每个问题建议固定为 10 页左右：

| 页码 | 类型 | 目的 |
|---|---|---|
| 1 | 封面页 | 给出一句话答案 |
| 2 | 背景页 | 为什么这个问题重要 |
| 3 | 旧方法页 | 传统方法哪里不自然 |
| 4 | 核心转向页 | VAR 的关键思想 |
| 5 | 机制图页 | 用图讲清楚核心过程 |
| 6 | 模块拆解页 | 对应到代码 / 架构 |
| 7 | 对比页 | 和扩散 / AR / GAN 对比 |
| 8 | 指标页 | 用数据证明优势 |
| 9 | 误区页 | 避免常见误解 |
| 10 | 总结页 | 3 个记忆点 + 下一步问题 |

这样每个新问题都有稳定节奏，用户会形成预期。

### 6.3 内容生成标准

给后续 AI 生成 slide 内容时，建议使用下面的标准：

```text
每页 slide 必须包含：
1. 结论型标题，不超过 24 个汉字
2. 一句话解释，不超过 45 个汉字
3. 一个主视觉方案：流程图 / 对比图 / 金字塔 / 坐标图 / 代码透视 / 时间线
4. 最多 3 条辅助说明
5. 一个 takeaway，不超过 22 个汉字

禁止：
- 大段文字
- 超过 4 个并列卡片
- 一页解释两个核心概念
- 只用标签和列表堆内容
- 为了装饰而动画
```

---

## 7. 视觉层次问题分析与解决方案

### 7.1 当前问题

目前标题、正文、辅助说明、标签、卡片之间区分不够稳定。用户看到页面时，不知道应该先看哪里。

### 7.2 建议的层级系统

建立固定的文字层级：

| 层级 | 用途 | 建议样式 |
|---|---|---|
| H1 | 封面主标题 | 52–72px，serif，900 |
| H2 | slide 标题 | 34–44px，serif，800 |
| Lead | 一句话结论 | 20–24px，sans，500 |
| Body | 解释文字 | 16–18px，sans，400 |
| Note | 辅助说明 | 13–15px，sans，400 |
| Label | 标签 | 11–12px，mono/sans，600，字间距 |
| Code | 代码 | 13–15px，mono |

建议不要让所有问题标题和正文都使用 serif。中文衬线字体适合标题和强调，不适合大量 UI 文本。

### 7.3 页面结构建议

每页统一分为：

```text
SlideHeader
- eyebrow：所属问题 / 页码 / 类型
- title：结论型标题
- lead：一句话解释

SlideBody
- 主图 / 主结构

SlideFooter
- takeaway / 关键记忆点
```

示例：

```tsx
<SlideFrame
  eyebrow="核心概念 · 03 / 10"
  title="VAR 不是预测下一个像素，而是预测下一层尺度"
  lead="它把图像生成从一条长序列，改成一个由粗到细的金字塔。"
>
  <ScalePyramid />
</SlideFrame>
```

---

## 8. 配色方案分析与解决方案

### 8.1 当前配色评价

当前暖米色 + 深棕 + 橙红的方向是合适的，和“论文解读”“中文长阅读”“知识库”气质相符。

问题不在颜色选错，而在：

- 强调色使用过多
- 蓝色和橙色缺少明确语义分工
- 卡片背景层级不够
- 暖色太满，容易显得旧和闷
- 没有足够的中性色支撑排版

### 8.2 建议色彩语义

保留暖色基调，但建立语义：

```css
:root {
  --bg: #f7f2ea;
  --surface: #fffaf3;
  --surface-soft: #f1e8dc;

  --ink: #1d1712;
  --ink-2: #4f463d;
  --ink-3: #8a7d70;

  --primary: #b45309;   /* 用于当前选中、关键结论 */
  --blue: #2563eb;      /* 用于模型、Transformer、技术模块 */
  --green: #15803d;     /* 用于收益、成功、并行化 */
  --red: #b91c1c;       /* 用于问题、瓶颈、失败 */
  --violet: #7c3aed;    /* 用于抽象概念、latent space */

  --line: #e7dccc;
  --line-strong: #d6c5b3;
}
```

颜色使用规则：

| 颜色 | 语义 |
|---|---|
| 橙色 | 主线观点、当前状态、VAR |
| 蓝色 | Transformer、模型结构、技术模块 |
| 绿色 | 优势、提升、并行、成功路径 |
| 红色 | 问题、瓶颈、传统方法缺陷 |
| 紫色 | 潜空间、抽象表示、多尺度概念 |
| 灰棕 | 辅助文本、边框、背景层次 |

### 8.3 减少“满屏橙色”

强调色只用于 10% 的元素：

- 当前页最重要的词
- 进度条
- 当前选中问题
- 关键箭头
- takeaway

不要让所有卡片标题、图标、标签都用橙色。

---

## 9. 字体问题分析与解决方案

### 9.1 当前字体评价

当前组合：

- Noto Serif SC：中文标题
- DM Sans：英文 / 正文
- JetBrains Mono：代码

方向基本可以，但有两个问题：

1. 中文正文如果也大量用 serif，会显得重、慢、拥挤。
2. DM Sans 对中文不起主要作用，中文实际会 fallback 到 PingFang SC 等系统字体。

### 9.2 推荐字体策略

```text
标题：Noto Serif SC / Source Han Serif SC
正文：PingFang SC / Noto Sans SC / system-ui
代码：JetBrains Mono
数字：DM Sans 或 Inter
```

具体规则：

```css
--font-title: 'Noto Serif SC', 'Source Han Serif SC', serif;
--font-body: 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
--font-code: 'JetBrains Mono', monospace;
--font-number: 'DM Sans', system-ui, sans-serif;
```

使用建议：

- H1/H2 用 serif
- Sidebar、按钮、正文、说明文字用 sans
- 代码和文件路径用 mono
- 大数字、页码、指标值可以用 DM Sans

这样既保留中文学术气质，又避免正文过重。

---

## 10. 交互体验问题分析与解决方案

### 10.1 当前问题

现有交互可用，但提示不足：

- 用户不知道可以上下滑动
- 不知道键盘可以翻页
- 右侧进度点含义不够明显
- slide snap 在不同设备上可能有轻微不稳定
- 移动端体验未设计

### 10.2 建议新增交互

#### 1. 首屏滑动提示

在第一页底部显示：

```text
向下滑动继续
↓
```

用户滚动后自动淡出。

#### 2. 顶部快捷提示

TopBar 右侧显示小提示：

```text
↑↓ 翻页 · Home 回到开头
```

不要太显眼，只在桌面端出现。

#### 3. 进度圆点增强

右侧进度点 hover 时显示页标题：

```text
● VAR 是什么
● 传统方法的问题
● Next-Scale Prediction
```

这会让进度点从“装饰”变成“导航”。

#### 4. 小地图模式

可以在右侧进度条中展示当前页所属结构：

```text
01 封面
02 背景
03 机制
04 对比
...
```

桌面端 hover 展开，默认收起。

#### 5. 保留 URL 状态

建议 URL 支持：

```text
/核心概念/var-是什么/3
```

或者：

```text
?q=what-is-var&s=3
```

好处：

- 可以分享某一页
- 刷新后保持当前页
- 便于后续 SEO 或静态索引

---

## 11. 动画问题分析与解决方案

### 11.1 当前问题

现在的动画主要是：

- fadeUp
- fadeIn
- slideInLeft
- delay 递增

这些动画本身没问题，但如果只是装饰，会产生“模板感”。

### 11.2 动画原则

动画应该服务理解，而不是服务炫技。

建议只保留三类动画：

| 动画类型 | 用途 |
|---|---|
| 状态转场 | 切换 slide、展开目录 |
| 结构解释 | 流程图逐步出现、金字塔逐层点亮 |
| 注意力引导 | 当前关键节点轻微强调 |

不建议：

- 每张卡片都 fadeUp
- 所有元素统一延迟入场
- 大量 hover 动效
- 过强弹性动画

### 11.3 推荐使用 Framer Motion

可以引入 `framer-motion`，但只用在关键组件：

- Sidebar 展开/折叠
- Slide 进入/离开
- 流程图节点逐步出现
- 图表数值增长

示例：

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

---

## 12. 是否需要图表库

### 12.1 结论

需要，但不要一上来引入 D3。

推荐优先级：

1. **Recharts**：适合快速做柱状图、折线图、散点图，和 React/Tailwind 集成简单
2. **visx**：适合更定制化的学术图
3. **D3**：只在确实需要复杂可视化时引入

### 12.2 当前适合图表库的页面

以下页面建议从 div 模拟改为真实图表：

- FID 质量对比
- 速度对比
- Scaling Laws 散点图
- 学习率调度曲线
- 评估指标体系
- 多模型对比

### 12.3 仍然适合手写 SVG 的页面

以下更适合手写 SVG / React 组件，而不是图表库：

- 多尺度 Token 金字塔
- VQVAE 编码流程
- VAR Transformer 架构图
- 从噪声到图像生成过程
- 数据流动全景
- 代码调用关系

推荐策略：

```text
统计数据 → Recharts
机制图解 → SVG React Component
代码结构 → 自定义 Diagram Component
```

---

## 13. 响应式改造建议

### 13.1 是否需要移动端适配

需要，但不必一开始追求完整移动端幻灯片体验。

最低要求：

- 手机可以阅读
- 目录可以打开关闭
- slide 不溢出
- 字号和图表自动缩放
- 不依赖 hover

### 13.2 桌面端

```text
Sidebar 固定在左侧
SlideCanvas 居中
右侧显示 ProgressRail
键盘翻页
```

### 13.3 平板端

```text
Sidebar 可折叠
SlideCanvas 宽度适配
右侧进度点减少尺寸
```

### 13.4 手机端

```text
Sidebar 变成 Drawer
TopBar 显示当前问题
SlideCanvas 取消固定高度，允许内容自然滚动
ProgressRail 改成底部进度条
```

建议断点：

```text
< 768px：移动端阅读模式
768–1199px：平板模式
>= 1200px：桌面幻灯片模式
```

移动端不要强行 `h-screen snap-y`，否则容易出现内容裁剪和滚动冲突。

---

## 14. TailwindCSS v4 技术建议

### 14.1 `@import` 顺序

当前 CSS 里先 `@import "tailwindcss"`，再 `@import url(...)` 字体，可能触发顺序 warning。

建议把字体放到 HTML 或 CSS 最前面。

更推荐在 `index.html` 中使用：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="..." rel="stylesheet">
```

然后 `index.css` 只保留：

```css
@import "tailwindcss";
```

### 14.2 使用 CSS-first 主题

Tailwind v4 推荐 CSS-first 配置。可以把设计变量写入 `@theme`：

```css
@import "tailwindcss";

@theme {
  --font-title: "Noto Serif SC", "Source Han Serif SC", serif;
  --font-body: "PingFang SC", "Noto Sans SC", system-ui, sans-serif;
  --font-code: "JetBrains Mono", monospace;

  --color-bg: #f7f2ea;
  --color-surface: #fffaf3;
  --color-ink: #1d1712;
  --color-primary: #b45309;
}
```

然后可以在 class 里使用：

```tsx
<h1 className="font-title text-ink">
```

如果继续使用 CSS 变量，也可以，但建议统一，不要混用太多方式。

---

## 15. 组件化改造建议

当前最大的问题之一是 `content.tsx` 里直接写了大量 JSX。短期能跑，长期会难维护。

建议把 slide 内容拆成“数据 + 模板组件”。

### 15.1 新目录结构

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Stage.tsx
│   │   ├── TopBar.tsx
│   │   └── ProgressRail.tsx
│   ├── slide/
│   │   ├── SlideFrame.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── SplitSlide.tsx
│   │   ├── DiagramSlide.tsx
│   │   ├── CompareSlide.tsx
│   │   ├── TimelineSlide.tsx
│   │   ├── CodeLensSlide.tsx
│   │   └── SummarySlide.tsx
│   ├── diagrams/
│   │   ├── ScalePyramid.tsx
│   │   ├── VQVAEFlow.tsx
│   │   ├── VARArchitecture.tsx
│   │   └── GenerationSteps.tsx
│   └── charts/
│       ├── MetricBarChart.tsx
│       ├── ScalingScatter.tsx
│       └── LearningRateCurve.tsx
├── data/
│   ├── types.ts
│   ├── questions.ts
│   └── slides/
│       ├── what-is-var.tsx
│       ├── project-structure.tsx
│       └── training-generation-eval.tsx
└── styles/
    └── tokens.css
```

### 15.2 Slide 数据类型升级

当前：

```ts
interface Slide {
  title: string
  content: React.ReactNode
}
```

建议升级：

```ts
interface Slide {
  id: string
  type: 'hero' | 'split' | 'diagram' | 'compare' | 'timeline' | 'code' | 'summary'
  title: string
  lead?: string
  takeaway?: string
  content: React.ReactNode
}
```

这样后续可以根据 `type` 自动决定排版、动画和页面 metadata。

### 15.3 统一 SlideFrame

```tsx
type SlideFrameProps = {
  eyebrow?: string
  title: string
  lead?: string
  takeaway?: string
  children: React.ReactNode
}

export function SlideFrame({ eyebrow, title, lead, takeaway, children }: SlideFrameProps) {
  return (
    <article className="slide-frame">
      <header className="slide-header">
        {eyebrow && <p className="slide-eyebrow">{eyebrow}</p>}
        <h2 className="slide-title">{title}</h2>
        {lead && <p className="slide-lead">{lead}</p>}
      </header>

      <main className="slide-body">
        {children}
      </main>

      {takeaway && (
        <footer className="slide-takeaway">
          {takeaway}
        </footer>
      )}
    </article>
  )
}
```

所有 slide 都走这个框架，就不会出现排版风格乱的问题。

---

## 16. Sidebar 改造方案

### 16.1 当前问题

- 分类和问题层级不够清晰
- 选中状态不够强
- 折叠状态信息损失较大
- Sidebar 的视觉细节较粗糙

### 16.2 推荐结构

```text
顶部：
VAR 论文解读
问答式知识库

中部：
01 核心概念
  · VAR 到底是什么？
  · 为什么是 Next-Scale？

02 项目结构
  · 每个目录和文件是干嘛的？

底部：
当前进度 / 域名 / GitHub
```

### 16.3 视觉建议

分类：

```text
小号数字 + 图标 + 分类名 + 问题数量
```

问题：

```text
左侧细线表示属于该分类
当前问题显示浅色胶囊背景
已读问题可以显示小圆点
```

示意：

```text
01  💡 核心概念        1
    │
    └─ VAR 到底是什么？
       10 页

02  🗂️ 项目结构        1
    │
    └─ 每个目录和文件是干嘛的？
       8 页
```

---

## 17. SlideView 改造方案

### 17.1 当前问题

- `overflow-hidden` 可能导致内容裁剪
- 标题栏与正文距离不稳定
- snap 行为和内容高度冲突
- 顶部浮动栏可能压住内容
- 右侧进度点只是视觉装饰

### 17.2 技术建议

1. 每页外层保持 `h-screen snap-start`
2. 内部画布不要强制 `overflow-hidden`，或者只在可控区域裁剪
3. 移动端取消强制 snap
4. 使用 `IntersectionObserver` 更新当前页，而不是只依赖 scroll 计算
5. 点击进度点时使用 `scrollIntoView({ behavior: 'smooth', block: 'start' })`
6. URL hash 同步当前 question 和 slide

### 17.3 结构建议

```tsx
<section
  ref={setSlideRef(index)}
  className="h-screen snap-start grid place-items-center px-8 py-20"
>
  <SlideCanvas>
    <SlideRenderer slide={slide} />
  </SlideCanvas>
</section>
```

---

## 18. 现有内容的具体重写建议

### 18.1 “VAR 到底是什么？”这组

当前 10 页方向对，但可以重排为：

| 页 | 新标题 | 主视觉 |
|---|---|---|
| 1 | VAR：让图像像语言一样自回归生成 | Hero |
| 2 | 传统 AR 的问题：图像不是一条自然句子 | 像素长链 vs 图像网格 |
| 3 | VAR 的转向：预测下一层尺度 | 金字塔 |
| 4 | 从粗到细：先布局，再细节 | 多尺度生成动画 |
| 5 | VQVAE：先把图像翻译成离散 token | 编码流程图 |
| 6 | Transformer：每一步预测一整层 token | 架构图 |
| 7 | 为什么更快：每层内部可以并行 | 串行 vs 并行对比 |
| 8 | 为什么更像 GPT：都在做 next prediction | 图像尺度 vs 文本 token |
| 9 | VAR 的三个收益 | 速度、质量、可扩展 |
| 10 | 一句话记住 VAR | Summary |

### 18.2 “每个目录和文件是干嘛的？”这组

这组不应该像项目 README，应该像“代码导览地图”。

推荐结构：

| 页 | 新标题 | 主视觉 |
|---|---|---|
| 1 | 先看全局：VAR 项目只有三条主线 | 训练 / 生成 / 评估 |
| 2 | `train.py`：训练流程的入口导演 | 流程图 |
| 3 | `trainer.py`：真正执行一步训练 | 代码透视 |
| 4 | `models/`：模型结构集中在这里 | 文件关系图 |
| 5 | VQVAE：图像和 token 的翻译器 | 编码-解码图 |
| 6 | VAR Transformer：生成 token 金字塔 | 架构图 |
| 7 | `utils/`：日志、分布式、指标工具箱 | 工具箱 |
| 8 | 一张图串起所有文件 | 全链路地图 |

### 18.3 “训练、生成和评估的过程”这组

推荐结构：

| 页 | 新标题 | 主视觉 |
|---|---|---|
| 1 | 三件事：学会预测、逐级生成、用指标验证 | 三流程 |
| 2 | 训练：输入图像，目标是下一尺度 token | 数据流 |
| 3 | Loss：每个尺度都要被监督 | 多尺度损失图 |
| 4 | 学习率：先热身，再衰减 | 真实曲线 |
| 5 | 生成：从最粗尺度开始长大 | 动画流程 |
| 6 | Top-k / Top-p：控制随机性边界 | 采样空间图 |
| 7 | CFG：让生成更听条件 | 条件引导图 |
| 8 | 评估：FID 看质量，速度看效率 | 指标卡 |
| 9 | eval_ep：把模型放到统一考场 | 评估流程 |
| 10 | 训练、生成、评估如何闭环 | 闭环图 |

### 18.4 “为什么 VAR 能超越扩散模型？”这组

这组最适合做成强对比叙事：

| 页 | 新标题 | 主视觉 |
|---|---|---|
| 1 | VAR 赢在：少步数、强并行、能扩展 | Hero |
| 2 | 扩散模型：一步步把噪声擦干净 | 去噪时间线 |
| 3 | VAR：一层层把图像长出来 | 金字塔时间线 |
| 4 | 速度差异来自生成路径不同 | 路径对比 |
| 5 | 质量提升来自更好的全局结构建模 | 全局-局部对比 |
| 6 | Scaling Laws：模型变大时 VAR 更可预测 | 散点/曲线 |
| 7 | GPT 范式优势：统一、简洁、可扩展 | 四象限 |
| 8 | 但 VAR 不是扩散的简单替代品 | 边界条件 |
| 9 | 总结：它改变的是图像生成的序列化方式 | Summary |

---

## 19. 设计系统落地清单

### 19.1 第一阶段：只改骨架，不改内容

目标：快速提升整体观感。

任务：

- 新增 `AppShell`
- 新增 `Stage`
- 新增 `SlideCanvas`
- 新增 `TopBar`
- 新增 `ProgressRail`
- 调整 Sidebar 视觉层级
- 修复字体加载顺序
- 建立 `@theme` 或统一 CSS tokens
- 去掉过多装饰性动画

预期效果：

- 网站从“普通网页”变成“幻灯片舞台”
- 现有内容即使不重写，也会更整齐

### 19.2 第二阶段：建立 slide 模板

目标：消除“AI 卡片味”。

任务：

- 新增 `SlideFrame`
- 新增 `HeroSlide`
- 新增 `SplitSlide`
- 新增 `DiagramSlide`
- 新增 `CompareSlide`
- 新增 `TimelineSlide`
- 新增 `CodeLensSlide`
- 新增 `SummarySlide`
- 给每页 slide 增加 `type`、`lead`、`takeaway`

预期效果：

- 后续新增内容不再随意堆 JSX
- 不同页面有变化，但仍统一

### 19.3 第三阶段：重写核心内容

目标：提升理解效率。

优先重写：

1. `VAR 到底是什么？`
2. `为什么 VAR 能超越扩散模型？`
3. `训练、生成和评估的过程`
4. `每个目录和文件是干嘛的？`

每页重写时遵守：

```text
一页一观点
标题即结论
主视觉先行
辅助文字不超过 3 条
最后给 takeaway
```

### 19.4 第四阶段：引入真实图表和图解组件

目标：提升专业感。

任务：

- 安装 Recharts
- 实现速度对比图
- 实现 FID 对比图
- 实现 Scaling Laws 图
- 实现学习率曲线
- 手写 SVG 实现多尺度金字塔、VQVAE 流程、VAR 架构

### 19.5 第五阶段：增强交互和响应式

目标：提升长期使用体验。

任务：

- URL 状态同步
- 首屏滑动提示
- 进度点 hover 标题
- 移动端 Drawer Sidebar
- 移动端取消强制 snap
- 已读进度记录

---

## 20. 建议安装的依赖

最小增强版：

```bash
npm install framer-motion recharts clsx
```

说明：

| 依赖 | 用途 |
|---|---|
| framer-motion | 关键动效、结构解释动画 |
| recharts | 指标图、曲线图、散点图 |
| clsx | className 条件组合 |

暂时不建议引入完整 UI 库。这个项目的气质比较定制，shadcn/ui 之类的组件库反而可能让网站变得更像后台系统。

---

## 21. 推荐的最终视觉方向

关键词：

```text
中文学术
纸质幻灯片
暖色知识库
低饱和
强留白
图解优先
克制动画
```

不要做成：

```text
炫酷科技大屏
卡片堆叠后台
Notion 风笔记
PPT 模板站
花哨动效展示页
```

更适合参考：

- 高质量中文学术长图
- Apple keynote 的留白和节奏
- Stripe 文档的清晰层级
- Linear 的克制 UI
- 论文图解博客的结构化表达

---

## 22. 给后续 AI 的内容生成 Prompt

后续每次用户提出一个新问题，可以把下面 prompt 给 AI 使用。

```text
你要为一个中文 VAR 论文解读网站生成一组问答式幻灯片。

项目形式：
- 左侧是问题目录
- 右侧是纵向滚动 slides
- 每个问题生成 8–12 页
- 用户希望浅色主题、中文、不要英文
- 目标不是论文原文翻译，而是让读者真正理解

生成要求：
1. 每页只讲一个核心观点
2. 每页标题必须是结论型标题，不超过 24 个汉字
3. 每页给一句 lead，不超过 45 个汉字
4. 每页指定一种主视觉：
   - Hero
   - Split
   - Diagram
   - Compare
   - Timeline
   - Pyramid
   - CodeLens
   - MetricChart
   - Summary
5. 每页最多 3 条辅助说明
6. 每页给一个 takeaway，不超过 22 个汉字
7. 禁止大段文字
8. 禁止一页塞多个概念
9. 禁止只用卡片列表堆内容
10. 所有内容必须是中文，必要术语可以保留英文缩写，但要解释

输出格式：
- questionTitle
- slides[]
  - type
  - title
  - lead
  - visual
  - bullets
  - takeaway
```

---

## 23. 给开发 AI 的改造 Prompt

如果让另一个 AI 直接修改代码，可以使用下面的 prompt。

```text
请重构这个 React + TypeScript + Vite + TailwindCSS v4 项目的幻灯片布局。

目标：
1. 保留左侧目录 + 右侧纵向 slide 的产品形态
2. 把右侧改造成居中的 SlideCanvas 舞台
3. 新增统一的 SlideFrame 组件
4. 新增 TopBar 和 ProgressRail
5. 优化 Sidebar 的层级和选中状态
6. 修复 TailwindCSS v4 下字体与 theme token 的组织方式
7. 不要改变现有数据内容的含义
8. 不要引入重型 UI 框架

优先修改文件：
- src/index.css
- src/App.tsx
- src/components/Sidebar.tsx
- src/components/SlideView.tsx

新增组件：
- src/components/layout/Stage.tsx
- src/components/layout/TopBar.tsx
- src/components/layout/ProgressRail.tsx
- src/components/slide/SlideCanvas.tsx
- src/components/slide/SlideFrame.tsx

视觉目标：
- 浅色主题
- 中文
- 暖米色背景
- 深棕文字
- 橙色只用于关键强调
- 大留白
- 每页像一张高质量演示页
- 不要满屏卡片
- 不要花哨动画

交互目标：
- 保留上下键、PageUp/PageDown、Home/End
- 保留两指上下滑动
- 保留右侧进度点击跳转
- 增加首屏滑动提示
- 进度点 hover 显示页标题
- 移动端 Sidebar 改为 Drawer
```

---

## 24. 最小可执行修改清单

如果只想先做一版明显改善，不要一次性大改，可以按下面顺序做。

### Step 1：新增 SlideCanvas

把每页内容包进统一画布：

```tsx
<section className="h-screen snap-start grid place-items-center px-8 py-20">
  <div className="w-full max-w-[1180px] min-h-[680px] rounded-[32px] bg-white/75 border border-stone-200 shadow-xl">
    {slide.content}
  </div>
</section>
```

### Step 2：统一 slide 内边距

所有 slide 内容外层统一：

```tsx
<div className="h-full p-12 lg:p-16">
```

### Step 3：给每页加 lead 和 takeaway

即使暂时不改视觉，也先让信息结构变成：

```text
标题
一句话解释
主内容
底部记忆点
```

### Step 4：减少卡片数量

每页最多 3 个主要卡片。超过 3 个就拆页。

### Step 5：Sidebar 改成目录树视觉

加左侧连接线、页数、小号编号，减少 emoji 的视觉重量。

### Step 6：进度点 hover 显示页标题

这一步能显著提升导航感。

---

## 25. 判断改造是否成功的标准

改完后可以用这 10 个问题自测：

1. 第一眼能看出当前页面的主结论吗？
2. 不读小字，也能理解这页大概在讲什么吗？
3. 每页是否只有一个核心观点？
4. 同一组问题是否有清晰的起承转合？
5. 是否减少了重复的卡片列表？
6. 图解是否真的帮助理解，而不是装饰？
7. Sidebar 是否像目录，而不是按钮列表？
8. 当前页、总页数、所在问题是否清楚？
9. 手机端是否至少能正常读完？
10. 后续 AI 新增 slide 时，是否有模板可遵守？

如果 8 个以上回答“是”，这一版就已经明显优于当前状态。

---

## 26. 最终建议

这个项目的方向是对的，问题不在于技术栈，也不在于是否用了 React/Tailwind，而在于缺少三样东西：

1. **稳定的 slide 画布系统**
2. **可复用的内容模板系统**
3. **一页一观点的叙事约束**

优先不要纠结“再加什么炫酷效果”。先把每页变得：

```text
看得清
读得顺
记得住
能复用
```

这比加入复杂动画、3D 效果、重型图表库更重要。

建议先做骨架重构，再做内容重写。只要完成 `SlideCanvas + SlideFrame + Sidebar 层级优化 + 内容模板化`，视觉和内容质量都会有明显提升。
