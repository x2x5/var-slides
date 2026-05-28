interface ProgressRailProps {
  slides: { title: string }[]
  currentSlide: number
  onJump: (index: number) => void
}

export default function ProgressRail({ slides, currentSlide, onJump }: ProgressRailProps) {
  return (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end gap-2.5">
      {slides.map((slide, i) => {
        const isActive = i === currentSlide
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className="group flex items-center gap-2.5"
          >
            <span className={`text-[9px] font-body transition-opacity duration-200 whitespace-nowrap max-w-[140px] truncate ${
              isActive ? 'text-primary font-medium opacity-100' : 'text-ink-3 opacity-0 group-hover:opacity-100'
            }`}>
              {slide.title}
            </span>
            <div
              className={`transition-all duration-300 ${
                isActive
                  ? 'w-2 h-5 rounded-full bg-primary'
                  : 'w-1.5 h-1.5 rounded-full bg-line-strong group-hover:w-2 group-hover:h-2 group-hover:bg-ink-3'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
