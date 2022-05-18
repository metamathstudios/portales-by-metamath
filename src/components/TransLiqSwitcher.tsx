import { useState } from 'react'

function TransLiqSwitcher(props:any) {
  
  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)

  function handleButton(props:string) {
    setSelect(props)
    setActivate(true)
  }

  return (
    <div>
      <div className="flex flex-col justify-start items-center">
      <div className="flex h-16 px-2 bg-button-gray text-white rounded-3xl my-7 items-center">
        <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear font-bold duration-300' : 'text-white rounded-xl font-bold py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('transfer')}>
          Transfer
        </button>
        <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-3 px-8 ease-linear font-bold duration-300' : 'text-white rounded-xl font-bold py-3 px-8 ease-linear duration-300'} onClick={() => handleButton('liquidity')}>
          Liquidity
        </button>
      </div>
    </div>
   </div>
  )
}

export default TransLiqSwitcher