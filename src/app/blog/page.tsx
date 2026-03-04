"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, MessageCircle, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredArticle = {
  id: 1,
  title: "How Maria Made $12K Selling Street Photography as NFTs",
  author: "Alex (founder)",
  authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
  date: "March 12, 2024",
  readTime: "5 min read",
  category: "Artist Spotlight",
  excerpt: "We sat down with @sarahchen_photo to talk about her journey from Instagram to selling 234 NFTs. Her advice? 'Just start shooting.'",
  image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop",
};

const articles = [
  {
    id: 2,
    title: "Gas Fees Are Killing Artists. Here's What We're Doing About It",
    author: "Maria (team)",
    authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    date: "March 8, 2024",
    readTime: "3 min read",
    category: "Platform Update",
    excerpt: "We're implementing lazy minting and Layer 2 support. Here's the technical breakdown and what it means for your wallet.",
    comments: 23,
  },
  {
    id: 3,
    title: "The 5 AM Photography Club: Why Constraints Make Better Art",
    author: "Marcus (community)",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    date: "March 5, 2024",
    readTime: "7 min read",
    category: "Community",
    excerpt: "12 photographers. Same time every day. Different cities. What happened when we all committed to shooting at 5 AM for 30 days.",
    comments: 45,
  },
  {
    id: 4,
    title: "I Sold My First NFT for 0.01 ETH. Here's What I Learned",
    author: "@newbie_artist",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    date: "March 1, 2024",
    readTime: "4 min read",
    category: "Beginner Guide",
    excerpt: "It wasn't much, but that first sale changed everything. A thread on pricing, promotion, and not giving up after 47 rejections.",
    comments: 67,
  },
  {
    id: 5,
    title: "Behind the Code: How We Built the Marketplace in 90 Days",
    author: "Alex (founder)",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Technical",
    excerpt: "From idea to launch in 3 months. The tech stack, the mistakes, the late nights, and why we chose Ethereum despite the gas fees.",
    comments: 34,
  },
  {
    id: 6,
    title: "Finding Your Style: A Digital Artist's Journey",
    author: "Sofia Rodriguez",
    authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    date: "February 25, 2024",
    readTime: "6 min read",
    category: "Artist Spotlight",
    excerpt: "How I went from copying others to developing a unique glitch aesthetic that people actually want to buy.",
    comments: 28,
  },
];

const categories = ["All", "Artist Spotlight", "Platform Update", "Community", "Beginner Guide", "Technical"];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Stories from the community</h1>
          </div>
          <p className="text-gray-500 text-lg">
            Artist stories, platform updates, and everything in between
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <article className="card overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {featuredArticle.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.authorPhoto}
                      alt={featuredArticle.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{featuredArticle.author}</p>
                      <p className="text-sm text-gray-500">
                        {featuredArticle.date} • {featuredArticle.readTime}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredArticle.id}`}
                    className="px-4 py-2 rounded-full btn-primary"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                category === "All"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img src={article.authorPhoto} alt={article.author} className="w-6 h-6 rounded-full" />
                    <span className="text-gray-500">{article.author}</span>
                  </div>
                  <span className="text-gray-400">{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
