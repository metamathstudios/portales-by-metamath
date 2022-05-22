import close from '../assets/svg/close.svg'

function SliTol() {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-start items-center'>
        <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 w-[415px]'>
          <div className="flex flex-row justify-between">
            <p className='pt-5 underline underline-offset-2'>Slippage Tolerance:</p>
            <button><img src={close} width={10} alt="close" /></button>
          </div>
          <div className='flex flex-row pt-3 pb-5 space-x-3 text-gray-400'>
            <button className='underline text-sm underline-offset-2 p-4 py-5 bg-background rounded-xl'>0.3%</button>
            <button className='underline text-sm underline-offset-2 p-4 py-5 bg-background rounded-xl'>0.5%</button>
            <button className='underline text-sm underline-offset-2 p-5 py-45 bg-background rounded-xl'>1%</button>
            <input className='text-right text-sm pr-2 rounded-xl w-full border-[1px] bg-button-gray border-secondary-gray' type="text" placeholder="1 %" />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default SliTol