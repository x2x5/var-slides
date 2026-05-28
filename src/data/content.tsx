import type { Category } from './types'

const categories: Category[] = [
  {
    id: 'core',
    title: '核心概念',
    icon: '💡',
    questions: [
      {
        id: 'what-is-var',
        title: 'VAR 到底是什么？',
        slides: [
          {
            title: 'VAR 让图像像语言一样自回归生成',
            lead: '一种新的视觉生成方法：不再逐像素预测，而是逐尺度预测。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="relative">
                  <div className="text-[72px] font-title font-black text-ink tracking-tighter leading-none">
                    VAR
                  </div>
                </div>
                <div className="text-[15px] tracking-[0.3em] uppercase font-body text-ink-3">
                  Visual Autoregressive Modeling
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary">NeurIPS 2024</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue/10 text-blue">Best Paper</span>
                </div>
              </div>
            ),
            takeaway: 'VAR 是第一个让 GPT 式自回归模型超越扩散模型的视觉生成方法。',
          },
          {
            title: '传统 AR 的问题：图像不是一条自然句子',
            lead: '把图像当成一长串像素来预测，既慢又不符合直觉。',
            content: (
              <div className="flex items-center justify-center h-full gap-12 px-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[200px] aspect-square rounded-xl border border-line bg-surface p-3">
                    <div className="grid grid-cols-8 grid-rows-8 h-full gap-0.5">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className="rounded-sm flex items-center justify-center font-code"
                          style={{
                            fontSize: '7px',
                            background: i < 18 ? `rgba(185,28,28,${0.06 + i * 0.015})` : 'rgba(0,0,0,0.02)',
                            color: i < 18 ? 'var(--color-red)' : 'var(--color-ink-3)',
                          }}
                        >
                          {i < 18 ? i + 1 : ''}
                        </div>
                    ))}
                  </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-title font-semibold text-red">光栅扫描</div>
                    <div className="text-[11px] text-ink-3 mt-1">固定顺序逐像素<br/>像读一本没有标点的书</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[40px] text-ink-3">→</div>
                  <div className="text-[11px] text-ink-3 text-center">
                    VAR 换了一种<br/>更自然的方式
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[200px] aspect-square rounded-xl border border-primary/20 bg-primary/5 p-3 flex flex-col gap-1">
                    {[
                      { h: '20%', bg: 'bg-primary/50' },
                      { h: '25%', bg: 'bg-primary/35' },
                      { h: '25%', bg: 'bg-blue/30' },
                      { h: '30%', bg: 'bg-green/25' },
                    ].map((l, i) => (
                      <div key={i} className={`flex-1 rounded-md ${l.bg}`} />
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-title font-semibold text-primary">逐尺度预测</div>
                    <div className="text-[11px] text-ink-3 mt-1">从粗到细，像画画一样<br/>先构图，再细化</div>
                  </div>
                </div>
              </div>
            ),
            takeaway: '图像不是句子，VAR 用更符合视觉直觉的方式来生成。',
          },
          {
            title: 'VAR 的转向：预测下一层尺度，而不是下一个像素',
            lead: '把生成过程从一条长序列，变成一个由粗到细的金字塔。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="flex items-end gap-2">
                  {[
                    { pn: '1×1', label: '全局色调', h: 40, color: 'rgba(180,83,9,0.6)' },
                    { pn: '2×2', label: '区域划分', h: 60, color: 'rgba(180,83,9,0.5)' },
                    { pn: '4×4', label: '物体位置', h: 90, color: 'rgba(37,99,235,0.4)' },
                    { pn: '8×8', label: '基本轮廓', h: 120, color: 'rgba(37,99,235,0.35)' },
                    { pn: '16×16', label: '完整细节', h: 160, color: 'rgba(21,128,61,0.3)' },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-lg flex items-center justify-center"
                        style={{ width: `${60 + i * 20}px`, height: `${s.h}px`, background: s.color }}
                      >
                        <span className="text-white font-code text-[10px] font-bold">{s.pn}</span>
                      </div>
                      <span className="text-[10px] text-ink-3 text-center">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
            takeaway: '每一步预测的不是单个像素，而是一整层尺度的 token。',
          },
          {
            title: 'VQVAE：先把图像翻译成离散 token',
            lead: '就像 LLM 有词表，VAR 也需要一个视觉词表。',
            content: (
              <div className="flex items-center justify-center h-full gap-5">
                {[
                  { icon: '🖼️', label: '图像', sub: '256×256', color: 'var(--color-ink-2)' },
                  { icon: '→', label: '', sub: '', color: 'var(--color-ink-3)', isArrow: true },
                  { icon: '🔧', label: 'Encoder', sub: '卷积编码', color: 'var(--color-blue)' },
                  { icon: '→', label: '', sub: '', color: 'var(--color-ink-3)', isArrow: true },
                  { icon: '📊', label: '量化', sub: '4096 码本', color: 'var(--color-primary)' },
                  { icon: '→', label: '', sub: '', color: 'var(--color-ink-3)', isArrow: true },
                  { icon: '🎯', label: 'Token', sub: '多尺度索引', color: 'var(--color-primary)' },
                ].map((item, i) => (
                  item.isArrow ? (
                    <div key={i} className="text-xl text-ink-3">→</div>
                  ) : (
                    <div key={i} className="flex-1 max-w-[140px] flex flex-col items-center gap-2 p-4 rounded-xl border border-line bg-surface">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="text-[12px] font-title font-semibold" style={{ color: item.color }}>{item.label}</div>
                      <div className="text-[10px] text-ink-3">{item.sub}</div>
                    </div>
                  )
                ))}
              </div>
            ),
            takeaway: 'VQVAE 把连续图像变成离散 token，VAR 在这些 token 上做自回归。',
          },
          {
            title: 'Transformer 每步预测一整层 token',
            lead: 'VAR Transformer 和 GPT 结构相似，但输出是多尺度的。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="max-w-lg w-full space-y-3">
                  {[
                    { label: '输入', desc: '类别标签 + 多尺度 token 序列 (680个)', bg: 'bg-primary/6', border: 'border-primary/15', text: 'text-primary' },
                    { label: '嵌入', desc: 'Word + Position + Level Embedding', bg: 'bg-surface', border: 'border-line', text: 'text-ink' },
                    { label: '主干', desc: 'AdaLN Self-Attention × 16 层', bg: 'bg-surface', border: 'border-line', text: 'text-ink' },
                    { label: '输出', desc: '预测下一个尺度的 token 分布', bg: 'bg-green/6', border: 'border-green/15', text: 'text-green' },
                  ].map((layer, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 text-right text-[11px] font-title font-semibold text-ink-3 shrink-0">
                        {layer.label}
                      </div>
                      <div className={`flex-1 rounded-lg px-4 py-2.5 ${layer.bg} border ${layer.border}`}>
                        <div className={`text-[13px] font-medium ${layer.text}`}>{layer.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            takeaway: '架构和 GPT 类似，区别在于它预测的是多尺度视觉 token。',
          },
          {
            title: '从粗到细：先布局，再细节',
            lead: '自回归生成的 10 步过程，每一步都在细化图像。',
            content: (
              <div className="flex items-center justify-center h-full gap-1.5">
                {[
                  { desc: '1×1', detail: '色调', emoji: '🎯' },
                  { desc: '2×2', detail: '区域', emoji: '✏️' },
                  { desc: '3×3', detail: '结构', emoji: '🏗️' },
                  { desc: '4×4', detail: '位置', emoji: '📐' },
                  { desc: '5×5', detail: '形状', emoji: '🖊️' },
                  { desc: '6×6', detail: '轮廓', emoji: '🎨' },
                  { desc: '8×8', detail: '纹理', emoji: '📸' },
                  { desc: '10×10', detail: '细节', emoji: '🔍' },
                  { desc: '13×13', detail: '精调', emoji: '🔎' },
                  { desc: '16×16', detail: '完成', emoji: '✨' },
                ].map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full aspect-square rounded-lg flex items-center justify-center text-lg border"
                      style={{
                        background: `rgba(180,83,9,${0.02 + i * 0.012})`,
                        borderColor: `rgba(180,83,9,${0.05 + i * 0.01})`,
                      }}
                    >
                      {s.emoji}
                    </div>
                    <div className="text-[10px] font-code font-semibold text-primary">{s.desc}</div>
                    <div className="text-[9px] text-ink-3">{s.detail}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: '10 步完成一张图，每步预测一整层，比扩散模型快 20-50 倍。',
          },
          {
            title: '为什么更快：每层内部可以并行',
            lead: '扩散模型每步串行去噪，VAR 每层 token 可以并行预测。',
            content: (
              <div className="flex items-center justify-center h-full gap-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-[13px] font-title font-semibold text-red">扩散模型</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="w-8 h-8 rounded-md bg-red/10 border border-red/20 flex items-center justify-center text-[10px] font-code text-red">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-ink-3">串行：每步都要跑完整网络</div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="text-[13px] font-title font-semibold text-green">VAR</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        {Array.from({ length: 3 }, (_, j) => (
                          <div key={j} className="w-8 h-3 rounded-sm bg-green/15 border border-green/25" />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-ink-3">并行：每层内 token 同时预测</div>
                </div>
              </div>
            ),
            takeaway: 'VAR 的速度优势来自层级并行，而非减少生成步数。',
          },
          {
            title: 'VAR 的三个收益',
            lead: '速度、质量、可扩展性，三者兼得。',
            content: (
              <div className="flex items-center justify-center h-full gap-8">
                {[
                  { stat: '20-50×', label: '推理加速', desc: '比扩散模型快', color: 'var(--color-green)' },
                  { stat: 'FID 1.80', label: '生成质量', desc: '超越所有扩散模型', color: 'var(--color-primary)' },
                  { stat: '幂律', label: '可扩展性', desc: '更大 = 更好，可预测', color: 'var(--color-blue)' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 max-w-[200px] text-center">
                    <div className="font-number font-black text-[36px] leading-none" style={{ color: item.color }}>{item.stat}</div>
                    <div className="text-[14px] font-title font-semibold text-ink mt-3">{item.label}</div>
                    <div className="text-[11px] text-ink-3 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'VAR 证明了 GPT 范式在视觉上同样强大。',
          },
          {
            title: '一句话记住 VAR',
            lead: '不是预测下一个像素，而是预测下一层尺度。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <div className="text-center">
                  <div className="text-[28px] font-title font-bold text-ink leading-relaxed">
                    不是预测下一个像素，<br/>而是预测下一层尺度。
                  </div>
                </div>
                <div className="flex gap-3 text-[12px] text-ink-3">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-line">论文: arxiv 2404.02905</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-line">代码: FoundationVision/VAR</span>
                </div>
              </div>
            ),
            takeaway: 'VAR = Visual Autoregressive Modeling，逐尺度生成。',
          },
        ],
      },
    ],
  },
  {
    id: 'structure',
    title: '项目结构',
    icon: '🗂️',
    questions: [
      {
        id: 'file-structure',
        title: '每个目录和文件是干嘛的？',
        slides: [
          {
            title: '先看全局：VAR 项目只有三条主线',
            lead: '训练、生成、评估——所有文件都围绕这三件事。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                {[
                  { icon: '🏋️', label: '训练', files: 'train.py · trainer.py', color: 'var(--color-primary)' },
                  { icon: '🧠', label: '模型', files: 'models/ 全部', color: 'var(--color-blue)' },
                  { icon: '🔧', label: '支撑', files: 'utils/ · dist.py', color: 'var(--color-green)' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 max-w-[220px] flex flex-col items-center gap-3 p-6 rounded-xl border border-line bg-surface">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="text-[15px] font-title font-bold" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[11px] font-code text-ink-3 text-center">{item.files}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: '不需要记住所有文件，只需要理解三条主线。',
          },
          {
            title: 'train.py：训练流程的入口导演',
            lead: '一个文件串联了数据、模型、优化器、训练循环。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                {[
                  { step: '1', name: '解析参数', desc: 'depth, lr, batch size 等超参数', color: '#b45309' },
                  { step: '2', name: '加载数据', desc: 'ImageNet + DataLoader', color: '#2563eb' },
                  { step: '3', name: '构建模型', desc: 'VQVAE + VAR，加载预训练 VAE', color: '#b45309' },
                  { step: '4', name: '构建优化器', desc: 'AdamW + 混合精度 + 梯度裁剪', color: '#15803d' },
                  { step: '5', name: '训练循环', desc: '逐 epoch 训练，每 10 epoch 验证保存', color: '#7c3aed' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 max-w-lg w-full">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border" style={{ background: `${item.color}10`, color: item.color, borderColor: `${item.color}30` }}>
                      {item.step}
                    </div>
                    <div className="flex-1 rounded-lg px-3 py-2 bg-surface border border-line">
                      <div className="text-[12px] font-semibold" style={{ color: item.color }}>{item.name}</div>
                      <div className="text-[11px] text-ink-3">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'train.py 是入口，负责把所有组件串起来。',
          },
          {
            title: 'trainer.py：真正执行一步训练的地方',
            lead: 'train_step() 和 eval_ep() 是最核心的两个函数。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                <div className="flex-1 max-w-sm rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-primary mb-3">train_step() — 训练一步</div>
                  <div className="space-y-2 text-[11px] text-ink-2">
                    {['VQVAE 编码图像 → token', 'VAR 前向 → logits', '交叉熵损失 + 加权', '反向传播 + 梯度裁剪'].map((t, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="font-code text-primary shrink-0">→</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 max-w-sm rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-blue mb-3">eval_ep() — 验证一轮</div>
                  <div className="space-y-2 text-[11px] text-ink-2">
                    {['遍历验证集', '计算平均损失和尾部损失', '计算 token 预测准确率', '多 GPU 同步汇总'].map((t, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="font-code text-blue shrink-0">→</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            takeaway: 'trainer.py 封装了训练和评估的核心逻辑。',
          },
          {
            title: 'models/：模型结构集中在这里',
            lead: '6 个文件定义了 VQVAE 和 VAR 的全部组件。',
            content: (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="max-w-2xl w-full rounded-xl p-6 bg-surface border border-line">
                  <div className="flex flex-col gap-3">
                    {[
                      { file: '__init__.py', role: '组装工厂', color: '#b45309' },
                      { file: 'var.py', role: 'VAR Transformer', color: '#b45309' },
                      { file: 'vqvae.py', role: 'VQVAE 编解码器', color: '#2563eb' },
                      { file: 'quant.py', role: '向量量化器', color: '#2563eb' },
                      { file: 'basic_var.py', role: 'Transformer 基础块', color: '#b45309' },
                      { file: 'basic_vae.py', role: '卷积编解码块', color: '#2563eb' },
                      { file: 'helpers.py', role: '采样和正则化', color: '#15803d' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-code text-[11px] font-semibold w-28 shrink-0" style={{ color: item.color }}>{item.file}</span>
                        <div className="flex-1 h-px bg-line" />
                        <span className="text-[11px] text-ink-2 font-title">{item.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            takeaway: 'var.py 和 vqvae.py 是核心，其他是支撑。',
          },
          {
            title: 'VQVAE：图像和 token 的翻译器',
            lead: '编码器压缩图像，量化器映射到码本，解码器还原。',
            content: (
              <div className="flex items-center justify-center h-full gap-4">
                {[
                  { icon: '🖼️', label: '图像输入', sub: '256×256×3' },
                  { icon: '↓', label: '', sub: '', isArrow: true },
                  { icon: '🔧', label: 'Encoder', sub: '卷积下采样' },
                  { icon: '↓', label: '', sub: '', isArrow: true },
                  { icon: '📊', label: 'VectorQuantizer2', sub: '找最近码本向量' },
                  { icon: '↓', label: '', sub: '', isArrow: true },
                  { icon: '🔧', label: 'Decoder', sub: '卷积上采样' },
                  { icon: '↓', label: '', sub: '', isArrow: true },
                  { icon: '🖼️', label: '重建图像', sub: '256×256×3' },
                ].map((item, i) => (
                  item.isArrow ? (
                    <div key={i} className="text-ink-3 text-sm">↓</div>
                  ) : (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-surface border border-line">
                      <div className="text-xl">{item.icon}</div>
                      <div className="text-[10px] font-title font-semibold text-ink">{item.label}</div>
                      <div className="text-[9px] font-code text-ink-3">{item.sub}</div>
                    </div>
                  )
                ))}
              </div>
            ),
            takeaway: 'quant.py 是关键：4096 大小的码本，多尺度残差量化。',
          },
          {
            title: 'VAR Transformer：生成 token 金字塔',
            lead: '和 GPT 类似，但用 AdaLN 注入尺度信息。',
            content: (
              <div className="flex items-center justify-center h-full gap-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[12px] font-title font-semibold text-blue">内部结构</div>
                  {['Word Embedding', 'Position Embedding', 'Level Embedding', 'AdaLN Self-Attention ×N', '预测头'].map((name, i) => (
                    <div key={i} className="w-52 text-center px-3 py-2 rounded-lg text-[11px] bg-surface border border-line text-ink-2">
                      {name}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[12px] font-title font-semibold text-green">关键创新</div>
                  <div className="w-52 p-4 rounded-lg bg-green/5 border border-green/15 text-[11px] text-ink-2 leading-relaxed">
                    <strong className="text-green">AdaLN</strong>：根据当前尺度动态调整归一化参数，让同一个 Transformer 处理不同尺度
                  </div>
                  <div className="w-52 p-4 rounded-lg bg-blue/5 border border-blue/15 text-[11px] text-ink-2 leading-relaxed">
                    <strong className="text-blue">Level Embedding</strong>：区分不同尺度的 token，类似 GPT 的 segment embedding
                  </div>
                </div>
              </div>
            ),
            takeaway: 'basic_var.py 定义了 FFN 和 AdaLNSelfAttn，是 VAR 的核心算子。',
          },
          {
            title: 'utils/：日志、分布式、指标工具箱',
            lead: '5 个工具文件，支撑训练过程的基础设施。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                {[
                  { file: 'arg_util.py', role: '参数管理', desc: '所有超参数定义和自动计算', color: '#b45309' },
                  { file: 'data.py', role: '数据加载', desc: 'ImageNet + 数据增强', color: '#2563eb' },
                  { file: 'data_sampler.py', role: '分布式采样', desc: '保证每个 GPU 不重叠', color: '#15803d' },
                  { file: 'lr_control.py', role: '学习率调度', desc: 'warmup + cosine decay', color: '#7c3aed' },
                  { file: 'amp_sc.py', role: '混合精度', desc: 'fp16/bf16 + 梯度裁剪', color: '#b45309' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 max-w-lg w-full">
                    <span className="font-code text-[11px] font-semibold w-24 shrink-0" style={{ color: item.color }}>{item.file}</span>
                    <div className="flex-1 rounded-lg px-3 py-2 bg-surface border border-line">
                      <div className="text-[11px] font-title font-semibold text-ink">{item.role}</div>
                      <div className="text-[10px] text-ink-3">{item.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-2 text-[11px] text-ink-3">dist.py 负责多 GPU 通信，不在 utils/ 里</div>
              </div>
            ),
            takeaway: '这些工具文件你不需要深入读，知道它们做什么就行。',
          },
          {
            title: '一张图串起所有文件',
            lead: '数据在文件间的完整流动路径。',
            content: (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="max-w-2xl w-full rounded-xl p-6 bg-surface border border-line">
                  <div className="flex flex-col gap-2.5">
                    {[
                      { from: 'data.py', to: 'train.py', what: '图像 + 标签', color: '#2563eb' },
                      { from: 'train.py', to: 'trainer.py', what: 'batch 数据', color: '#b45309' },
                      { from: 'trainer.py', to: 'vqvae.py', what: '图像 → token', color: '#2563eb' },
                      { from: 'vqvae.py', to: 'quant.py', what: '特征 → 量化', color: '#2563eb' },
                      { from: 'trainer.py', to: 'var.py', what: 'token → logits', color: '#b45309' },
                      { from: 'var.py', to: 'basic_var.py', what: 'Transformer 计算', color: '#b45309' },
                      { from: 'trainer.py', to: 'amp_sc.py', what: '梯度更新', color: '#15803d' },
                    ].map((flow, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-code text-[10px] font-semibold w-20 text-right shrink-0" style={{ color: flow.color }}>{flow.from}</span>
                        <div className="flex-1 flex items-center gap-1">
                          <div className="h-px flex-1" style={{ background: `${flow.color}25` }} />
                          <span className="text-[9px] text-ink-3 px-1">{flow.what}</span>
                          <div className="h-px flex-1" style={{ background: `${flow.color}25` }} />
                          <span style={{ color: flow.color }}>→</span>
                        </div>
                        <span className="font-code text-[10px] font-semibold w-20 shrink-0" style={{ color: flow.color }}>{flow.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            takeaway: '沿着数据流读代码，是最高效的理解方式。',
          },
        ],
      },
    ],
  },
  {
    id: 'process',
    title: '训练与生成',
    icon: '⚡',
    questions: [
      {
        id: 'training-generation-eval',
        title: '训练、生成和评估的过程',
        slides: [
          {
            title: '三件事：学会预测、逐级生成、用指标验证',
            lead: '训练学规律，生成用规律，评估验证规律。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                {[
                  { icon: '🏋️', label: '训练', desc: '学习 token 间的条件概率', color: 'var(--color-primary)' },
                  { icon: '🎨', label: '生成', desc: '逐尺度自回归采样', color: 'var(--color-blue)' },
                  { icon: '📏', label: '评估', desc: 'FID 衡量生成质量', color: 'var(--color-green)' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 max-w-[200px] flex flex-col items-center gap-3 p-5 rounded-xl border border-line bg-surface">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="text-[15px] font-title font-bold" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[11px] text-ink-3 text-center">{item.desc}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: '理解这三件事，就理解了整个项目。',
          },
          {
            title: '训练：输入图像，目标是下一尺度 token',
            lead: 'VQVAE 编码得到 ground truth，VAR 学习预测它。',
            content: (
              <div className="flex items-center justify-center h-full gap-3">
                {[
                  { icon: '🖼️', label: 'ImageNet 图像', color: '#b45309' },
                  { icon: '→', label: '', isArrow: true },
                  { icon: '📊', label: 'VQVAE 编码', color: '#2563eb' },
                  { icon: '→', label: '', isArrow: true },
                  { icon: '🔢', label: '多尺度 token', color: '#b45309' },
                  { icon: '→', label: '', isArrow: true },
                  { icon: '🧠', label: 'VAR 预测', color: '#2563eb' },
                  { icon: '→', label: '', isArrow: true },
                  { icon: '📉', label: '交叉熵损失', color: '#15803d' },
                ].map((item, i) => (
                  item.isArrow ? (
                    <div key={i} className="text-ink-3">→</div>
                  ) : (
                    <div key={i} className="flex-1 max-w-[110px] flex flex-col items-center gap-2 p-3 rounded-lg bg-surface border border-line">
                      <div className="text-xl">{item.icon}</div>
                      <div className="text-[10px] font-title font-semibold text-center" style={{ color: item.color }}>{item.label}</div>
                    </div>
                  )
                ))}
              </div>
            ),
            takeaway: '训练的本质：让 VAR 学会 P(token_n | token_1...n-1)。',
          },
          {
            title: 'Loss：每个尺度都要被监督',
            lead: '最后一个尺度（16×16）权重更高，因为细节最关键。',
            content: (
              <div className="flex items-center justify-center h-full gap-8">
                <div className="flex-1 max-w-xs">
                  <div className="text-[13px] font-title font-semibold text-ink mb-3">损失计算</div>
                  <div className="space-y-2 text-[11px] text-ink-2">
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>每个 token 位置独立计算交叉熵</div>
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>所有位置的损失取平均</div>
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>最后一个尺度权重更高</div>
                  </div>
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="text-[13px] font-title font-semibold text-ink mb-3">为什么加权？</div>
                  <div className="rounded-lg p-4 bg-surface border border-line text-[11px] text-ink-2 leading-relaxed">
                    16×16 有 256 个 token，是生成细节的关键。如果这部分预测不准，图像会模糊。
                  </div>
                </div>
              </div>
            ),
            takeaway: '损失函数的设计决定了模型关注什么。',
          },
          {
            title: '学习率：先热身，再衰减',
            lead: 'warmup 阶段线性增长，之后按余弦曲线衰减。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="max-w-lg w-full rounded-xl p-6 bg-surface border border-line">
                  <div className="relative h-32 border-b border-l border-line-strong">
                    <div className="absolute bottom-0 left-0 h-full" style={{ width: '5%' }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary/40 rounded-t" style={{ height: '30%' }} />
                    </div>
                    <div className="absolute bottom-0 h-full" style={{ left: '5%', right: '10%' }}>
                      <div className="absolute bottom-0 left-0 right-0 rounded-t" style={{ height: '100%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary) 70%, rgba(180,83,9,0.2))' }} />
                    </div>
                    <div className="absolute -bottom-5 left-[2%] text-[9px] text-ink-3">warmup</div>
                    <div className="absolute -bottom-5 left-[25%] text-[9px] text-ink-3">cosine decay</div>
                    <div className="absolute -left-1 -top-3 text-[9px] text-ink-3">lr</div>
                  </div>
                </div>
                <div className="flex gap-4 text-[11px]">
                  <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                    <div className="font-semibold text-primary">Warmup</div>
                    <div className="text-ink-3">前 0-5% 步数</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                    <div className="font-semibold text-primary">Cosine Decay</div>
                    <div className="text-ink-3">中间 5%-95%</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                    <div className="font-semibold text-primary">End</div>
                    <div className="text-ink-3">最后衰减到 1%</div>
                  </div>
                </div>
              </div>
            ),
            takeaway: 'warmup 防止初期震荡，cosine decay 帮助后期收敛。',
          },
          {
            title: '生成：从最粗尺度开始长大',
            lead: '推理时逐尺度采样，每步预测一整层 token。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                {[
                  { step: '1', name: '输入类别', desc: '指定生成类别（如"金毛犬"）', color: '#b45309' },
                  { step: '2', name: '逐尺度自回归', desc: '对 10 个尺度依次预测', color: '#b45309' },
                  { step: '3', name: 'Top-k + Top-p 采样', desc: '控制随机性，cfg=1.5 引导', color: '#2563eb' },
                  { step: '4', name: 'VQVAE 解码', desc: 'token 序列 → 图像', color: '#15803d' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 max-w-lg w-full">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border" style={{ background: `${item.color}10`, color: item.color, borderColor: `${item.color}30` }}>
                      {item.step}
                    </div>
                    <div className="flex-1 rounded-lg px-3 py-2 bg-surface border border-line">
                      <div className="text-[12px] font-semibold" style={{ color: item.color }}>{item.name}</div>
                      <div className="text-[11px] text-ink-3">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
            takeaway: '生成只需 10 步，每步并行预测一整层 token。',
          },
          {
            title: 'Top-k / Top-p：控制随机性边界',
            lead: '从 4096 个码本中筛选候选，平衡质量和多样性。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                <div className="flex-1 max-w-xs rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-primary mb-3">Top-k 采样</div>
                  <div className="text-[11px] text-ink-2 leading-relaxed">
                    只保留概率最高的 <strong>k=900</strong> 个 token，其余概率置零。
                  </div>
                </div>
                <div className="flex-1 max-w-xs rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-blue mb-3">Top-p 采样</div>
                  <div className="text-[11px] text-ink-2 leading-relaxed">
                    累积概率达到 <strong>p=0.96</strong> 的最小 token 集合，动态截断。
                  </div>
                </div>
              </div>
            ),
            takeaway: 'top-k 和 top-p 共同控制生成的随机程度。',
          },
          {
            title: 'CFG：让生成更听条件',
            lead: 'Classifier-Free Guidance 通过混合条件和无条件输出来增强控制。',
            content: (
              <div className="flex items-center justify-center h-full gap-4">
                {[
                  { label: '无条件生成', desc: '不指定类别', color: '#8a7d70' },
                  { label: '+', desc: '', isOp: true },
                  { label: '条件生成', desc: '指定类别', color: '#2563eb' },
                  { label: '=', desc: '', isOp: true },
                  { label: 'CFG 混合', desc: 'cfg=1.5 增强条件', color: '#15803d' },
                ].map((item, i) => (
                  item.isOp ? (
                    <div key={i} className="text-xl text-ink-3 font-bold">{item.label}</div>
                  ) : (
                    <div key={i} className="flex-1 max-w-[140px] text-center p-4 rounded-lg bg-surface border border-line">
                      <div className="text-[12px] font-title font-semibold" style={{ color: item.color }}>{item.label}</div>
                      <div className="text-[10px] text-ink-3 mt-1">{item.desc}</div>
                    </div>
                  )
                ))}
              </div>
            ),
            takeaway: 'cfg=1.5 是质量和多样性的最佳平衡点。',
          },
          {
            title: '评估：FID 看质量，速度看效率',
            lead: 'FID 越低越好，VAR-d30-re 达到 1.80。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                {[
                  { name: 'VAR-d30-re', fid: 1.80, bar: 92, color: 'var(--color-primary)', hl: true },
                  { name: 'VAR-d30', fid: 1.97, bar: 88, color: 'var(--color-primary)' },
                  { name: 'LDM (扩散)', fid: 3.60, bar: 55, color: 'var(--color-ink-3)' },
                  { name: 'ADM (扩散)', fid: 10.94, bar: 20, color: 'var(--color-ink-3)' },
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-surface-soft border border-line relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t"
                        style={{ height: `${m.bar}%`, background: m.hl ? 'var(--color-primary)' : `${m.color}20` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-number font-bold text-[18px]" style={{ color: m.hl ? 'white' : m.color }}>{m.fid}</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-title text-ink-2 text-center">{m.name}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'VAR 在 FID 上首次超越扩散模型，同时速度快 20-50 倍。',
          },
          {
            title: 'eval_ep：把模型放到统一考场',
            lead: '验证集不参与训练，用来客观衡量模型的真实水平。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                {[
                  { step: '1', name: '切换 eval 模式', desc: '关闭 dropout', color: '#b45309' },
                  { step: '2', name: '遍历验证集', desc: '每个 batch 前向推理', color: '#2563eb' },
                  { step: '3', name: '计算指标', desc: 'L_mean, L_tail, acc', color: '#15803d' },
                  { step: '4', name: '多 GPU 同步', desc: 'allreduce 汇总', color: '#7c3aed' },
                  { step: '5', name: '保存最优', desc: 'val_loss_tail 最优时保存', color: '#b45309' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 max-w-lg w-full">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border" style={{ background: `${item.color}10`, color: item.color, borderColor: `${item.color}30` }}>
                      {item.step}
                    </div>
                    <div className="flex-1 rounded-lg px-3 py-2 bg-surface border border-line">
                      <div className="text-[12px] font-semibold" style={{ color: item.color }}>{item.name}</div>
                      <div className="text-[11px] text-ink-3">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
            takeaway: '每 10 个 epoch 验证一次，保存最优 checkpoint。',
          },
          {
            title: '训练、生成、评估如何闭环',
            lead: '评估结果指导训练调整，形成持续改进的循环。',
            content: (
              <div className="flex items-center justify-center h-full gap-4">
                {[
                  { icon: '🏋️', label: '训练', desc: '学规律', color: 'var(--color-primary)' },
                  { icon: '→', isArrow: true },
                  { icon: '🎨', label: '生成', desc: '用规律', color: 'var(--color-blue)' },
                  { icon: '→', isArrow: true },
                  { icon: '📏', label: '评估', desc: '验规律', color: 'var(--color-green)' },
                  { icon: '→', isArrow: true },
                  { icon: '🔄', label: '改进', desc: '调参数', color: 'var(--color-violet)' },
                ].map((item, i) => (
                  item.isArrow ? (
                    <div key={i} className="text-ink-3">→</div>
                  ) : (
                    <div key={i} className="flex-1 max-w-[130px] flex flex-col items-center gap-2 p-4 rounded-lg bg-surface border border-line">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="text-[12px] font-title font-semibold" style={{ color: item.color }}>{item.label}</div>
                      <div className="text-[10px] text-ink-3">{item.desc}</div>
                    </div>
                  )
                ))}
              </div>
            ),
            takeaway: '好的评估体系让模型改进有据可依。',
          },
        ],
      },
    ],
  },
  {
    id: 'technical',
    title: '技术分析',
    icon: '🔬',
    questions: [
      {
        id: 'why-beats-diffusion',
        title: '为什么 VAR 能超越扩散模型？',
        slides: [
          {
            title: 'VAR 赢在：少步数、强并行、能扩展',
            lead: '三个维度的优势，让 VAR 首次超越扩散模型。',
            content: (
              <div className="flex items-center justify-center h-full gap-6">
                {[
                  { stat: '10 步', label: 'vs 扩散 50-1000 步', color: 'var(--color-green)' },
                  { stat: 'FID 1.80', label: '超越所有扩散模型', color: 'var(--color-primary)' },
                  { stat: '幂律', label: '模型越大效果越好', color: 'var(--color-blue)' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 max-w-[200px] text-center p-5 rounded-xl bg-surface border border-line">
                    <div className="font-number font-black text-[28px]" style={{ color: item.color }}>{item.stat}</div>
                    <div className="text-[11px] text-ink-3 mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'VAR 不是某一项更好，而是三个维度同时领先。',
          },
          {
            title: '扩散模型：一步步把噪声擦干净',
            lead: '从纯噪声出发，经过 50-1000 步迭代去噪。',
            content: (
              <div className="flex items-center justify-center h-full gap-2">
                {['纯噪声', '含噪', '含噪', '含噪', '清晰'].map((label, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full aspect-square rounded-xl flex items-center justify-center text-xl border"
                      style={{ background: `rgba(185,28,28,${0.03 + i * 0.02})`, borderColor: `rgba(185,28,28,${0.06 + i * 0.02})` }}
                    >
                      {i === 0 ? '🌫️' : i === 4 ? '🖼️' : '🔄'}
                    </div>
                    <span className="text-[10px] text-ink-3">{label}</span>
                    {i < 4 && <span className="text-[9px] text-ink-3">×100步</span>}
                  </div>
                ))}
              </div>
            ),
            takeaway: '扩散模型的慢来自"每步都要跑完整网络"。',
          },
          {
            title: 'VAR：一层层把图像长出来',
            lead: '从 1×1 的全局色调开始，逐步细化到 16×16。',
            content: (
              <div className="flex items-center justify-center h-full gap-1.5">
                {[
                  { size: '1×1', color: 'rgba(180,83,9,0.6)' },
                  { size: '2×2', color: 'rgba(180,83,9,0.5)' },
                  { size: '4×4', color: 'rgba(37,99,235,0.4)' },
                  { size: '8×8', color: 'rgba(37,99,235,0.35)' },
                  { size: '16×16', color: 'rgba(21,128,61,0.3)' },
                ].map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full aspect-square rounded-lg border" style={{ background: s.color, borderColor: `${s.color}40` }} />
                    <span className="text-[10px] font-code text-ink-3">{s.size}</span>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'VAR 只需 10 步，因为每步预测一整层。',
          },
          {
            title: '速度差异来自生成路径不同',
            lead: '扩散模型串行去噪，VAR 层级并行。',
            content: (
              <div className="flex items-center justify-center h-full gap-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[12px] font-title font-semibold text-red">扩散：串行</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div key={i} className="w-6 h-6 rounded-sm bg-red/10 border border-red/20" />
                    ))}
                  </div>
                  <div className="text-[10px] text-ink-3">每步 = 完整网络推理</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[12px] font-title font-semibold text-green">VAR：并行</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        {Array.from({ length: 3 }, (_, j) => (
                          <div key={j} className="w-6 h-3 rounded-sm bg-green/15 border border-green/25" />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-ink-3">每层内 token 同时预测</div>
                </div>
              </div>
            ),
            takeaway: '并行化是 VAR 速度优势的根本原因。',
          },
          {
            title: 'Scaling Laws：模型变大时 VAR 更可预测',
            lead: '就像 LLM 一样，VAR 也遵循幂律缩放。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="max-w-lg w-full rounded-xl p-6 bg-surface border border-line">
                  <div className="relative h-36 border-b border-l border-line-strong">
                    {[
                      { x: 8, y: 85, label: 'd16\n310M' },
                      { x: 25, y: 68, label: 'd20\n600M' },
                      { x: 45, y: 50, label: 'd24\n1.0B' },
                      { x: 68, y: 30, label: 'd30\n2.0B' },
                      { x: 88, y: 18, label: 'd36\n2.3B' },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="absolute flex flex-col items-center"
                        style={{ left: `${p.x}%`, bottom: `${100 - p.y}%`, transform: 'translate(-50%, 50%)' }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="text-[8px] mt-1 whitespace-pre-line text-center font-code text-ink-3">{p.label}</div>
                      </div>
                    ))}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 8 15 Q 40 30, 88 82" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="absolute -left-1 -top-4 text-[8px] text-ink-3">FID ↓</div>
                    <div className="absolute -bottom-4 right-0 text-[8px] text-ink-3">参数量 →</div>
                  </div>
                </div>
                <div className="text-[11px] text-ink-3">更大模型几乎必然更好，且效果可预测</div>
              </div>
            ),
            takeaway: 'Scaling law 让 VAR 的投资回报可预测。',
          },
          {
            title: 'GPT 范式优势：统一、简洁、可扩展',
            lead: 'VAR 证明了视觉和语言可以用同一套自回归框架。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                {[
                  { icon: '🧠', title: '统一范式', desc: 'NLP 和 CV 用相同框架', color: 'var(--color-primary)' },
                  { icon: '📊', title: '可预测缩放', desc: '增大模型必然提升效果', color: 'var(--color-blue)' },
                  { icon: '🔧', title: '复用工具链', desc: 'KV Cache、Flash Attention 直接用', color: 'var(--color-green)' },
                  { icon: '🎯', title: '确定性生成', desc: '相同输入相同输出', color: 'var(--color-violet)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 max-w-lg w-full rounded-lg px-4 py-3 bg-surface border border-line">
                    <div className="text-xl shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-[12px] font-title font-semibold" style={{ color: item.color }}>{item.title}</div>
                      <div className="text-[11px] text-ink-2">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
            takeaway: 'VAR 的意义不只是效果好，更是范式统一。',
          },
          {
            title: '但 VAR 不是扩散的简单替代品',
            lead: '两者各有适用场景，VAR 的优势在速度和可扩展性。',
            content: (
              <div className="flex items-center justify-center h-full gap-8">
                <div className="flex-1 max-w-xs rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-primary mb-3">VAR 更适合</div>
                  <div className="space-y-2 text-[11px] text-ink-2">
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>需要快速推理</div>
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>大规模部署</div>
                    <div className="flex items-start gap-2"><span className="text-primary">→</span>类条件生成</div>
                  </div>
                </div>
                <div className="flex-1 max-w-xs rounded-xl p-5 bg-surface border border-line">
                  <div className="text-[13px] font-title font-bold text-blue mb-3">扩散仍擅长</div>
                  <div className="space-y-2 text-[11px] text-ink-2">
                    <div className="flex items-start gap-2"><span className="text-blue">→</span>文本到图像</div>
                    <div className="flex items-start gap-2"><span className="text-blue">→</span>图像编辑</div>
                    <div className="flex items-start gap-2"><span className="text-blue"></span>视频生成</div>
                  </div>
                </div>
              </div>
            ),
            takeaway: '选择方法要看场景，不是非此即彼。',
          },
          {
            title: '总结：它改变的是图像生成的序列化方式',
            lead: 'VAR 证明了 GPT 范式在视觉上同样强大。',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <div className="text-center">
                  <div className="text-[24px] font-title font-bold text-ink leading-relaxed">
                    不是预测下一个像素，<br/>而是预测下一层尺度。
                  </div>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="font-number font-black text-[28px] text-green">20-50×</div>
                    <div className="text-[11px] text-ink-3">更快</div>
                  </div>
                  <div>
                    <div className="font-number font-black text-[28px] text-primary">1.80</div>
                    <div className="text-[11px] text-ink-3">FID</div>
                  </div>
                  <div>
                    <div className="font-number font-black text-[28px] text-blue">幂律</div>
                    <div className="text-[11px] text-ink-3">可扩展</div>
                  </div>
                </div>
              </div>
            ),
            takeaway: 'VAR 改变了图像生成的序列化方式，开辟了新范式。',
          },
        ],
      },
    ],
  },
  {
    id: 'experiment',
    title: '实验相关',
    icon: '🧪',
    questions: [],
  },
  {
    id: 'application',
    title: '应用场景',
    icon: '🚀',
    questions: [],
  },
]

export default categories
