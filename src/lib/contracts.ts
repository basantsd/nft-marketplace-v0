import NFTArtifact from "../../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceArtifact from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

export const NFT_ABI = NFTArtifact.abi;
export const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}` || "0x0000000000000000000000000000000000000000";

export const MARKETPLACE_ABI = MarketplaceArtifact.abi;
export const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS as `0x${string}` || "0x0000000000000000000000000000000000000000";
