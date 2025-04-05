import { createClient } from '@/utils/supabase/server'

import CreateBudgetForm from './createBudgetForm'

import { redirect } from 'next/navigation'
import AllBudgets from './budget'
import { Budget } from '@/interfaces'
import BudgetCard from './budget'

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
      <div className='grid grid-cols-2 gap-4'>{budgets && budgets.map((budget: Budget) => <BudgetCard key={budget.id} budget={budget} account={account} />)}</div>
    </main>
  )
}
