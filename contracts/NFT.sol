// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    mapping(uint256 => address) public creators;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function mint(address to, string memory uri) public returns (uint256) {
        _tokenIds++;

        uint256 newTokenId = _tokenIds;

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);

        creators[newTokenId] = to;

        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
