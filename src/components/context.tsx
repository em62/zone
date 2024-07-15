import { User } from '@supabase/supabase-js'
import { createContext, useState, useContext } from 'react'

const defaultProvider: any = {
  data: '',
  setData: () => '',
}

const DataContext = createContext(defaultProvider)

export function useDataContext() {
  return useContext(DataContext)
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const value = {
    user,
    setUser,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
