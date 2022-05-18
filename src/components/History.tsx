import { useState } from 'react'

import close from '../assets/svg/close.svg'
import backArrow from '../assets/svg/back.svg'

function History() {

  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)

  function handleButton(props:string) {
    setSelect(props)
    setActivate(true)
  }

  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 pb-3 w-[470px]'>
        <div className="flex flex-row-reverse p-2">
          <button><img src={close} width={10} alt="close" /></button>
        </div>
        <div className="flex flex-col justify-start items-center text-sm">
          <div className='w-40 h-5 pl-[52px] bg-background text-white rounded-xl font-bold'>History</div>
          <div className="flex h-12 px-2 bg-button-gray text-white rounded-2xl items-center bg-background">
            <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-2 px-6 ease-linear font-bold duration-300' : 'text-white rounded-xl font-bold py-2 px-6 ease-linear duration-300'} onClick={() => handleButton('transfer')}>
              Transfer
            </button>
            <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-2 px-6 ease-linear font-bold duration-300' : 'text-white rounded-xl font-bold py-2 px-6 ease-linear duration-300'} onClick={() => handleButton('liquidity')}>
              Liquidity
            </button>
          </div>
        </div>
        <div className='flex flex-row-reverse mt-[-10px] pb-2 pr-2'>
          <button><img src={backArrow} alt="back" width={20}/></button>
        </div>

        {select == 'transfer' ?

        <div className='flex flex-col items-center pt-4 w-[430px] h-[350px] bg-background rounded-xl'>
          <div className='py-2 w-[90%] bg-button-gray rounded-lg' />
          <p className='pt-32 text-sm font-bold'>No History</p>
        </div>

        :

        <div>

        </div>
        }
      </div> 
    </div>
  )
}

export default History