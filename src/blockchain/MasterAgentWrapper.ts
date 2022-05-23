import Web3 from 'web3';
import  MasterAgentContract from './contracts/MasterAgent';
import { bridges , tokens } from './constants';
import { ethers, BigNumber } from 'ethers';


export default class MasterWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: MasterAgentContract;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }
        this.Contract = new MasterAgentContract(this.wrapperOptions, bridges.Bridge[this.chainId]);
    } 


    async requestSwap(chainId, from, to, amount, targetChain) {
        try {
            const tx = await this.Contract.send("requestSwap", {from: from} , '0.0001', tokens.Portales[chainId] , to, amount, targetChain);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }


}
