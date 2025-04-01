export interface FormState {
  message: string | null
  success: boolean | null
  errors: string[]
}

export interface Account {
  first_name: string | null
  last_name: string | null
  birthday: string | null
  currency: string | null
}

export interface Budget {
  id: number
  name: string
  starts_at: string
  ends_at: string
}
