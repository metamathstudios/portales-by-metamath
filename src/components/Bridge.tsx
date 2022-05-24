import { useState, useContext, useCallback, useEffect } from 'react'
import { NotificationManager } from 'react-notifications'
import { Web3ModalContext } from '../contexts/Web3ModalProvider'
import { supportedChains, networkNames, chainIdList } from '../blockchain/constants'
import { Web3WrapperContext } from '../contexts/Web3WrapperProvider'
import { ERC20Context } from '../contexts/ERC20Provider'
import { MasterAgentContext } from '../contexts/MasterAgentProvider'
import { BntoNum } from '../blockchain/utils'

import FromSearchChain from './FromSearchChain'
import SendSearchChain from './SendSearchChain'
import ToSearchChain from './ToSearchChain'
import TransactionStatus from './TransactionStatus'

import arrows from '../assets/svg/changeArrows.svg'
import inputArrow from '../assets/svg/arrow.svg'
import airdrop from '../assets/svg/drop2.svg'

import ethereum from '../assets/chains/ethereum.svg'
import moonriver from '../assets/chains/moonriver.svg'
import portales from '../assets/tokens/portalescoin.svg'
import boba from '../assets/chains/bobanetwork.svg'

import { Context } from '../contexts/useContext'
import axios from 'axios'
import { API_URL } from '../config'
import { Input } from 'postcss'

function Bridge() {
  const { account, chainId } = useContext(Web3ModalContext)
  const [isApproved, setApproved] = useState(false)
  const [sendAmount, setSendAmount] = useState<string | number>('')
  const [select, setSelect] = useState('transfer')
  const [activate, setActivate] = useState(true)
  const contextChain = useContext(Context)
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext)
  const { erc20Wrapper: erc20 } = useContext(ERC20Context)
  const { masterWrapper: master } = useContext(MasterAgentContext)
  const [txId, setTxId] = useState('')

  var fetching = false;

  useEffect(() => {
    if (chainId !== null && !supportedChains.includes(chainId)) {
      NotificationManager.error(`The current network is not supported!`, "Wrong Network");
    }
  }, [chainId])

  useEffect(() => {
    if(!account || !erc20) {
      return
    }
    erc20.getBalance(account).then(function (result) {
      if(Number(result)){
        setTokenBalance(BntoNum(result))
      }   
    })
  })

  useEffect(() => {
    if(!account || !erc20) {
      return
    }
    erc20.getAllowance(account, chainId).then(function (result) {
      if(Number(result) > 0) {
        setApproved(true)
      } else {
        setApproved(false)
      }
    })
  })

  useEffect(() => {
    if(chainId !== null && chainIdList.chainIds[contextChain.fromChain] !== chainId) {
      let newChainId = `0x${chainIdList.chainIds[contextChain.fromChain].toString(16)}`
      try {
          window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: newChainId }],
        });
      } catch (error) {
        console.error(error);
      }
    }
  })

  function handleButton(props:any) {
    setSelect(props)
    setActivate(true)
  }

  const handleFaucet = async () => {
    if(!account) {
      NotificationManager.error("Please Connect to MetaMask First!")
      return
    }
    if(!wrapper) {
      NotificationManager.error("No web3 wrapper available!")
      return
    }
    const txHash = await wrapper.claimTokens(account)
    if (!txHash) {
      NotificationManager.error('Error: Unable to process this transaction!');
      return;
    }
  }

  const handleApprove = async () => {
    if(!account) {
      NotificationManager.error("Please Connect to MetaMask First!")
      return
    }
    if(!erc20) {
      NotificationManager.error("No web3 wrapper available!")
      return
    }
    if(isApproved === false) {
      const tx = await erc20.approve(account, chainId)
      if (!tx) {
        NotificationManager.error('Transaction error!');
        return;
      }
      setApproved(true)
    }
  }

  const createSwapRequest = async () => {
    if(!master) {
      NotificationManager.error("No web3 wrapper available!")
      return
    }
    const txHash:any = await master.requestSwap(chainId, account, account, sendAmount, chainIdList.chainIds[contextChain.toChain])
    if (!txHash) {
      NotificationManager.error('Error: Unable to process this transaction!');
      return
    }
    return txHash.transactionHash.slice(-12)
  }

  const [tokenBalance, setTokenBalance] = useState(0)
  const [openBridgeFromSearchChain, setopenBridgeFromSearchChain] = useState(false)
  const [openBridgeSendSearchChain, setopenBridgeSendSearchChain] = useState(false)
  const [openBridgeToSearchChain, setopenBridgeToSearchChain] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState(false)
  const [transactionStatusData, setTransactionStatusData] = useState('Loading...')


  function handleMaxOut(): void {
    setSendAmount(String(tokenBalance))
  }
  function handleBridgeFromSearchChain(): void {    
    setopenBridgeFromSearchChain(true)
  }

  function handleBridgeSendSearchChain(): void {    
    setopenBridgeSendSearchChain(true)
  }

  function handleBridgeToSearchChain(): void {    
    setopenBridgeToSearchChain(true)
  }

  function handleCloseBridgeFromSearchChain(): void {    
    setopenBridgeFromSearchChain(false)
  }

  function handleCloseBridgeSendSearchChain(): void {    
    setopenBridgeSendSearchChain(false)
  }

  function handleCloseBridgeToSearchChain(): void {    
    setopenBridgeToSearchChain(false)
  }

  async function handleOpenTransactionStatus(): Promise<void> {
    if(!account) {
      NotificationManager.error("Please Connect to MetaMask First!")
      return
    }
    if(Number(chainId) === Number(chainIdList.chainIds[contextChain.toChain])) {
      NotificationManager.error("Can't bridge to the same network!")
      return
    }
    
    let newTxId = await createSwapRequest()
    setTxId(newTxId)
    setTransactionStatus(true)
    //txId = "4df519ed05dd"; 
  }

  function handleCloseTransactionStatus(): void {    
    setTransactionStatus(false)
    fetching = true;
  }
  

  useEffect(() => {
    const interval = setInterval(async () => {
      if(transactionStatus && typeof txId !== 'undefined' ) {
        await axios.get(API_URL + `/transaction/${txId}/status`)
        .then((res) => {
          const data: String = res.data.status;
          setTransactionStatusData(data.charAt(0).toUpperCase() + data.slice(1));
        })
      }

      if(fetching) {
        clearInterval(interval)
      }
    }, 1000)
  }, [transactionStatus])

  return (
    <>
    <div className="flex flex-col justify-start items-center">
      <div className="flex h-12 px-2 bg-button-grey text-white rounded-2xl xl:-mt-16 mb-6 items-center font-lalezar bg-button-gray 2xl:mt-20">
        <button className={select === 'transfer' ? 'bg-button-blue rounded-xl py-2 px-8 ease-linear duration-300' : 'text-white rounded-xl py-2 px-8 ease-linear duration-300'} onClick={() => handleButton('transfer')}><p className='mt-[2px]'>Transfer</p></button>
        <button className={select === 'liquidity' ? 'bg-button-blue rounded-xl py-2 px-8 ease-linear duration-300' : 'text-white rounded-xl py-2 px-8 ease-linear duration-300'} onClick={() => handleButton('liquidity')}><p className='mt-[2px]'>Faucet</p></button>
      </div>

      {select == 'transfer' ?

      <div className="text-gray-200 bg-button-gray rounded-xl border-[1px] border-secondary-gray px-5 w-96">
        <div className="flex-wrap	w-[100%] pt-4">
          <div className="flex flex-row p-2 text-sm"><p className='pr-3 pt-2 text-xs'>From</p><button onClick={handleBridgeFromSearchChain} className='w-[40%] bg-background rounded-md py-2'><div className='flex justify-between px-2'><img className='' src={contextChain.fromChain === 'ethereum' ? ethereum : moonriver} width={25} alt='' />{contextChain.fromChain === 'ethereum' ? 'Rinkeby' : 'Moonbase'}<img src={inputArrow} alt='' width={12} /></div></button></div>
          <div className="flex flex-row p-2"><input  placeholder={'Send: 0'} className='bg-background placeholder-gray-200 w-[100%] rounded-md p-2 py-3 text-xs' type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)}/><button onClick={handleBridgeSendSearchChain} className='absolute mt-2 xl:left-[52%] lg:left-[53%] md:left-[53.5%] sm:left-[55%] 2xl:left-[52%] bg-background rounded-md'><div className='flex justify-between text-sm space-x-2'>{contextChain.sendChain === 'portales' ? 'Port ERC20' : 'Port ERC20'}<img className='ml-2' src={contextChain.sendChain === 'portales' ? portales : portales} width={25} alt='' /><img src={inputArrow} alt='' width={12} /></div></button></div>
        </div>
        <div className='flex flex-row justify-between '>
          <div className='p-5'> </div> <button className='self-center rounded-lg my-3 py-3 px-1 border-transparent border-2 hover:border-2 hover:border-button-blue bg-background'><img src={arrows} alt="arrows" width={23} /></button>
          <div className="text-gray-200 text-sm pr-2"><button onClick={handleMaxOut}><p className='underline underline-offset-1'>Max: {tokenBalance}</p></button></div>
        </div>
        <div className="flex flex-row p-2 text-sm"><p className='pr-7 pt-2 text-xs'>To</p><button onClick={handleBridgeToSearchChain} className='w-[40%] bg-background rounded-md py-2'><div className='flex justify-between px-2'><img className='' src={contextChain.toChain === 'ethereum' ? ethereum : moonriver} width={25} alt='' />{contextChain.toChain === 'ethereum' ? 'Rinkeby' : 'Moonbase'}<img src={inputArrow} alt='' width={12} /></div></button></div>
        <div className="flex flex-row p-2"><input placeholder='Receive (estimated): 0' className='bg-background w-[100%] placeholder-gray-200 rounded-md p-2 py-3 px-2 text-xs' type="text" value={sendAmount}/></div>
        <div className='flex flex-row justify-center pt-4 pb-4'>
          { !isApproved? (<button onClick={handleApprove} className='py-4 px-[110px] rounded-md text-white font-bold bg-button-blue'>Approve</button>
          ) : (<button onClick={handleOpenTransactionStatus} className='py-4 px-[110px] rounded-md text-white font-bold bg-button-blue'>Swap</button>
          )
          }
        </div>
      </div>

      :

      <div className='flex flex-col items-center w-96 bg-button-gray border-[1px] border-secondary-gray rounded-xl'>
        <img className='pt-10' src={airdrop} width={100} />
        <div className="w-[90%] h-14 bg-secondary-gray rounded-md mt-10 text-gray-200 text-sm"><p className='p-2 pl-4'>You can claim 10 Port per wallet every 24 hours.<br />Port faucet is available only on Rinkeby Testnet.</p></div>
        <button onClick={handleFaucet} className='w-[90%] py-4 pr-7 pl-7 mt-12 mb-6 bg-button-blue rounded-md text-white text-lg font-lalezar'>Receive 10 Port</button>
      </div>
      }
    </div>

    { openBridgeFromSearchChain && ( <FromSearchChain openFromSearchChain={openBridgeFromSearchChain} handleCloseBridgeFromSearchChain={handleCloseBridgeFromSearchChain} />)}
    { openBridgeSendSearchChain && ( <SendSearchChain openSendSearchChain={openBridgeSendSearchChain} handleCloseBridgeSendSearchChain={handleCloseBridgeSendSearchChain} />)}
    { openBridgeToSearchChain && ( <ToSearchChain openToSearchChain={openBridgeToSearchChain} handleCloseBridgeToSearchChain={handleCloseBridgeToSearchChain} />)}
    <TransactionStatus handle={handleCloseTransactionStatus} state={transactionStatus} status={transactionStatusData}/>
    </>
  )
}

export default Bridge