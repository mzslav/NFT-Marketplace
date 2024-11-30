// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Оголошуємо контракт MyNFT, що успадковує ERC721URIStorage та Ownable
contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter; // Лічильник для токенів

    // Назва і символ для NFT
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    // Функція для створення нового NFT
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter; // отримаємо поточний ID токену
        _tokenIdCounter++; // збільшуємо лічильник

        // Створюємо NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri); // встановлюємо URI для метаданих
    }

    // Функція для отримання кількості створених NFT
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
