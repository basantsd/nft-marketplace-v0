"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
        >
          <span className="text-6xl">🔍</span>
        </motion.div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the blockchain. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full btn-primary font-medium"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all font-medium text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg mx-auto"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/explore"
              className="px-4 py-2 bg-gray-50 hover:bg-primary/10 rounded-full text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Explore NFTs
            </Link>
            <Link
              href="/collections"
              className="px-4 py-2 bg-gray-50 hover:bg-primary/10 rounded-full text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/trending"
              className="px-4 py-2 bg-gray-50 hover:bg-primary/10 rounded-full text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-gray-50 hover:bg-primary/10 rounded-full text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
