import Web3 from 'web3';
import  ERC20Contract from './contracts/ERC20';
import { bridges, tokens } from './constants';
//import { BntoNum, NumToBn } from './utils';


export default class ERC20Wrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: ERC20Contract;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }
        this.Contract = new ERC20Contract(this.wrapperOptions, tokens.Portales[this.chainId]);
    } 

    async getBalance(account) {
        try {
            const tx = await this.Contract.call("balanceOf", account);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    } 
}