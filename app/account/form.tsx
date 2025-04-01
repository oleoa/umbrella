'use client'

import { useActionState, useEffect, useState } from 'react'
import { updateUser, signoutUser } from '@/app/account/actions'
import { useSnackbar } from '@/components/SnackbarProvider'
import { FormState, Account } from '@/interfaces'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

interface Props {
  account: Account
}

export default function AccountForm({ account }: Props) {
  const { snackbar } = useSnackbar()

  const [state, action, pending] = useActionState<FormState, FormData>(updateUser, initialState)
  const [signoutState, signoutAction, signoutPending] = useActionState<FormState, FormData>(signoutUser, initialState)

  useEffect(() => {
    if (state.success === false) state.errors.forEach((error) => snackbar.error(error))
    if (state.success === true) snackbar.success(state.message || '')
    if (signoutState.success === false) state.errors.forEach((error) => snackbar.error(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  // The <select> won't change when revalidating, so I had to transform it into a state
  const [currency, setCurrency] = useState<string>(account.currency ?? '')

  return (
    <form className='grid grid-cols-2 gap-4'>
      <div className='flex flex-col'>
        <label htmlFor='first_name'>First Name</label>
        <input type='text' name='first_name' id='first_name' defaultValue={account.first_name ?? ''} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='last_name'>Last Name</label>
        <input type='text' name='last_name' id='last_name' defaultValue={account.last_name ?? ''} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='birthday'>Birthday</label>
        <input type='date' name='birthday' id='birthday' defaultValue={account.birthday ?? ''} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='currency'>Currency</label>
        <select name='currency' id='currency' value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value='€'>€</option>
          <option value='$'>$</option>
        </select>
      </div>
      <div className='col-span-2 flex gap-4'>
        {!signoutPending && (
          <button className='btn' formAction={action}>
            {pending ? 'Loading' : 'Update'}
          </button>
        )}
        {!pending && (
          <button className='btn-danger' formAction={signoutAction}>
            {signoutPending ? 'Loading' : 'Sign Out'}
          </button>
        )}
      </div>
    </form>
  )
}
