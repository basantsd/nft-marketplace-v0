"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, Mail, AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </motion.div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Something Went Wrong
        </h2>
        
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Don't worry, it's not your wallet connection! Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 rounded-full btn-primary font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all font-medium text-gray-600"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg mx-auto"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Need Help?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            If this problem persists, please contact our support team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Contact Support →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
