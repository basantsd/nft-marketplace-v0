"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, DollarSign, Tag, FileText, Loader2, Check, Wallet, AlertCircle, X, ExternalLink } from "lucide-react";

interface OwnedNFT {
  id: string;
  name: string;
  image: string;
  price: number;
  tokenId: string;
}

const ownedNFTs: OwnedNFT[] = [
  { id: "1", name: "Cosmic Dreams #001", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", price: 2.5, tokenId: "01" },
  { id: "2", name: "Digital Phoenix", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=400&h=400&fit=crop", price: 1.8, tokenId: "02" },
  { id: "3", name: "Neon Cityscapes", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", price: 3.2, tokenId: "03" },
  { id: "4", name: "Abstract Flow", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop", price: 0.9, tokenId: "04" },
  { id: "5", name: "Cyber Punk 2077", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop", price: 4.5, tokenId: "05" },
  { id: "6", name: "Ethereal Portraits", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop", price: 2.1, tokenId: "06" },
];

export default function CreatePage() {
  const [selectedNFT, setSelectedNFT] = useState<OwnedNFT | null>(null);
  const [price, setPrice] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [listSuccess, setListSuccess] = useState(false);

  // New advanced options
  const [royalty, setRoyalty] = useState(0); // in %
  const [resaleRights, setResaleRights] = useState(false);
  const [duration, setDuration] = useState(1); // days

  const platformFee = 0.5;
  const priceNum = parseFloat(price) || 0;
  const platformFeeAmount = priceNum * (platformFee / 100);
  const youReceive = priceNum - platformFeeAmount;

  const handleListNFT = async () => {
    // Step 1: Authorize
    setStep(1);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Step 2: Set Parameters (show confirmation)
    setStep(2);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Step 3: Confirm & List
    setStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setListSuccess(true);
  };

  const handleReset = () => {
    setSelectedNFT(null);
    setPrice("");
    setStep(1);
    setListSuccess(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">List NFT</h1>
          <p className="text-gray-500 text-lg">
            Select an NFT from your wallet and list it on the marketplace
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Owned NFTs */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Your NFTs
              </h2>
              <p className="text-sm text-gray-500 mb-4">Select an NFT to list</p>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {ownedNFTs.map((nft) => (
                  <motion.button
                    key={nft.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedNFT(nft);
                      setListSuccess(false);
                    }}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      selectedNFT?.id === nft.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-gray-50 border-2 border-transparent hover:border-primary/30"
                    }`}
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm text-gray-900 truncate">{nft.name}</p>
                      <p className="text-xs text-gray-500">Token ID #{nft.tokenId}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Listing Configuration */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!selectedNFT ? (
                <motion.div
                  key="no-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card p-12 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an NFT</h3>
                  <p className="text-gray-500">Choose an NFT from your collection to list it on the marketplace</p>
                </motion.div>
              ) : listSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">NFT Listed Successfully!</h3>
                  <p className="text-gray-500 mb-6">Your NFT is now live on the marketplace</p>
                  <div className="p-4 bg-gray-50 rounded-xl mb-6">
                    <p className="text-sm text-gray-500 mb-1">Listing Price</p>
                    <p className="text-2xl font-bold gradient-text font-mono">{price} ETH</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full btn-primary cursor-pointer"
                  >
                    List Another NFT
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="config"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Preview */}
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
                    <div className="flex gap-6">
                      <img
                        src={selectedNFT.image}
                        alt={selectedNFT.name}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{selectedNFT.name}</h3>
                        <p className="text-sm text-gray-500">Token ID #{selectedNFT.tokenId}</p>
                        <p className="text-sm text-gray-500 mt-2">Ethereum</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Input */}
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Set Your Price</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (ETH)</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.001"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 pl-12 rounded-xl input-field font-mono text-lg"
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                            <Tag className="w-4 h-4" />
                          </div>
                        </div>
                        {price && (
                          <p className="text-sm text-gray-500 mt-2">
                            ≈ ${(priceNum * 3200).toFixed(2)} USD
                          </p>
                        )}
                      </div>

                      {/* Fee Calculator */}
                      {price && (
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Listing Price</span>
                            <span className="font-mono">{price} ETH</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Platform Fee ({platformFee}%)</span>
                            <span className="font-mono text-red-500">-{platformFeeAmount.toFixed(4)} ETH</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>You will receive</span>
                            <span className="gradient-text font-mono">{youReceive.toFixed(4)} ETH</span>
                          </div>
                        </div>
                      )}

                      {/* Advanced Options */}
                      <div className="p-4 bg-gray-50 rounded-xl space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Royalty (%)</label>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={royalty}
                            onChange={(e) => setRoyalty(parseFloat(e.target.value))}
                            className="w-full"
                          />
                          <p className="text-sm text-gray-500 mt-1">Current: {royalty}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="resale"
                            checked={resaleRights}
                            onChange={() => setResaleRights(!resaleRights)}
                            className="w-4 h-4"
                          />
                          <label htmlFor="resale" className="text-sm text-gray-700">Enable resale rights</label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Listing Duration (days)</label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full p-2 rounded-xl border-gray-200"
                          >
                            <option value={1}>1 day</option>
                            <option value={3}>3 days</option>
                            <option value={7}>7 days</option>
                            <option value={30}>30 days</option>
                          </select>
                        </div>
                      </div>

                      {/* Price Warning */}
                      {priceNum > 0 && priceNum < 0.1 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm"
                        >
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-yellow-800">Low Price Warning</p>
                            <p className="text-yellow-700">This price is below the current floor price. Your NFT may not sell quickly.</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* 3-Step Process */}
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">List Your NFT</h2>
                    
                    {/* Steps */}
                    <div className="space-y-4 mb-6">
                      {[
                        { num: 1, title: "Authorize Marketplace", desc: "Allow contract to access your NFT" },
                        { num: 2, title: "Set Listing Parameters", desc: "Configure price and duration" },
                        { num: 3, title: "Confirm & List", desc: "Sign transaction to list" },
                      ].map((s) => (
                        <div
                          key={s.num}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            step >= s.num ? "bg-primary/5 border border-primary/20" : "bg-gray-50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            step > s.num
                              ? "bg-primary text-white"
                              : step === s.num
                              ? "bg-primary text-white animate-pulse"
                              : "bg-gray-200 text-gray-500"
                          }`}>
                            {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{s.title}</p>
                            <p className="text-sm text-gray-500">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gas Fee Info */}
                    <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-500 mb-6">
                      <div className="flex items-center justify-between">
                        <span>Estimated Gas Fee</span>
                        <span className="font-mono">~0.002 ETH</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleListNFT}
                      disabled={!price || isLoading}
                      className="w-full py-4 rounded-full btn-primary text-lg font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {step === 1 && "Step 1: Authorizing Marketplace..."}
                          {step === 2 && "Step 2: Setting Parameters..."}
                          {step === 3 && "Step 3: Confirming..."}
                        </>
                      ) : (
                        <>
                          {step === 1 && "Start: Authorize Marketplace"}
                          {step === 2 && "Continue: Set Parameters"}
                          {step === 3 && "Confirm & List NFT"}
                        </>
                      )}
                    </motion.button>

                    {/* Transaction Status */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                          <p className="text-sm text-blue-700">
                            Waiting for wallet confirmation...
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-blue-600">
                          <span>Transaction pending</span>
                          <a href="#" className="flex items-center gap-1 hover:underline">
                            View on Etherscan <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
