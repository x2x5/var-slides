interface TopBarProps {
  questionTitle: string | null
  currentSlide: number
  totalSlides: number
}

export default function TopBar({ questionTitle, currentSlide, totalSlides }: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 pointer-events-none">
      <div className="pointer-events-auto">
        {questionTitle && (
          <div className="px-3 py-1.5 rounded-lg bg-surface/70 backdrop-blur-sm border border-line text-[12px] font-title font-semibold text-ink-2">
            {questionTitle}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 pointer-events-auto">
        <span className="hidden lg:block text-[10px] font-code text-ink-3 tracking-wider">
          ↑↓ 翻页 · Home 回到开头
        </span>
        {totalSlides > 0 && (
          <div className="px-2.5 py-1 rounded-md bg-surface/70 backdrop-blur-sm border border-line text-[11px] font-number text-ink-3">
            {currentSlide + 1} / {totalSlides}
          </div>
        )}
      </div>
    </div>
  )
}
