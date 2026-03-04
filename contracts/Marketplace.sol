// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "@openzeppelin/contracts/access/Ownable.sol";
struct Listing {
    uint256 tokenId;
    address seller;
    uint256 price;
    uint256 expiresAt;
    bool active;
}

contract Marketplace is Ownable {
    uint96 public platformFee = 250;
    mapping(bytes32 => Listing) public listings;
    mapping(address => uint256) public pendingWithdrawals;

    event Listed(
        bytes32 indexed listingId,
        uint256 tokenId,
        address seller,
        uint256 price
    );
    event Sold(
        bytes32 indexed listingId,
        uint256 tokenId,
        address buyer,
        uint256 price
    );
    event Cancelled(bytes32 indexed listingId);

    constructor() Ownable(msg.sender) {}

    function createListing(
        uint256 tokenId,
        uint256 price,
        uint256 duration,
        address nftContract
    ) external {
        bytes32 listingId = keccak256(
            abi.encodePacked(tokenId, msg.sender, block.timestamp)
        );

        listings[listingId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            expiresAt: block.timestamp + duration,
            active: true
        });
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        emit Listed(listingId, tokenId, msg.sender, price);
    }

    function buyListing(
        bytes32 listingId,
        address nftContract
    ) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, "Not active");
        require(block.timestamp < listing.expiresAt, "Expired");
        require(msg.value >= listing.price, "Insufficient payment");
        uint256 fee = (listing.price * platformFee) / 10000;
        pendingWithdrawals[listing.seller] += (listing.price - fee);
        pendingWithdrawals[owner()] += fee;
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );
        listing.active = false;
        emit Sold(listingId, listing.tokenId, msg.sender, listing.price);
    }

    function cancelListing(bytes32 listingId, address nftContract) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not seller");
        require(listing.active, "Not active");
        listing.active = false;
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );
        emit Cancelled(listingId);
    }

    function withdraw() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}
