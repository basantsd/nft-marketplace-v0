"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, ChevronDown, Maximize2, Minimize2, 
  Heart, Share2, Tag, Verified, Clock, 
  Check, X, Copy, ExternalLink, Loader2,
  ArrowLeft, MoreHorizontal
} from "lucide-react";
import BuyModal from "@/components/BuyModal";
import { mockNFTs } from "@/lib/data";

export default function NFTDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const nft = mockNFTs.find((n) => n.id === id);
  
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showAttributes, setShowAttributes] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  const currentIndex = mockNFTs.findIndex((n) => n.id === id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < mockNFTs.length - 1;

  const handlePrev = () => {
    if (hasPrev) router.push(`/nft/${mockNFTs[currentIndex - 1].id}`);
  };
  
  const handleNext = () => {
    if (hasNext) router.push(`/nft/${mockNFTs[currentIndex + 1].id}`);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!nft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">NFT not found.</p>
      </div>
    );
  }

  const ETH_USD_RATE = 3200;
  const platformFee = nft.price * 0.005;
  const royaltyFee = nft.price * 0.05;
  const gasFee = 0.003;
  const totalCost = nft.price + platformFee + royaltyFee + gasFee;

  // Mock attributes based on NFT
  const attributes = [
    { trait: "Background", value: "Purple", rarity: "Common" },
    { trait: "Eyes", value: "Laser", rarity: "Rare" },
    { trait: "Style", value: "Cyberpunk", rarity: "Uncommon" },
    { trait: "Rarity", value: "Legendary", rarity: "Legendary" },
  ];

  // Mock transaction history
  const history = [
    { action: "Minted", by: "0x7a23...8F91", date: "Dec 15, 2024", tx: "0x3f2a...1b4c" },
    { action: "Listed", by: "0x7a23...8F91", date: "Jan 20, 2025", tx: "0x8b4c...2d3e" },
    { action: "Listed", by: "0x39F2...a266", date: "Feb 28, 2025", tx: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-6 h-6 text-white" />
            </button>
            <img
              src={nft.image}
              alt={nft.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Media (60%) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Image Container */}
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group"
              >
                <motion.img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsFullscreen(true)}
                />
                
                {/* Collection Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-2">
                  <Tag className="w-3 h-3 text-white" />
                  <span className="text-white text-sm font-medium">{nft.collection}</span>
                </div>

                {/* Token ID */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm font-mono">#{nft.id}</span>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
                >
                  <Maximize2 className="w-4 h-4 text-gray-700" />
                </button>

                {/* Navigation Arrows */}
                {hasPrev && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                )}
                {hasNext && (
                  <button
                    onClick={handleNext}
                    className="absolute right-16 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Transaction History Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6"
            >
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900">Transaction History</h3>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white border border-t-0 border-gray-200 rounded-b-xl space-y-4">
                      {history.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.action === 'Minted' ? 'bg-blue-100 text-blue-600' :
                            item.action === 'Listed' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {item.action === 'Minted' ? <Tag className="w-4 h-4" /> :
                             item.action === 'Listed' ? <Check className="w-4 h-4" /> :
                             <Heart className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.action}</p>
                            <p className="text-sm text-gray-500">
                              by <span className="font-mono text-gray-700">{item.by}</span>
                              {item.action === 'Listed' && <Verified className="w-3 h-3 text-blue-500 inline ml-1" />}
                            </p>
                            <p className="text-xs text-gray-400">{item.date}</p>
                          </div>
                          {item.tx && (
                            <a 
                              href="#" 
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column - Actions (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div 
                className="flex items-center gap-2 text-primary hover:underline cursor-pointer mb-2"
                onClick={() => router.push('/explore')}
              >
                <span className="text-sm">{nft.collection}</span>
                <Verified className="w-4 h-4" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{nft.name}</h1>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-white rounded-xl border border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-1">Current Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 font-mono">{nft.price}</span>
                <span className="text-xl text-gray-500">ETH</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                ≈ ${(nft.price * ETH_USD_RATE).toLocaleString()} USD
              </p>
            </motion.div>

            {/* Buy Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsBuyOpen(true)}
                className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-lg font-semibold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                Buy Now
              </button>
              
              {/* Secondary Actions */}
              <div className="flex gap-3 mt-3">
                <button className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer text-gray-700 font-medium">
                  <Tag className="w-4 h-4" />
                  Make Offer
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  onClick={handleFavorite}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
              </div>

              {/* Copied Toast */}
              <AnimatePresence>
                {showCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 p-2 bg-green-100 text-green-700 text-sm rounded-lg text-center"
                  >
                    Link copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Seller Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-4 bg-white rounded-xl border border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-2">Seller</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  0x
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    0x39F2...a266
                    <Verified className="w-4 h-4 text-blue-500" />
                  </p>
                  <p className="text-sm text-gray-500">Verified Seller</p>
                </div>
              </div>
            </motion.div>

            {/* Details Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {/* Description */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-gray-900">Description</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-gray-600">
                        A unique digital artwork from the {nft.collection} collection. 
                        This exclusive piece features distinctive visual elements and 
                        represents true digital ownership on the blockchain.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Attributes */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setShowAttributes(!showAttributes)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-gray-900">Attributes</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAttributes ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showAttributes && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                        {attributes.map((attr, index) => (
                          <div 
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <p className="text-xs text-gray-500">{attr.trait}</p>
                            <p className="font-medium text-gray-900">{attr.value}</p>
                            <p className="text-xs text-purple-600">{attr.rarity}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blockchain Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Details</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contract</span>
                    <span className="font-mono text-gray-700">0x1234...5678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Token ID</span>
                    <span className="font-mono text-gray-700">{nft.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Blockchain</span>
                    <span className="text-gray-700">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Standard</span>
                    <span className="text-gray-700">ERC-721</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      <BuyModal
        isOpen={isBuyOpen}
        onClose={() => setIsBuyOpen(false)}
        nft={{ id: nft.id, name: nft.name, price: nft.price, image: nft.image }}
      />
    </div>
  );
}
