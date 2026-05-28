import { useRef, useEffect, useCallback, useState } from 'react'
import type { Question } from '../data/types'
import TopBar from './layout/TopBar'
import ProgressRail from './layout/ProgressRail'
import SlideCanvas from './slide/SlideCanvas'
import SlideFrame from './slide/SlideFrame'

interface SlideViewProps {
  question: Question | null
}

export default function SlideView({ question }: SlideViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      setCurrentSlide(0)
      setShowHint(true)
    }
  }, [question?.id])

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const slideHeight = container.clientHeight
    const index = Math.round(container.scrollTop / slideHeight)
    setCurrentSlide(index)
    if (container.scrollTop > 50) setShowHint(false)
  }, [])

  const jumpTo = useCallback((index: number) => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const maxSlide = (question?.slides.length ?? 1) - 1

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        jumpTo(Math.min(currentSlide + 1, maxSlide))
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        jumpTo(Math.max(currentSlide - 1, 0))
      } else if (e.key === 'Home') {
        e.preventDefault()
        jumpTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        jumpTo(maxSlide)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, question?.slides.length, jumpTo])

  if (!question) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="text-6xl mb-6 opacity-15">📖</div>
          <div className="text-xl font-title font-semibold text-ink-2 mb-2">
            从左侧目录选择一个问题
          </div>
          <div className="text-[13px] text-ink-3">
            键盘 ↑↓ 或两指滑动浏览
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative" style={{ background: 'var(--color-bg)' }}>
      <TopBar
        questionTitle={question.title}
        currentSlide={currentSlide}
        totalSlides={question.slides.length}
      />

      <ProgressRail
        slides={question.slides}
        currentSlide={currentSlide}
        onJump={jumpTo}
      />

      {/* Scroll hint */}
      {showHint && question.slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce text-ink-3">
          <span className="text-[11px] font-body">向下滑动继续</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Scrollable slides */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {question.slides.map((slide, index) => (
          <section
            key={index}
            className="h-screen snap-start snap-always grid place-items-center px-6 lg:px-12 py-16"
          >
            <SlideCanvas>
              <SlideFrame
                eyebrow={`${question.title} · ${String(index + 1).padStart(2, '0')} / ${String(question.slides.length).padStart(2, '0')}`}
                title={slide.title}
                lead={slide.lead}
                takeaway={slide.takeaway}
              >
                {slide.content}
              </SlideFrame>
            </SlideCanvas>
          </section>
        ))}
      </div>
    </div>
  )
}
