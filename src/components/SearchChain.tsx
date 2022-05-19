import close from '../assets/svg/close.svg'

type SearchChainProps = {
  openSearchChain:boolean,
  handleClose:() => void,
}

function SearchChain({...props}:SearchChainProps) {
  return (
    <div className={`${props.openSearchChain ? '' : 'hidden'} absolute w-[100%] h-[100%] pt-16 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-50`}>
      <div className='flex flex-col justify-start items-center'>
        <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-3 py-3 w-[470px]'>
          <div className='flex flex-row-reverse pb-4'>
            <button onClick={() => props.handleClose()}><img src={close} width={10} alt="close" /></button>
          </div>
          <div className='flex flex-row justify-center pb-4'>
            <input className='bg-background py-3 w-[100%] rounded-lg text-xs px-3' type="text" placeholder='Search chain by name of chain ID' />
          </div>
          <div className='flex flex-col items-center pt-4 w-full h-20 bg-background rounded-xl' />
          
          <div className='flex flex-col py-2 space-y-2 w-[50%]'>
            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>

            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>

            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>
            
            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>

            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>

            <button>
            <div className='flex flex-row pl-2 pt-2 w-[100%] h-12 bg-background rounded-xl'>
              <div className='flex flex-row w-[15%] h-[78%] rounded-xl bg-secondary-gray'></div>
              <div className='flex-row justify-between px-3 py-1'><p className='text-sm text-gray-300'>Ethereum Rinkeby</p></div>
            </div>
            </button>
          </div>
        </div> 
      </div>
    </div>
  )
}   

export default SearchChain