import logo from '../assets/Logo.png'

function Navbar() {
  return (
    <div className='container flex font-lalezar'>
      <div className='flex p-4'>
        <img className='w-3/12' src={logo} alt="MetaMath" />
      </div>
      <div className='hidden md:flex flex-row p-4 -mx-20 space-x-4 items-center'>
        <button className='w-24 p-3 bg-button-grey rounded-xl text-white text-md'>History</button>
        <button className='w-40 p-3 bg-button-blue rounded-xl text-white text-md'>Connect Wallet </button>
        <button className='w-16 p-3 bg-button-grey rounded-xl font-black text-white text-lg tracking-widest'>...</button>
      </div>
    </div>
  )
}

export default Navbar