import Web3 from 'web3'
import { useContext} from 'react'
import { rpcUrls } from './constants'
import { BigNumber } from "bignumber.js"
import { Web3ModalContext } from "../contexts/Web3ModalProvider"

export const createWeb3 = (provider) => {

  var realProvider;

  if (typeof provider === 'string') {
    if (provider.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(
        provider
      );
    } else {
      realProvider = new Web3.providers.HttpProvider(
        provider
      );
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
}

export const getDefaultWeb3 = () => {
  const { chainId } = useContext(Web3ModalContext)
  if(!chainId) {return}
  return createWeb3(rpcUrls[chainId]);
}

export const getDefaultContractOptions = () => {
  const { chainId } = useContext(Web3ModalContext)
  if(!chainId) {return}
  const web3 = getDefaultWeb3();
  return { 
    web3, 
    chainId: chainId, 
    account: null 
  };
}

export const BntoNum = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(-decimal).toNumber();
}

export const NumToBn = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(decimal);
}

export const toFixed = (num, digit) => {
  if (isNaN(num)) return 0;
  var fixed_num = Number(num).toFixed(digit)
  return Number(fixed_num.toString());
}

export const getPercent = (MintData) => {
  if (!MintData) return 0;
  return toFixed(MintData.totalSupply / MintData.maxSupply * 100, 1);
}

export const getDateStr = (tiemstamp) => {
  const dateObj = new Date(tiemstamp * 1000);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + ' ' + day  + ', ' + year;
  return output;
}