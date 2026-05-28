import { useState } from 'react'
import type { Category } from '../data/types'

interface SidebarProps {
  categories: Category[]
  activeQuestionId: string | null
  onSelectQuestion: (questionId: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({
  categories,
  activeQuestionId,
  onSelectQuestion,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.filter((c) => c.questions.length > 0).map((c) => c.id))
  )

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filledCats = categories.filter((c) => c.questions.length > 0)
  const emptyCats = categories.filter((c) => c.questions.length === 0)
  const totalPages = categories.reduce((sum, c) => sum + c.questions.reduce((s, q) => s + q.slides.length, 0), 0)
  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0)

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 ease-in-out border-r border-line ${
        collapsed ? 'w-14' : 'w-[300px]'
      }`}
      style={{ background: 'var(--color-surface-soft)' }}
    >
      {/* Brand section */}
      <div className="px-5 pt-5 pb-4 border-b border-line">
        {!collapsed ? (
          <>
            <div className="text-[15px] font-title font-bold text-ink">
              VAR 论文解读
            </div>
            <div className="text-[11px] text-ink-3 mt-1.5 font-body">
              Visual Autoregressive Modeling
            </div>
            <div className="flex items-center gap-3 mt-3 text-[10px] font-number text-ink-3">
              <span>{totalQuestions} 个主题</span>
              <span className="w-0.5 h-0.5 rounded-full bg-ink-3" />
              <span>{totalPages} 页内容</span>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-md hover:bg-black/5 transition-colors text-ink-3"
              title="展开目录"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Collapse button */}
      {!collapsed && (
        <div className="flex justify-end px-4 py-2">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded hover:bg-black/5 transition-colors text-ink-3"
            title="收起目录"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Tree */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {filledCats.map((cat, catIdx) => {
          const catNum = String(catIdx + 1).padStart(2, '0')
          const catPages = cat.questions.reduce((s, q) => s + q.slides.length, 0)
          return (
            <div key={cat.id} className="mb-2">
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-black/[0.03] transition-colors ${
                  collapsed ? 'justify-center px-0' : ''
                }`}
              >
                {!collapsed && (
                  <span className="text-[10px] font-number font-medium text-ink-3 w-5 shrink-0">
                    {catNum}
                  </span>
                )}
                <span className="text-base shrink-0">{cat.icon}</span>
                {!collapsed && (
                  <>
                    <span className="text-[13px] font-body font-semibold text-ink flex-1 truncate">
                      {cat.title}
                    </span>
                    <span className="text-[10px] font-number text-ink-3 bg-black/[0.04] px-1.5 py-0.5 rounded">
                      {catPages}
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 text-ink-3 ${
                        expandedCategories.has(cat.id) ? 'rotate-90' : ''
                      }`}
                    >
                      <path d="M3.5 1.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {!collapsed && expandedCategories.has(cat.id) && (
                <div className="relative ml-6 mr-2 mt-1">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-line" />
                  {cat.questions.map((q) => {
                    const isActive = activeQuestionId === q.id
                    return (
                      <button
                        key={q.id}
                        onClick={() => onSelectQuestion(q.id)}
                        className="w-full text-left pl-4 pr-2 py-1.5 relative group"
                      >
                        <div className="absolute left-0 top-1/2 w-3 h-px bg-line" />
                        <div
                          className={`rounded-lg px-3 py-2.5 transition-all duration-200 ${
                            isActive
                              ? 'bg-primary/[0.08] border border-primary/[0.12]'
                              : 'border border-transparent hover:bg-black/[0.03]'
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                          )}
                          <div
                            className={`text-[13px] leading-snug font-body transition-colors ${
                              isActive
                                ? 'text-primary font-semibold'
                                : 'text-ink-2 group-hover:text-ink'
                            }`}
                          >
                            {q.title}
                          </div>
                          <div className="text-[10px] font-number text-ink-3 mt-1">
                            {q.slides.length} 页
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Empty categories */}
        {!collapsed && emptyCats.length > 0 && (
          <div className="mt-4 px-3">
            <div className="text-[9px] font-number text-ink-3 uppercase tracking-widest mb-2 px-1">
              即将添加
            </div>
            {emptyCats.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2.5 px-3 py-2 text-[12px] text-ink-3/50 rounded-lg"
              >
                <span className="text-sm opacity-50">{cat.icon}</span>
                <span className="font-body">{cat.title}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-5 py-3 border-t border-line text-[9px] font-code text-ink-3">
          var.usegpt.top
        </div>
      )}
    </aside>
  )
}
