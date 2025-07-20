// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StableUSD is ERC20, Ownable {
    constructor() ERC20("USD", "StableTesnet") {}

    function senUSD(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
