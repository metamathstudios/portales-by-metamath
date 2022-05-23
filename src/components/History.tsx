import { useCallback, useEffect, useState, useContext } from 'react'

import close from '../assets/svg/close.svg'
import backArrow from '../assets/svg/back.svg'
import Transactions from './Transactions'
import axios from 'axios'
import { API_URL } from '../config'

type HistoryProps = {
  openHistory:boolean,
  handleClose:() => void,
}

var deg = 0;

function History( {...props}: HistoryProps) {
  const [fetched, setFetched] = useState(false)
  const [data, setData] = useState([]);
  let account = window.ethereum.selectedAddress
  console.log(account)

  const fetch = useCallback(async () => {
    //const account = "0xd9bca352c1466dAb438b05069C97C520445d68fD";

    setFetched(false)
    
    await axios.get(API_URL + `/history/${account}`)
    .then((res) => {
      setData(res.data.txs.txs);
      setFetched(true)
      setIsRefreshing(false);
    })
  }, [fetched])
  
  useEffect(() => {
    fetch()
    if((document.getElementById("refreshButton") as HTMLElement)) {
      (document.getElementById("refreshButton") as HTMLElement).style.transition = "all 1s";
    }
  }, [])
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    if(data.length < 1) return;

    deg = deg + 360;
    (document.getElementById("refreshButton") as HTMLElement).style.transform = `rotate(${deg}deg)`;
    setData([]);
    setIsRefreshing(true);
    setFetched(false)
    fetch();
  }

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
            <button onClick={() => refresh()}><img src={backArrow} alt="back" width={20} id="refreshButton"/></button>
          </div>
          <div className={`flex flex-col ${data.length < 1 ? "items-center justify-center" : "pt-4 pl-4 pr-4"} w-[430px] h-[350px] bg-background rounded-xl overflow-auto`}>
            <Transactions fetched={fetched} data={data} />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default History