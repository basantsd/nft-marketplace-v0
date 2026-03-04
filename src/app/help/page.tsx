"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Mail, Twitter, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "Getting Started",
    icon: "🚀",
    questions: [
      {
        q: "How do I connect my wallet?",
        a: "Click 'Connect Wallet' in the top right. We support MetaMask, WalletConnect, and Coinbase Wallet. If you don't have a wallet yet, we recommend MetaMask - it's free and takes 2 minutes to set up.",
      },
      {
        q: "Do I need ETH to buy NFTs?",
        a: "Yes, you'll need Ethereum (ETH) to buy NFTs and pay gas fees. You can buy ETH on Coinbase, Binance, or MetaMask itself. Pro tip: Always keep a little extra ETH for gas - transactions fail if you don't have enough.",
      },
      {
        q: "What's a gas fee and why is it so high?",
        a: "Gas fees are payments to Ethereum miners/validators to process your transaction. They're not paid to us - they're paid to the network. Fees vary based on network congestion. We're working on Layer 2 support to reduce this.",
      },
    ],
  },
  {
    name: "Buying NFTs",
    icon: "🛒",
    questions: [
      {
        q: "I bought an NFT but don't see it in my wallet",
        a: "First, don't panic - your NFT is safe on the blockchain. It can take 5-10 minutes to show up in your wallet. Try: 1) Refresh your wallet, 2) Check the transaction on Etherscan, 3) Add the NFT contract address manually.",
      },
      {
        q: "Can I return an NFT if I change my mind?",
        a: "Nope. NFT sales are final - that's the beauty (and terror) of blockchain. Make sure you love it before you buy. Always check: the artwork, the price, the creator's reputation, and that you're buying from the official collection.",
      },
    ],
  },
  {
    name: "Selling NFTs",
    icon: "💰",
    questions: [
      {
        q: "How much does it cost to list an NFT?",
        a: "Listing is free! You only pay gas fees when you first approve the marketplace to access your NFT (one-time per collection). When your NFT sells, we take 2.5% and you keep 97.5%.",
      },
      {
        q: "Why isn't my NFT selling?",
        a: "Harsh truth: The market is saturated. To stand out: 1) Price reasonably, 2) Promote on Twitter/Discord, 3) Build a community, 4) Create consistently, 5) Network with other artists. Also, sometimes it's just bad timing. Don't give up.",
      },
    ],
  },
  {
    name: "Troubleshooting",
    icon: "🔧",
    questions: [
      {
        q: "My transaction failed. What do I do?",
        a: "First, check Etherscan for the error. Common issues: 1) Not enough ETH for gas, 2)Nonce too low, 3) Network congestion. Try increasing gas or wait for less busy times (early morning UTC).",
      },
      {
        q: "The page isn't loading properly",
        a: "Try: 1) Clear your browser cache, 2) Disable extensions (especially ad blockers), 3) Use a different browser, 4) Check our status page for outages.",
      },
    ],
  },
];

export default function HelpPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">We're here to help</h1>
          </div>
          <p className="text-gray-500 text-lg">
            Answers to questions you're actually asking
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-12"
        >
          {categories.map((category, catIndex) => (
            <div key={category.name} className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
              </div>
              <div className="space-y-2">
                {category.questions.map((item, qIndex) => {
                  const globalIndex = catIndex * 10 + qIndex;
                  return (
                    <div key={qIndex} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === globalIndex ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            openQuestion === globalIndex ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openQuestion === globalIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="px-4 pb-4"
                        >
                          <p className="text-gray-600">{item.a}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Can't find your answer?</h3>
          <p className="text-gray-500 mb-6">
            We're real humans, not bots. We actually read every message.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:help@nexusnft.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
            <a
              href="https://discord.gg/nexusnft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-secondary"
            >
              <MessageCircle className="w-5 h-5" />
              Join Discord
            </a>
            <a
              href="https://twitter.com/nexusnft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-secondary"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">We reply within 24 hours</p>
        </motion.div>
      </div>
    </div>
  );
}
