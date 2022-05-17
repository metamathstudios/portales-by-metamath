const MasterSwapAgentImpl = artifacts.require("MasterSwapAgentImpl");
const ERC20TokenImplementation = artifacts.require("ERC20TokenImplementation");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com/'));



module.exports = function(deployer, network, accounts) {
    owner = accounts[0];
    proxyAdmin = accounts[1];
    childProxyAdmin = accounts[2];
    deployer.then(async () => {
        await deployer.deploy(
            ERC20TokenImplementation);
        await deployer.deploy(
            MasterSwapAgentImpl
            );
    });

};


