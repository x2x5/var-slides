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
                <div className="text-6xl font-black bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  VAR
                </div>
                <div className="text-2xl text-gray-600 font-light">
                  Visual Autoregressive Modeling
                </div>
                <div className="text-lg text-gray-500 max-w-xl text-center leading-relaxed">
                  一种全新的视觉生成范式：用 <span className="font-semibold text-violet-600">逐尺度预测</span> 替代传统的逐像素预测
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">NeurIPS 2024</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Best Paper</span>
                </div>
              </div>
            ),
          },
          {
            title: '传统方法的问题',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-10 px-12">
                <h2 className="text-3xl font-bold text-gray-800">现有的图像生成方法有什么问题？</h2>
                <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-lg font-semibold text-gray-700 mb-4">🔄 扩散模型</div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>需要数百步迭代去噪</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>推理速度慢，计算成本高</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>不是真正的自回归，无法利用 GPT 范式</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-lg font-semibold text-gray-700 mb-4">📐 传统 AR 模型</div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>光栅扫描：固定顺序逐像素</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>没有层次结构，无法从粗到细</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>效果长期落后于扩散模型</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-lg text-violet-600 font-medium">
                  💡 有没有两全其美的方案？
                </div>
              </div>
            ),
          },
          {
            title: 'VAR 的核心思想',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">Next-Scale Prediction</h2>
                <p className="text-lg text-gray-500">逐尺度预测 — 从粗到细地生成图像</p>
                <div className="flex items-center gap-4 max-w-4xl w-full">
                  {[
                    { scale: '1×1', label: '草图', color: 'from-violet-200 to-violet-100', emoji: '🎯' },
                    { scale: '2×2', label: '轮廓', color: 'from-blue-200 to-blue-100', emoji: '✏️' },
                    { scale: '4×4', label: '结构', color: 'from-cyan-200 to-cyan-100', emoji: '🏗️' },
                    { scale: '8×8', label: '细节', color: 'from-teal-200 to-teal-100', emoji: '🔍' },
                    { scale: '16×16', label: '精修', color: 'from-emerald-200 to-emerald-100', emoji: '✨' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl`}>
                        {s.emoji}
                      </div>
                      <div className="font-mono text-sm font-semibold text-gray-700">{s.scale}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                      {i < 4 && <div className="text-gray-300 text-xl">→</div>}
                    </div>
                  ))}
                </div>
                <div className="bg-violet-50 rounded-xl p-4 max-w-2xl text-center">
                  <span className="text-violet-700 font-medium">类比：</span>
                  <span className="text-gray-600"> 先画草图 → 再勾轮廓 → 然后填充结构 → 接着加细节 → 最后精修</span>
                </div>
              </div>
            ),
          },
          {
            title: '逐像素 vs 逐尺度',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">两种自回归范式的对比</h2>
                <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-lg font-semibold text-red-600">Next-Token Prediction</div>
                    <div className="w-full aspect-square max-w-[240px] bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                      <div className="grid grid-cols-8 grid-rows-8 h-full gap-0.5">
                        {Array.from({ length: 64 }, (_, i) => (
                          <div
                            key={i}
                            className="rounded-sm flex items-center justify-center text-[9px] font-mono"
                            style={{
                              backgroundColor: i < 20 ? `hsl(${260 + i * 3}, 70%, ${85 - i}%)` : '#f3f4f6',
                              color: i < 20 ? '#5b21b6' : '#d1d5db',
                            }}
                          >
                            {i < 20 ? i + 1 : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center">按固定顺序逐个预测<br/>一次只生成一个像素</div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-lg font-semibold text-violet-600">Next-Scale Prediction ✨</div>
                    <div className="w-full aspect-square max-w-[240px] bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col gap-1">
                      {[
                        { size: 1, label: '1×1', bg: 'bg-violet-400' },
                        { size: 2, label: '2×2', bg: 'bg-blue-400' },
                        { size: 4, label: '4×4', bg: 'bg-cyan-400' },
                        { size: 8, label: '8×8', bg: 'bg-teal-400' },
                      ].map((layer, i) => (
                        <div key={i} className="flex items-center gap-2 flex-1">
                          <div className={`${layer.bg} rounded-md flex-1 h-full opacity-80`} />
                          <span className="text-[10px] font-mono text-gray-500 w-8">{layer.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 text-center">从粗到细逐尺度预测<br/>每次生成一整个尺度</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '多尺度 Token 金字塔',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">Token 金字塔</h2>
                <p className="text-gray-500">VQVAE 将图像编码为多尺度离散 token</p>
                <div className="flex items-end gap-1 max-w-3xl">
                  {[
                    { pn: 1, tokens: 1, w: 'w-8', h: 'h-8', color: 'bg-violet-500' },
                    { pn: 2, tokens: 4, w: 'w-14', h: 'h-14', color: 'bg-violet-400' },
                    { pn: 3, tokens: 9, w: 'w-20', h: 'h-20', color: 'bg-blue-400' },
                    { pn: 4, tokens: 16, w: 'w-28', h: 'h-28', color: 'bg-blue-300' },
                    { pn: 5, tokens: 25, w: 'w-36', h: 'h-36', color: 'bg-cyan-400' },
                    { pn: 6, tokens: 36, w: 'w-44', h: 'h-44', color: 'bg-cyan-300' },
                    { pn: 8, tokens: 64, w: 'w-52', h: 'h-52', color: 'bg-teal-400' },
                    { pn: 10, tokens: 100, w: 'w-60', h: 'h-60', color: 'bg-teal-300' },
                    { pn: 13, tokens: 169, w: 'w-64', h: 'h-64', color: 'bg-emerald-400' },
                    { pn: 16, tokens: 256, w: 'w-72', h: 'h-72', color: 'bg-emerald-300' },
                  ].map((layer, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`${layer.color} ${layer.w} ${layer.h} rounded-lg opacity-80 flex items-center justify-center`}>
                        <span className="text-white font-mono text-xs font-bold">{layer.pn}×{layer.pn}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{layer.tokens}t</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  共 10 个尺度，总计 680 个 token → 自回归预测这 680 个 token
                </div>
              </div>
            ),
          },
          {
            title: 'VQVAE：视觉分词器',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">VQVAE — 把图像变成离散 Token</h2>
                <div className="flex items-center gap-6 max-w-4xl w-full">
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center text-4xl mb-4">🖼️</div>
                    <div className="text-center font-semibold text-gray-700">输入图像</div>
                    <div className="text-center text-sm text-gray-500 mt-1">256×256 RGB</div>
                  </div>
                  <div className="text-3xl text-violet-400">→</div>
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center text-4xl mb-4">🔧</div>
                    <div className="text-center font-semibold text-gray-700">Encoder</div>
                    <div className="text-center text-sm text-gray-500 mt-1">卷积编码</div>
                  </div>
                  <div className="text-3xl text-violet-400">→</div>
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center text-4xl mb-4">📊</div>
                    <div className="text-center font-semibold text-gray-700">向量量化</div>
                    <div className="text-center text-sm text-gray-500 mt-1">4096 个码本</div>
                  </div>
                  <div className="text-3xl text-violet-400">→</div>
                  <div className="flex-1 bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-violet-100">
                    <div className="text-center text-4xl mb-4">🎯</div>
                    <div className="text-center font-semibold text-violet-700">离散 Token</div>
                    <div className="text-center text-sm text-violet-500 mt-1">多尺度码本索引</div>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 max-w-2xl text-center border border-amber-100">
                  <span className="text-amber-700 font-medium">关键：</span>
                  <span className="text-gray-600"> 码本大小 4096，每个 token 是码本中的一个索引，就像 LLM 的词表一样</span>
                </div>
              </div>
            ),
          },
          {
            title: 'VAR Transformer',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">VAR Transformer 架构</h2>
                <div className="max-w-3xl w-full space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm font-medium text-gray-600">输入</div>
                    <div className="flex-1 bg-gradient-to-r from-violet-100 to-blue-100 rounded-xl p-4 text-center font-medium text-violet-700">
                      多尺度 Token 序列（680 个 token）
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm text-gray-400">↓</div>
                    <div />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm font-medium text-gray-600">嵌入层</div>
                    <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center text-gray-700">
                      Word Embedding + Position Embedding + Level Embedding
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm text-gray-400">↓</div>
                    <div />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm font-medium text-gray-600">主干网络</div>
                    <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="text-center font-medium text-gray-700 mb-2">AdaLN Self-Attention Blocks × {16}层</div>
                      <div className="flex justify-center gap-6 text-sm text-gray-500">
                        <span>Multi-Head Attention</span>
                        <span>•</span>
                        <span>FFN</span>
                        <span>•</span>
                        <span>AdaLN</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm text-gray-400">↓</div>
                    <div />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-right text-sm font-medium text-gray-600">输出头</div>
                    <div className="flex-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 text-center font-medium text-emerald-700">
                      预测下一个尺度的 Token 分布
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '生成过程演示',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">从噪声到图像</h2>
                <p className="text-gray-500">自回归地逐尺度生成，每一步都在细化图像</p>
                <div className="flex items-center gap-3 max-w-5xl w-full">
                  {[
                    { step: '第1步', desc: '预测 1×1', visual: '🎯', detail: '决定整体色调和主题' },
                    { step: '第2步', desc: '预测 2×2', visual: '✏️', detail: '划分大致区域' },
                    { step: '第3步', desc: '预测 3×3', visual: '🏗️', detail: '建立空间结构' },
                    { step: '第4步', desc: '预测 4×4', visual: '📐', detail: '确定物体位置' },
                    { step: '第5步', desc: '预测 5×5', visual: '🔍', detail: '添加基本形状' },
                    { step: '第6步', desc: '预测 6×6', visual: '🖊️', detail: '勾勒轮廓' },
                    { step: '第7步', desc: '预测 8×8', visual: '🎨', detail: '填充纹理' },
                    { step: '第8步', desc: '预测 10×10', visual: '📸', detail: '增加细节' },
                    { step: '第9步', desc: '预测 13×13', visual: '🔎', detail: '精细调整' },
                    { step: '第10步', desc: '预测 16×16', visual: '✨', detail: '最终输出' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-violet-100 to-blue-50 flex items-center justify-center text-xl border border-violet-100">
                        {s.visual}
                      </div>
                      <div className="text-[10px] font-mono text-violet-600 font-semibold">{s.desc}</div>
                      <div className="text-[9px] text-gray-400 text-center leading-tight">{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '关键成果',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">VAR 的三大成果</h2>
                <div className="grid grid-cols-3 gap-6 max-w-4xl w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl mb-3">🏆</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">首次超越扩散</div>
                    <div className="text-sm text-gray-500">AR 模型首次在 FID 上超过扩散模型</div>
                    <div className="mt-3 text-2xl font-black text-violet-600">FID 1.80</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl mb-3">📈</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">Scaling Laws</div>
                    <div className="text-sm text-gray-500">发现与 LLM 类似的幂律缩放定律</div>
                    <div className="mt-3 text-lg font-mono text-blue-600">FID ∝ N^(-0.3)</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl mb-3">🛠️</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">零样本泛化</div>
                    <div className="text-sm text-gray-500">无需微调即可做编辑、插值等任务</div>
                    <div className="mt-3 text-lg font-mono text-emerald-600">Zero-shot</div>
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
    id: 'technical',
    title: '技术分析',
    icon: '🔬',
    questions: [
      {
        id: 'why-beats-diffusion',
        title: '为什么 VAR 能超越扩散模型？',
        slides: [
          {
            title: '为什么 VAR 能超越扩散模型？',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="text-5xl">🆚</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  AR vs Diffusion
                </h2>
                <p className="text-lg text-gray-500 max-w-lg text-center">
                  长期以来，扩散模型在图像生成上占据主导地位。<br/>
                  VAR 的出现改变了这一格局。
                </p>
              </div>
            ),
          },
          {
            title: '扩散模型的工作方式',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">扩散模型：迭代去噪</h2>
                <div className="flex items-center gap-2 max-w-4xl w-full">
                  {['噪声', '...', '含噪', '...', '含噪', '...', '清晰'].map((label, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full aspect-square rounded-xl flex items-center justify-center text-2xl"
                        style={{
                          background: `linear-gradient(135deg, hsl(${260 + i * 15}, ${30 + i * 10}%, ${90 - i * 5}%), hsl(${200 + i * 10}, ${30 + i * 10}%, ${90 - i * 5}%))`,
                        }}
                      >
                        {i === 0 ? '🌫️' : i === 6 ? '🖼️' : '🔄'}
                      </div>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100 text-center">
                    <div className="text-2xl mb-2">🐢</div>
                    <div className="font-semibold text-red-700">慢</div>
                    <div className="text-sm text-red-600">需要 50-1000 步</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-semibold text-orange-700">贵</div>
                    <div className="text-sm text-orange-600">每步都要跑完整网络</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 text-center">
                    <div className="text-2xl mb-2">🎲</div>
                    <div className="font-semibold text-yellow-700">随机</div>
                    <div className="text-sm text-yellow-600">采样过程有随机性</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'VAR 的工作方式',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">VAR：自回归逐尺度生成</h2>
                <div className="flex items-center gap-2 max-w-4xl w-full">
                  {[
                    { size: '1×1', color: 'bg-violet-500' },
                    { size: '2×2', color: 'bg-violet-400' },
                    { size: '3×3', color: 'bg-blue-400' },
                    { size: '4×4', color: 'bg-blue-300' },
                    { size: '5×5', color: 'bg-cyan-400' },
                    { size: '6×6', color: 'bg-cyan-300' },
                    { size: '8×8', color: 'bg-teal-400' },
                    { size: '10×10', color: 'bg-teal-300' },
                    { size: '13×13', color: 'bg-emerald-400' },
                    { size: '16×16', color: 'bg-emerald-300' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full aspect-square ${s.color} rounded-lg opacity-80`} />
                      <span className="text-[10px] font-mono text-gray-500">{s.size}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="font-semibold text-emerald-700">快</div>
                    <div className="text-sm text-emerald-600">只需 10 步</div>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 text-center">
                    <div className="text-2xl mb-2">💎</div>
                    <div className="font-semibold text-teal-700">确定性</div>
                    <div className="text-sm text-teal-600">相同输入相同输出</div>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100 text-center">
                    <div className="text-2xl mb-2">📐</div>
                    <div className="font-semibold text-cyan-700">层次化</div>
                    <div className="text-sm text-cyan-600">天然的多尺度结构</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '速度对比',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">推理速度对比</h2>
                <div className="max-w-3xl w-full space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">扩散模型（DDPM）</span>
                      <span className="text-red-600 font-mono">1000 步</span>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-400 to-red-300 rounded-lg flex items-center justify-end pr-3">
                        <span className="text-white text-xs font-medium">慢</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">扩散模型（DDIM）</span>
                      <span className="text-orange-600 font-mono">50 步</span>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg w-[5%] flex items-center justify-end pr-3">
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">VAR（d30）</span>
                      <span className="text-emerald-600 font-mono font-bold">10 步 ✨</span>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-lg w-[1%] flex items-center justify-end pr-3">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 max-w-2xl text-center border border-emerald-100">
                  <span className="text-emerald-700 font-bold text-xl">20-50×</span>
                  <span className="text-gray-600 ml-2">比扩散模型更快</span>
                </div>
              </div>
            ),
          },
          {
            title: '质量对比：FID',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">ImageNet 256×256 生成质量</h2>
                <p className="text-gray-500">FID 越低越好</p>
                <div className="max-w-3xl w-full space-y-3">
                  {[
                    { name: 'VAR-d30-re', fid: 1.80, bar: 90, color: 'bg-violet-500', highlight: true },
                    { name: 'VAR-d30', fid: 1.97, bar: 85, color: 'bg-violet-400' },
                    { name: 'LDM (扩散)', fid: 3.60, bar: 55, color: 'bg-gray-400' },
                    { name: 'ADM (扩散)', fid: 10.94, bar: 20, color: 'bg-gray-300' },
                    { name: '传统 AR', fid: 20.0, bar: 8, color: 'bg-gray-200' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-28 text-right text-sm font-medium ${m.highlight ? 'text-violet-700' : 'text-gray-600'}`}>
                        {m.name}
                      </div>
                      <div className="flex-1 h-8 bg-gray-50 rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${m.color} rounded-lg flex items-center justify-end pr-2 transition-all duration-1000`}
                          style={{ width: `${m.bar}%` }}
                        >
                          <span className="text-white text-xs font-mono font-bold">{m.fid}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-violet-50 rounded-xl p-4 max-w-2xl text-center border border-violet-100">
                  <span className="text-violet-700 font-bold">VAR-d30-re</span>
                  <span className="text-gray-600"> 的 FID 1.80，是所有 AR 模型中的最佳成绩，也优于所有扩散模型</span>
                </div>
              </div>
            ),
          },
          {
            title: 'Scaling Laws',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">幂律缩放定律</h2>
                <p className="text-gray-500">就像 LLM 一样，VAR 也遵循 scaling law</p>
                <div className="max-w-3xl w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-end justify-between h-48 border-b border-l border-gray-200 pl-4 pb-4 relative">
                    {[
                      { x: 10, y: 85, label: 'd16\n310M' },
                      { x: 25, y: 70, label: 'd20\n600M' },
                      { x: 45, y: 55, label: 'd24\n1.0B' },
                      { x: 70, y: 35, label: 'd30\n2.0B' },
                      { x: 90, y: 25, label: 'd36\n2.3B' },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="absolute flex flex-col items-center"
                        style={{ left: `${p.x}%`, bottom: `${100 - p.y}%` }}
                      >
                        <div className="w-3 h-3 rounded-full bg-violet-500" />
                        <div className="text-[10px] text-gray-500 mt-1 whitespace-pre-line text-center">{p.label}</div>
                      </div>
                    ))}
                    {/* Trend line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M 10 15 Q 40 30, 90 75"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="absolute -left-1 -top-4 text-xs text-gray-400">FID ↓</div>
                    <div className="absolute -bottom-4 right-0 text-xs text-gray-400">参数量 →</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 max-w-2xl text-center border border-blue-100">
                  <span className="text-blue-700 font-medium">意义：</span>
                  <span className="text-gray-600"> 更大的模型几乎必然带来更好的结果，且效果可预测</span>
                </div>
              </div>
            ),
          },
          {
            title: '架构优势：AdaLN',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">关键架构创新</h2>
                <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-lg font-bold text-violet-700 mb-4">AdaLN（自适应层归一化）</div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">→</span>
                        <span>根据当前尺度动态调整归一化参数</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">→</span>
                        <span>让同一个 Transformer 处理不同尺度</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">→</span>
                        <span>类条件信息通过 AdaLN 注入</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-lg font-bold text-blue-700 mb-4">Progressive Training</div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span>
                        <span>训练时逐步增加尺度数量</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span>
                        <span>先学粗粒度，再学细粒度</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span>
                        <span>训练更稳定，收敛更快</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 max-w-2xl text-center border border-amber-100">
                  <span className="text-amber-700 font-medium">Shared AdaLin：</span>
                  <span className="text-gray-600"> 所有尺度共享同一个 AdaLN 层，大幅减少参数量</span>
                </div>
              </div>
            ),
          },
          {
            title: '为什么 GPT 范式适合视觉',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-3xl font-bold text-gray-800">GPT 范式在视觉上的天然优势</h2>
                <div className="max-w-3xl w-full space-y-4">
                  {[
                    { icon: '🧠', title: '统一范式', desc: 'NLP 和 CV 使用相同的自回归框架，未来可能走向统一', color: 'violet' },
                    { icon: '📊', title: '可预测的缩放', desc: 'Scaling law 表明增大模型必然提升效果，投资可预测', color: 'blue' },
                    { icon: '🔧', title: '丰富的工具链', desc: 'KV Cache、Flash Attention 等 LLM 优化技术可直接复用', color: 'cyan' },
                    { icon: '🎯', title: '确定性生成', desc: '相同输入总是产生相同输出，更适合可控生成', color: 'emerald' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-${item.color}-100`}>
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <div className={`font-bold text-${item.color}-700`}>{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: '总结',
            content: (
              <div className="flex flex-col items-center justify-center h-full gap-8 px-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  VAR 为什么能赢？
                </h2>
                <div className="grid grid-cols-2 gap-6 max-w-3xl w-full">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-gray-700">速度</div>
                    <div className="text-4xl font-black text-emerald-600">20-50×</div>
                    <div className="text-sm text-gray-500">比扩散模型快</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-gray-700">质量</div>
                    <div className="text-4xl font-black text-violet-600">FID 1.80</div>
                    <div className="text-sm text-gray-500">超越所有扩散模型</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-gray-700">扩展性</div>
                    <div className="text-4xl font-black text-blue-600">幂律</div>
                    <div className="text-sm text-gray-500">更大 = 更好，可预测</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-gray-700">通用性</div>
                    <div className="text-4xl font-black text-cyan-600">GPT</div>
                    <div className="text-sm text-gray-500">统一的自回归范式</div>
                  </div>
                </div>
                <div className="text-gray-500 text-center max-w-xl">
                  VAR 证明了 GPT 风格的自回归模型在视觉领域同样具有巨大潜力，<br/>
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
