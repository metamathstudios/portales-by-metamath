import { useContext, useCallback } from 'react';
import logo from '../assets/logo/portales.svg'
import history from '../assets/svg/history.svg'
import { Web3ModalContext } from "../contexts/Web3ModalProvider"


function Navbar({handleOpen}:any) {

  const { connect, disconnect, account } = useContext(Web3ModalContext);

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className='flex justify-between pr-4 pt-1 font-lalezar'>
      <div className='flex p-4'>
        <img className='w-8/12'  src={logo} alt="MetaMath" />
      </div>
      <div className='hidden md:flex flex-row space-x-4 items-center'>
        <button onClick={() => handleOpen()} className='py-3 pr-6 pl-3 bg-button-gray rounded-xl text-white text-md flex flex-row'><img className='mr-1' width='25.6' height='26.2'  src={history} alt="history" />History</button>
        {!account? (<button onClick={handleConnectWallet} className='w-[190px] py-3 pr-8 pl-8 bg-button-blue rounded-xl text-white text-md'>Connect Wallet </button>
        ) :
        (<button onClick={handleDisconnectWallet} className='w-[190px] py-3 pr-8 pl-8 bg-button-blue rounded-xl text-white text-md'>{(ellipseAddress(account)) } </button>)} 
        {/* <button className='py-3 px-4 bg-button-gray rounded-xl font-black text-white text-lg tracking-widest'>...</button> */}
      </div>
    </div>
  )
}

export default Navbar