'use client'

import { useActionState, useEffect } from 'react'
import { login, signup } from '@/app/auth/actions'
import { useSnackbar } from '@/components/SnackbarProvider'
import { FormState } from '@/interfaces'
import { useRouter } from 'next/navigation'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
  redirect: null,
}

export default function AuthForm() {
  const { snackbar } = useSnackbar()
  const router = useRouter()

  const [loginState, loginAction, loginPending] = useActionState<FormState, FormData>(login, initialState)
  const [signupState, signupAction, signupPending] = useActionState<FormState, FormData>(signup, initialState)

  useEffect(() => {
    if (loginState.success === false) loginState.errors.forEach((error) => snackbar.error(error))
    if (signupState.success === false) signupState.errors.forEach((error) => snackbar.error(error))
    if (loginState.success === true) {
      snackbar.success(loginState.message || '')
      if (loginState.redirect) router.push(loginState.redirect)
    }
    if (signupState.success === true) snackbar.success(signupState.message || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState, signupState])

  return (
    <form className='grid grid-cols-2 gap-4'>
      <div className='flex flex-col'>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' required />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password' required />
      </div>
      <div className='flex gap-4 col-span-2'>
        {!signupPending && (
          <button className='btn' formAction={loginAction}>
            Log in
          </button>
        )}
        {!loginPending && (
          <button className='btn' formAction={signupAction}>
            Sign up
          </button>
        )}
      </div>
    </form>
  )
}
