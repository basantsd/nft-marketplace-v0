"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, Loader2, ArrowRight, AlertCircle } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#E17726" />
        <path d="M29.5 17.5L25 14L20.5 17.5L25 21L29.5 17.5Z" fill="#E27625" />
        <path d="M20.5 17.5L16 14L11.5 17.5L16 21L20.5 17.5Z" fill="#E27625" />
        <path d="M29.5 22.5L25 26L20.5 22.5L25 19L29.5 22.5Z" fill="#E27625" />
        <path d="M11.5 22.5L16 26L20.5 22.5L16 19L11.5 22.5Z" fill="#E27625" />
        <path d="M25 21L20.5 17.5L16 21L20.5 24.5L25 21Z" fill="#E27625" />
        <path d="M15 24.5L11.5 22.5L7 26L11.5 28.5L15 24.5Z" fill="#E27625" />
        <path d="M25 21L29.5 24.5L33 28.5L29.5 26L25 21Z" fill="#E27625" />
        <path d="M15 24.5L20.5 24.5L16 28.5L11.5 28.5L15 24.5Z" fill="#233447" />
        <path d="M25 21L29.5 22.5L33 26L29.5 28.5L25 24.5L20.5 24.5L16 28.5L11.5 26L15 22.5L20.5 21L25 21Z" fill="#CC6220" />
      </svg>
    ),
    description: "Most popular browser wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#3B99FC" />
        <path d="M13.3 16L20 12.7L26.7 16L20 19.3L13.3 16Z" fill="white" />
        <path d="M20 20.7L13.3 24L20 27.3L26.7 24L20 20.7Z" fill="white" />
        <path d="M13.3 16L16 20.7L13.3 24L10.7 20.7L13.3 16Z" fill="white" opacity="0.7" />
        <path d="M26.7 16L24 20.7L26.7 24L29.3 20.7L26.7 16Z" fill="white" opacity="0.7" />
        <path d="M20 19.3L16 24L13.3 16L20 19.3Z" fill="white" opacity="0.5" />
        <path d="M20 19.3L24 24L26.7 16L20 19.3Z" fill="white" opacity="0.5" />
      </svg>
    ),
    description: "Scan with your mobile wallet",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#0052FF" />
        <circle cx="20" cy="20" r="8" fill="white" />
        <circle cx="20" cy="20" r="4" fill="#0052FF" />
      </svg>
    ),
    description: "Secure and easy to use",
  },
];

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
  title?: string;
}

export default function WalletConnectionModal({
  isOpen,
  onClose,
  onConnect,
  title = "Connect Wallet",
}: WalletConnectionModalProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onConnect(walletId);
      onClose();
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="card p-6 mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-3">
                {walletOptions.map((wallet, index) => (
                  <motion.button
                    key={wallet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={connectingWallet !== null}
                    className="w-full p-4 flex items-center gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-primary/30 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-gray-600 group-hover:text-primary transition-colors">
                      {connectingWallet === wallet.id ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        wallet.icon
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{wallet.name}</p>
                      <p className="text-sm text-gray-500">{wallet.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
              </div>

              <p className="mt-6 text-xs text-gray-500 text-center">
                By connecting, you agree to our Terms of Service and understand that transactions are final
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CustomAlertCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
