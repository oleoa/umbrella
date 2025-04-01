import { createClient } from '@/utils/supabase/server'

import AuthForm from '@/app/auth/form'
import { redirect } from 'next/navigation'

export default async function AuthPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) return redirect('/account')

  return (
    <main className='flex flex-col pt-32 items-center h-screen gap-8'>
      <h1>Auth</h1>
      <AuthForm />
    </main>
  )
}
