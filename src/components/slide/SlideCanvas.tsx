import type { ReactNode } from 'react'

export default function SlideCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full max-w-[1280px] rounded-[24px] bg-surface border border-line shadow-[0_16px_48px_rgba(55,38,22,0.07)] overflow-hidden">
      {children}
    </div>
  )
}
