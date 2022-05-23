import ERC20Wrapper from '../../blockchain/ERC20Wrapper'
import { createContext, useEffect, useState, useContext } from 'react'
import { Web3ModalContext } from '../Web3ModalProvider'

interface IERC20Context {
    erc20Wrapper: ERC20Wrapper | null
}

export const ERC20Context = createContext<IERC20Context>({
    erc20Wrapper: null
})

const ERC20Provider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext)
    const [erc20Wrapper, setErc20Wrapper] = useState<ERC20Wrapper | null>(null)

    useEffect(() => {
        if (web3 && chainId && account) {
          try {
            const _web3Wrapper = new ERC20Wrapper(web3, chainId, account);
            setErc20Wrapper(_web3Wrapper)
          }
          catch(e) {
            console.log("Failed to create a Web3 Wrapper: ", e)
          }
        }
        else {
            setErc20Wrapper(null)
        }
      }, [web3, chainId, account])

    return (
    <ERC20Context.Provider 
        value={{erc20Wrapper}}>
        {children}
    </ERC20Context.Provider>
    )
}


export default ERC20Provider