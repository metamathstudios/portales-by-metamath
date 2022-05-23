import Web3 from 'web3';
import  ChildAgentContract from './contracts/ChildAgent';
import { bridges } from './constants';
//import { BntoNum, NumToBn } from './utils';


export default class ChildWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: ChildAgentContract;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }
        this.Contract = new ChildAgentContract(this.wrapperOptions, bridges.Bridge[this.chainId]);
    } 

/*     async claimTokens(account) {
        try {
            const tx = await this.Contract.send("claimTokens", {from: account});
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }  */
}
