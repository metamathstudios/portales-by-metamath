import Contract from './Contract';
import abi from './ERC20.json';

class ERC20 extends Contract {
    constructor(options, address) {
        super(options, "ERC20", abi, address);
      }
}

export default ERC20;