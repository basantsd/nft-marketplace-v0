"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Settings, Share2, Edit3, ExternalLink, Copy, Instagram, Twitter, Send, TrendingUp, TrendingDown, X, Eye, Clock } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import { mockNFTs } from "@/lib/data";

interface ListedNFT {
  id: string;
  name: string;
  image: string;
  price: number;
  listedAt: string;
  views: number;
  endsIn: string;
}

const listedNFTs: ListedNFT[] = [
  { id: "1", name: "Cosmic Dreams #001", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", price: 2.5, listedAt: "2024-01-15", views: 234, endsIn: "6 days" },
  { id: "2", name: "Digital Phoenix", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=400&h=400&fit=crop", price: 1.8, listedAt: "2024-01-14", views: 189, endsIn: "5 days" },
  { id: "3", name: "Neon Cityscapes", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", price: 3.2, listedAt: "2024-01-12", views: 456, endsIn: "3 days" },
];

const portfolioData = [
  { month: "Jul", value: 12.5 },
  { month: "Aug", value: 18.3 },
  { month: "Sep", value: 15.7 },
  { month: "Oct", value: 22.1 },
  { month: "Nov", value: 28.4 },
  { month: "Dec", value: 35.2 },
  { month: "Jan", value: 42.8 },
];

const userProfile = {
  name: "CryptoArtist",
  address: "0x39F...266",
  fullAddress: "0x39F8aB9C1234567890abcdef1234567890abcdef266",
  bio: "Digital artist creating unique NFT artworks. Join me on this creative journey! 🎨",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop",
  stats: {
    created: 42,
    collected: 128,
    sold: 89,
    followers: "12.5K",
    following: 342,
  },
  portfolioValue: 42.8,
  portfolioChange: 12.5,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"owned" | "listings">("owned");
  const userNFTs = mockNFTs.slice(0, 4);
  const maxValue = Math.max(...portfolioData.map(d => d.value));

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 md:h-80"
      >
        <img
          src={userProfile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{userProfile.name}</h1>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Verified
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <code className="text-sm font-mono">{userProfile.address}</code>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                title="Copy address"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
            <p className="text-gray-600 max-w-xl">{userProfile.bio}</p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full btn-secondary cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full btn-secondary cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-primary font-medium cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              Connect
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="lg:col-span-2">
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Portfolio Value
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">7D</span>
                  <span className="text-sm text-gray-300">|</span>
                  <span className="text-sm text-gray-500">1M</span>
                  <span className="text-sm text-gray-300">|</span>
                  <span className="text-sm font-medium text-gray-900">ALL</span>
                </div>
              </div>
              
              <div className="flex items-end gap-2 h-48 mb-4">
                {portfolioData.map((item, index) => (
                  <motion.div
                    key={item.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.value} ETH
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                {portfolioData.map((item) => (
                  <span key={item.month}>{item.month}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="card p-6 h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-bold text-gray-900">{userProfile.portfolioValue} ETH</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Change (30D)</span>
                  <span className={`font-bold flex items-center gap-1 ${userProfile.portfolioChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {userProfile.portfolioChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {userProfile.portfolioChange >= 0 ? '+' : ''}{userProfile.portfolioChange}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Active Listings</span>
                  <span className="font-bold text-gray-900">{listedNFTs.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Total Sold</span>
                  <span className="font-bold text-gray-900">{userProfile.stats.sold}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="card px-6 py-4 text-center min-w-[100px]">
            <p className="text-2xl font-bold text-gray-900">{userProfile.stats.created}</p>
            <p className="text-gray-500 text-sm">Created</p>
          </div>
          <div className="card px-6 py-4 text-center min-w-[100px]">
            <p className="text-2xl font-bold text-gray-900">{userProfile.stats.collected}</p>
            <p className="text-gray-500 text-sm">Collected</p>
          </div>
          <div className="card px-6 py-4 text-center min-w-[100px]">
            <p className="text-2xl font-bold text-gray-900">{userProfile.stats.sold}</p>
            <p className="text-gray-500 text-sm">Sold</p>
          </div>
          <div className="card px-6 py-4 text-center min-w-[100px]">
            <p className="text-2xl font-bold text-gray-900">{userProfile.stats.followers}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="card px-6 py-4 text-center min-w-[100px]">
            <p className="text-2xl font-bold text-gray-900">{userProfile.stats.following}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Instagram className="w-5 h-5 text-gray-400" />
            <Twitter className="w-5 h-5 text-gray-400" />
            <Send className="w-5 h-5 text-gray-400" />
            <a href="#" className="flex items-center gap-1 text-primary hover:text-primary/70 transition-colors font-medium">
              <ExternalLink className="w-4 h-4" />
              Website
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {(["owned", "listings"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab === "owned" ? "My NFTs" : "My Listings"}
                </motion.button>
              ))}
            </div>
            
            {activeTab === "listings" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-2 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                Manage Listings
              </motion.button>
            )}
          </div>

          {activeTab === "owned" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userNFTs.map((nft, index) => (
                <NFTCard key={nft.id} nft={nft} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {listedNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-4 flex items-center gap-6"
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{nft.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Listed on {nft.listedAt}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        {nft.views} views
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        Ends in {nft.endsIn}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 font-mono">{nft.price} ETH</p>
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
