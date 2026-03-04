"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { NFT } from "@/lib/data";
import Link from "next/link";
import { useRef } from "react";

interface NFTCardProps {
  nft: NFT;
  index?: number;
  variant?: "grid" | "list";
}

export default function NFTCard({ nft, index = 0, variant = "grid" }: NFTCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
      onMouseMove={variant === "grid" ? handleMouseMove : undefined}
      onMouseLeave={variant === "grid" ? handleMouseLeave : undefined}
      style={{ transformStyle: "preserve-3d" }}
      className={`group ${variant === "list" ? "w-full" : ""}`}
    >
      <Link href={`/nft/${nft.id}`}>
        <div 
          className={`card overflow-hidden cursor-pointer ${variant === "list" ? "flex" : ""}`} 
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`relative ${variant === "list" ? "w-48 h-48 flex-shrink-0" : "aspect-square"} overflow-hidden bg-gray-100`}>
            <motion.img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ transform: "translateZ(0)" }}
            />
            <div className="absolute top-3 left-3">
              <span className="badge badge-secondary">
                {nft.category}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            </motion.button>
          </div>

          <div className={`p-4 ${variant === "list" ? "flex-1 flex items-center justify-between" : ""}`}>
            <div className={variant === "list" ? "flex-1" : ""}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{nft.collection}</span>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Eye className="w-3 h-3" />
                  <span>{nft.likes}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-3 truncate">{nft.name}</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Current Price</p>
                  <p className="font-bold text-lg gradient-text font-mono">{nft.price} ETH</p>
                </div>
                {variant === "grid" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full btn-primary text-sm font-medium buy-button-reveal cursor-pointer"
                  >
                    Buy
                  </motion.button>
                )}
              </div>
            </div>
            {variant === "list" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full btn-primary text-sm font-medium cursor-pointer ml-4"
              >
                Buy Now
              </motion.button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
