import Contract from './Contract';
import abi from './ChildAgentContract.json';

class ChildAgent extends Contract {
    constructor(options, address) {
      super(options, "ChildAgent", abi, address);
    }
  }
  
export default ChildAgent;