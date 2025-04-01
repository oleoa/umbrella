import { createClient } from '@/utils/supabase/server'
import Form from './form'

import { redirect } from 'next/navigation'

export default async function Account() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect('/auth')

  const { data: account } = await supabase.from('users').select().eq('user_id', user.id).single()

  return (
    <main className='p-4 flex flex-col items-center gap-8 pt-32'>
      <h1>Your Account</h1>
      <Form account={account} />
    </main>
  )
}
