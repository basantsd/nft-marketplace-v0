"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#F9F9F9]">
        <div className="min-h-screen flex items-center justify-center px-4">
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

            <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Critical Error
            </h2>
            
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Something went wrong at the application level. Please try refreshing the page.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium"
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
          </motion.div>
        </div>
      </body>
    </html>
  );
}
