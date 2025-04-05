'use client'

import { useActionState, useEffect, useState } from 'react'
import { createBudget } from './actions'
import { Budget, FormState } from '@/interfaces'
import { useSnackbar } from '@/components/SnackbarProvider'

const initialState: FormState = {
  message: '',
  success: null,
  errors: [],
}

const initialNewBudget: Budget = {
  id: 0,
  name: '',
  starts_at: '',
  ends_at: '',
  user_id: '',
  types: [],
}

export default function CreateBudgetForm() {
  const { snackbar } = useSnackbar()

  const [isVisible, setIsVisible] = useState(false)
  const [state, action, pending] = useActionState<FormState, FormData>(createBudget, initialState)

  const [creatingBudget, setCreatingBudget] = useState<Budget>(initialNewBudget)

  useEffect(() => {
    if (state.success === false) state.errors.forEach((error) => snackbar.error(error))
    if (state.success === true) {
      snackbar.success(state.message || '')
      setIsVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCreatingBudget({ ...creatingBudget, name: e.target.value })
  const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setCreatingBudget({ ...creatingBudget, starts_at: e.target.value })
  const handleEndingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setCreatingBudget({ ...creatingBudget, ends_at: e.target.value })

  return (
    <div className='flex justify-end'>
      <div className='absolute right-0 flex items-center h-full'>
        <button className='btn-good w-fit' onClick={() => setIsVisible(true)}>
          New
        </button>
      </div>
      {isVisible && (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/50 z-50'>
          <form className='bg-black grid grid-cols-2 gap-4 border-2 p-4 rounded-lg xl:w-1/3 w-1/2' >
            <div className='flex justify-between col-span-2'>
              <h2 className='col-span-2'>Create new budget</h2>
              <button className='btn-danger-special px-2' onClick={() => setIsVisible(false)}>
                Close
              </button>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' id='name' placeholder='October' onChange={handleNameChange} value={creatingBudget.name} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='starts_at'>Starts at</label>
              <input type='date' name='starts_at' id='starts_at' onChange={handleStartingDateChange} value={creatingBudget.starts_at} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='ends_at'>Ends at</label>
              <input type='date' name='ends_at' id='ends_at' onChange={handleEndingDateChange} value={creatingBudget.ends_at} />
            </div>
            <button className='btn col-span-2' disabled={pending} formAction={action}>
              {pending ? 'Loading' : 'Create'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
