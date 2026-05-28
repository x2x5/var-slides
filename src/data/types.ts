import type { ReactNode } from 'react'

export interface Slide {
  title: string
  lead?: string
  takeaway?: string
  content: ReactNode
}

export interface Question {
  id: string
  title: string
  slides: Slide[]
}

export interface Category {
  id: string
  title: string
  icon: string
  questions: Question[]
}
