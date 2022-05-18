import close from '../assets/svg/close.svg'

function SearchChain() {
  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-3 py-3 w-[470px]'>
        <div className='flex flex-row-reverse pb-4'>
          <button><img src={close} width={10} alt="close" /></button>
        </div>
        <div className='flex flex-row justify-center pb-4'>
          <input className='bg-background py-3 w-[100%] rounded-lg text-xs px-3' type="text" placeholder='Search chain by name of chain ID' />
        </div>
        <div className='flex flex-col items-center pt-4 w-full h-20 bg-background rounded-xl' />
        
        <div className='flex flex-col py-2 space-y-2'>
          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>

          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>

          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>

          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>

          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>

          <div className='flex flex-row pl-2 pt-3 w-[50%] h-14 bg-background rounded-xl'>
            <div className='flex flex-row w-[16%] h-[78%] rounded-xl bg-secondary-gray'></div>
            <div className='flex-row justify-between px-3 py-2'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
          </div>
        </div>
      </div> 
    </div>
  )
}   

export default SearchChain