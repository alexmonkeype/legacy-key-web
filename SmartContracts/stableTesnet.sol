// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract stableUSD is ERC20, Ownable(0x02e7520482045E2bA8a127C5d0D6E40a17024127) {
    constructor()
        ERC20("USD", "StableTesnet")        
    {}

    function senUSD(address to, uint256 amount) public {
        _mint(to, amount);
    }
}