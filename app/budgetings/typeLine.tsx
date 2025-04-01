'use client'

import { FormState, Type } from '@/interfaces'
import { useActionState, useEffect, useState } from 'react'
import { deleteType, updateType } from './actions'
import { useSnackbar } from '@/components/SnackbarProvider'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

interface Props {
  type: Type
  currency: '€' | '$'
}

export default function TypeLine({ type, currency }: Props) {
  const [thisType, setThisType] = useState<Type>(type)

  const { snackbar } = useSnackbar()

  const [updateState, updateAction, updatePending] = useActionState<FormState, FormData>(updateType, initialState)
  const [deleteState, deleteAction, deletePending] = useActionState<FormState, FormData>(deleteType, initialState)

  useEffect(() => {
    if (deleteState.success === false) deleteState.errors.forEach((error) => snackbar.error(error))
    if (deleteState.success === true) snackbar.success(deleteState.message || '')
    if (updateState.success === false) updateState.errors.forEach((error) => snackbar.error(error))
    if (updateState.success === true) snackbar.success(updateState.message || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState, updateState])

  return (
    <form className='flex gap-2'>
      <input type='hidden' name='id' value={thisType.id} />
      <input type='hidden' name='budget_id' value={thisType.budget_id} />
      <input className='special budget' type='text' name='name' value={thisType.name} onChange={(e) => setThisType({ ...type, name: e.target.value })} />
      <div className='flex w-full'>
        <span className='rounded-l-lg border-l-1 border-y-1 flex items-center justify-center pl-2'>{currency}</span>
        <input
          className='special rounded-r-lg px-2 w-full border-y-1 border-r-1'
          type='string'
          name='goal'
          value={thisType.goal}
          onChange={(e) => setThisType({ ...type, goal: e.target.value })}
        />
      </div>
      <button className='btn-special px-2' formAction={updateAction} disabled={updatePending}>
        {updatePending ? 'Ldg' : 'Upd'}
      </button>
      <button className='btn-danger-special px-2' formAction={deleteAction} disabled={deletePending}>
        {deletePending ? 'Ldg' : 'Del'}
      </button>
    </form>
  )
}
