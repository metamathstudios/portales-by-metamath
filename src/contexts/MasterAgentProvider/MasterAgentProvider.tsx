import { createContext, useEffect, useState, useContext } from 'react'
import MasterAgentWrapper from '../../blockchain/MasterAgentWrapper'
import { Web3ModalContext } from '../Web3ModalProvider'

interface IMasterAgentContext {
    masterWrapper: MasterAgentWrapper | null
  }

export const MasterAgentContext = createContext<IMasterAgentContext>({
    masterWrapper: null
})

const MasterAgentProvider = ({ children }) => {

  const { web3, chainId, account } = useContext(Web3ModalContext)
  const [masterWrapper, setMasterWrapper] = useState<MasterAgentWrapper | null>(null)

  useEffect(() => {
    if (web3 && chainId && account) {
      try {
        const _web3Wrapper = new MasterAgentWrapper(web3, chainId, account);
        setMasterWrapper(_web3Wrapper)
      }
      catch(e) {
        console.log("Failed to create a Web3 Wrapper: ", e)
      }
    }
    else {
      setMasterWrapper(null)
    }
  }, [web3, chainId, account])

  return (
    <MasterAgentContext.Provider 
      value={{masterWrapper}}>
      {children}
    </MasterAgentContext.Provider>
  )
}

export default MasterAgentProvider