"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Eye, Clock, ArrowUp, Users, Zap, Award } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import { mockNFTs } from "@/lib/data";
import Link from "next/link";

const trendingNFTs = [
  {
    id: 1,
    name: "Brooklyn at Dawn",
    artist: "@sarahchen_photo",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop",
    price: 2.4,
    change: 156,
    views: 3847,
    bids: 12,
    timeAgo: "2 hours",
    whyTrending: "Featured in NFT Magazine this morning",
  },
  {
    id: 2,
    name: "The Day I Quit My Job",
    artist: "@pixelmancer",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    price: 1.8,
    change: 89,
    views: 2134,
    bids: 8,
    timeAgo: "5 hours",
    whyTrending: "Story resonated with community",
  },
  {
    id: 3,
    name: "Neon Dreams #12",
    artist: "@blender_mike",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
    price: 0.95,
    change: 67,
    views: 1823,
    bids: 5,
    timeAgo: "Just sold",
    whyTrending: "Part of sold-out series",
  },
  {
    id: 4,
    name: "Glitch Portrait #23",
    artist: "@glitch_goddess",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    price: 1.2,
    change: 45,
    views: 1456,
    bids: 3,
    timeAgo: "12 hours",
    whyTrending: "Viral on Twitter",
  },
];

const risingArtists = [
  {
    handle: "@newbie_artist",
    name: "Alex",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Joined 3 days ago, already sold 12 NFTs",
    specialty: "Digital Art",
  },
  {
    handle: "@midnight_creator",
    name: "Jordan",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    bio: "Drops at 3 AM, always sells out",
    specialty: "Photography",
  },
  {
    handle: "@first_time_nft",
    name: "Sam",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    bio: "Traditional painter's first NFT collection",
    specialty: "Traditional Art",
  },
];

const trendingIndicators = [
  { icon: Flame, label: "234% increase in views", color: "text-orange-500" },
  { icon: ArrowUp, label: "12 new bids in last hour", color: "text-green-500" },
  { icon: TrendingUp, label: "Volume up 89% from yesterday", color: "text-blue-500" },
];

export default function TrendingPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">What's hot right now</h1>
          </div>
          <p className="text-gray-500 text-lg">
            Based on views, bids, and sales in the last 24 hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {trendingIndicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
            >
              <indicator.icon className={`w-4 h-4 ${indicator.color}`} />
              <span className="text-sm font-medium text-gray-700">{indicator.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {trendingNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      +{nft.change}%
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{nft.artist}</p>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{nft.name}</h3>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{nft.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Zap className="w-4 h-4" />
                        <span>{nft.bids} bids</span>
                      </div>
                    </div>
                    <p className="text-xs text-primary mb-3">✓ {nft.whyTrending}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Current Price</p>
                        <p className="font-bold text-lg gradient-text">{nft.price} ETH</p>
                      </div>
                      <Link
                        href={`/nft/${nft.id}`}
                        className="px-4 py-2 rounded-full btn-primary text-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <aside className="w-full lg:w-80">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Rising Stars</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Artists to watch this week</p>
              
              <div className="space-y-4">
                {risingArtists.map((artist) => (
                  <div key={artist.handle} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <img
                      src={artist.photo}
                      alt={artist.handle}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{artist.handle}</p>
                      <p className="text-xs text-gray-500 truncate">{artist.bio}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {artist.specialty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
