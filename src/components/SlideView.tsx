import { useRef, useEffect, useCallback, useState } from 'react'
import type { Question } from '../data/types'

interface SlideViewProps {
  question: Question | null
}

export default function SlideView({ question }: SlideViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Reset scroll when question changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      setCurrentSlide(0)
    }
  }, [question?.id])

  // Track current slide on scroll
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const slideHeight = container.clientHeight
    const index = Math.round(container.scrollTop / slideHeight)
    setCurrentSlide(index)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const slideHeight = container.clientHeight

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        const next = Math.min(currentSlide + 1, (question?.slides.length ?? 1) - 1)
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
        const last = (question?.slides.length ?? 1) - 1
        container.scrollTo({ top: last * slideHeight, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, question?.slides.length])

  if (!question) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <div className="text-xl text-gray-400 font-light">从左侧目录选择一个问题</div>
          <div className="text-sm text-gray-300 mt-2">或用键盘上下键浏览幻灯片</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative bg-gray-50">
      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm text-gray-500 font-mono shadow-sm">
        {currentSlide + 1} / {question.slides.length}
      </div>

      {/* Question title */}
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm text-gray-700 font-medium shadow-sm max-w-[60%] truncate">
        {question.title}
      </div>

      {/* Progress dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
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
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide
                ? 'bg-violet-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={question.slides[i].title}
          />
        ))}
      </div>

      {/* Scrollable slides */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {question.slides.map((slide, index) => (
          <div
            key={index}
            className="h-full snap-start snap-always flex flex-col"
          >
            {/* Slide title bar */}
            <div className="px-8 pt-14 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {slide.title}
              </h2>
              <div className="text-xs text-gray-400 mt-0.5">
                第 {index + 1} 页 / 共 {question.slides.length} 页
              </div>
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
