"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { use } from "react";
import { ArrowLeft, Share2, Heart, Filter, Grid3X3, List, ExternalLink, Twitter, Instagram, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import NFTCard from "@/components/NFTCard";
import { mockNFTs } from "@/lib/data";

const collectionsData: Record<string, {
  id: string;
  name: string;
  artist: string;
  artistName: string;
  verified: boolean;
  description: string;
  longDescription: string;
  items: number;
  total: number;
  owners: number;
  volume: number;
  floorPrice: number;
  royalty: number;
  created: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  images: string[];
}> = {
  "1": {
    id: "1",
    name: "Things I Saw Walking My Dog",
    artist: "@maxwalks_nyc",
    artistName: "Marcus Chen",
    verified: true,
    description: "365 days. 6 AM walks. One photo per day. No edits, no filters, just what I saw while Max did his business.",
    longDescription: `Every morning at 6 AM, my dog Max needs to go out. For the past year, I've been documenting what I see on our walks through Brooklyn and Manhattan.

This started as a personal project to make early mornings more bearable. Now it's a time capsule of the city at the hour when only delivery trucks and insomniacs are awake.

Each photo is unedited. What you see is what I saw. Rain, shine, or snow - we walk every day.`,
    items: 247,
    total: 365,
    owners: 89,
    volume: 12.4,
    floorPrice: 0.38,
    royalty: 5,
    created: "March 2024",
    twitter: "maxwalks_nyc",
    instagram: "maxwalks.nyc",
    website: "maxwalks.nyc",
    images: [
      "https://images.unsplash.com/photo-1517931524326-bdd55a541177?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop",
    ],
  },
  "2": {
    id: "2",
    name: "Glitch Portraits Vol. 1",
    artist: "@glitch_goddess",
    artistName: "Sofia Rodriguez",
    verified: true,
    description: "Corrupted JPEGs of my childhood photos. Beautiful mistakes.",
    longDescription: `I started this project during lockdown, digging through old family photos. Instead of restoring them, I decided to corrupt them deliberately.

Each piece is a memory fractured and reborn. The glitching process is randomized - I never know exactly what the final piece will look like. That's the beauty of it.`,
    items: 50,
    total: 50,
    owners: 34,
    volume: 34.2,
    floorPrice: 0.85,
    royalty: 10,
    created: "February 2024",
    twitter: "glitch_goddess",
    images: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=400&fit=crop",
    ],
  },
  "3": {
    id: "3",
    name: "Apartment 4B Views",
    artist: "@berlin_window",
    artistName: "James Okafor",
    verified: true,
    description: "Same kitchen window. Different days. Berlin through my eyes while I drink coffee and pretend to work.",
    longDescription: `I moved to Berlin last year and spent way too much time looking out my kitchen window instead of working. So I decided to make it productive.

Same window. Different days. This collection captures Berlin through my kitchen - rainy mornings, snowy evenings, golden summer sunsets, and those gray days that make the city feel like a movie set.`,
    items: 89,
    total: 100,
    owners: 23,
    volume: 8.7,
    floorPrice: 0.25,
    royalty: 5,
    created: "January 2024",
    twitter: "berlin_window",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=400&fit=crop",
    ],
  },
  "4": {
    id: "4",
    name: "Neon Tokyo Nights",
    artist: "@blender_mike",
    artistName: "Mike Chen",
    verified: true,
    description: "Cyberpunk-inspired 3D renders of Tokyo after dark.",
    longDescription: `This series started when I couldn't sleep during a Tokyo business trip. Instead of fighting it, I started rendering.

Each piece takes 72+ hours to render. The neon lights, the rain-slicked streets, the glow of advertisements - Tokyo at night is unlike anywhere else on Earth.`,
    items: 24,
    total: 24,
    owners: 18,
    volume: 45.8,
    floorPrice: 1.2,
    royalty: 8,
    created: "December 2023",
    twitter: "blender_mike",
    images: [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&h=400&fit=crop",
    ],
  },
};

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const collection = collectionsData[id] || collectionsData["1"];
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const nfts = mockNFTs.slice(0, collection.items);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card overflow-hidden mb-8"
        >
          <div className="h-48 md:h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative">
            <div className="absolute inset-0 flex">
              {collection.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-1/4 h-full object-cover"
                />
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
                  {collection.verified && (
                    <span className="text-primary" title="Verified">
                      <CheckCircle className="w-6 h-6" />
                    </span>
                  )}
                </div>
                <p className="text-gray-500">
                  Created by{" "}
                  <Link href={`/artists`} className="text-primary hover:underline">
                    {collection.artist}
                  </Link>
                  {" "} • {collection.created}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-900">{collection.items}</p>
            <p className="text-sm text-gray-500">Items</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-900">{collection.owners}</p>
            <p className="text-sm text-gray-500">Owners</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-900">{collection.volume} ETH</p>
            <p className="text-sm text-gray-500">Volume</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="card p-4 text-center"
          >
            <p className="text-2xl font-bold gradient-text">{collection.floorPrice} ETH</p>
            <p className="text-sm text-gray-500">Floor Price</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-900">{collection.royalty}%</p>
            <p className="text-sm text-gray-500">Royalties</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="card p-6 mb-8"
        >
          <h2 className="font-semibold text-gray-900 mb-4">About this collection</h2>
          <div className="prose prose-sm max-w-none">
            {collection.longDescription.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-600 mb-4">{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            {collection.twitter && (
              <a
                href={`https://twitter.com/${collection.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            )}
            {collection.instagram && (
              <a
                href={`https://instagram.com/${collection.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            )}
            {collection.website && (
              <a
                href={`https://${collection.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Website
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {collection.items} Items
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl input-field text-sm cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="likes">Most Liked</option>
            </select>
            <div className="flex rounded-xl overflow-hidden border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 cursor-pointer ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 cursor-pointer ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }
        >
          {nfts.map((nft, index) => (
            <NFTCard key={nft.id} nft={nft} index={index} variant={viewMode} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
