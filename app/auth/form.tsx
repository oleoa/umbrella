'use client'

import { useActionState, useEffect } from 'react'
import { login, signup } from '@/app/auth/actions'
import { useSnackbar } from '@/components/SnackbarProvider'
import { FormState } from '@/interfaces'
import Link from 'next/link'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

export default function AuthForm() {
  const { snackbar } = useSnackbar()
  const [loginState, loginAction, loginPending] = useActionState<FormState, FormData>(login, initialState)
  const [signupState, signupAction, signupPending] = useActionState<FormState, FormData>(signup, initialState)

  useEffect(() => {
    if (loginState.success === false) loginState.errors.forEach((error) => snackbar.error(error))
    if (signupState.success === false) signupState.errors.forEach((error) => snackbar.error(error))
    if (loginState.success === true) snackbar.success(loginState.message || '')
    if (signupState.success === true) snackbar.success(signupState.message || '')
  }, [loginState, signupState])

  return (
    <form className="w-1/3 border-2 p-4 rounded-lg">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <div className="flex gap-4">
        {!signupPending && (
          <button className="btn bg-light-purple hover:bg-dark-purple transition-all duration-300 w-full" formAction={loginAction}>
            Log in
          </button>
        )}
        {!loginPending && (
          <button className="btn bg-light-purple hover:bg-dark-purple transition-all duration-300 w-full" formAction={signupAction}>
            Sign up
          </button>
        )}
      </div>
      {(loginState.success || signupState.success) && (
        <p>
          Visit the <Link href="/">main</Link> page
        </p>
      )}
    </form>
  )
}
