import { useContext } from 'react'

import { Context } from '../contexts/useContext'

import close from '../assets/svg/close.svg'
import ethereum from '../assets/chains/ethereum.svg'
import moonriver from '../assets/chains/moonriver.svg'
import boba from '../assets/chains/bobanetwork.svg'
import portales from '../assets/tokens/portalescoin.svg'

type SearchChainProps = {
  openSendSearchChain:boolean,
  handleCloseBridgeSendSearchChain:() => void,
}

function SendSearchChain({...props}:SearchChainProps) {
  
  const { sendUpdateChain } = useContext(Context)
  
  return (
    <div className={`${props.openSendSearchChain ? '' : 'hidden'} absolute w-[100%] h-[100%] pt-16 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-50`}>
      <div className='flex flex-col justify-start items-center'>
        <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-3 py-3 w-[470px]'>
          <div className='flex flex-row-reverse pb-4'>
            <button onClick={() => props.handleCloseBridgeSendSearchChain()}><img src={close} width={10} alt="close" /></button>
          </div>
          <div className='flex flex-row justify-center pb-4'>
            <input className='bg-background py-3 w-[100%] rounded-lg text-xs px-3' type="text" placeholder='Search coin by name of coin ID' />
          </div>
          
          <div className='flex flex-col py-2 space-y-2 w-[100%]'>
            <button onClick={() => {sendUpdateChain('portales'); props.handleCloseBridgeSendSearchChain()}}>
              <div className='flex flex-row pl-2 w-[100%] h-12 bg-background rounded-xl'>
                <img src={portales} width={30} alt="" />
                <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300 pt-2'>Port ERC20</p></div>
              </div>
            </button>
          </div>
        </div> 
      </div>
    </div>
  )
}   

export default SendSearchChain