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
export async function createBudget(prevState: FormState, formData: FormData): Promise<FormState> {
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
export async function deleteBudget(prevState: FormState, formData: FormData): Promise<FormState> {
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

const createTypeSchema = z.object({
  budget_id: z.string(),
  name: z.string().min(1, { message: 'Name must have at least 1 characters' }),
  goal: z.string(),
})
export async function createType(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData)
  const validatedData = createTypeSchema.safeParse(data)
  if (!validatedData.success) {
    const formFieldErrors = validatedData.error.flatten().fieldErrors
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
  const { error } = await supabase.from('types').insert(validatedData.data)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/budgetings')
  return {
    message: 'Successfully created the type',
    success: true,
    errors: [],
  }
}

const updateTypeSchema = z.object({
  id: z.string({ message: 'Type id required' }),
  budget_id: z.string({ message: 'Budget id required' }),
  name: z.string().min(1, { message: 'Name must have at least 1 characters' }),
  goal: z.string(),
})
export async function updateType(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData)
  const validatedData = updateTypeSchema.safeParse(data)
  if (!validatedData.success) {
    const formFieldErrors = validatedData.error.flatten().fieldErrors
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
  const { error } = await supabase.from('types').update(validatedData.data).eq('id', validatedData.data.id)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/budgetings')
  return {
    message: 'Successfully created the type',
    success: true,
    errors: [],
  }
}

const typeIdSchema = z.string()
export async function deleteType(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData)
  const validatedTypeId = typeIdSchema.safeParse(rawData.id)
  if (!validatedTypeId.success) {
    const formFieldErrors = validatedTypeId.error.flatten().fieldErrors
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
  const { error } = await supabase.from('types').delete().eq('id', validatedTypeId.data)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/budgetings')
  return {
    message: 'Successfully deleted the type',
    success: true,
    errors: [],
  }
}
