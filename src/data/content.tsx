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
            title: 'VAR — 视觉自回归建模',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <div className="relative">
                  <div className="text-7xl font-black tracking-tighter" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
                    VAR
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20" style={{ background: 'var(--accent)' }} />
                </div>
                <div className="text-lg tracking-widest uppercase" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--sans)', letterSpacing: '0.3em' }}>
                  Visual Autoregressive Modeling
                </div>
                <div className="text-base max-w-lg text-center leading-relaxed" style={{ color: 'var(--ink-light)' }}>
                  一种全新的视觉生成范式：<br />
                  用<span className="font-bold" style={{ color: 'var(--accent)' }}>逐尺度预测</span>替代传统的逐像素预测
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(194,65,12,0.08)', color: 'var(--accent)' }}>NeurIPS 2024</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(30,64,175,0.08)', color: 'var(--blue)' }}>Best Paper</span>
                </div>
              </div>
            ),
          },
          {
            title: '传统方法的困境',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>现有图像生成方法的两难</h2>
                <div className="grid grid-cols-2 gap-6 max-w-3xl w-full">
                  <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>扩散模型</div>
                    <div className="space-y-3 text-sm" style={{ color: 'var(--ink-light)' }}>
                      {['需要数百步迭代去噪，推理慢', '计算成本高，部署困难', '不是真正自回归，无法利用 GPT 范式'].map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-0.5 text-red-400 text-xs">✗</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>传统 AR 模型</div>
                    <div className="space-y-3 text-sm" style={{ color: 'var(--ink-light)' }}>
                      {['光栅扫描逐像素，无层次结构', '效果长期落后于扩散模型', '无法利用多尺度信息'].map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-0.5 text-red-400 text-xs">✗</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-base font-medium" style={{ color: 'var(--accent)' }}>
                  → 有没有两全其美的方案？
                </div>
              </div>
            ),
          },
          {
            title: '核心思想：Next-Scale Prediction',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>逐尺度预测</h2>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>从粗到细地生成图像，就像人类画画一样</p>
                <div className="flex items-center gap-3 max-w-4xl w-full">
                  {[
                    { scale: '1×1', label: '草图', emoji: '🎯', c: '#c2410c' },
                    { scale: '2×2', label: '轮廓', emoji: '✏️', c: '#b45309' },
                    { scale: '4×4', label: '结构', emoji: '🏗️', c: '#0369a1' },
                    { scale: '8×8', label: '细节', emoji: '🔍', c: '#047857' },
                    { scale: '16×16', label: '精修', emoji: '✨', c: '#6d28d9' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                      <div
                        className="w-full aspect-square rounded-xl flex items-center justify-center text-3xl"
                        style={{ background: `${s.c}10`, border: `1.5px solid ${s.c}25` }}
                      >
                        {s.emoji}
                      </div>
                      <div className="font-mono text-xs font-semibold" style={{ color: s.c }}>{s.scale}</div>
                      <div className="text-[11px]" style={{ color: 'var(--ink-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 px-5 py-3 rounded-lg text-sm" style={{ background: 'rgba(194,65,12,0.05)', color: 'var(--ink-light)', border: '1px solid rgba(194,65,12,0.1)' }}>
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>类比：</span>
                  先画草图 → 勾轮廓 → 填结构 → 加细节 → 精修
                </div>
              </div>
            ),
          },
          {
            title: '两种范式对比',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>逐像素 vs 逐尺度</h2>
                <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm font-bold tracking-wide" style={{ color: '#b91c1c' }}>Next-Token Prediction</div>
                    <div className="w-full aspect-square max-w-[220px] rounded-xl p-3" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                      <div className="grid grid-cols-8 grid-rows-8 h-full gap-0.5">
                        {Array.from({ length: 64 }, (_, i) => (
                          <div
                            key={i}
                            className="rounded-sm flex items-center justify-center font-mono"
                            style={{
                              fontSize: '8px',
                              background: i < 20 ? `rgba(194,65,12,${0.08 + i * 0.015})` : '#f5f0eb',
                              color: i < 20 ? '#9a3412' : '#d4ccc3',
                            }}
                          >
                            {i < 20 ? i + 1 : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-center" style={{ color: 'var(--ink-muted)' }}>按固定顺序逐个预测<br />一次只生成一个像素</div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm font-bold tracking-wide" style={{ color: 'var(--accent)' }}>Next-Scale Prediction</div>
                    <div className="w-full aspect-square max-w-[220px] rounded-xl p-3 flex flex-col gap-1.5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                      {[
                        { size: 1, bg: 'rgba(194,65,12,0.6)' },
                        { size: 2, bg: 'rgba(180,83,9,0.5)' },
                        { size: 4, bg: 'rgba(3,105,161,0.4)' },
                        { size: 8, bg: 'rgba(4,120,87,0.35)' },
                      ].map((layer, i) => (
                        <div key={i} className="flex-1 rounded-md" style={{ background: layer.bg }} />
                      ))}
                    </div>
                    <div className="text-xs text-center" style={{ color: 'var(--ink-muted)' }}>从粗到细逐尺度预测<br />每次生成一整个尺度</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '多尺度 Token 金字塔',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>Token 金字塔</h2>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>VQVAE 将图像编码为多尺度离散 token</p>
                <div className="flex items-end gap-1.5 max-w-3xl">
                  {[
                    { pn: 1, tokens: 1, color: 'rgba(194,65,12,0.7)' },
                    { pn: 2, tokens: 4, color: 'rgba(194,65,12,0.6)' },
                    { pn: 3, tokens: 9, color: 'rgba(180,83,9,0.55)' },
                    { pn: 4, tokens: 16, color: 'rgba(120,110,90,0.5)' },
                    { pn: 5, tokens: 25, color: 'rgba(3,105,161,0.45)' },
                    { pn: 6, tokens: 36, color: 'rgba(3,105,161,0.4)' },
                    { pn: 8, tokens: 64, color: 'rgba(4,120,87,0.35)' },
                    { pn: 10, tokens: 100, color: 'rgba(4,120,87,0.3)' },
                    { pn: 13, tokens: 169, color: 'rgba(109,40,217,0.3)' },
                    { pn: 16, tokens: 256, color: 'rgba(109,40,217,0.25)' },
                  ].map((layer, i) => {
                    const h = 30 + i * 22
                    return (
                      <div key={i} className="flex flex-col items-center gap-1 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div
                          className="rounded-lg flex items-center justify-center"
                          style={{ width: `${36 + i * 14}px`, height: `${h}px`, background: layer.color }}
                        >
                          <span className="text-white font-mono text-[10px] font-bold">{layer.pn}×{layer.pn}</span>
                        </div>
                        <span className="text-[9px] font-mono" style={{ color: 'var(--ink-muted)' }}>{layer.tokens}t</span>
                      </div>
                    )
                  })}
                </div>
                <div className="text-xs mt-2" style={{ color: 'var(--ink-muted)' }}>
                  共 10 个尺度，总计 680 个 token → 自回归预测这 680 个 token
                </div>
              </div>
            ),
          },
          {
            title: 'VQVAE：视觉分词器',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VQVAE — 图像 → 离散 Token</h2>
                <div className="flex items-center gap-4 max-w-4xl w-full">
                  {[
                    { icon: '🖼️', label: '输入图像', sub: '256×256 RGB', accent: 'var(--ink)' },
                    { icon: '🔧', label: 'Encoder', sub: '卷积编码', accent: 'var(--ink-light)' },
                    { icon: '📊', label: '向量量化', sub: '4096 码本', accent: 'var(--accent)' },
                    { icon: '🎯', label: '离散 Token', sub: '多尺度索引', accent: 'var(--accent)' },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex items-center gap-3">
                      {i > 0 && <div className="text-lg" style={{ color: 'var(--ink-muted)' }}>→</div>}
                      <div className="flex-1 rounded-xl p-4 text-center" style={{ background: i === 3 ? 'rgba(194,65,12,0.05)' : 'white', border: `1px solid ${i === 3 ? 'rgba(194,65,12,0.15)' : '#e5ddd3'}` }}>
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm font-semibold" style={{ color: item.accent }}>{item.label}</div>
                        <div className="text-[10px] mt-1" style={{ color: 'var(--ink-muted)' }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 rounded-lg text-sm" style={{ background: 'rgba(180,83,9,0.05)', border: '1px solid rgba(180,83,9,0.1)', color: 'var(--ink-light)' }}>
                  <span className="font-semibold" style={{ color: '#b45309' }}>关键：</span>
                  码本大小 4096，每个 token 是码本中的一个索引，就像 LLM 的词表
                </div>
              </div>
            ),
          },
          {
            title: 'VAR Transformer 架构',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VAR Transformer</h2>
                <div className="max-w-2xl w-full space-y-3">
                  {[
                    { label: '输入', content: '多尺度 Token 序列（680 个 token）', bg: 'rgba(194,65,12,0.06)', border: 'rgba(194,65,12,0.15)', color: 'var(--accent)' },
                    { label: '嵌入层', content: 'Word Embedding + Position Embedding + Level Embedding', bg: 'white', border: '#e5ddd3', color: 'var(--ink)' },
                    { label: '主干', content: 'AdaLN Self-Attention × 16 层', bg: 'white', border: '#e5ddd3', color: 'var(--ink)' },
                    { label: '输出', content: '预测下一个尺度的 Token 分布', bg: 'rgba(4,120,87,0.06)', border: 'rgba(4,120,87,0.15)', color: '#047857' },
                  ].map((layer, i) => (
                    <div key={i} className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="w-16 text-right text-xs font-medium shrink-0" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--serif)' }}>
                        {layer.label}
                      </div>
                      <div className="flex-1 rounded-lg px-4 py-3 text-sm font-medium" style={{ background: layer.bg, border: `1px solid ${layer.border}`, color: layer.color }}>
                        {layer.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--ink-muted)' }}>
                  模型规模：310M → 2.3B 参数，depth 从 16 到 36
                </div>
              </div>
            ),
          },
          {
            title: '从噪声到图像',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>自回归生成过程</h2>
                <div className="flex items-center gap-2 max-w-4xl w-full">
                  {[
                    { desc: '1×1', detail: '决定色调', emoji: '🎯' },
                    { desc: '2×2', detail: '划分区域', emoji: '✏️' },
                    { desc: '3×3', detail: '建立结构', emoji: '🏗️' },
                    { desc: '4×4', detail: '确定位置', emoji: '📐' },
                    { desc: '5×5', detail: '添加形状', emoji: '🖊️' },
                    { desc: '6×6', detail: '勾勒轮廓', emoji: '🎨' },
                    { desc: '8×8', detail: '填充纹理', emoji: '📸' },
                    { desc: '10×10', detail: '增加细节', emoji: '🔍' },
                    { desc: '13×13', detail: '精细调整', emoji: '🔎' },
                    { desc: '16×16', detail: '最终输出', emoji: '✨' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div
                        className="w-full aspect-square rounded-lg flex items-center justify-center text-lg"
                        style={{ background: `rgba(194,65,12,${0.03 + i * 0.015})`, border: '1px solid rgba(194,65,12,0.08)' }}
                      >
                        {s.emoji}
                      </div>
                      <div className="text-[10px] font-mono font-semibold" style={{ color: 'var(--accent)' }}>{s.desc}</div>
                      <div className="text-[9px] text-center leading-tight" style={{ color: 'var(--ink-muted)' }}>{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '三大成果',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VAR 的三大成果</h2>
                <div className="grid grid-cols-3 gap-5 max-w-3xl w-full">
                  {[
                    { emoji: '🏆', title: '首次超越扩散', desc: 'AR 模型首次在 FID 上超过扩散模型', stat: 'FID 1.80', color: 'var(--accent)' },
                    { emoji: '📈', title: 'Scaling Laws', desc: '发现与 LLM 类似的幂律缩放定律', stat: 'FID ∝ N⁻⁰·³', color: 'var(--blue)' },
                    { emoji: '🛠️', title: '零样本泛化', desc: '无需微调即可做编辑、插值等任务', stat: 'Zero-shot', color: '#047857' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5 text-center animate-fade-up" style={{ background: 'white', border: '1px solid #e5ddd3', animationDelay: `${i * 0.15}s` }}>
                      <div className="text-3xl mb-3">{item.emoji}</div>
                      <div className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>{item.title}</div>
                      <div className="text-xs mb-3" style={{ color: 'var(--ink-muted)' }}>{item.desc}</div>
                      <div className="font-mono text-lg font-bold" style={{ color: item.color }}>{item.stat}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
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
            title: '项目全景',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VAR 项目全景</h2>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>整个项目分为 4 大模块，各司其职</p>
                <div className="grid grid-cols-4 gap-4 max-w-4xl w-full">
                  {[
                    { icon: '🧠', name: 'models/', desc: '模型定义', color: 'var(--accent)', files: '6 个文件' },
                    { icon: '🏋️', name: '训练脚本', desc: '训练入口', color: 'var(--blue)', files: '2 个文件' },
                    { icon: '🔧', name: 'utils/', desc: '工具函数', color: '#047857', files: '5 个文件' },
                    { icon: '📓', name: 'notebooks', desc: '交互演示', color: '#7c3aed', files: '2 个文件' },
                  ].map((mod, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                      <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-2" style={{ background: `${mod.color}08`, border: `1.5px solid ${mod.color}20` }}>
                        <span className="text-3xl">{mod.icon}</span>
                        <span className="text-sm font-bold" style={{ color: mod.color }}>{mod.name}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{mod.desc}</div>
                        <div className="text-[10px] font-mono" style={{ color: 'var(--ink-muted)' }}>{mod.files}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: 'models/ — 模型定义（核心）',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🧠</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>models/ 目录</h2>
                </div>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>定义了 VQVAE 和 VAR 两个核心模型的所有组件</p>
                <div className="max-w-3xl w-full space-y-3">
                  {[
                    { file: '__init__.py', role: '组装工厂', desc: 'build_vae_var() 函数：把 VQVAE 和 VAR 组装在一起，设置所有超参数', icon: '🏭' },
                    { file: 'var.py', role: 'VAR 模型', desc: '核心 Transformer：多尺度自回归预测，包含位置编码、level embedding、条件生成', icon: '🎯' },
                    { file: 'vqvae.py', role: 'VQVAE 模型', desc: '视觉分词器：图像 → 多尺度离散 token，包含 encoder、decoder、量化器', icon: '📊' },
                    { file: 'quant.py', role: '向量量化', desc: 'VectorQuantizer2：码本查找、EMA 更新、多尺度残差量化 (Φ 函数)', icon: '🔢' },
                    { file: 'basic_var.py', role: 'Transformer 块', desc: 'FFN、AdaLNSelfAttn、AdaLNBeforeHead：VAR 的基础构建单元', icon: '🧱' },
                    { file: 'basic_vae.py', role: 'VAE 组件', desc: 'Encoder、Decoder：卷积编解码器，含 ResNetBlock、Attention、上下采样', icon: '🔧' },
                    { file: 'helpers.py', role: '辅助函数', desc: 'Top-k/Top-p 采样、Gumbel Softmax、DropPath 正则化', icon: '🛠️' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="text-xl shrink-0 mt-0.5 w-8 text-center">{item.icon}</div>
                      <div className="flex-1 rounded-lg px-4 py-3" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>{item.file}</span>
                          <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(194,65,12,0.06)', color: 'var(--accent)', fontFamily: 'var(--serif)' }}>{item.role}</span>
                        </div>
                        <div className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: 'models/ 内部调用关系',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>模型内部的调用链</h2>
                <div className="max-w-3xl w-full">
                  <div className="relative rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    {/* Flow diagram */}
                    <div className="flex flex-col gap-4">
                      {/* Top level */}
                      <div className="flex justify-center">
                        <div className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: 'rgba(194,65,12,0.08)', color: 'var(--accent)', border: '1px solid rgba(194,65,12,0.2)' }}>
                          __init__.py: build_vae_var()
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>↓ 调用</div>
                      </div>
                      {/* Two branches */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-center px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: 'rgba(30,64,175,0.06)', color: 'var(--blue)', border: '1px solid rgba(30,64,175,0.15)' }}>
                            VQVAE (vqvae.py)
                          </div>
                          <div className="text-center text-xs" style={{ color: 'var(--ink-muted)' }}>↓ 包含</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(30,64,175,0.04)', color: 'var(--blue-light)' }}>
                              Encoder<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>basic_vae.py</span>
                            </div>
                            <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(30,64,175,0.04)', color: 'var(--blue-light)' }}>
                              Decoder<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>basic_vae.py</span>
                            </div>
                          </div>
                          <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(30,64,175,0.04)', color: 'var(--blue-light)' }}>
                            VectorQuantizer2<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>quant.py</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="text-center px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: 'rgba(194,65,12,0.06)', color: 'var(--accent)', border: '1px solid rgba(194,65,12,0.15)' }}>
                            VAR (var.py)
                          </div>
                          <div className="text-center text-xs" style={{ color: 'var(--ink-muted)' }}>↓ 包含</div>
                          <div className="space-y-2">
                            <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(194,65,12,0.04)', color: 'var(--accent)' }}>
                              AdaLNSelfAttn × N<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>basic_var.py</span>
                            </div>
                            <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(194,65,12,0.04)', color: 'var(--accent)' }}>
                              FFN × N<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>basic_var.py</span>
                            </div>
                            <div className="text-center px-2 py-1.5 rounded text-[11px]" style={{ background: 'rgba(194,65,12,0.04)', color: 'var(--accent)' }}>
                              采样函数<br /><span className="text-[9px]" style={{ color: 'var(--ink-muted)' }}>helpers.py</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'train.py — 训练入口',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏋️</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>train.py</h2>
                </div>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>训练的主入口，串联所有组件</p>
                <div className="max-w-2xl w-full space-y-3">
                  {[
                    { step: '1', name: '解析参数', desc: 'arg_util.Args 定义所有超参数（depth, lr, batch size 等）', color: '#b45309' },
                    { step: '2', name: '构建数据', desc: '加载 ImageNet，创建训练/验证 DataLoader', color: '#0369a1' },
                    { step: '3', name: '构建模型', desc: 'build_vae_var() 创建 VQVAE + VAR，加载预训练 VAE 权重', color: 'var(--accent)' },
                    { step: '4', name: '构建优化器', desc: 'AdamW + 混合精度 + 梯度裁剪', color: '#047857' },
                    { step: '5', name: '构建 Trainer', desc: 'VARTrainer 封装训练和评估逻辑', color: '#7c3aed' },
                    { step: '6', name: '训练循环', desc: '逐 epoch 训练，每 10 epoch 验证并保存 checkpoint', color: '#be185d' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${item.color}12`, color: item.color, border: `1.5px solid ${item.color}30` }}>
                        {item.step}
                      </div>
                      <div className="flex-1 rounded-lg px-4 py-2.5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="text-sm font-semibold" style={{ color: item.color }}>{item.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: 'trainer.py — 训练逻辑',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>trainer.py</h2>
                </div>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>VARTrainer 类：封装核心训练和评估逻辑</p>
                <div className="grid grid-cols-2 gap-4 max-w-3xl w-full">
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--serif)' }}>train_step() — 训练一步</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      {['① VQVAE 编码：图像 → token', '② 构造输入：去掉第一个 token', '③ VAR 前向：预测 logits', '④ 计算交叉熵损失', '⑤ 加权：最后一个尺度权重更高', '⑥ 反向传播 + 梯度裁剪'].map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-mono shrink-0" style={{ color: 'var(--accent)' }}>→</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--blue)', fontFamily: 'var(--serif)' }}>eval_ep() — 评估一轮</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      {['① 切换到 eval 模式', '② 遍历验证集', '③ 计算平均损失 (L_mean)', '④ 计算尾部损失 (L_tail)', '⑤ 计算准确率 (acc)', '⑥ 多 GPU 同步统计'].map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-mono shrink-0" style={{ color: 'var(--blue)' }}>→</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'dist.py — 分布式通信',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>dist.py</h2>
                </div>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>分布式训练的通信层，封装了 PyTorch distributed</p>
                <div className="max-w-2xl w-full rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'initialize()', desc: '初始化进程组，设置 GPU' },
                      { name: 'get_rank()', desc: '获取当前进程的全局 rank' },
                      { name: 'allreduce()', desc: '多 GPU 梯度/指标同步' },
                      { name: 'broadcast()', desc: '广播参数到所有 GPU' },
                      { name: 'barrier()', desc: '同步所有进程' },
                      { name: 'master_only', desc: '装饰器：只在主进程执行' },
                    ].map((fn, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="font-mono text-[11px] font-semibold shrink-0" style={{ color: '#047857' }}>{fn.name}</span>
                        <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{fn.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'utils/ — 工具函数',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>utils/ 目录</h2>
                </div>
                <div className="max-w-3xl w-full space-y-3">
                  {[
                    { file: 'arg_util.py', icon: '📋', role: '参数管理', desc: '定义 Args 类：所有超参数（depth、lr、batch size、patch_nums 等），自动计算派生参数', color: '#b45309' },
                    { file: 'data.py', icon: '📦', role: '数据加载', desc: 'build_dataset()：ImageNet 数据集加载 + 数据增强（resize、crop、normalize）', color: '#0369a1' },
                    { file: 'data_sampler.py', icon: '🎲', role: '采样器', desc: 'DistInfiniteBatchSampler：分布式无限采样器，保证每个 GPU 拿到不重叠的 batch', color: '#047857' },
                    { file: 'lr_control.py', icon: '📉', role: '学习率', desc: 'lr_wd_annealing()：学习率和权重衰减的调度策略（warmup + cosine/linear 衰减）', color: '#7c3aed' },
                    { file: 'amp_sc.py', icon: '⚡', role: '混合精度', desc: 'AmpOptimizer：封装自动混合精度训练（fp16/bf16）+ 梯度裁剪 + 梯度累积', color: '#be185d' },
                    { file: 'misc.py', icon: '📊', role: '日志/工具', desc: 'MetricLogger、TensorboardLogger、SyncPrint、auto_resume 等训练辅助工具', color: '#0e7490' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="text-xl w-8 text-center shrink-0">{item.icon}</div>
                      <div className="flex-1 rounded-lg px-4 py-3" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs font-semibold" style={{ color: item.color }}>{item.file}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${item.color}08`, color: item.color, fontFamily: 'var(--serif)' }}>{item.role}</span>
                        </div>
                        <div className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '数据流动全景',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>数据在文件间的流动</h2>
                <div className="max-w-3xl w-full rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                  <div className="flex flex-col gap-3">
                    {[
                      { from: 'data.py', to: 'train.py', via: 'DataLoader', what: '图像 + 标签', color: '#0369a1' },
                      { from: 'train.py', to: 'trainer.py', via: 'train_step()', what: 'batch 数据', color: 'var(--accent)' },
                      { from: 'trainer.py', to: 'vqvae.py', via: 'img_to_idxBl()', what: '图像 → token', color: '#047857' },
                      { from: 'vqvae.py', to: 'quant.py', via: 'VectorQuantizer2', what: '特征 → 量化 token', color: '#7c3aed' },
                      { from: 'trainer.py', to: 'var.py', via: 'forward()', what: 'token → logits', color: 'var(--accent)' },
                      { from: 'var.py', to: 'basic_var.py', via: 'AdaLNSelfAttn', what: 'Transformer 计算', color: '#b45309' },
                      { from: 'trainer.py', to: 'amp_sc.py', via: 'backward_clip_step()', what: '梯度更新', color: '#be185d' },
                    ].map((flow, i) => (
                      <div key={i} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${i * 0.06}s` }}>
                        <div className="w-20 text-right">
                          <span className="font-mono text-[11px] font-semibold" style={{ color: flow.color }}>{flow.from}</span>
                        </div>
                        <div className="flex-1 flex items-center gap-1">
                          <div className="h-px flex-1" style={{ background: `${flow.color}30` }} />
                          <div className="text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap" style={{ background: `${flow.color}08`, color: flow.color }}>
                            {flow.via}
                          </div>
                          <div className="text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--ink-muted)' }}>
                            {flow.what}
                          </div>
                          <div className="h-px flex-1" style={{ background: `${flow.color}30` }} />
                          <span style={{ color: flow.color }}>→</span>
                        </div>
                        <div className="w-20">
                          <span className="font-mono text-[11px] font-semibold" style={{ color: flow.color }}>{flow.to}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
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
            title: '训练、生成、评估',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--serif)' }}>三大流程</h2>
                <div className="flex gap-6 max-w-3xl w-full">
                  {[
                    { emoji: '🏋️', title: '训练', desc: '学习从粗到细的生成规律', color: 'var(--accent)' },
                    { emoji: '🎨', title: '生成', desc: '自回归地逐尺度生成图像', color: 'var(--blue)' },
                    { emoji: '📏', title: '评估', desc: '用 FID 等指标衡量生成质量', color: '#047857' },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="text-4xl">{item.emoji}</div>
                      <div className="text-lg font-bold" style={{ fontFamily: 'var(--serif)', color: item.color }}>{item.title}</div>
                      <div className="text-xs text-center" style={{ color: 'var(--ink-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '训练：整体流程',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>训练流程概览</h2>
                <div className="max-w-3xl w-full flex items-center gap-3">
                  {[
                    { icon: '🖼️', label: 'ImageNet\n图像', color: '#b45309' },
                    { icon: '📊', label: 'VQVAE\n编码', color: 'var(--accent)' },
                    { icon: '🔢', label: '多尺度\nToken', color: '#0369a1' },
                    { icon: '🧠', label: 'VAR\n前向', color: 'var(--blue)' },
                    { icon: '📉', label: '交叉熵\n损失', color: '#047857' },
                    { icon: '🔄', label: '反向传播\n更新参数', color: '#7c3aed' },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex items-center gap-2">
                      {i > 0 && <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>→</div>}
                      <div className="flex-1 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="w-full aspect-square rounded-xl flex items-center justify-center text-2xl" style={{ background: `${item.color}08`, border: `1.5px solid ${item.color}20` }}>
                          {item.icon}
                        </div>
                        <div className="text-[10px] font-medium text-center whitespace-pre-line" style={{ color: item.color }}>{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '训练：单步详解 (train_step)',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>train_step() 逐步拆解</h2>
                <div className="max-w-2xl w-full space-y-2.5">
                  {[
                    { step: '①', name: 'VQVAE 编码', code: 'vae.img_to_idxBl(inp)', desc: '将图像编码为 10 个尺度的 token 索引', color: 'var(--accent)' },
                    { step: '②', name: '构造输入', code: 'quant.idxBl_to_var_input()', desc: '去掉第一个尺度的 token（作为起始信号），得到输入序列', color: '#b45309' },
                    { step: '③', name: 'VAR 前向', code: 'logits = var(label, x)', desc: '输入类别标签 + token 序列，输出每个位置的 logits', color: 'var(--blue)' },
                    { step: '④', name: '计算损失', code: 'CrossEntropy(logits, gt)', desc: '用交叉熵损失，gt 是真实的下一个 token', color: '#047857' },
                    { step: '⑤', name: '加权损失', code: 'loss * loss_weight', desc: '最后一个尺度（16×16）的权重更高，更关注细节', color: '#7c3aed' },
                    { step: '⑥', name: '反向传播', code: 'opt.backward_clip_step()', desc: '梯度计算 + 裁剪（max_norm=2）+ 优化器更新', color: '#be185d' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="w-6 text-center shrink-0 text-sm font-bold" style={{ color: item.color }}>{item.step}</div>
                      <div className="flex-1 rounded-lg px-3 py-2" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-semibold" style={{ color: item.color }}>{item.name}</span>
                          <code className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--ink-muted)' }}>{item.code}</code>
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '训练：损失函数设计',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>损失函数</h2>
                <div className="max-w-3xl w-full grid grid-cols-2 gap-5">
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--serif)' }}>交叉熵损失</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <div>每个 token 位置独立预测</div>
                      <div className="font-mono p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        loss = CE(logits, ground_truth)
                      </div>
                      <div>ground_truth = VQVAE 编码得到的真实 token</div>
                    </div>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--blue)', fontFamily: 'var(--serif)' }}>加权策略</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <div>最后一个尺度（16×16）权重更高</div>
                      <div className="font-mono p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        weight = 1/L<br />
                        weight[last_scale] *= 1
                      </div>
                      <div>因为 16×16 有 256 个 token，是细粒度的关键</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 rounded-lg text-xs max-w-3xl w-full" style={{ background: 'rgba(194,65,12,0.04)', border: '1px solid rgba(194,65,12,0.1)', color: 'var(--ink-light)' }}>
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>Label Smoothing：</span>
                  训练时使用 0.0 的 label smoothing（不做平滑），验证时也是 0.0
                </div>
              </div>
            ),
          },
          {
            title: '训练：学习率调度',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>学习率调度策略</h2>
                <div className="max-w-3xl w-full">
                  <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="relative h-40 border-b border-l" style={{ borderColor: '#d4ccc3' }}>
                      {/* Warmup phase */}
                      <div className="absolute bottom-0 left-0 h-full" style={{ width: '5%' }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-amber-200 rounded-t opacity-60" style={{ height: '30%' }} />
                      </div>
                      {/* Main phase */}
                      <div className="absolute bottom-0 h-full" style={{ left: '5%', right: '10%' }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-t opacity-50" style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent) 70%, rgba(194,65,12,0.3))' }} />
                      </div>
                      {/* Labels */}
                      <div className="absolute -bottom-5 left-[2%] text-[9px]" style={{ color: 'var(--ink-muted)' }}>warmup</div>
                      <div className="absolute -bottom-5 left-[25%] text-[9px]" style={{ color: 'var(--ink-muted)' }}>cosine decay</div>
                      <div className="absolute -bottom-5 right-[5%] text-[9px]" style={{ color: 'var(--ink-muted)' }}>end</div>
                      <div className="absolute -left-1 -top-3 text-[9px]" style={{ color: 'var(--ink-muted)' }}>lr</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-2xl w-full text-xs">
                  <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(180,83,9,0.06)', border: '1px solid rgba(180,83,9,0.12)' }}>
                    <div className="font-semibold mb-1" style={{ color: '#b45309' }}>Warmup</div>
                    <div style={{ color: 'var(--ink-muted)' }}>前 0-5% 步数<br />lr 从 0.5% 线性增长到基准值</div>
                  </div>
                  <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(194,65,12,0.06)', border: '1px solid rgba(194,65,12,0.12)' }}>
                    <div className="font-semibold mb-1" style={{ color: 'var(--accent)' }}>Cosine Decay</div>
                    <div style={{ color: 'var(--ink-muted)' }}>中间 5%-95%<br />lr 按余弦曲线衰减</div>
                  </div>
                  <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(194,65,12,0.03)', border: '1px solid rgba(194,65,12,0.08)' }}>
                    <div className="font-semibold mb-1" style={{ color: 'var(--ink-light)' }}>End</div>
                    <div style={{ color: 'var(--ink-muted)' }}>最后 5%<br />lr 衰减到基准值的 1%</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '生成：推理过程',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>图像生成过程</h2>
                <div className="max-w-3xl w-full space-y-4">
                  {[
                    { step: '1', name: '输入类别', desc: '指定要生成的类别（如 "金毛犬"）', code: 'label = torch.tensor([class_id])', color: '#b45309' },
                    { step: '2', name: '逐尺度自回归', desc: '对 10 个尺度，依次预测每个尺度的 token', code: 'for si, pn in enumerate(patch_nums)', color: 'var(--accent)' },
                    { step: '3', name: '采样策略', desc: '用 top-k + top-p 采样，cfg=1.5 引导', code: 'sample_with_top_k_top_p_(logits, top_k=900, top_p=0.96)', color: 'var(--blue)' },
                    { step: '4', name: 'VQVAE 解码', desc: '将预测的 token 序列解码回图像', code: 'vae.idxBl_to_img(tokens)', color: '#047857' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.12}s` }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${item.color}12`, color: item.color, border: `1.5px solid ${item.color}30` }}>
                        {item.step}
                      </div>
                      <div className="flex-1 rounded-lg px-4 py-3" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="text-sm font-semibold" style={{ color: item.color }}>{item.name}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                        <code className="text-[10px] font-mono mt-1.5 inline-block px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--ink-muted)' }}>{item.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '生成：采样细节',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>采样策略详解</h2>
                <div className="max-w-3xl w-full grid grid-cols-2 gap-5">
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--serif)' }}>Top-k 采样</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <div>只保留概率最高的 k 个 token</div>
                      <div className="font-mono p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>top_k = 900</div>
                      <div>从 4096 个码本中保留 900 个候选</div>
                    </div>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: 'var(--blue)', fontFamily: 'var(--serif)' }}>Top-p 采样</div>
                    <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <div>累积概率达到 p 的最小 token 集合</div>
                      <div className="font-mono p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>top_p = 0.96</div>
                      <div>动态截断，质量与多样性平衡</div>
                    </div>
                  </div>
                </div>
                <div className="max-w-3xl w-full rounded-xl p-5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                  <div className="text-sm font-bold mb-3" style={{ color: '#047857', fontFamily: 'var(--serif)' }}>CFG (Classifier-Free Guidance)</div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center rounded-lg p-3" style={{ background: 'rgba(4,120,87,0.04)' }}>
                      <div className="font-semibold mb-1" style={{ color: '#047857' }}>无条件生成</div>
                      <div style={{ color: 'var(--ink-muted)' }}>不指定类别<br />输出通用图像</div>
                    </div>
                    <div className="text-center rounded-lg p-3" style={{ background: 'rgba(4,120,87,0.06)' }}>
                      <div className="font-semibold mb-1" style={{ color: '#047857' }}>条件生成</div>
                      <div style={{ color: 'var(--ink-muted)' }}>指定类别<br />输出特定类别图像</div>
                    </div>
                    <div className="text-center rounded-lg p-3" style={{ background: 'rgba(4,120,87,0.08)' }}>
                      <div className="font-semibold mb-1" style={{ color: '#047857' }}>CFG 混合</div>
                      <div style={{ color: 'var(--ink-muted)' }}>cfg=1.5 时<br />质量与多样性最佳平衡</div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '评估：指标体系',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>评估指标</h2>
                <div className="max-w-3xl w-full space-y-4">
                  {[
                    { name: 'FID (Fréchet Inception Distance)', desc: '衡量生成图像与真实图像的分布距离，越低越好', value: '1.80', color: 'var(--accent)', isMain: true },
                    { name: 'IS (Inception Score)', desc: '衡量生成图像的质量和多样性，越高越好', value: '-', color: '#b45309' },
                    { name: 'Precision', desc: '生成图像中有多少是"真实"的（质量）', value: '-', color: 'var(--blue)' },
                    { name: 'Recall', desc: '真实图像的多样性有多少被覆盖到', value: '-', color: '#047857' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 rounded-xl px-5 py-4 animate-slide-in ${item.isMain ? 'ring-1' : ''}`} style={{ background: item.isMain ? 'rgba(194,65,12,0.04)' : 'white', border: `1px solid ${item.isMain ? 'rgba(194,65,12,0.2)' : '#e5ddd3'}`, outline: item.isMain ? '1px solid rgba(194,65,12,0.3)' : 'none', animationDelay: `${i * 0.1}s` }}>
                      <div className="flex-1">
                        <div className="text-sm font-bold" style={{ color: item.color, fontFamily: 'var(--serif)' }}>{item.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                      {item.value !== '-' && (
                        <div className="text-2xl font-black font-mono" style={{ color: item.color }}>{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '评估：验证过程',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>验证流程 (eval_ep)</h2>
                <div className="max-w-2xl w-full space-y-3">
                  {[
                    { step: '1', name: '切换模式', desc: 'model.eval()，关闭 dropout', color: '#b45309' },
                    { step: '2', name: '遍历验证集', desc: '对每个 batch 执行前向推理', color: 'var(--accent)' },
                    { step: '3', name: '编码图像', desc: 'VQVAE 编码得到 ground truth token', color: 'var(--blue)' },
                    { step: '4', name: '计算指标', desc: 'L_mean（平均损失）、L_tail（尾部损失）、acc（准确率）', color: '#047857' },
                    { step: '5', name: '多 GPU 同步', desc: 'allreduce 汇总所有 GPU 的统计结果', color: '#7c3aed' },
                    { step: '6', name: '保存最优', desc: '如果 val_loss_tail 更新最优，保存 checkpoint', color: '#be185d' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${item.color}12`, color: item.color, border: `1.5px solid ${item.color}30` }}>
                        {item.step}
                      </div>
                      <div className="flex-1 rounded-lg px-4 py-2.5" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                        <div className="text-sm font-semibold" style={{ color: item.color }}>{item.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '三者关系总结',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>训练 → 生成 → 评估</h2>
                <div className="max-w-3xl w-full rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'rgba(194,65,12,0.06)' }}>
                      <div className="text-2xl">🏋️</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>训练</div>
                      <div className="text-[10px] text-center" style={{ color: 'var(--ink-muted)' }}>
                        学习 token 间的<br />条件概率分布
                      </div>
                    </div>
                    <div className="text-xl" style={{ color: 'var(--ink-muted)' }}>→</div>
                    <div className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'rgba(30,64,175,0.06)' }}>
                      <div className="text-2xl">🎨</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--blue)' }}>生成</div>
                      <div className="text-[10px] text-center" style={{ color: 'var(--ink-muted)' }}>
                        利用学到的分布<br />采样新 token
                      </div>
                    </div>
                    <div className="text-xl" style={{ color: 'var(--ink-muted)' }}>→</div>
                    <div className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'rgba(4,120,87,0.06)' }}>
                      <div className="text-2xl">📏</div>
                      <div className="text-sm font-bold" style={{ color: '#047857' }}>评估</div>
                      <div className="text-[10px] text-center" style={{ color: 'var(--ink-muted)' }}>
                        用 FID 等指标<br />衡量生成质量
                      </div>
                    </div>
                    <div className="text-xl" style={{ color: 'var(--ink-muted)' }}>→</div>
                    <div className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'rgba(109,40,217,0.06)' }}>
                      <div className="text-2xl">🔄</div>
                      <div className="text-sm font-bold" style={{ color: '#7c3aed' }}>改进</div>
                      <div className="text-[10px] text-center" style={{ color: 'var(--ink-muted)' }}>
                        调整超参数<br />继续训练
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs max-w-xl text-center" style={{ color: 'var(--ink-muted)' }}>
                  {'训练的核心是让 VAR 学会 P(token_n | token_1, ..., token_{n-1})，即给定前面所有 token，预测下一个 token 的概率分布'}
                </div>
              </div>
            ),
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
            title: 'AR vs Diffusion',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="text-5xl">🆚</div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--serif)' }}>
                  为什么 VAR 能超越扩散模型？
                </h2>
                <p className="text-base max-w-lg text-center" style={{ color: 'var(--ink-muted)' }}>
                  长期以来，扩散模型在图像生成上占据主导地位。<br />VAR 的出现改变了这一格局。
                </p>
              </div>
            ),
          },
          {
            title: '扩散模型的工作方式',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>扩散模型：迭代去噪</h2>
                <div className="flex items-center gap-2 max-w-4xl w-full">
                  {['噪声', '...', '含噪', '...', '含噪', '...', '清晰'].map((label, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div
                        className="w-full aspect-square rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `rgba(100,100,100,${0.05 + i * 0.02})`, border: '1px solid rgba(100,100,100,0.1)' }}
                      >
                        {i === 0 ? '🌫️' : i === 6 ? '🖼️' : '🔄'}
                      </div>
                      <span className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-2xl w-full">
                  {[
                    { emoji: '🐢', label: '慢', desc: '需要 50-1000 步', color: '#b91c1c' },
                    { emoji: '💰', label: '贵', desc: '每步跑完整网络', color: '#b45309' },
                    { emoji: '🎲', label: '随机', desc: '采样有随机性', color: '#a16207' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
                      <div className="text-xl mb-1">{item.emoji}</div>
                      <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                      <div className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: 'VAR：自回归逐尺度',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VAR：自回归逐尺度生成</h2>
                <div className="flex items-center gap-1.5 max-w-4xl w-full">
                  {[
                    { size: '1×1', color: 'rgba(194,65,12,0.7)' },
                    { size: '2×2', color: 'rgba(194,65,12,0.6)' },
                    { size: '3×3', color: 'rgba(180,83,9,0.5)' },
                    { size: '4×4', color: 'rgba(3,105,161,0.45)' },
                    { size: '5×5', color: 'rgba(3,105,161,0.4)' },
                    { size: '6×6', color: 'rgba(4,120,87,0.35)' },
                    { size: '8×8', color: 'rgba(4,120,87,0.3)' },
                    { size: '10×10', color: 'rgba(109,40,217,0.3)' },
                    { size: '13×13', color: 'rgba(109,40,217,0.25)' },
                    { size: '16×16', color: 'rgba(109,40,217,0.2)' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full aspect-square rounded-lg" style={{ background: s.color }} />
                      <span className="text-[9px] font-mono" style={{ color: 'var(--ink-muted)' }}>{s.size}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-2xl w-full">
                  {[
                    { emoji: '⚡', label: '快', desc: '只需 10 步', color: '#047857' },
                    { emoji: '💎', label: '确定性', desc: '相同输入相同输出', color: 'var(--blue)' },
                    { emoji: '📐', label: '层次化', desc: '天然多尺度结构', color: '#7c3aed' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
                      <div className="text-xl mb-1">{item.emoji}</div>
                      <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                      <div className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '速度对比',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>推理速度对比</h2>
                <div className="max-w-2xl w-full space-y-4">
                  {[
                    { name: '扩散模型 (DDPM)', steps: 1000, bar: 100, color: '#b91c1c' },
                    { name: '扩散模型 (DDIM)', steps: 50, bar: 5, color: '#b45309' },
                    { name: 'VAR (d30)', steps: 10, bar: 1, color: '#047857', highlight: true },
                  ].map((m, i) => (
                    <div key={i} className="space-y-1.5 animate-slide-in" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium" style={{ color: m.highlight ? m.color : 'var(--ink-light)' }}>{m.name}</span>
                        <span className="font-mono font-bold" style={{ color: m.color }}>{m.steps} 步</span>
                      </div>
                      <div className="h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <div className="h-full rounded-lg flex items-center justify-end pr-3" style={{ width: `${Math.max(m.bar, 3)}%`, background: `${m.color}25`, border: `1px solid ${m.color}30` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center rounded-xl px-6 py-3" style={{ background: 'rgba(4,120,87,0.06)', border: '1px solid rgba(4,120,87,0.15)' }}>
                  <span className="font-black text-xl font-mono" style={{ color: '#047857' }}>20-50×</span>
                  <span className="text-sm ml-2" style={{ color: 'var(--ink-light)' }}>比扩散模型更快</span>
                </div>
              </div>
            ),
          },
          {
            title: '质量对比：FID',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>ImageNet 256×256 生成质量</h2>
                <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>FID 越低越好</p>
                <div className="max-w-2xl w-full space-y-2.5">
                  {[
                    { name: 'VAR-d30-re', fid: 1.80, bar: 92, color: 'var(--accent)', hl: true },
                    { name: 'VAR-d30', fid: 1.97, bar: 88, color: 'var(--accent)' },
                    { name: 'LDM (扩散)', fid: 3.60, bar: 55, color: '#6b7280' },
                    { name: 'ADM (扩散)', fid: 10.94, bar: 20, color: '#9ca3af' },
                    { name: '传统 AR', fid: 20.0, bar: 8, color: '#d1d5db' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="w-24 text-right text-xs font-medium shrink-0" style={{ color: m.hl ? 'var(--accent)' : 'var(--ink-light)' }}>{m.name}</div>
                      <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: `${m.bar}%`, background: m.hl ? 'var(--accent)' : `${m.color}30` }}>
                          <span className="text-[10px] font-mono font-bold" style={{ color: m.hl ? 'white' : m.color }}>{m.fid}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs max-w-xl text-center rounded-lg px-4 py-2" style={{ background: 'rgba(194,65,12,0.04)', border: '1px solid rgba(194,65,12,0.1)', color: 'var(--ink-light)' }}>
                  <span className="font-bold" style={{ color: 'var(--accent)' }}>VAR-d30-re</span> 的 FID 1.80，是所有 AR 模型的最佳成绩，也优于所有扩散模型
                </div>
              </div>
            ),
          },
          {
            title: 'Scaling Laws',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>幂律缩放定律</h2>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>就像 LLM 一样，VAR 也遵循 scaling law</p>
                <div className="max-w-2xl w-full rounded-xl p-6" style={{ background: 'white', border: '1px solid #e5ddd3' }}>
                  <div className="relative h-40 border-b border-l" style={{ borderColor: '#d4ccc3' }}>
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
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                        <div className="text-[9px] mt-1 whitespace-pre-line text-center font-mono" style={{ color: 'var(--ink-muted)' }}>{p.label}</div>
                      </div>
                    ))}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 8 15 Q 40 30, 88 82" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="absolute -left-1 -top-4 text-[9px]" style={{ color: 'var(--ink-muted)' }}>FID ↓</div>
                    <div className="absolute -bottom-4 right-0 text-[9px]" style={{ color: 'var(--ink-muted)' }}>参数量 →</div>
                  </div>
                </div>
                <div className="text-xs max-w-xl text-center" style={{ color: 'var(--ink-muted)' }}>
                  更大的模型几乎必然带来更好的结果，且效果可预测
                </div>
              </div>
            ),
          },
          {
            title: '为什么 GPT 范式适合视觉',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--serif)' }}>GPT 范式在视觉上的天然优势</h2>
                <div className="max-w-2xl w-full space-y-3">
                  {[
                    { icon: '🧠', title: '统一范式', desc: 'NLP 和 CV 使用相同的自回归框架，未来可能走向统一', color: 'var(--accent)' },
                    { icon: '📊', title: '可预测的缩放', desc: 'Scaling law 表明增大模型必然提升效果，投资可预测', color: 'var(--blue)' },
                    { icon: '🔧', title: '丰富的工具链', desc: 'KV Cache、Flash Attention 等 LLM 优化技术可直接复用', color: '#047857' },
                    { icon: '🎯', title: '确定性生成', desc: '相同输入总是产生相同输出，更适合可控生成', color: '#7c3aed' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-xl px-4 py-3 animate-slide-in" style={{ background: 'white', border: '1px solid #e5ddd3', animationDelay: `${i * 0.1}s` }}>
                      <div className="text-2xl shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: item.color, fontFamily: 'var(--serif)' }}>{item.title}</div>
                        <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '总结：VAR 为什么能赢',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--serif)' }}>VAR 为什么能赢？</h2>
                <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
                  {[
                    { label: '速度', stat: '20-50×', desc: '比扩散模型快', color: '#047857' },
                    { label: '质量', stat: 'FID 1.80', desc: '超越所有扩散模型', color: 'var(--accent)' },
                    { label: '扩展性', stat: '幂律', desc: '更大 = 更好，可预测', color: 'var(--blue)' },
                    { label: '通用性', stat: 'GPT', desc: '统一的自回归范式', color: '#7c3aed' },
                  ].map((item, i) => (
                    <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="text-sm mb-2" style={{ color: 'var(--ink-muted)' }}>{item.label}</div>
                      <div className="text-3xl font-black font-mono" style={{ color: item.color }}>{item.stat}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--ink-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm max-w-lg text-center" style={{ color: 'var(--ink-light)' }}>
                  VAR 证明了 GPT 风格的自回归模型在视觉领域同样具有巨大潜力，<br />
                  为多模态统一模型开辟了道路。
                </div>
              </div>
            ),
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
