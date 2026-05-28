import { useState, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import SlideView from './components/SlideView'
import categories from './data/content'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  const activeQuestion = useMemo(() => {
    for (const cat of categories) {
      const q = cat.questions.find((q) => q.id === activeQuestionId)
      if (q) return q
    }
    return null
  }, [activeQuestionId])

  return (
    <div className="h-full flex">
      <Sidebar
        categories={categories}
        activeQuestionId={activeQuestionId}
        onSelectQuestion={setActiveQuestionId}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <SlideView question={activeQuestion} />
    </div>
  )
}
