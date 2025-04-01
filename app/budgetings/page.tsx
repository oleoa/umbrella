import { createClient } from '@/utils/supabase/server'

import { Budget } from '@/interfaces'

import CreateBudgetForm from './createBudgetForm'
import DeleleBudgetButton from './deleleBudgetButton'
import CreateTypeForm from './createTypeForm'
import TypeLine from './typeLine'

import { redirect } from 'next/navigation'

export default async function Budgetings() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect('/auth')
  const { data: account, error: account_error } = await supabase.from('users').select().eq('user_id', user.id).single()
  if (account_error || !account) return console.error(account_error)

  const { data: budgets, error: budget_error } = await supabase.from('budgets').select(`
    id,
    user_id,
    name,
    starts_at,
    ends_at,
    types (
      id,
      budget_id,
      name,
      goal
    )
  `)
  if (budget_error) console.error(budget_error)

  return (
    <main className='pt-8 flex flex-col gap-8'>
      <div className='flex justify-center relative'>
        <h1>Your budgets</h1>
        <CreateBudgetForm />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {budgets &&
          budgets.map((budget: Budget) => {
            return (
              <div key={budget.id} className='border-2 rounded-lg px-4 py-2 flex flex-col gap-2 h-fit'>
                <div className='flex justify-start relative pt-2'>
                  <h4>{budget.name}</h4>
                  <DeleleBudgetButton budget_id={budget.id} />
                </div>
                {budget.types.map((type) => (
                  <TypeLine type={type} key={type.id} currency={account.currency} />
                ))}
                <CreateTypeForm budget_id={budget.id} currency={account.currency} />
              </div>
            )
          })}
      </div>
    </main>
  )
}
