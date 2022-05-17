pragma solidity 0.6.4;

import "./interfaces/IERC20Query.sol";
import "openzeppelin-solidity/contracts/GSN/Context.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

contract MasterSwapAgentImpl is Context, ReentrancyGuard{

    using SafeERC20 for IERC20;

    mapping(address => bool) public masterERC20;
    mapping(bytes32 => bool) public filledChildRequest;
    mapping(address => bool) public authorized;
    address payable public owner;
    uint256 public swapFee;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event BridgePairRegister(address indexed sponsor,address indexed masterErc20Addr, string name, string symbol, uint8 decimals);
    event SwapStarted(address indexed masterErc20Addr, address indexed fromAddress, address indexed toAddress, uint256 amount, uint256 feeAmount, uint32 targetChainId);
    event SwapFilled(address indexed masterErc20Addr, bytes32 indexed childTxHash, address indexed toAddress, uint256 amount, uint32 fromChainID);

    constructor(uint256 fee, address payable ownerAddr) public {
        swapFee = fee;
        owner = ownerAddr;
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
     * @dev Returns set minimum swap fee from bridge
     */
    function setSwapFee(uint256 fee) onlyOwner external {
        swapFee = fee;
    }

    function registerBridgePair(address masterErc20Addr) onlyAuthorized external returns (bool) {
        require(!masterERC20[masterErc20Addr], "PORTALES: already registered");

        string memory name = IERC20Query(masterErc20Addr).name();
        string memory symbol = IERC20Query(masterErc20Addr).symbol();
        uint8 decimals = IERC20Query(masterErc20Addr).decimals();

        require(bytes(name).length>0, "PORTALES: empty name");
        require(bytes(symbol).length>0, "PORTALES: empty symbol");

        masterERC20[masterErc20Addr] = true;

        emit BridgePairRegister(msg.sender, masterErc20Addr, name, symbol, decimals);
        return true;
    }

    function fillSwapRequest(bytes32 childTxHash, address masterErc20Addr, address toAddress, uint256 amount, uint32 fromChainID ) onlyAuthorized external returns (bool) {
        require(!filledChildRequest[childTxHash], "PORTALES: tx already processed");
        require(masterERC20[masterErc20Addr], "PORTALES: not registered token");

        filledChildRequest[childTxHash] = true;
        IERC20(masterErc20Addr).safeTransfer(toAddress, amount);

        emit SwapFilled(masterErc20Addr, childTxHash, toAddress, amount, fromChainID);
        return true;
    }

    function requestSwap(address masterErc20Addr, address toAddr, uint256 amount, uint32 targetChainId) payable external notContract nonReentrant returns (bool) {
        require(masterERC20[masterErc20Addr], "PORTALES: not registered token");
        require(msg.value == swapFee, "PORTALES: swap fee not equal");

        IERC20(masterErc20Addr).safeTransferFrom(msg.sender, address(this), amount);
        if (msg.value != 0) {
            owner.transfer(msg.value);
        }

        emit SwapStarted(masterErc20Addr, msg.sender, toAddr, amount, msg.value, targetChainId);
        return true;
    }
}