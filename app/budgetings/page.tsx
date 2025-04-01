import { createClient } from '@/utils/supabase/server'
import Creating from './creating'
import { Budget } from '@/interfaces'
import Del from './del'

export default async function Budgetings() {
  const supabase = await createClient()
  const { data: budgets, error } = await supabase.from('budgets').select()
  if (error) console.error(error)

  return (
    <main className='pt-8 flex flex-col gap-8'>
      <div className='flex justify-center relative'>
        <h1>Your budgets</h1>
        <Creating />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {budgets &&
          budgets.map((budget: Budget) => {
            return (
              <div key={budget.id} className='border-2 rounded-lg px-4 py-2 flex flex-col gap-4'>
                <div className='flex justify-start relative pt-2'>
                  <h4>{budget.name}</h4>
                  <Del budget_id={budget.id} />
                </div>
                <form className='flex gap-4 py-2'>
                  <input type='hidden' name='budget_id' value={budget.id} />
                  <input type='text' name='name' className='special border-2 rounded-lg h-8 w-full px-4' />
                  <button className='btn-good-special px-4'>Add</button>
                </form>
              </div>
            )
          })}
      </div>
    </main>
  )
}
