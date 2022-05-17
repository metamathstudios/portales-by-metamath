pragma solidity 0.6.4;

import "./interfaces/ISwap.sol";
import "./erc20/ERC20UpgradeableProxy.sol";
import './interfaces/IProxyInitialize.sol';
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/GSN/Context.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

contract  ChildSwapAgentImpl is Context, ReentrancyGuard {

    using SafeERC20 for IERC20;

    mapping(address => address) public swapMappingMaster2Child;
    mapping(address => address) public swapMappingChild2Master;
    mapping(bytes32 => bool) public filledMasterRequest;
    mapping(address => bool) public authorized;

    address payable public owner;
    address public childErc20ProxyAdmin;
    address public childErc20Implementation;
    uint256 public swapFee;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event BridgePairRegister(bytes32 indexed masterRegisterTxHash, address indexed child20Addr, address indexed master20Addr, string symbol, string name, uint8 decimals);
    event SwapStarted(address indexed childErc20Addr, address indexed masterErc20Addr, address indexed toAddress, uint256 amount, uint256 feeAmount, uint32 targetChainId);
    event SwapFilled(address indexed childErc20Addr, bytes32 indexed masterTxHash, address indexed toAddress, uint256 amount, uint32 fromChainID);

    constructor(address childErc20Impl, uint256 fee, address payable ownerAddr, address childErc20ProxyAdminAddr) public {
        childErc20Implementation = childErc20Impl;
        swapFee = fee;
        owner = ownerAddr;
        childErc20ProxyAdmin = childErc20ProxyAdminAddr;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    modifier onlyAuthorized() {
        require(authorized[msg.sender] || owner == msg.sender);
        _;
    }

    function addAuthorized(address _toAdd) onlyOwner public {
        require(_toAdd != address(0), "Authorizable: new authority is the zero address");
        authorized[_toAdd] = true;
    }

    function removeAuthorized(address _toRemove) onlyOwner public {
        require(_toRemove != address(0), "Authorizable: new authority is the zero address");
        require(_toRemove != msg.sender);
        authorized[_toRemove] = false;
    }

    modifier notContract() {
        require(!isContract(msg.sender), "PORTALES: contract is not allowed to swap");
        require(msg.sender == tx.origin, "PORTALES: no proxy contract is allowed");
       _;
    }

    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    /**
    * @dev Leaves the contract without owner. It will not be possible to call
    * `onlyOwner` functions anymore. Can only be called by the current owner.
    *
    * NOTE: Renouncing ownership will leave the contract without an owner,
    * thereby removing any functionality that is only available to the owner.
    */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Returns set minimum swap fee from CHILD-ERC20 to MASTER-ERC20
     */
    function setSwapFee(uint256 fee) onlyOwner external {
        swapFee = fee;
    }

    /**
     * @dev createSwapPair
     */
    function registerBridgePair(bytes32 masterTxHash, address masterErc20Addr, string calldata name, string calldata symbol, uint8 decimals) onlyAuthorized external returns (address) {
        require(swapMappingMaster2Child[masterErc20Addr] == address(0x0), "PORTALES: duplicated swap pair");

        ERC20UpgradeableProxy proxyToken = new ERC20UpgradeableProxy(childErc20Implementation, childErc20ProxyAdmin, "");
        IProxyInitialize token = IProxyInitialize(address(proxyToken));
        token.initialize(name, symbol, decimals, 0, true, address(this));

        swapMappingMaster2Child[masterErc20Addr] = address(token);
        swapMappingChild2Master[address(token)] = masterErc20Addr;

        emit BridgePairRegister(masterTxHash, address(token), masterErc20Addr, symbol, name, decimals);
        return address(token);
    }

    /**
     * @dev fillBridgingRequest
     */
    function fillSwapRequest(bytes32 masterTxHash, address masterErc20Addr, address toAddress, uint256 amount, uint32 fromChainID) onlyAuthorized external returns (bool) {
        require(!filledMasterRequest[masterTxHash], "PORTALES: eth tx filled already");
        address childTokenAddr = swapMappingMaster2Child[masterErc20Addr];
        require(childTokenAddr != address(0x0), "PORTALES: no swap pair for this token");
        filledMasterRequest[masterTxHash] = true;
        ISwap(childTokenAddr).mintTo(amount, toAddress);
        emit SwapFilled(childTokenAddr, masterTxHash, toAddress, amount, fromChainID);

        return true;
    }
    /**
     * @dev requestBridge
     */
    function requestSwap(address childTokenAddr, address targetAddr, uint256 amount, uint32 targetChainId) payable external notContract nonReentrant returns (bool) {
        address masterErc20Addr = swapMappingChild2Master[childTokenAddr];
        require(masterErc20Addr != address(0x0), "PORTALES: no swap pair for this token");
        require(msg.value == swapFee, "PORTALES: swap fee not equal");

        IERC20(childTokenAddr).safeTransferFrom(msg.sender, address(this), amount);
        ISwap(childTokenAddr).burn(amount);
        if (msg.value != 0) {
            owner.transfer(msg.value);
        }

        emit SwapStarted(childTokenAddr, masterErc20Addr, targetAddr, amount, msg.value, targetChainId);
        return true;
    }
}