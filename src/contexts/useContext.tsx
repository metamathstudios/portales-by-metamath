import { createContext, useState, ReactNode } from 'react'

type CreateContextTypes = {
  fromChain: string
  sendChain: string
  toChain: string
 
  fromUpdateChain: (value:string) => void
  sendUpdateChain: (value:string) => void
  toUpdateChain: (value:string) => void
}

type ContextProviderProps = {
  children: ReactNode
}

export const Context = createContext<CreateContextTypes>({} as CreateContextTypes)

function ContextProvider({children}: ContextProviderProps) {
  
  const [fromChain, setFromChain] = useState('ethereum')
  const [sendChain, setSendChain] = useState('portales')
  const [toChain, setToChain] = useState('moonriver')

  function fromUpdateChain(value:string) {
    setFromChain(value)
  }
  
  function sendUpdateChain(value:string) {
    setSendChain(value)
  }

  function toUpdateChain(value:string) {
    setToChain(value)
  }
  
  return (
    <Context.Provider value={{fromChain, fromUpdateChain, sendChain, sendUpdateChain, toChain, toUpdateChain}}>{children}</Context.Provider>
  )
}

export default ContextProvider