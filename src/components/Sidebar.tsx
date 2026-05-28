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
    new Set(categories.map((c) => c.id))
  )

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  let questionIndex = 0

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 ease-in-out border-r border-line ${
        collapsed ? 'w-14' : 'w-[260px]'
      }`}
      style={{ background: 'var(--color-surface-soft)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-line">
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-title font-bold text-ink tracking-wide">
              VAR 论文解读
            </div>
            <div className="text-[10px] text-ink-3 mt-0.5 font-body">
              问答式知识库
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-black/5 transition-colors shrink-0 text-ink-3"
          title={collapsed ? '展开目录' : '收起目录'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {collapsed ? (
              <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M9 2.5l-4.5 4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Tree */}
      <nav className="flex-1 overflow-y-auto py-3">
        {categories.map((cat, catIdx) => {
          const catNum = String(catIdx + 1).padStart(2, '0')
          return (
            <div key={cat.id} className="mb-1">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-left hover:bg-black/[0.03] transition-colors ${
                  collapsed ? 'justify-center px-0' : ''
                }`}
              >
                {!collapsed && (
                  <span className="text-[10px] font-number font-medium text-ink-3 w-5 shrink-0">
                    {catNum}
                  </span>
                )}
                <span className="text-sm shrink-0">{cat.icon}</span>
                {!collapsed && (
                  <>
                    <span className="text-[12px] font-title font-semibold text-ink flex-1 truncate">
                      {cat.title}
                    </span>
                    <span className="text-[9px] font-number text-ink-3 bg-black/[0.04] px-1.5 py-0.5 rounded">
                      {cat.questions.length}
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

              {/* Questions */}
              {!collapsed && expandedCategories.has(cat.id) && (
                <div className="relative ml-[26px]">
                  {/* Vertical line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-line" />
                  {cat.questions.length === 0 ? (
                    <div className="pl-4 py-2 text-[11px] italic text-ink-3">
                      待添加
                    </div>
                  ) : (
                    cat.questions.map((q) => {
                      questionIndex++
                      const isActive = activeQuestionId === q.id
                      return (
                        <button
                          key={q.id}
                          onClick={() => onSelectQuestion(q.id)}
                          className="w-full text-left pl-4 pr-3 py-2 transition-all duration-200 relative group"
                        >
                          {/* Horizontal connector */}
                          <div className="absolute left-0 top-1/2 w-3 h-px bg-line" />
                          <div
                            className={`rounded-md px-2.5 py-1.5 transition-colors ${
                              isActive
                                ? 'bg-primary/[0.08]'
                                : 'hover:bg-black/[0.03]'
                            }`}
                          >
                            <div
                              className={`text-[12px] leading-snug font-body transition-colors ${
                                isActive
                                  ? 'text-primary font-semibold'
                                  : 'text-ink-2 group-hover:text-ink'
                              }`}
                            >
                              {q.title}
                            </div>
                            <div className="text-[9px] font-number text-ink-3 mt-0.5">
                              {q.slides.length} 页
                            </div>
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-line text-[9px] font-code text-ink-3">
          var.usegpt.top
        </div>
      )}
    </aside>
  )
}
