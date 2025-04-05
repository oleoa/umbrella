'use client'

import { FormState, Type } from '@/interfaces'
import { useActionState, useEffect } from 'react'
import { deleteType } from './actions'
import { useSnackbar } from '@/components/SnackbarProvider'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

interface Props {
  type: Type
  currency: '€' | '$'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setType: Function
}

export default function TypeLine({ type, currency, setType }: Props) {
  const { snackbar } = useSnackbar()

  const [deleteState, deleteAction, deletePending] = useActionState<FormState, FormData>(deleteType, initialState)

  useEffect(() => {
    if (deleteState.success === false) deleteState.errors.forEach((error) => snackbar.error(error))
    if (deleteState.success === true) snackbar.success(deleteState.message || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState])

  return (
    <form className='flex gap-2'>
      <input type='hidden' name='id' value={type.id} />
      <input type='hidden' name='budget_id' value={type.budget_id} />
      <input className='special budget' type='text' name='name' value={type.name} onChange={(e) => setType({ ...type, name: e.target.value })} />
      <div className='flex w-full'>
        <span className='rounded-l-lg border-l-1 border-y-1 flex items-center justify-center pl-2'>{currency}</span>
        <input
          className='special rounded-r-lg px-2 w-full border-y-1 border-r-1'
          type='string'
          name='goal'
          value={type.goal}
          onChange={(e) => setType({ ...type, goal: e.target.value })}
        />
      </div>
      <button className='btn-danger-special px-2' formAction={deleteAction} disabled={deletePending}>
        {deletePending ? 'Ldg' : 'Del'}
      </button>
    </form>
  )
}
