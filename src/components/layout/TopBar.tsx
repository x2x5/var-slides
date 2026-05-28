interface TopBarProps {
  questionTitle: string | null
  currentSlide: number
  totalSlides: number
}

export default function TopBar({ questionTitle, currentSlide, totalSlides }: TopBarProps) {
  if (!questionTitle || totalSlides === 0) return null

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 pointer-events-none">
      <div className="pointer-events-auto">
        <div className="px-3 py-1.5 rounded-lg bg-surface/70 backdrop-blur-sm border border-line text-[11px] font-body text-ink-3">
          {questionTitle}
        </div>
      </div>
      <div className="pointer-events-auto">
        <div className="px-2.5 py-1 rounded-md bg-surface/70 backdrop-blur-sm border border-line text-[11px] font-number text-ink-3">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>
    </div>
  )
}
