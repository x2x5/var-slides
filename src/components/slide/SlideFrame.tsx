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
      <header className="px-12 lg:px-16 pt-12 pb-4">
        {eyebrow && (
          <p className="text-[11px] font-code tracking-widest text-ink-3 mb-3 uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[28px] lg:text-[34px] font-title font-bold text-ink leading-tight">
          {title}
        </h2>
        {lead && (
          <p className="text-[17px] text-ink-2 mt-3 leading-relaxed max-w-2xl">
            {lead}
          </p>
        )}
        <div className="w-10 h-[2px] bg-primary mt-4 rounded-full" />
      </header>

      <main className="flex-1 px-12 lg:px-16 py-4 overflow-hidden">
        {children}
      </main>

      {takeaway && (
        <footer className="px-12 lg:px-16 py-4 border-t border-line">
          <p className="text-[13px] text-primary font-medium">
            {takeaway}
          </p>
        </footer>
      )}
    </article>
  )
}
