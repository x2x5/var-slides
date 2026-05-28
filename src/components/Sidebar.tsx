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
      className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-12' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        {!collapsed && (
          <span className="text-sm font-bold text-gray-700 truncate">VAR 论文解读</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 shrink-0"
          title={collapsed ? '展开目录' : '收起目录'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {collapsed ? (
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Tree */}
      <nav className="flex-1 overflow-y-auto py-2">
        {categories.map((cat) => (
          <div key={cat.id}>
            {/* Category header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <span className="text-base shrink-0">{cat.icon}</span>
              {!collapsed && (
                <>
                  <span className="text-sm font-medium text-gray-700 flex-1 truncate">
                    {cat.title}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`shrink-0 transition-transform ${
                      expandedCategories.has(cat.id) ? 'rotate-90' : ''
                    }`}
                  >
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </>
              )}
            </button>

            {/* Questions */}
            {!collapsed && expandedCategories.has(cat.id) && (
              <div>
                {cat.questions.length === 0 ? (
                  <div className="px-8 py-2 text-xs text-gray-400 italic">暂无问题</div>
                ) : (
                  cat.questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => onSelectQuestion(q.id)}
                      className={`w-full text-left px-8 py-2 text-sm transition-colors ${
                        activeQuestionId === q.id
                          ? 'bg-violet-50 text-violet-700 font-medium border-r-2 border-violet-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <div className="truncate">{q.title}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{q.slides.length} 页</div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
