import { useRef, useEffect, useCallback, useState } from 'react'
import type { Question } from '../data/types'

interface SlideViewProps {
  question: Question | null
}

export default function SlideView({ question }: SlideViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      setCurrentSlide(0)
    }
  }, [question?.id])

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const slideHeight = container.clientHeight
    const index = Math.round(container.scrollTop / slideHeight)
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const slideHeight = container.clientHeight
      const maxSlide = (question?.slides.length ?? 1) - 1

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        const next = Math.min(currentSlide + 1, maxSlide)
        container.scrollTo({ top: next * slideHeight, behavior: 'smooth' })
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const prev = Math.max(currentSlide - 1, 0)
        container.scrollTo({ top: prev * slideHeight, behavior: 'smooth' })
      } else if (e.key === 'Home') {
        e.preventDefault()
        container.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (e.key === 'End') {
        e.preventDefault()
        container.scrollTo({ top: maxSlide * slideHeight, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, question?.slides.length])

  if (!question) {
    return (
      <div className="flex-1 flex items-center justify-center paper-texture" style={{ background: 'var(--bg)' }}>
        <div className="text-center animate-fade-up">
          <div className="text-7xl mb-6 opacity-20">📖</div>
          <div
            className="text-2xl mb-3"
            style={{ fontFamily: 'var(--serif)', color: 'var(--ink-light)' }}
          >
            从左侧目录选择一个问题
          </div>
          <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            键盘 ↑↓ 或两指滑动浏览
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative paper-texture" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4">
        <div
          className="text-[13px] font-medium max-w-[60%] truncate"
          style={{ fontFamily: 'var(--serif)', color: 'var(--ink-light)' }}
        >
          {question.title}
        </div>
        <div
          className="text-[11px] font-mono px-2.5 py-1 rounded-md"
          style={{
            color: 'var(--ink-muted)',
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {currentSlide + 1} / {question.slides.length}
        </div>
      </div>

      {/* Progress dots — right side */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {question.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const container = containerRef.current
              if (container) {
                container.scrollTo({
                  top: i * container.clientHeight,
                  behavior: 'smooth',
                })
              }
            }}
            className="group relative flex items-center justify-end"
          >
            <span
              className="text-[9px] font-mono mr-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ color: 'var(--ink-muted)' }}
            >
              {i + 1}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-2.5 h-2.5'
                  : 'w-1.5 h-1.5 group-hover:w-2 group-hover:h-2'
              }`}
              style={{
                background: i === currentSlide ? 'var(--accent)' : '#c8c0b6',
              }}
            />
          </button>
        ))}
      </div>

      {/* Scrollable slides */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {question.slides.map((slide, index) => (
          <div
            key={index}
            className="h-full snap-start snap-always flex flex-col"
          >
            {/* Slide title */}
            <div className="px-8 pt-16 pb-3">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}
              >
                {slide.title}
              </h2>
              <div
                className="w-12 h-[2px] mt-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            </div>

            {/* Slide content */}
            <div className="flex-1 px-8 pb-8 overflow-hidden">
              {slide.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
