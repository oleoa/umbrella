'use client'

import { useActionState, useEffect } from 'react'
import { del } from './actions'
import { FormState } from '@/interfaces'
import { useSnackbar } from '@/components/SnackbarProvider'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

interface Props {
  budget_id: number
}

export default function Del({ budget_id }: Props) {
  const { snackbar } = useSnackbar()
  const [state, action, pending] = useActionState<FormState, FormData>(del, initialState)

  useEffect(() => {
    if (state.success === false) state.errors.forEach((error) => snackbar.error(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={action} className='absolute right-0 flex items-start h-full'>
      <input type='hidden' name='id' value={budget_id} />
      <button className='btn-danger-special px-4 h-8' disabled={pending}>
        {pending ? 'Ldg' : 'Del'}
      </button>
    </form>
  )
}
