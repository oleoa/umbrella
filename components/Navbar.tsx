import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav>
      <Link href="/">Index</Link>
      {!user && <Link href="/auth">Auth</Link>}
      {user && <Link href="/account">Account</Link>}
    </nav>
  )
}
