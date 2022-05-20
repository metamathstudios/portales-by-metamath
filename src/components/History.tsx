import { useEffect, useState } from 'react'

import close from '../assets/svg/close.svg'
import backArrow from '../assets/svg/back.svg'

type HistoryProps = {
  openHistory:boolean,
  handleClose:() => void,
}

function History({...props}:HistoryProps) {
  return (
    <div className={`${props.openHistory ? '' : 'hidden'} absolute w-[100%] h-[100%] pt-16 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-50`}>
      <div className='flex flex-col justify-start items-center width-'>
        <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 pb-3 w-[470px]'>
          <div className="flex flex-row-reverse p-2">
            <button onClick={() => props.handleClose()}><img src={close} width={10} alt="close" /></button>
          </div>
          <div className="flex flex-col justify-start items-center text-sm">
            <div className='w-40 h-5 pl-[52px] text-white rounded-xl text-xl font-lalezar'>History</div>
          </div>
          <div className='flex flex-row-reverse mt-[-10px] pb-2 pr-2'>
            <button><img src={backArrow} alt="back" width={20}/></button>
          </div>
          <div className='flex flex-col items-center pt-8 w-[430px] h-[350px] bg-background rounded-xl'>
            <div className='py-2 w-[90%] bg-button-gray rounded-lg' />
            <p className='pt-32 text-sm font-bold'>No History</p>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default History