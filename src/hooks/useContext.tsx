import { createContext, useState, ReactNode } from 'react'

type CreateContextTypes = {
  chain: string
  updateChain: (value:string) => void
}

type ContextProviderProps = {
  children: ReactNode
}

export const Context = createContext<CreateContextTypes>({} as CreateContextTypes)

function ContextProvider({children}: ContextProviderProps) {
  
  const [chain, setChain] = useState('')

  function updateChain(value:string) {
    setChain(value)
  }
  
  return (
  
    <Context.Provider value={{chain, updateChain}}>{children}</Context.Provider>
  )
}

export default ContextProvider