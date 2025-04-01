'use server'

import { FormState } from '@/interfaces'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const budgetSchema = z.object({
  name: z.string().min(1, { message: 'Name must have at least 1 characters' }),
  starts_at: z.string().date(),
  ends_at: z.string().date(),
})
export async function create(prevState: FormState, formData: FormData): Promise<FormState> {
  const budgetData = Object.fromEntries(formData)
  const validatedBudget = budgetSchema.safeParse(budgetData)
  if (!validatedBudget.success) {
    const formFieldErrors = validatedBudget.error.flatten().fieldErrors
    const errors = Object.values(formFieldErrors || {})
      .filter((e): e is string[] => Boolean(e))
      .map((e) => e[0])
    return {
      message: null,
      success: false,
      errors: errors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('budgets').insert(validatedBudget.data)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/budgetings')
  return {
    message: 'Successfully created the budget',
    success: true,
    errors: [],
  }
}

const budgetIdSchema = z.string()
export async function del(prevState: FormState, formData: FormData): Promise<FormState> {
  const budgetIdData = Object.fromEntries(formData)
  const validatedBudgetId = budgetIdSchema.safeParse(budgetIdData.id)
  if (!validatedBudgetId.success) {
    const formFieldErrors = validatedBudgetId.error.flatten().fieldErrors
    const errors = Object.values(formFieldErrors || {})
      .filter((e): e is string[] => Boolean(e))
      .map((e) => e[0])
    return {
      message: null,
      success: false,
      errors: errors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('budgets').delete().eq('id', validatedBudgetId.data)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/budgetings')
  return {
    message: 'Successfully deleted the budget',
    success: true,
    errors: [],
  }
}
