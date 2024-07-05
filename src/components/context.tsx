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
  const [phase, setPhase] = useState('prepair1')

  const value = {
    phase,
    setPhase,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
