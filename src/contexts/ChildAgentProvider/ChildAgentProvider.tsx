import ChildAgentWrapper from '../../blockchain/ChildAgentWrapper'
import { createContext, useEffect, useState, useContext } from 'react'
import { Web3ModalContext } from '../Web3ModalProvider'

interface IChildAgentContext {
  childWrapper: ChildAgentWrapper | null
}

export const ChildAgentContext = createContext<IChildAgentContext>({
  childWrapper: null
})

const ChildAgentProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext)
    const [childWrapper, setChildWrapper] = useState<ChildAgentWrapper | null>(null)

    useEffect(() => {
        if (web3 && chainId && account) {
          try {
            const _web3Wrapper = new ChildAgentWrapper(web3, chainId, account);
            setChildWrapper(_web3Wrapper)
          }
          catch(e) {
            console.log("Failed to create a Web3 Wrapper: ", e)
          }
        }
        else {
            setChildWrapper(null)
        }
      }, [web3, chainId, account])

    return (
    <ChildAgentContext.Provider 
        value={{childWrapper}}>
        {children}
    </ChildAgentContext.Provider>
    )
}


export default ChildAgentProvider