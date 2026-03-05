"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from 'wagmi';
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, Loader2, AlertCircle } from "lucide-react";
import { useWalletModal } from "@/context/WalletModalContext";

export default function WalletConnectionModal() {
  const { isOpen, close } = useWalletModal();
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      close();
    }
  }, [isConnected, address, close]);

  const handleConnect = async (connector: any) => {
    try {
      setSelectedConnector(connector);
      setError(null);
      await connect({ connector });
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    }
  };

  const handleClose = () => {
    setError(null);
    close();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4" 
            >
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Connect Wallet</h2>
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      {connectors.map((connector) => (
                        <button
                          key={connector.uid}
                          onClick={() => handleConnect(connector)}
                          disabled={isPending}
                          className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            {isPending && selectedConnector?.uid === connector.uid ? (
                              <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            ) : (
                              <Wallet className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div className="text-left">
                            <span className="block font-semibold text-gray-900">{connector.name}</span>
                            <span className="text-sm text-gray-500">
                              {connector.name === 'Injected' ? 'MetaMask, Rabby, WalletConnect' : 'Connect using ' + connector.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="mt-6 text-xs text-gray-400 text-center">
                      By connecting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
