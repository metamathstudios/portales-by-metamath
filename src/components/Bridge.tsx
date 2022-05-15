import {useState} from 'react'
import config from '../assets/config.png'

function Bridge() {

  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)

  function handleButton(props:any) {
    setSelect(props)
    setActivate(true)
  }
  
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex h-16 px-2 bg-button-grey text-white rounded-3xl my-7 items-center">
        <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('transfer')}>
          Transfer
        </button>
        <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear duration-300' : 'text-white rounded-xl py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('liquidity')}>
          Liquidity
        </button>
      </div>
      
      {select == 'transfer' ? 
      
      <div className="text-secondary-grey bg-button-grey rounded-lg pl-20 pr-20">
        <div className='flex flex-row-reverse p-3'>
          <img src={config} alt="Options" className='w-2/12' />
        </div>
        <div className="">
          <div className="flex flex-row p-2"><p className='pr-3'>from</p><form><input className='bg-background rounded-md p-1 -my-1' type="text" /></form></div>
          <div className="flex flex-row p-2"><form><input  placeholder='send' className='bg-background rounded-md p-1' type="text" /></form></div>
        </div>
      </div> 
      
      : 
      
      <div className="text-secondary-grey bg-button-grey rounded-lg pl-20 pr-20">
      cadeado asset
      </div>
    }
    </div>
  )
}

export default Bridge