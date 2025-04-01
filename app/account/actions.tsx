'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { FormState } from '@/interfaces'
import { redirect } from 'next/navigation'

const authSchema = z.object({
  first_name: z.string().min(2, { message: 'First name must have at least 2 characters' }),
  last_name: z.string().min(2, { message: 'Last name must have at least 2 characters' }),
  birthday: z.string().date(),
  currency: z.string().refine((val) => ['€', '$'].includes(val), { message: 'Currency not recognized' }),
})

export async function updateUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const accountData = Object.fromEntries(formData)
  const validatedAccount = authSchema.safeParse(accountData)
  if (!validatedAccount.success) {
    const formFieldErrors = validatedAccount.error.flatten().fieldErrors
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
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return {
      message: null,
      success: false,
      errors: ['User could not be found'],
    }
  }

  const { error } = await supabase.from('users').update(validatedAccount.data).eq('user_id', user.id)
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    }
  }

  revalidatePath('/account')
  return {
    message: 'Successfully updated your account',
    success: true,
    errors: [],
  }
}

export async function signoutUser(): Promise<FormState> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    return {
      message: null,
      success: false,
      errors: ['Could not sign out'],
    }
  }

  revalidatePath('/auth')
  redirect('/auth')
}
