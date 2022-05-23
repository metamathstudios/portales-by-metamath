import close from '../assets/svg/close.svg'

const TransactionStatus = ({ handle, state, status }) => {
  return (
    <div className={`${state ? '' : 'hidden'} absolute w-[100%] h-[100%] top-0 bg-black bg-opacity-50`}>
      <div className='flex flex-col justify-center items-center h-[100%]'>
        <div className='text-gray-300 bg-button-gray rounded-xl border-[1px] border-secondary-gray w-[470px] h-[130px] mb-[300px]'>
          <div className='flex flex-row-reverse p-6'>
            <button onClick={handle}><img src={close} width={10} alt="close" /></button>
          </div>
          <div className='flex justify-center items-center'>
              <h1><b>{status}</b></h1>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default TransactionStatus