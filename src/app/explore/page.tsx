"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List, TrendingUp, Clock, DollarSign, ArrowUpDown } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import BuyModal from "@/components/BuyModal";
import { mockNFTs, categories } from "@/lib/data";
import { NFT } from "@/lib/data";

type ViewMode = "grid" | "list";
type SortOption = "trending" | "price-low" | "price-high" | "recent";

const pricePresets = [
  { label: "All", min: 0, max: 100 },
  { label: "Under 0.5", min: 0, max: 0.5 },
  { label: "0.5 - 2", min: 0.5, max: 2 },
  { label: "2 - 5", min: 2, max: 5 },
  { label: "5 - 10", min: 5, max: 10 },
];

const sortOptions = [
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "price-low", label: "Price: Low to High", icon: DollarSign },
  { value: "price-high", label: "Price: High to Low", icon: DollarSign },
  { value: "recent", label: "Recently Listed", icon: Clock },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });
  const [activePricePreset, setActivePricePreset] = useState("All");
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredNFTs = mockNFTs.filter((nft) => {
    const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = nft.price >= priceRange.min && nft.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "recent":
        return b.id.localeCompare(a.id);
      case "trending":
      default:
        return b.likes - a.likes;
    }
  });

  const displayedNFTs = sortedNFTs.slice(0, displayCount);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const suggestions = mockNFTs
        .filter(nft => 
          nft.name.toLowerCase().includes(value.toLowerCase()) ||
          nft.collection.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
        .map(nft => nft.name);
      setSearchSuggestions([...new Set(suggestions)]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handlePricePresetClick = (preset: typeof pricePresets[0]) => {
    setIsLoading(true);
    setPriceRange({ min: preset.min, max: preset.max });
    setActivePricePreset(preset.label);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    if (category !== "All" && !activeFilters.includes(category)) {
      setActiveFilters([...activeFilters, category]);
    }
    setTimeout(() => setIsLoading(false), 300);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    if (filter === selectedCategory) {
      setSelectedCategory("All");
    }
    if (filter === activePricePreset) {
      setActivePricePreset("All");
      setPriceRange({ min: 0, max: 100 });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPriceRange({ min: 0, max: 100 });
    setActivePricePreset("All");
    setActiveFilters([]);
    setSortBy("trending");
  };

  const handleBuyClick = (nft: NFT) => {
    setSelectedNFT(nft);
    setIsBuyModalOpen(true);
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 12);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse NFTs</h1>
          <p className="text-gray-500 text-lg">
            Discover unique digital artworks from talented artists worldwide
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full lg:w-72 flex-shrink-0"
              >
                <div className="card p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-1 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Price Range (ETH)
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {pricePresets.map((preset) => (
                        <motion.button
                          key={preset.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePricePresetClick(preset)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            activePricePreset === preset.label
                              ? "btn-primary"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          } cursor-pointer`}
                        >
                          {preset.label}
                        </motion.button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={priceRange.max}
                        onChange={(e) => {
                          setPriceRange({ ...priceRange, max: parseFloat(e.target.value) });
                          setActivePricePreset("Custom");
                        }}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={priceRange.min}
                          onChange={(e) => {
                            setPriceRange({ ...priceRange, min: parseFloat(e.target.value) });
                            setActivePricePreset("Custom");
                          }}
                          className="w-full px-3 py-2 rounded-lg input-field text-sm font-mono"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="number"
                          step="0.01"
                          value={priceRange.max}
                          onChange={(e) => {
                            setPriceRange({ ...priceRange, max: parseFloat(e.target.value) });
                            setActivePricePreset("Custom");
                          }}
                          className="w-full px-3 py-2 rounded-lg input-field text-sm font-mono"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Categories
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategory === category}
                            onChange={() => handleCategoryChange(category)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Blockchain */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Blockchain
                    </label>
                    <div className="space-y-2">
                      {["Ethereum", "Polygon", "Solana", "Avalanche"].map((chain) => (
                        <label key={chain} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={chain === "Ethereum"}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600">{chain}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search NFTs, collections, or artists..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl input-field"
                />
                <AnimatePresence>
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      {searchSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span className="text-gray-700">{suggestion}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl btn-secondary cursor-pointer"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </motion.button>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none px-4 py-4 pr-10 rounded-2xl input-field cursor-pointer bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex rounded-2xl overflow-hidden border border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("grid")}
                    className={`p-4 cursor-pointer ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("list")}
                    className={`p-4 cursor-pointer ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  >
                    <List className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3 overflow-x-auto scrollbar-hide mb-8 pb-2"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "btn-primary"
                      : "btn-secondary"
                  } cursor-pointer`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Active Filters Bar */}
            {(activeFilters.length > 0 || searchQuery || priceRange.min > 0 || priceRange.max < 100) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-100"
              >
                <span className="text-sm text-gray-500 mr-2">Active filters:</span>
                {activeFilters.map((filter) => (
                  <motion.span
                    key={filter}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-1 hover:text-primary/70 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
                {searchQuery && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-gray-800 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                {(priceRange.min > 0 || priceRange.max < 100) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {priceRange.min} - {priceRange.max} ETH
                    <button onClick={() => { setPriceRange({ min: 0, max: 100 }); setActivePricePreset("All"); }} className="ml-1 hover:text-gray-800 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-500 hover:text-red-600 ml-2 cursor-pointer"
                >
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <p className="text-gray-500">
                {sortedNFTs.length} results found
              </p>
              <p className="text-sm text-gray-400">
                Showing {Math.min(displayCount, sortedNFTs.length)} of {sortedNFTs.length} NFTs
              </p>
            </motion.div>

            {/* NFT Grid */}
            {isLoading ? (
              <SkeletonLoader count={viewMode === "grid" ? 8 : 4} />
            ) : displayedNFTs.length > 0 ? (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                  }
                >
                  {displayedNFTs.map((nft, index) => (
                    <div key={nft.id} onClick={() => handleBuyClick(nft)}>
                      <NFTCard nft={nft} index={index} variant={viewMode} />
                    </div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                {displayCount < sortedNFTs.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-10"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={loadMore}
                      className="px-8 py-4 rounded-2xl btn-secondary cursor-pointer"
                    >
                      Load More ({sortedNFTs.length - displayCount} remaining)
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 card"
              >
                <p className="text-xl text-gray-400 mb-4">No NFTs found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <BuyModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)} 
        nft={selectedNFT ? {
          id: selectedNFT.id,
          name: selectedNFT.name,
          price: selectedNFT.price,
          image: selectedNFT.image
        } : null} 
      />
    </div>
  );
}
