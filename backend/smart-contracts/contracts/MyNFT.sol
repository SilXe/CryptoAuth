// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public nextTokenId;
    address public admin;

    constructor() ERC721("CryptoAuthNFT", "CANFT") {
        admin = msg.sender;
    }

    function mint() external {
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    function isAdmin(address user) external view returns (bool) {
        return user == admin;
    }
}
