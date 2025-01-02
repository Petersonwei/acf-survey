export type State = 'BNE' | 'PERTH' | 'TAS' | 'MEL' | 'ADE' | 'SYD'

export type QuestionType = 'text' | 'radio' | 'select'

export interface Question {
  id: string
  type: QuestionType
  title: string
  options?: string[]
}

export interface StateOption {
  state: State
  description: string
  example?: string
  questions: Question[]
}

export interface Category {
  id: string
  title: string
  description: string
  stateOptions: StateOption[]
}

export interface SurveyAnswer {
  questionId: string
  answer: string
}

export interface SurveyResponse {
  id: string
  userName: string
  timestamp: Date
  categoryId: string
  state: State
  answers: SurveyAnswer[]
}