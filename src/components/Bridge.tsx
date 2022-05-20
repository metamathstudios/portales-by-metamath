import { useState } from 'react'
import FromSearchChain from './FromSearchChain'
import SendSearchChain from './SendSearchChain'
import ToSearchChain from './ToSearchChain'

import arrows from '../assets/svg/changeArrows.svg'
import inputArrow from '../assets/svg/arrow.svg'

import ethereum from '../assets/chains/ethereum.svg'
import moonriver from '../assets/chains/moonriver.svg'

function Bridge() {
  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)

  function handleButton(props:any) {
    setSelect(props)
    setActivate(true)
  }


  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): void {    
    setOpenComponents(true)
  }

  function handleClose(): void {    
    setOpenComponents(false)
  }

  function handleImageChange(): any {

  }

  return (
    <>
    <div className="flex flex-col justify-start items-center">
      <div className="flex h-12 px-2 bg-button-grey text-white rounded-2xl -my-16 mb-6 items-center bg-button-gray xl:my-20">
        <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-2 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('transfer')}>
          Transfer
        </button>
        <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('liquidity')}>
          Faucet
        </button>
      </div>

      {select == 'transfer' ?

      <div className="text-gray-200 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 w-96">
        <div className="flex-wrap	w-[100%] pt-4">
          <div className="flex flex-row p-2 "><p className='pr-3 pt-2 text-xs'>From</p><button onClick={handleOpen} className='w-[40%] bg-background rounded-md py-2'><div className='flex justify-between px-2'><img className='' src={ethereum} width={25} alt='' /><img src={inputArrow} alt='' width={12} /></div></button></div>
          <div className="flex flex-row p-2"><form className='w-[100%]'><input  placeholder={'Send: 0'} className='bg-background placeholder-gray-200 w-[100%] rounded-md p-2 py-3 text-xs' type="text" /><button onClick={handleOpen} className='absolute mt-2 lg:left-[56.6%] md:left-[55%] xl:left[55%] bg-background rounded-md'><div className='flex justify-between space-x-2'><img className='' src={ethereum} width={25} alt='' /><img src={inputArrow} alt='' width={12} /></div></button></form></div>
        </div>
        <div className='flex flex-row justify-between '>
          <div className='p-5'> </div> <button className='self-center rounded-lg my-3 py-3 px-1 border-transparent border-2 hover:border-2 hover:border-button-blue bg-background'><img src={arrows} alt="arrows" width={23} /></button>
          <div className="text-gray-200 text-sm pr-2"><button><p className='underline underline-offset-1'>Max: 0</p></button></div>
        </div>
        <div className="flex flex-row p-2"><p className='pr-7 pt-2 text-xs'>To</p><button onClick={handleOpen} className='w-[40%] bg-background rounded-md py-2'><div className='flex justify-between px-2'><img className='' src={ethereum} width={25} alt='' /><img src={inputArrow} alt='' width={12} /></div></button></div>
        <div className="flex flex-row p-2"><form className='w-[100%]'><input placeholder='Receive (estimated): 0' className='bg-background w-[100%] placeholder-gray-200 rounded-md p-2 py-3 px-2 text-xs' type="text" /></form></div>
        <div className='flex flex-row justify-center pt-4 pb-4'><button className='py-4 px-[110px] rounded-md text-white font-bold bg-button-blue'>Connect Wallet</button></div>
      </div>

      :

      <div>Teste</div>
      }
    </div>

    { openComponents && ( <FromSearchChain openFromSearchChain={openComponents} handleClose={handleClose} />)}
    { openComponents && ( <SendSearchChain openSendSearchChain={openComponents} handleClose={handleClose} />)}
    { openComponents && ( <ToSearchChain openToSearchChain={openComponents} handleClose={handleClose} />)}
    </>
  )
}

export default Bridge