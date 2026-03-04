"use client";

import { motion } from "framer-motion";
import { Search, Twitter, Instagram, Globe, Award, TrendingUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const artists = [
  {
    id: 1,
    name: "Marcus Chen",
    handle: "@marcuschen_art",
    verified: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Street photographer. Tokyo-based. Shot on film since 2015. Coffee addict.",
    sold: 234,
    followers: "1.2k",
    volume: 45.2,
    specialty: "Photography",
    twitter: "marcuschen_art",
    instagram: "marcuschen.photo",
    website: "marcuschen.photo",
    joined: "February 2024",
    location: "Tokyo, Japan",
    featured: true,
    topSeller: true,
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    handle: "@sofia_creates",
    verified: true,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Digital painter. Former architect. I make weird internet art and occasionally sleep.",
    sold: 89,
    followers: "847",
    volume: 23.8,
    specialty: "Digital Art",
    twitter: "sofia_creates",
    instagram: "sofia.creates",
    joined: "January 2024",
    location: "Berlin, Germany",
    featured: true,
  },
  {
    id: 3,
    name: "James Okafor",
    handle: "@james_3d",
    verified: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bio: "3D artist from Lagos. Blender enthusiast. Coffee addict.",
    sold: 156,
    followers: "634",
    volume: 67.4,
    specialty: "3D Renders",
    twitter: "james_3d",
    artstation: "james3d",
    joined: "December 2023",
    location: "Lagos, Nigeria",
    topSeller: true,
  },
  {
    id: 4,
    name: "Sarah Chen",
    handle: "@sarahchen_photo",
    verified: true,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Street photographer. Brooklyn-based. Capturing moments you'd otherwise miss.",
    sold: 189,
    followers: "2.1k",
    volume: 52.3,
    specialty: "Photography",
    twitter: "sarahchen_photo",
    joined: "March 2024",
    location: "Brooklyn, USA",
    newThisWeek: true,
  },
  {
    id: 5,
    name: "Mike Chen",
    handle: "@blender_mike",
    verified: true,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "3D artist. Cyberpunk enthusiast. I render while you sleep.",
    sold: 67,
    followers: "423",
    volume: 34.9,
    specialty: "3D Renders",
    twitter: "blender_mike",
    joined: "November 2023",
    location: "Seoul, Korea",
  },
  {
    id: 6,
    name: "Emma Wilson",
    handle: "@glitch_goddess",
    verified: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    bio: "Digital artist. Glitch specialist. Finding beauty in errors.",
    sold: 45,
    followers: "312",
    volume: 18.2,
    specialty: "Digital Art",
    twitter: "glitch_goddess",
    joined: "February 2024",
    location: "London, UK",
  },
];

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.handle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "featured") return matchesSearch && artist.featured;
    if (filter === "new") return matchesSearch && artist.newThisWeek;
    if (filter === "topSeller") return matchesSearch && artist.topSeller;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Meet the creators</h1>
          <p className="text-gray-500 text-lg">
            Real artists making real art. Support them directly.
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
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl input-field"
            />
          </div>
          <div className="flex gap-2">
            {["all", "featured", "new", "topSeller"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {f === "all" ? "All" : f === "featured" ? "Featured" : f === "new" ? "New This Week" : "Top Sellers"}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {artist.verified && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                    {artist.featured && (
                      <Award className="w-4 h-4 text-primary" />
                    )}
                    {artist.topSeller && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{artist.handle}</p>
                  <div className="flex gap-2 mt-1">
                    {artist.newThisWeek && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                        New this week
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{artist.bio}</p>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-500">{artist.sold} sold</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{artist.followers} followers</span>
                <span className="text-gray-500">•</span>
                <span className="font-medium text-primary">{artist.volume} ETH volume</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  {artist.specialty}
                </span>
                <div className="flex gap-2">
                  {artist.twitter && (
                    <a
                      href={`https://twitter.com/${artist.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {artist.website && (
                    <a
                      href={`https://${artist.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/profile?id=${artist.id}`}
                  className="block w-full py-2 text-center rounded-full btn-secondary text-sm"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
