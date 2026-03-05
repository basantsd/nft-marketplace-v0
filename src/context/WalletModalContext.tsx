"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WalletModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined);

export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <WalletModalContext.Provider value={{ isOpen, open, close, showProfileModal, setShowProfileModal }}>
      {children}
    </WalletModalContext.Provider>
  );
}

export function useWalletModal() {
  const context = useContext(WalletModalContext);
  if (!context) {
    throw new Error("useWalletModal must be used within WalletModalProvider");
  }
  return context;
}
