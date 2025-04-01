'use client'

import { useActionState, useEffect } from 'react'
import { createType } from './actions'
import { FormState } from '@/interfaces'
import { useSnackbar } from '@/components/SnackbarProvider'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

interface Props {
  budget_id: number
  currency: '€' | '$'
}

export default function CreatingTypeForm({ budget_id, currency }: Props) {
  const { snackbar } = useSnackbar()

  const [state, action, pending] = useActionState<FormState, FormData>(createType, initialState)

  useEffect(() => {
    if (state.success === false) state.errors.forEach((error) => snackbar.error(error))
    if (state.success === true) snackbar.success(state.message || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form className='flex gap-2 py-2' action={action}>
      <input type='hidden' name='budget_id' value={budget_id} />
      <input type='text' name='name' placeholder='Name' className='special budget' />
      <input type='text' name='goal' placeholder={currency + '...'} className='special budget' />
      <button className='btn-good-special px-4' disabled={pending}>
        {pending ? 'Ldg' : 'Add'}
      </button>
    </form>
  )
}
