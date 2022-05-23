import { useContext, useCallback, useState } from 'react';
import logo from '../assets/logo/portales.svg'
import history from '../assets/svg/history.svg'
import { Web3ModalContext } from "../contexts/Web3ModalProvider"
import { NotificationManager } from 'react-notifications'


function Navbar({handleOpen}: any) {

  const { connect, disconnect, account } = useContext(Web3ModalContext);

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  const handleConnectWallet = useCallback(() => {
    if(!window.ethereum) { 
      NotificationManager.error("Metamask not Detected!")
     }
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const [openDropdown, setOpenDropdown] = useState(false)
  function handleDropdown() {
    setOpenDropdown(!openDropdown)
  }

  return (
    <div className='flex justify-between pr-4 pt-1 font-lalezar'>
      <div className='flex p-4'>
        <img className='w-8/12'  src={logo} alt="MetaMath" />
      </div>
      <div className='hidden md:flex flex-row space-x-4 items-center'>
        {!account ? 
         <button onClick={handleConnectWallet} className='py-3 pr-6 pl-3 bg-button-gray rounded-xl text-white text-md flex flex-row'><img className='mr-1' width='25.6' height='26.2' src={history} alt="history" />History</button>
         : 
         <button onClick={() => handleOpen()} className='py-3 pr-6 pl-3 bg-button-gray rounded-xl text-white text-md flex flex-row'><img className='mr-1' width='25.6' height='26.2' src={history} alt="history" />History</button>
         }
        {!account ? (<button onClick={handleConnectWallet} className='w-[190px] py-3 pr-8 pl-8 bg-button-blue rounded-xl text-white text-md'>Connect Wallet </button>
        ) :
        (<button className='w-[190px] py-3 pr-8 pl-8 bg-button-blue rounded-xl text-white text-md'>{(ellipseAddress(account)) } </button>)} 
        <div className='flex-column'>
          <button onClick={handleDropdown} className={`py-3 px-4 bg-button-gray rounded-xl font-black text-white text-lg tracking-widest`}>...</button>
          <div className={openDropdown === false ? 'hidden' : 'absolute 2xl:left-[90%] xl:left-[87%] lg:left-[85%] md:left-[80%] mt-2 rounded-xl bg-button-gray p-2'}>
          <button onClick={handleDisconnectWallet} className='w-[150px] py-2 px-2 bg-button-blue rounded-xl text-white text-md'>Disconnect Wallet </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar