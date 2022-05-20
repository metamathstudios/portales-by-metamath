import logo from '../assets/logo/portales.svg'
import history from '../assets/svg/history.svg'

function Navbar({handleOpen}:any) {
  return (
    <div className='container flex justify-between pr-4 pt-1 font-lalezar'>
      <div className='flex p-4'>
        <img className='w-8/12'  src={logo} alt="MetaMath" />
      </div>
      <div className='hidden md:flex flex-row -mx-20 xl:-mx-50 space-x-4 items-center'>
        <button onClick={() => handleOpen()} className='py-3 pr-6 pl-3 bg-button-gray rounded-xl text-white text-md flex flex-row'><img className='mr-1' width='25.6' height='26.2'  src={history} alt="history" />History</button>
        <button className='w-[190px] py-3 pr-8 pl-8 bg-button-blue rounded-xl text-white text-md'>Connect Wallet </button>
        <button className='py-3 px-4 bg-button-gray rounded-xl font-black text-white text-lg tracking-widest'>...</button>
      </div>
    </div>
  )
}

export default Navbar