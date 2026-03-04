"use client";

import { motion } from "framer-motion";

const techStacks = [
  { name: "Next.js", icon: "⚡" },
  { name: "Solidity", icon: "💎" },
  { name: "Hardhat", icon: "🔨" },
  { name: "Wagmi", icon: "🐻" },
  { name: " ethers.js", icon: "🔗" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Framer", icon: "✨" },
  { name: "IPFS", icon: "🌐" },
  { name: "Polygon", icon: "⬡" },
];

export default function TechStackMarquee() {
  return (
    <div className="py-8 border-t border-gray-100 bg-white">
      <p className="text-center text-sm text-gray-400 mb-6">Built with modern technologies</p>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee">
          {[...techStacks, ...techStacks, ...techStacks].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 px-6 py-3 mx-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors cursor-pointer grayscale hover:grayscale-0"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm font-medium text-gray-600">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
