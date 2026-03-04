"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";
import WalletConnectionModal from "@/components/WalletConnectionModal";

export default function WalletGuard() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("walletAddress");
    if (stored) {
      setWallet(stored);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleConnect = (walletId: string) => {
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    localStorage.setItem("walletAddress", mockAddress);
    setWallet(mockAddress);
    addToast("success", `Connected with ${walletId}`);
  };

  return (
    <WalletConnectionModal
      isOpen={isOpen && !wallet}
      onClose={() => setIsOpen(false)}
      onConnect={handleConnect}
    />
  );
}
