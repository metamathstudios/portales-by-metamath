
import Contract from './Contract';
import abi from './PortFaucet.json';

class MainContract extends Contract {
  constructor(options, address) {
    super(options, "PortFaucet", abi, address);
  }
}

export default MainContract;