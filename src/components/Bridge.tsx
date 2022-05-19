import config from '../assets/png/config.png'
import arrows from '../assets/svg/changeArrows.svg'
import { useState } from 'react'
import SearchChain from './SearchChain'


function Bridge() {
  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): void {    
    setOpenComponents(true)
  }

  function handleClose(): void {    
    setOpenComponents(false)
  }

  return (
    <>
    <div className="flex flex-col justify-start items-center">     
      <div className="text-gray-400 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 w-96">
        <div className='flex flex-row-reverse pb-[5px] pt-5 py-6 pr-2'>
          <button>
            <img src={config} alt="Options" width={25} className='' />
          </button>
        </div>
        <div className="flex-wrap	w-[100%]">
          <div className="flex flex-row p-2 "><p className='pr-3 pt-2 text-xs'>From</p><button onClick={handleOpen} className='w-[40%] bg-background rounded-md py-5'></button></div>
          <div className="flex flex-row p-2"><form className='w-[100%]'><input  placeholder={'Send: 0'} className='bg-background placeholder-gray-400 w-[100%] rounded-md p-2 py-3 text-xs' type="text" /></form></div>
        </div>
        <div className='flex flex-row justify-between '>
          <div className='p-5'> </div> <button className='self-center rounded-lg my-3 py-3 px-1 border-transparent border-2 hover:border-2 hover:border-button-blue bg-background'><img src={arrows} alt="arrows" width={23} /></button>
          <div className="text-gray-400 underline underline-offset-1 text-sm pr-2"><button>Max: 0</button></div>
        </div>
        <div className="flex flex-row p-2 "><p className='pr-7 pt-2 text-xs'>To</p><button onClick={handleOpen} className='w-[40%] bg-background rounded-md py-5'></button></div>
        <div className="flex flex-row p-2"><form className='w-[100%]'><input placeholder='Receive (estimated): 0' className='bg-background w-[100%] placeholder-gray-400 rounded-md p-2 py-3 px-7 text-xs' type="text" /></form></div>
        <div className='flex flex-row justify-center pt-8 pb-4'><button className='py-4 px-[110px] rounded-md text-white font-bold bg-button-blue'>Connect Wallet</button></div>
      </div>
    </div>

    { openComponents && ( <SearchChain openSearchChain={openComponents} handleClose={handleClose} />)}
    </>
  )
}

export default Bridge