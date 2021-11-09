// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IliaZharkovCollection is ERC721URIStorage, AccessControl, Ownable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    string private _contractUri;

    event Mint(address recipient, uint256 tokenId);

    constructor(
        string memory contractUri_
    ) public ERC721("Ilia Zharkov Collection", "IZH") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());

        _contractUri = contractUri_;
    }

    // returns last minted token id
    function currentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function contractURI() public view returns (string memory) {
        return _contractUri;
    }

    function updateContractURI(string memory contractUri_) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _contractUri = contractUri_;
    }

    // public mint
    function mint(
        string memory tokenUri
    ) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "Must have minter role to mint");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(_msgSender(), newTokenId);
        _setTokenURI(newTokenId, tokenUri);

        emit Mint(_msgSender(), newTokenId);
    }

    // let owners to burn their tokens
    function burn(uint256 tokenId) public {
        require(_msgSender() == ownerOf(tokenId), "Can be burned only by token owner");
        _burn(tokenId);
    }

    // See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


}
