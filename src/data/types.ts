export interface Slide {
  title: string
  content: React.ReactNode
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
