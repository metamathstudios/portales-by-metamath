const ChildSwapAgentImpl = artifacts.require("ChildSwapAgentImpl");
const ERC20TokenImplementation = artifacts.require("ERC20TokenImplementation");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com/'));



module.exports = function(deployer, network, accounts) {
    owner = accounts[0];
    proxyAdmin = accounts[1];
    deployer.then(async () => {
        await deployer.deploy(
            ERC20TokenImplementation);
        await deployer.deploy(
            ChildSwapAgentImpl,
            ERC20TokenImplementation.address,
            100000000000000,
            owner,
            proxyAdmin
            );
    });

};