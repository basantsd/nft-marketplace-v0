import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFT_ADDRESS, NFT_ABI, MARKETPLACE_ADDRESS, MARKETPLACE_ABI } from "@/lib/contracts";

export function useNFT() {
  const { data: name } = useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "symbol",
  });

  return { name, symbol };
}

export function useNFTTokenURI(tokenId: bigint) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "tokenURI",
    args: [tokenId],
  });
}

export function useNFTOwner(tokenId: bigint) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });
}

export function useNFTBalanceOf(owner: `0x${string}`) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: [owner],
  });
}

export function useMintNFT() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = async (to: `0x${string}`, uri: string) => {
    writeContract({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: "mint",
      args: [to, uri],
    });
  };

  return {
    mint,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useMarketplaceListing(listingId: `0x${string}`) {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "listings",
    args: [listingId],
  });
}

export function useMarketplacePendingWithdrawal(address: `0x${string}`) {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "pendingWithdrawals",
    args: [address],
  });
}

export function useMarketplacePlatformFee() {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "platformFee",
  });
}

export function useCreateListing() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createListing = async (tokenId: bigint, price: bigint, duration: bigint) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: "createListing",
      args: [tokenId, price, duration, NFT_ADDRESS],
    });
  };

  return {
    createListing,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useBuyListing() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const buyListing = async (listingId: `0x${string}`, price: bigint) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: "buyListing",
      args: [listingId, NFT_ADDRESS],
      value: price,
    });
  };

  return {
    buyListing,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useCancelListing() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelListing = async (listingId: `0x${string}`) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: "cancelListing",
      args: [listingId, NFT_ADDRESS],
    });
  };

  return {
    cancelListing,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useWithdraw() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdraw = async () => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: "withdraw",
    });
  };

  return {
    withdraw,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
