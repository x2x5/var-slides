import type { ReactNode } from 'react'

export default function SlideCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[1180px] min-h-[680px] rounded-[28px] bg-surface/80 border border-line shadow-[0_20px_60px_rgba(55,38,22,0.07)] backdrop-blur-sm overflow-hidden">
      {children}
    </div>
  )
}
