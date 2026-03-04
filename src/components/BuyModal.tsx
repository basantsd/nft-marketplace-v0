"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  X, Check, Loader2, ArrowRight, Wallet, 
  AlertCircle, Copy, ExternalLink, RefreshCw, Zap
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    id?: string;
    name: string;
    price: number;
    image: string;
  } | null;
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

export default function BuyModal({ isOpen, onClose, nft }: BuyModalProps) {
  const [step, setStep] = useState(1);
  const [isSold, setIsSold] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [copiedHash, setCopiedHash] = useState(false);
  const prefersReduced = useReducedMotion();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const ETH_USD_RATE = 3200;
  const platformFee = nft ? nft.price * 0.005 : 0;
  const royaltyFee = nft ? nft.price * 0.05 : 0;
  const gasFee = 0.003;
  const totalCost = nft ? nft.price + platformFee + royaltyFee + gasFee : 0;

  // Focus trap
  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) focusableElements[0].focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  // Check sold status
  useEffect(() => {
    if (nft?.id) {
      const sold = JSON.parse(localStorage.getItem('soldNFTs') || '[]');
      setIsSold(sold.includes(nft.id));
    }
  }, [nft?.id]);

  const handleInitialize = () => {
    if (isSold) {
      addToast('error', 'This NFT has already been sold.');
      return;
    }
    if (balance === 0) setBalance(5);
    setStep(2);
  };

  const handleConfirm = async () => {
    if (balance < totalCost) {
      addToast('error', 'Insufficient balance to complete the purchase.');
      return;
    }
    
    setIsLoading(true);
    setStep(3);
    
    // Generate mock transaction hash
    const mockTxHash = '0x' + Math.random().toString(16).substr(2, 40);
    setTxHash(mockTxHash);

    // Simulate wallet confirmation (10% chance of timeout)
    setTimeout(async () => {
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.1) {
              reject(new Error('timeout'));
            } else {
              resolve(null);
            }
          }, 3000);
        });
        
        // Success!
        setBalance((prev) => parseFloat((prev - totalCost).toFixed(3)));
        
        if (nft?.id) {
          const sold = JSON.parse(localStorage.getItem('soldNFTs') || '[]');
          if (!sold.includes(nft.id)) {
            sold.push(nft.id);
            localStorage.setItem('soldNFTs', JSON.stringify(sold));
          }
        }
        
        setIsSuccess(true);
        addToast('success', 'Purchase successful!');
      } catch (err) {
        setIsSuccess(false);
        addToast('error', 'Network timeout. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleRetry = () => {
    setIsSuccess(null);
    setIsLoading(true);
    handleConfirm();
  };

  const handleClose = () => {
    setStep(1);
    setIsConfirmed(false);
    setIsSuccess(null);
    setTxHash(null);
    onClose();
  };

  const copyTxHash = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  if (!nft) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                {step === 1 && "Review Purchase"}
                {step === 2 && "Confirm Transaction"}
                {step === 3 && isSuccess === null && "Processing"}
                {step === 3 && isSuccess === true && "Success!"}
                {step === 3 && isSuccess === false && "Transaction Failed"}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Review Purchase */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* NFT Preview */}
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{nft.name}</p>
                        <p className="text-sm text-gray-500">Token #{nft.id}</p>
                      </div>
                    </div>

                    {/* Sold Warning */}
                    {isSold && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-2 text-yellow-800 text-sm">
                        <CustomAlertCircle className="w-4 h-4 flex-shrink-0" />
                        This NFT has already been sold.
                      </div>
                    )}

                    {/* Cost Breakdown */}
                    <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Price</span>
                        <span className="font-mono">{nft.price} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform fee (0.5%)</span>
                        <span className="font-mono">{platformFee.toFixed(4)} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Royalty (5%)</span>
                        <span className="font-mono">{royaltyFee.toFixed(4)} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Gas estimate</span>
                        <span className="font-mono">~{gasFee} ETH</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="font-mono">{totalCost.toFixed(4)} ETH</span>
                      </div>
                    </div>

                    {/* Your Balance */}
                    <div className="p-3 bg-blue-50 rounded-xl text-sm">
                      <span className="text-gray-500">Your balance: </span>
                      <span className="font-mono font-semibold">{balance.toFixed(3)} ETH</span>
                      <span className="text-gray-500"> (${(balance * ETH_USD_RATE).toFixed(2)})</span>
                    </div>

                    {/* Confirm Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600">
                        I confirm I have sufficient funds for this purchase
                      </span>
                    </label>

                    {/* Confirm Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleInitialize}
                      disabled={!isConfirmed || balance < totalCost || isSold}
                      aria-disabled={!isConfirmed || balance < totalCost || isSold}
                      className="w-full py-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 2: Wallet Confirmation */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className="space-y-6 text-center py-8"
                  >
                    {/* Pulsing ETH Logo */}
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-[#627EEA]/20 animate-pulse" />
                      <div className="absolute inset-2 rounded-full bg-[#627EEA]/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="relative w-full h-full rounded-full bg-[#627EEA] flex items-center justify-center">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">Confirm in your wallet</p>
                      <p className="text-gray-500">Check your wallet for the transaction request</p>
                    </div>

                    {/* Transaction Hash */}
                    {txHash && (
                      <div className="p-3 bg-gray-50 rounded-xl text-sm">
                        <p className="text-gray-500 mb-1">Transaction hash</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-mono text-gray-700">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
                          <button onClick={copyTxHash} className="cursor-pointer hover:text-primary">
                            {copiedHash ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <a href="#" className="cursor-pointer hover:text-primary">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      disabled={isLoading}
                      className="w-full py-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Waiting for confirmation...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5" />
                          Connect Wallet
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 3: Result */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    {isSuccess === null ? (
                      /* Processing */
                      <div className="space-y-6">
                        <div className="relative w-20 h-20 mx-auto">
                          <div className="absolute inset-0 rounded-full bg-[#627EEA]/20 animate-pulse" />
                          <div className="relative w-full h-full rounded-full bg-[#627EEA]/10 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-[#627EEA] animate-spin" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">Processing transaction...</p>
                          <p className="text-gray-500">Monitoring blockchain for confirmation</p>
                        </div>
                      </div>
                    ) : isSuccess ? (
                      /* Success */
                      <div className="space-y-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                          className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center"
                        >
                          <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <motion.path
                              d="M5 13l4 4L19 7"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                            />
                          </svg>
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">NFT Acquired!</h3>
                          <p className="text-gray-500">Congratulations! You now own {nft.name}</p>
                        </div>

                        {/* Summary */}
                        <div className="p-4 bg-gray-50 rounded-xl text-left space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Token</span>
                            <span className="font-mono">#{nft.id}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Price paid</span>
                            <span className="font-mono">{totalCost.toFixed(4)} ETH</span>
                          </div>
                          {txHash && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Transaction</span>
                              <span className="font-mono text-xs">{txHash.slice(0, 8)}...{txHash.slice(-6)}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClose}
                            className="flex-1 py-3 rounded-xl btn-primary font-medium cursor-pointer"
                          >
                            View in Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClose}
                            className="flex-1 py-3 rounded-xl border border-gray-300 font-medium cursor-pointer"
                          >
                            Close
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      /* Failure */
                      <div className="space-y-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center"
                        >
                          <X className="w-10 h-10 text-red-500" />
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Transaction Failed</h3>
                          <p className="text-gray-500">Network timeout. Please try again.</p>
                        </div>

                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRetry}
                            className="flex-1 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-medium flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClose}
                            className="flex-1 py-3 rounded-xl border border-gray-300 font-medium cursor-pointer"
                          >
                            Close
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
