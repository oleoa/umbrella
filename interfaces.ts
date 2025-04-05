export interface FormState {
  message: string | null
  success: boolean | null
  errors: string[]
}

export interface Account {
  first_name: string | null
  last_name: string | null
  birthday: string | null
  currency: '$' | '€'
}

export interface Budget {
  id: number
  user_id: string
  name: string
  starts_at: string
  ends_at: string
  types: Type[]
}

export interface Type {
  id: number
  budget_id: number
  name: string
  goal: string
}
