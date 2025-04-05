'use client'

import { useMemo, useState } from 'react'

import { Account, Budget, Type } from '@/interfaces'

import TypeLine from './type'
import DeleleBudgetButton from './deleleBudgetButton'
import CreateTypeForm from './createTypeForm'

interface Props {
  budget: Budget
  account: Account
}

export default function BudgetCard({ budget: serverBudget, account }: Props) {
  const [budget, setBudget] = useState<Budget>(serverBudget)
  const sum = useMemo(() => budget.types.reduce((acc, type: Type) => acc + parseFloat(type.goal), 0), [budget.types])

  const setType = (type: Type) => {
    setBudget((b: Budget) => ({ ...b, types: b.types.map((t: Type) => t.id === type.id ? type : t) }))
  }

  return (
    <div key={budget.id} className='border-2 rounded-lg px-4 py-2 flex flex-col gap-2 h-fit'>
      <div className='flex justify-start relative pt-2'>
        <h4>{budget.name}</h4>
        <DeleleBudgetButton budget_id={budget.id} />
      </div>
      {budget.types.map((type) => (
        <TypeLine type={type} key={type.id} currency={account.currency} setType={setType} />
      ))}
      <div>
        Total: {account.currency}
        {sum}
      </div>
      <CreateTypeForm budget_id={budget.id} currency={account.currency} />
    </div>
  )
}
