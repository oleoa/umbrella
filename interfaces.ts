export interface FormState {
  message: string | null
  success: boolean | null
  errors: string[]
  redirect: string | null
}

export interface Account {
  first_name: string | null
  last_name: string | null
  birthday: string | null
  currency: string | null
}
