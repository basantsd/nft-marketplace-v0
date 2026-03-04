"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wallet, Upload, DollarSign, Users, Clock, TrendingUp, ExternalLink, MessageCircle, Share2, Star } from "lucide-react";
import NFTCard from "@/components/NFTCard";
// import { mockNFTs } from "@/lib/data";
import Counter from "@/components/Counter";
import Link from "next/link";

const stats = [
  { label: "Artists", value: 2847, suffix: "", icon: Users, color: "text-primary" },
  { label: "ETH Traded", value: 1.2, suffix: "M+", prefix: "$", icon: DollarSign, color: "text-secondary" },
  { label: "NFTs Minted", value: 12483, suffix: "+", icon: TrendingUp, color: "text-accent" },
  { label: "Rating", value: 4.9, suffix: "/5", prefix: "", icon: Star, color: "text-yellow-500", decimals: 1 },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect Your Wallet",
    description: "MetaMask, WalletConnect, or Coinbase - pick your poison. Takes 30 seconds.",
    icon: Wallet,
  },
  {
    step: "02",
    title: "Upload Your Art",
    description: "Drag, drop, done. PNG, JPG, GIF, MP4 - we handle the tech. Add a title that means something.",
    icon: Upload,
  },
  {
    step: "03",
    title: "Set Your Price",
    description: "Fixed price, auction, or free mint. You decide what your art is worth. We take 2.5%, you keep 97.5%.",
    icon: DollarSign,
  },
  {
    step: "04",
    title: "Sell & Earn",
    description: "List it. Share it. Watch the ETH roll in. Plus earn 5-10% royalties every time it resells. Forever.",
    icon: TrendingUp,
  },
];

const liveAuctions = [
  {
    id: 1,
    name: "Brooklyn at Golden Hour",
    artist: "@sarahchen_photo",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop",
    currentBid: 1.8,
    timeLeft: "2h 14m",
    bids: 7,
    story: "Shot from my apartment window. The light only hits like this for 20 minutes.",
  },
  {
    id: 2,
    name: "The Day I Quit My Job",
    artist: "@pixelmancer",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    currentBid: 0.95,
    timeLeft: "5h 42m",
    bids: 12,
    story: "Celebrating freedom. 300 hours in Procreate.",
  },
  {
    id: 3,
    name: "Neon Dreams #7",
    artist: "@blender_mike",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
    currentBid: 2.3,
    timeLeft: "8h 31m",
    bids: 15,
    story: "Part of my Tokyo nights series. Rendered over 72 hours.",
  },
];

const featuredCollections = [
  {
    name: "Things I Saw Walking My Dog",
    artist: "@maxwalks_nyc",
    description: "365 days. 6 AM walks. One photo per day. No edits.",
    items: 247,
    total: 365,
    floorPrice: 0.38,
    volume: 12.4,
    images: [
      "https://images.unsplash.com/photo-1517931524326-bdd55a541177?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop",
    ],
  },
  {
    name: "Glitch Portraits Vol. 1",
    artist: "@glitch_goddess",
    description: "Corrupted JPEGs of my childhood photos. Beautiful mistakes.",
    items: 50,
    total: 50,
    floorPrice: 0.85,
    volume: 34.2,
    images: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200&h=200&fit=crop",
    ],
  },
  {
    name: "Apartment 4B Views",
    artist: "@berlin_window",
    description: "Same window. Different days. Berlin through my kitchen.",
    items: 89,
    total: 100,
    floorPrice: 0.25,
    volume: 8.7,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&h=200&fit=crop",
    ],
  },
];

const featuredCreators = [
  {
    name: "Marcus Chen",
    handle: "@marcuschen_art",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Street photographer. Tokyo-based. Shot on film since 2015.",
    sold: 234,
    volume: 45.2,
    specialty: "Photography",
    followers: "1.2k",
  },
  {
    name: "Sofia Rodriguez",
    handle: "@sofia_creates",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    bio: "Digital painter. Former architect. I make weird internet art.",
    sold: 89,
    volume: 23.8,
    specialty: "Digital Art",
    featured: true,
  },
  {
    name: "James Okafor",
    handle: "@james_3d",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    bio: "3D artist from Lagos. Blender enthusiast. Coffee addict.",
    sold: 156,
    volume: 67.4,
    specialty: "3D Renders",
  },
];

const latestUpdates = [
  {
    title: "How Maria Made $12K Selling Street Photography as NFTs",
    author: "Alex (founder)",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    date: "March 12, 2024",
    readTime: "5 min read",
    excerpt: "We sat down with @sarahchen_photo to talk about her journey from Instagram to selling 234 NFTs.",
    tags: ["Artist Spotlight"],
  },
  {
    title: "Gas Fees Are Killing Artists. Here's What We're Doing About It",
    author: "Maria (team)",
    authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    date: "March 8, 2024",
    readTime: "3 min read",
    excerpt: "We're implementing lazy minting and Layer 2 support. Here's what it means for your wallet.",
    tags: ["Platform Update"],
  },
  {
    title: "The 5 AM Photography Club: Why Constraints Make Better Art",
    author: "Marcus (community)",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    date: "March 5, 2024",
    readTime: "7 min read",
    excerpt: "12 photographers. Same time every day. Different cities. What happened when we all committed to 5 AM for 30 days.",
    tags: ["Community"],
  },
];

const categories = [
  { name: "Photography", count: 234, icon: "📷" },
  { name: "Digital Art", count: 892, icon: "🎨" },
  { name: "3D Renders", count: 156, icon: "🎮" },
  { name: "Music", count: 67, icon: "🎵" },
  { name: "Video", count: 89, icon: "🎬" },
  { name: "Collectibles", count: 445, icon: "🎁" },
];

const testimonials = [
  {
    quote: "I was skeptical about NFTs until I found this platform. The artists here actually care about their work.",
    name: "Mike Chen",
    location: "Toronto",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    quote: "Finally a marketplace that doesn't take 15% fees. I can actually make a living here. Sold 34 NFTs in my first month.",
    name: "Sofia Rodriguez",
    location: "Berlin",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
  },
  {
    quote: "The community here is different. People actually talk to you. I've made friends, not just sales.",
    name: "James Okafor",
    location: "Lagos",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
  },
];

export default function HomePage() {
  // const featuredNFTs = mockNFTs.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6"
            >
              <span>Art that pays you back</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              NFTs without the{" "}
              <span className="gradient-text">bullshit</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto"
            >
              Join 2,847 artists who've made $1.2M selling their work. No gatekeepers, no 50% fees, just you and your art.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/list"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-primary text-lg cursor-pointer"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-secondary text-lg cursor-pointer"
                >
                  Browse Art
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-8 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <span>Featured in:</span>
            <span className="font-medium text-gray-600">NFT Magazine</span>
            <span className="font-medium text-gray-600">CryptoArt Weekly</span>
            <span className="font-medium text-gray-600">The Block</span>
            <span>Powered by:</span>
            <span className="font-medium text-gray-600">Ethereum</span>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50"
              >
                <div className={`p-2 rounded-xl bg-white shadow-sm ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500">From wallet to sales in 4 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary mb-2">{item.step}</p>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE AUCTIONS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-red-500">Live Auctions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ending Soon</h2>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors font-medium"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="relative aspect-square">
                  <img
                    src={auction.image}
                    alt={auction.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {auction.timeLeft}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">{auction.artist}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{auction.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 italic">"{auction.story}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Current Bid</p>
                      <p className="font-bold text-lg gradient-text">{auction.currentBid} ETH</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{auction.bids} bids</p>
                      <p className="text-xs text-green-500">New bid 2m ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-gray-500">Handpicked drops from incredible artists</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {collection.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-1/4 aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
                <p className="text-xs text-primary mb-1">{collection.artist}</p>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{collection.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{collection.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-400">{collection.items}/{collection.total} minted</span>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(collection.items / collection.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Floor</p>
                    <p className="font-medium">{collection.floorPrice} ETH</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Creators</h2>
            <p className="text-gray-500">Meet the artists making waves</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCreators.map((creator, index) => (
              <motion.div
                key={creator.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <img
                  src={creator.photo}
                  alt={creator.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex items-center justify-center gap-1 mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{creator.name}</h3>
                  <span className="text-primary">✓</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{creator.handle}</p>
                <p className="text-sm text-gray-500 mb-4">{creator.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{creator.sold} sold</span>
                  <span>•</span>
                  <span>{creator.volume} ETH volume</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">{creator.specialty}</span>
                  {creator.featured && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">Featured</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Artists Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-4 text-center hover:border-primary cursor-pointer transition-colors"
              >
                <span className="text-2xl mb-2 block">{category.icon}</span>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} items</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING NFTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              >
                Trending Now
              </motion.h2>
              <p className="text-gray-500">Hot drops this week</p>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors font-medium"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {featuredNFTs.map((nft, index) => (
              <NFTCard key={nft.id} nft={nft} index={index} />
            ))} */}
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestUpdates.map((update, index) => (
              <motion.article
                key={update.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {update.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{update.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{update.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <img src={update.authorPhoto} alt={update.author} className="w-6 h-6 rounded-full" />
                      <span>{update.author}</span>
                    </div>
                    <span>{update.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Get art in your inbox
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
                Join 3,847 collectors. Weekly digest of new drops, artist interviews, and market insights. Unsubscribe anytime (but you won't want to).
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 rounded-full input-field text-center sm:text-left"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full btn-primary cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-sm text-gray-400 mt-4">★ ★ ★ ★ ★ "Best NFT newsletter I'm subscribed to" - @collector_mike</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to create?
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators already selling their work. No gatekeepers, just art and earnings.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/list"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-primary text-lg cursor-pointer glow-primary"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
