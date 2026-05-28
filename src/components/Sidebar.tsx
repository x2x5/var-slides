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

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 ease-in-out border-r ${
        collapsed ? 'w-14' : 'w-72'
      }`}
      style={{
        background: 'linear-gradient(180deg, #f8f5f0 0%, #f3ede4 100%)',
        borderColor: '#e0d8ce',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 border-b"
        style={{ borderColor: '#e0d8ce' }}
      >
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div
              className="text-sm font-bold tracking-wide"
              style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}
            >
              VAR 论文解读
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: 'var(--ink-muted)' }}>
              NeurIPS 2024 Best Paper
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-black/5 transition-colors shrink-0"
          style={{ color: 'var(--ink-muted)' }}
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
        {categories.map((cat) => (
          <div key={cat.id} className="mb-1">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-black/[0.03] transition-colors ${
                collapsed ? 'justify-center px-0' : ''
              }`}
            >
              <span className="text-sm shrink-0">{cat.icon}</span>
              {!collapsed && (
                <>
                  <span
                    className="text-[13px] font-semibold flex-1 truncate tracking-wide"
                    style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}
                  >
                    {cat.title}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`shrink-0 transition-transform duration-200 ${
                      expandedCategories.has(cat.id) ? 'rotate-90' : ''
                    }`}
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    <path d="M3.5 1.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            {/* Questions */}
            {!collapsed && expandedCategories.has(cat.id) && (
              <div>
                {cat.questions.length === 0 ? (
                  <div className="px-11 py-2 text-[11px] italic" style={{ color: 'var(--ink-muted)' }}>
                    待添加
                  </div>
                ) : (
                  cat.questions.map((q) => {
                    const isActive = activeQuestionId === q.id
                    return (
                      <button
                        key={q.id}
                        onClick={() => onSelectQuestion(q.id)}
                        className="w-full text-left px-6 py-2 transition-all duration-200 relative group"
                        style={{
                          background: isActive ? 'rgba(194, 65, 12, 0.06)' : 'transparent',
                        }}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                            style={{ background: 'var(--accent)' }}
                          />
                        )}
                        <div className="pl-5">
                          <div
                            className="text-[13px] leading-snug transition-colors"
                            style={{
                              fontFamily: 'var(--serif)',
                              color: isActive ? 'var(--accent)' : 'var(--ink-light)',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            {q.title}
                          </div>
                          <div
                            className="text-[10px] mt-0.5 font-mono"
                            style={{ color: 'var(--ink-muted)' }}
                          >
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
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div
          className="px-4 py-3 border-t text-[10px]"
          style={{ borderColor: '#e0d8ce', color: 'var(--ink-muted)' }}
        >
          <div style={{ fontFamily: 'var(--mono)' }}>var.usegpt.top</div>
        </div>
      )}
    </aside>
  )
}
