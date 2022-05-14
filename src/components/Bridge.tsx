import {useState} from 'react'

function Bridge() {

  function handleButtonChange() {
    
  }
  
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="h-12 bg-button-grey text-white rounded-lg p-1 my-7">
        <button className='bg-button-blue text-white p-2 rounded-lg'>
          Transfer
        </button>
        <button className='text-white text-lalezar p-2 rounded-lg'>
          Liquidity
        </button>
      </div>
      <div className="text-secondary-grey bg-button-grey rounded-lg w-80 h-80">
        <div className='flex flex-row-reverse p-3'>config</div>
        <div className="">
          <div className="flex flex-row p-2"><p className='pr-3'>from</p><form><input className='bg-background rounded-md p-1 w-75 h-10 -my-1' type="text" /></form></div>
          <div className="flex flex-row p-2"><form><input  placeholder='send' className='bg-background rounded-md p-1 w-72 h-10' type="text" /></form></div>
        </div>
      </div>
    </div>
  )
}

export default Bridge