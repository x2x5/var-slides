interface ProgressRailProps {
  slides: { title: string }[]
  currentSlide: number
  onJump: (index: number) => void
}

export default function ProgressRail({ slides, currentSlide, onJump }: ProgressRailProps) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end gap-2">
      {slides.map((slide, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          className="group flex items-center gap-2"
        >
          <span className="text-[9px] font-code text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap max-w-[120px] truncate">
            {slide.title}
          </span>
          <div
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'w-2 h-2 bg-primary'
                : 'w-1.5 h-1.5 bg-line-strong group-hover:w-2 group-hover:h-2 group-hover:bg-ink-3'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
