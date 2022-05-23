import Contract from './Contract';
import abi from './MasterAgentContract.json';

class MasterAgent extends Contract {
    constructor(options, address) {
      super(options, "MasterAgent", abi, address);
    }
  }
  
  export default MasterAgent;