'use client'

import { createClient } from '@/utils/supabase/server'
import React, { createContext } from 'react'

const AuthContext = createContext()

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log(user)

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider
