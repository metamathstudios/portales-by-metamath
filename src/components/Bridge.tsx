import {useState} from 'react'
import config from '../assets/config.png'

function Bridge() {

  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)

  function handleButton(props:any) {
    setSelect(props)
    setActivate(true)
  }

  const value = 9
  
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex h-16 px-2 bg-button-gray text-white rounded-3xl my-7 items-center">
        <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('transfer')}>
          Transfer
        </button>
        <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('liquidity')}>
          Liquidity
        </button>
      </div>
      
      {select == 'transfer' ? 
      
      <div className="text-gray-500 bg-button-gray rounded-lg px-5 w-96">
        <div className='flex flex-row-reverse p-3'>
          <button>
            <img src={config} alt="Options" width={22} className='' />
          </button>
        </div>
        <div className="flex-wrap	w-[100%]">
          <div className="flex flex-row p-2 "><p className='pr-3 text-xs'>from</p><form className='w-[100%]'><input className='bg-background w-[40%] rounded-md p-2 -my-2' type="text" /></form></div>
          <div className="flex flex-row p-2"><form className='w-[100%]'><input  placeholder={'Send:'} className='bg-background placeholder-gray-500 w-[100%] rounded-md p-2 text-xs' type="text" /></form></div>
        </div>
        <div className='flex flex-row'>
          <button className='justify-center items-center p-4 rounded-lg my-3 border-transparent border-2 hover:border-2 hover:border-button-blue bg-background'><img src="" alt="" /></button>
          <div className="justify-end items-end text-gray-500 underline underline-offset-1 text-sm pr-2"><button>max:</button></div>
        </div>
        <div className="flex flex-row p-2 text-xs"><p className='pr-3'>to</p><form className='w-[100%]'><input className='bg-background w-[100%] rounded-md p-2 -my-1' type="text" /></form></div>
        <div className="flex flex-row p-2"><form className='w-[100%]'><input placeholder='Receive (estimated): 0' className='bg-background w-[100%] placeholder-gray-500 rounded-md p-2 px-7 text-xs' type="text" /></form></div>
        <div className='flex flex-row justify-center pt-8 pb-4'><button className='py-5 px-20 rounded-md text-white bg-button-blue'>Connect Wallet</button></div>
      </div> 
      
      : 
      
      <div className="text-secondary-gray bg-button-gray rounded-lg pl-20 pr-20">
      Cadeado Asset
      </div>
    }
    </div>
  )
}

export default Bridge