"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletModal } from "@/context/WalletModalContext";
import UserProfileModal from "@/components/UserProfileModal";

export default function ProfileModalManager() {
  const { address, isConnected } = useAccount();
  const { showProfileModal, setShowProfileModal } = useWalletModal();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (isConnected && address && !hasChecked) {
      checkUserProfile();
      setHasChecked(true);
    }
  }, [isConnected, address, hasChecked]);

  useEffect(() => {
    if (!isConnected) {
      setHasChecked(false);
    }
  }, [isConnected]);

  const checkUserProfile = async () => {
    try {
      const res = await fetch(`/api/user?walletAddress=${address}`);
      
      if (!res.ok) {
        console.error("API error:", res.status);
        return;
      }
      
      const text = await res.text();
      if (!text) {
        console.error("Empty response");
        return;
      }
      
      const data = JSON.parse(text);
      
      if (!data.exists) {
        setShowProfileModal(true);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleProfileCreated = () => {
    setShowProfileModal(false);
  };

  const handleClose = () => {
    setShowProfileModal(false);
  };

  if (!address) return null;

  return (
    <UserProfileModal
      isOpen={showProfileModal}
      walletAddress={address}
      onClose={handleClose}
      onProfileCreated={handleProfileCreated}
    />
  );
}
