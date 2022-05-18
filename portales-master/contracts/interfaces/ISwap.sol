// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ISwap {
    /**
     * @dev Creates `amount` tokens and assigns them to `recipient`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     * - `_mintable` must be true
     */
    function mintTo(uint256 amount, address recipient) external returns (bool);

    /**
    * @dev Burn `amount` tokens and decreasing the total supply.
    */
    function burn(uint256 amount) external returns (bool);
}
