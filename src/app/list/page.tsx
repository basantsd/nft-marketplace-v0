"use client";

import { useState, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Tag, Settings, Check, AlertCircle, Wallet, Loader2, Zap,
  Copy, RefreshCw, ChevronDown, X, Share2, Plus, Upload, Image,
  FileText, Percent, ArrowRight,
  ImageDown
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";

interface OwnedNFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  price: number;
  tokenId: string;
}

interface Collection {
  id: string;
  name: string;
  count: number;
}

// Mock owned NFTs from connected wallet
const ownedNFTs: OwnedNFT[] = [
  { id: "1", name: "Cosmic Dreams #001", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", collection: "Cosmic Dreams", price: 2.5, tokenId: "001" },
  { id: "2", name: "Digital Phoenix", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=400&h=400&fit=crop", collection: "Digital Art", price: 1.8, tokenId: "002" },
  { id: "3", name: "Neon Cityscapes", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", collection: "Neon Series", price: 3.2, tokenId: "003" },
];

// Mock collections
const collections: Collection[] = [
  { id: "1", name: "Cosmic Dreams", count: 3 },
  { id: "2", name: "Digital Art", count: 2 },
  { id: "3", name: "Neon Series", count: 1 },
];

const FLOOR_PRICE = 0.38;
const MIN_PRICE = 0.01;

export default function ListNFTPage() {

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!isConnected || !address) {
      notFound();
    }
  }, [isConnected, address]);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // View state: 'grid' | 'upload'
  const [view, setView] = useState<'grid' | 'upload'>('grid');

  // Selection
  const [selectedNFT, setSelectedNFT] = useState<OwnedNFT | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [showCreateCollection, setShowCreateCollection] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState("All Collections");

  // Listing config
  const [price, setPrice] = useState("");
  const [listingType, setListingType] = useState<"fixed" | "auction">("fixed");
  const [duration, setDuration] = useState(7);

  // Upload form
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [royalty, setRoyalty] = useState(5);
  const [newCollectionName, setNewCollectionName] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalSuccess, setModalSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const ETH_USD_RATE = 3200;
  const platformFeeRate = 0.005;
  const royaltyRate = 0.05;
  const gasEstimate = 0.003;

  const priceNum = parseFloat(price) || 0;
  const platformFee = priceNum * platformFeeRate;
  const royaltyAmount = priceNum * royaltyRate;
  const totalFees = platformFee + royaltyAmount;
  const youReceive = priceNum - totalFees;

  const isBelowFloor = priceNum > 0 && priceNum < FLOOR_PRICE;
  const isBelowMin = priceNum > 0 && priceNum < MIN_PRICE;
  const isValid = priceNum >= MIN_PRICE;

  // Filter NFTs
  const filteredNFTs = ownedNFTs.filter(nft =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayNFTs = filteredNFTs.filter(nft =>
    selectedCollectionFilter === "All Collections" || nft.collection === selectedCollectionFilter
  );

  const collectionsList = ["All Collections", ...collections.map(c => c.name)];

  // Handlers
  const handleSelectNFT = (nft: OwnedNFT) => {
    setSelectedNFT(nft);
    setView('grid');
  };

  const handleUploadClick = () => {
    setSelectedNFT(null);
    setView('upload');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleContinueToListing = () => {
    if (!uploadedImage || !nftName || !selectedCollection) return;
    setView('grid');
    // Create a temporary NFT object for preview
    const tempNFT: OwnedNFT = {
      id: "new-" + Date.now(),
      name: nftName,
      image: uploadedImage,
      collection: selectedCollection,
      price: 0,
      tokenId: "NEW"
    };
    setSelectedNFT(tempNFT);
  };

  const handleListNFT = () => {
    if (!selectedNFT || !isValid) return;
    setIsModalOpen(true);
    setModalStep(1);
  };

  const confirmListing = async () => {
    setModalStep(2);
    setIsLoading(true);

    // Simulate transaction
    const mockTxHash = '0x' + Math.random().toString(16).substr(2, 40);
    setTxHash(mockTxHash);

    setTimeout(async () => {
      setModalStep(3);

      setTimeout(async () => {
        if (Math.random() > 0.1) {
          setModalSuccess(true);
          // Save to localStorage
          const listed = JSON.parse(localStorage.getItem('listedNFTs') || '[]');
          if (selectedNFT && !listed.find((n: any) => n.id === selectedNFT.id)) {
            listed.push({ id: selectedNFT.id, price: priceNum, isNew: !!selectedNFT.id?.startsWith('new') });
            localStorage.setItem('listedNFTs', JSON.stringify(listed));
          }
        } else {
          setModalSuccess(false);
        }
        setIsLoading(false);
      }, 3000);
    }, 2000);
  };

  const handleRetry = () => {
    setModalSuccess(null);
    setIsLoading(true);
    confirmListing();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setModalSuccess(null);
    setTxHash(null);
  };

  const copyTxHash = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List NFT</h1>
          <p className="text-gray-500">Select an NFT from your wallet or create a new one to list on the marketplace</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Selection */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  Your NFTs
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {ownedNFTs.length} NFTs in wallet • Click to select or create new
                </p>
              </div>

              {/* Search & Filter */}
              <div className="p-4 border-b border-gray-200 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedCollectionFilter}
                    onChange={(e) => setSelectedCollectionFilter(e.target.value)}
                    className="flex-1 p-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:outline-none bg-gray-50"
                  >
                    {collectionsList.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NFT Grid / Upload Form */}
              <div className="p-4 max-h-[550px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {view === 'upload' ? (
                    /* Upload Form */
                    <motion.div
                      key="upload-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Back Button */}
                      <button
                        onClick={() => setView('grid')}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <ChevronDown className="w-4 h-4 rotate-90" />
                        Back to NFTs
                      </button>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${uploadedImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary'
                            }`}
                        >
                          {uploadedImage ? (
                            <div className="relative">
                              <img src={uploadedImage} alt="Preview" className="w-32 h-32 mx-auto rounded-lg object-cover" />
                              <button
                                onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                              <p className="text-xs text-gray-400 mt-1">Image, Video, or 3D model</p>
                            </>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* Collection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Collection</label>
                        <select
                          value={selectedCollection}
                          onChange={(e) => {
                            if (e.target.value === '__create_new__') {
                              setShowCreateCollection(true);
                            } else {
                              setSelectedCollection(e.target.value);
                              setShowCreateCollection(false);
                            }
                          }}
                          className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                        >
                          <option value="">Select collection...</option>
                          {collections.map(c => (
                            <option key={c.id} value={c.name}>{c.name} ({c.count} items)</option>
                          ))}
                          <option value="__create_new__">+ Create new collection</option>
                        </select>
                      </div>

                      {/* Create New Collection Form */}
                      {showCreateCollection && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-4 bg-purple-50 rounded-xl space-y-3"
                        >
                          <p className="text-sm font-medium text-purple-700">New Collection</p>
                          <input
                            type="text"
                            placeholder="Collection name"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            className="w-full p-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:outline-none"
                          />
                          <div>
                            <label className="text-xs text-purple-600">Royalty: {royalty}%</label>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={royalty}
                              onChange={(e) => setRoyalty(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          {newCollectionName && (
                            <button
                              onClick={() => {
                                setSelectedCollection(newCollectionName);
                                setShowCreateCollection(false);
                              }}
                              className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer"
                            >
                              Create "{newCollectionName}"
                            </button>
                          )}
                        </motion.div>
                      )}

                      {/* NFT Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">NFT Name</label>
                        <input
                          type="text"
                          placeholder="e.g., Cosmic Dreams #001"
                          value={nftName}
                          onChange={(e) => setNftName(e.target.value)}
                          className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                        <textarea
                          placeholder="Describe your NFT..."
                          value={nftDescription}
                          onChange={(e) => setNftDescription(e.target.value)}
                          rows={3}
                          className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none resize-none"
                        />
                      </div>

                      {/* Royalty */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Royalty: {royalty}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={royalty}
                          onChange={(e) => setRoyalty(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">You'll receive this % on secondary sales</p>
                      </div>

                      {/* Continue Button */}
                      <button
                        onClick={handleContinueToListing}
                        disabled={!uploadedImage || !nftName || !selectedCollection}
                        className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Continue to Listing
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    /* NFT Grid */
                    <motion.div
                      key="nft-grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {/* Upload New NFT Card - First Card */}
                      <motion.button
                        key="upload-new"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleUploadClick}
                        className="relative p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#E11D48] bg-gray-50 hover:bg-[#E11D48]/5 transition-all cursor-pointer text-center aspect-square flex flex-col items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#E11D48]/10 flex items-center justify-center mb-2">
                          <Plus className="w-6 h-6 text-[#E11D48]" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Upload New</p>
                        <p className="text-xs text-gray-500">Create & List</p>
                      </motion.button>

                      {/* Existing NFTs */}
                      {displayNFTs.map((nft) => (
                        <motion.button
                          key={nft.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectNFT(nft)}
                          className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer text-left aspect-square ${selectedNFT?.id === nft.id
                            ? "border-[#E11D48] bg-[#E11D48]/5"
                            : "border-gray-200 hover:border-[#E11D48]/50 bg-gray-50"
                            }`}
                        >
                          {selectedNFT?.id === nft.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#E11D48] rounded-full flex items-center justify-center z-10">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full aspect-square rounded-lg object-cover mb-2"
                          />
                          <p className="text-sm font-semibold text-gray-900 truncate">{nft.name}</p>
                          <p className="text-xs text-gray-500">{nft.collection}</p>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            {/* Preview Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

              {selectedNFT ? (
                <div className="flex gap-4">
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{selectedNFT.name}</p>
                    <p className="text-sm text-gray-500">{selectedNFT.collection}</p>
                    {selectedNFT.id?.startsWith('new') && (
                      <span className="inline-flex items-center gap-1 text-xs text-purple-600 mt-1">
                        <ImageDown className="w-3 h-3" />
                        New - Mint & List
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select or upload an NFT</p>
                </div>
              )}
            </div>

            {/* Price Input */}
            {selectedNFT && (
              <>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Your Price</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          className="w-full pl-10 pr-20 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-xl font-mono"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ETH</span>
                      </div>
                      {price && (
                        <p className="text-sm text-gray-500 mt-2">
                          ≈ ${(priceNum * ETH_USD_RATE).toLocaleString()} USD
                        </p>
                      )}
                    </div>

                    {/* Price Validation */}
                    {price && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-xl text-sm flex items-center gap-2 ${isBelowMin
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : isBelowFloor
                            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                          }`}
                      >
                        {isBelowMin ? (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            <span>Price too low (minimum {MIN_PRICE} ETH)</span>
                          </>
                        ) : isBelowFloor ? (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            <span>{(FLOOR_PRICE - priceNum).toFixed(2)} ETH below floor</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Competitive pricing</span>
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* Listing Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setListingType("fixed")}
                          className={`flex-1 py-2 rounded-xl border font-medium transition-colors cursor-pointer ${listingType === "fixed"
                            ? "border-[#E11D48] bg-[#E11D48]/5 text-[#E11D48]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                        >
                          Fixed Price
                        </button>
                        <button
                          onClick={() => setListingType("auction")}
                          className={`flex-1 py-2 rounded-xl border font-medium transition-colors cursor-pointer ${listingType === "auction"
                            ? "border-[#E11D48] bg-[#E11D48]/5 text-[#E11D48]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                        >
                          Auction
                        </button>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                      >
                        <option value={7}>7 days</option>
                        <option value={14}>14 days</option>
                        <option value={30}>30 days</option>
                        <option value={0}>No expiry</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Fee Calculator */}
                {price && isValid && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Calculator</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Your price</span>
                        <span className="font-mono">{price} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform fee (0.5%)</span>
                        <span className="font-mono text-red-500">-{platformFee.toFixed(4)} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Royalty (5%)</span>
                        <span className="font-mono text-red-500">-{royaltyAmount.toFixed(4)} ETH</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>You receive</span>
                        <span className="font-mono text-green-600">{youReceive.toFixed(4)} ETH</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gas Estimate */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Estimated gas</span>
                    </div>
                    <span className="font-mono text-sm">~{gasEstimate} ETH</span>
                  </div>
                </div>

                {/* List Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleListNFT}
                  disabled={!isValid}
                  className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-lg font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {selectedNFT.id?.startsWith('new') ? 'Mint & List NFT' : 'List NFT'}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Listing Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalStep === 1 && "Review Listing"}
                  {modalStep === 2 && (selectedNFT?.id?.startsWith('new') ? "Minting & Listing" : "Approve Listing")}
                  {modalStep === 3 && modalSuccess === null && "Processing"}
                  {modalStep === 3 && modalSuccess === true && "Success!"}
                  {modalStep === 3 && modalSuccess === false && "Failed"}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Review */}
                  {modalStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={selectedNFT?.image} alt={selectedNFT?.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-gray-900">{selectedNFT?.name}</p>
                          <p className="text-sm text-gray-500">{selectedNFT?.collection}</p>
                          {selectedNFT?.id?.startsWith('new') && (
                            <span className="text-xs text-purple-600">New - Will be minted</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Your price</span>
                          <span className="font-mono">{price} ETH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Platform fee (0.5%)</span>
                          <span className="font-mono">-{platformFee.toFixed(4)} ETH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Royalty (5%)</span>
                          <span className="font-mono">-{royaltyAmount.toFixed(4)} ETH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Gas estimate</span>
                          <span className="font-mono">~{gasEstimate} ETH</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>You receive</span>
                          <span className="font-mono text-green-600">{youReceive.toFixed(4)} ETH</span>
                        </div>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300" />
                        <span className="text-sm text-gray-600">I agree to the Terms & Marketplace Fees</span>
                      </label>

                      <button
                        onClick={confirmListing}
                        className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {selectedNFT?.id?.startsWith('new') ? 'Mint & List NFT' : 'Confirm Listing'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Processing */}
                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-[#627EEA]/20 animate-pulse" />
                        <div className="relative w-full h-full rounded-full bg-[#627EEA] flex items-center justify-center">
                          {selectedNFT?.id?.startsWith('new') ? (
                            <ImageDown className="w-10 h-10 text-white" />
                          ) : (
                            <Zap className="w-10 h-10 text-white" />
                          )}
                        </div>
                      </div>

                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {selectedNFT?.id?.startsWith('new') ? 'Minting your NFT...' : 'Confirm in your wallet'}
                      </p>
                      <p className="text-gray-500">Check your wallet for the transaction</p>

                      {txHash && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-500 mb-1">Transaction hash</p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-mono">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
                            <button onClick={copyTxHash} className="cursor-pointer">
                              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Result */}
                  {modalStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8"
                    >
                      {modalSuccess === null ? (
                        <div>
                          <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-[#627EEA]/20 animate-pulse" />
                            <div className="relative w-full h-full rounded-full bg-[#627EEA]/10 flex items-center justify-center">
                              <Loader2 className="w-8 h-8 text-[#627EEA] animate-spin" />
                            </div>
                          </div>
                          <p className="text-lg font-medium text-gray-900">Processing...</p>
                        </div>
                      ) : modalSuccess ? (
                        <div className="space-y-6">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-500" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {selectedNFT?.id?.startsWith('new') ? 'NFT Minted & Listed!' : 'NFT Listed!'}
                            </h3>
                            <p className="text-gray-500">Your NFT is now live on the marketplace</p>
                          </div>
                          <div className="flex gap-3">
                            <button className="flex-1 py-3 rounded-xl btn-primary font-medium cursor-pointer">View Listing</button>
                            <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-gray-300 font-medium cursor-pointer">Close</button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                            <X className="w-10 h-10 text-red-500" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Transaction Failed</h3>
                            <p className="text-gray-500">Please try again</p>
                          </div>
                          <div className="flex gap-3">
                            <button onClick={handleRetry} className="flex-1 py-3 bg-[#E11D48] text-white rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer">
                              <RefreshCw className="w-4 h-4" /> Retry
                            </button>
                            <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-gray-300 font-medium cursor-pointer">Close</button>
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
    </div>
  );
}
