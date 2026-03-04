"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const collections = [
  {
    id: 1,
    name: "Things I Saw Walking My Dog",
    artist: "@maxwalks_nyc",
    artistName: "Marcus Chen",
    verified: true,
    description: "365 days. 6 AM walks through NYC. One photo per day. No edits, no filters, just what I saw while Max did his business.",
    items: 247,
    total: 365,
    owners: 89,
    volume: 12.4,
    floorPrice: 0.38,
    royalty: 5,
    created: "March 2024",
    images: [
      "https://images.unsplash.com/photo-1517931524326-bdd55a541177?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Glitch Portraits Vol. 1",
    artist: "@glitch_goddess",
    artistName: "Sofia Rodriguez",
    verified: true,
    description: "I corrupted JPEGs of my childhood photos and found beauty in the mistakes. Each piece is a memory fractured and reborn.",
    items: 50,
    total: 50,
    owners: 34,
    volume: 34.2,
    floorPrice: 0.85,
    royalty: 10,
    created: "February 2024",
    images: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200&h=200&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Apartment 4B Views",
    artist: "@berlin_window",
    artistName: "James Okafor",
    verified: true,
    description: "Same kitchen window. Different days. Berlin through my eyes while I drink coffee and pretend to work.",
    items: 89,
    total: 100,
    owners: 23,
    volume: 8.7,
    floorPrice: 0.25,
    royalty: 5,
    created: "January 2024",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&h=200&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Neon Tokyo Nights",
    artist: "@blender_mike",
    artistName: "Mike Chen",
    verified: true,
    description: "Cyberpunk-inspired 3D renders of Tokyo after dark. Each piece takes 72+ hours to render.",
    items: 24,
    total: 24,
    owners: 18,
    volume: 45.8,
    floorPrice: 1.2,
    royalty: 8,
    created: "December 2023",
    images: [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=200&h=200&fit=crop",
    ],
  },
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Collections with stories</h1>
          <p className="text-gray-500 text-lg">
            Discover curated collections from incredible artists
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl input-field"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-4 rounded-2xl input-field cursor-pointer"
          >
            <option value="volume">Sort by Volume</option>
            <option value="floor">Sort by Floor Price</option>
            <option value="items">Sort by Items</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card overflow-hidden"
            >
              <div className="flex gap-1 p-2">
                {collection.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-1/4 aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-xl text-gray-900">{collection.name}</h3>
                  {collection.verified && (
                    <span className="text-primary" title="Verified">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  by <span className="text-primary">{collection.artist}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{collection.description}</p>

                <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{collection.items}</p>
                    <p className="text-xs text-gray-500">Items</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{collection.owners}</p>
                    <p className="text-xs text-gray-500">Owners</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{collection.volume} ETH</p>
                    <p className="text-xs text-gray-500">Volume</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{collection.floorPrice} ETH</p>
                    <p className="text-xs text-gray-500">Floor</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {collection.items}/{collection.total} minted • {collection.royalty}% royalties
                  </span>
                  <Link
                    href={`/collections/${collection.id}`}
                    className="px-4 py-2 rounded-full btn-primary text-sm"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
