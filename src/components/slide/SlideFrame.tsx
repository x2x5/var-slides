import type { ReactNode } from 'react'

type SlideFrameProps = {
  eyebrow?: string
  title: string
  lead?: string
  takeaway?: string
  children: ReactNode
}

export default function SlideFrame({ eyebrow, title, lead, takeaway, children }: SlideFrameProps) {
  return (
    <article className="flex flex-col h-full">
      <header className="px-10 lg:px-14 pt-10 pb-3">
        {eyebrow && (
          <p className="text-[11px] font-body tracking-wider text-primary mb-2.5" style={{ letterSpacing: '0.06em' }}>
            {eyebrow}
          </p>
        )}
        <h2 className="text-[26px] lg:text-[32px] font-title font-bold text-ink leading-[1.15]" style={{ letterSpacing: '-0.02em' }}>
          {title}
        </h2>
        {lead && (
          <p className="text-[16px] text-ink-2 mt-2.5 leading-relaxed max-w-xl font-body">
            {lead}
          </p>
        )}
        <div className="w-8 h-[2px] bg-primary/40 mt-3 rounded-full" />
      </header>

      <main className="flex-1 px-10 lg:px-14 py-3 overflow-hidden">
        {children}
      </main>

      {takeaway && (
        <footer className="px-10 lg:px-14 py-3 border-t border-line/60">
          <p className="text-[12px] text-primary/80 font-body">
            {takeaway}
          </p>
        </footer>
      )}
    </article>
  )
}
