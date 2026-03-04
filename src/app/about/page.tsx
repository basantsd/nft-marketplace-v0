"use client";

import { motion } from "framer-motion";
import { Heart, Users, Globe, Award, Zap, Shield, TrendingUp, CheckCircle } from "lucide-react";

const team = [
  {
    name: "Alex Chen",
    role: "Co-Founder & Developer",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Former photographer, current code monkey. Built Nexus after getting frustrated with existing marketplaces.",
    location: "Lisbon, Portugal",
    twitter: "alexchen_dev",
    funFact: "Still shoots film on weekends",
  },
  {
    name: "Maria Rodriguez",
    role: "Co-Founder & Designer",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Artist relations & UX design. Former gallery owner who saw how broken the art world is.",
    location: "Berlin, Germany",
    twitter: "maria_creates",
    funFact: "Has a cat named NFT (Non-Fungible Tabby)",
  },
  {
    name: "James Okafor",
    role: "Community Manager",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bio: "Keeps our Discord from becoming chaos. 3D artist himself, understands creator struggles.",
    location: "Lagos, Nigeria",
    twitter: "james_3d",
    funFact: "Runs a photography workshop on weekends",
  },
];

const values = [
  {
    icon: Heart,
    title: "Artists First",
    description: "Every decision starts with: 'Does this help artists?' If not, we don't do it.",
  },
  {
    icon: Zap,
    title: "Radical Transparency",
    description: "We publish our fees, our uptime, our mistakes. No hidden agendas.",
  },
  {
    icon: Shield,
    title: "Actually Enforce Royalties",
    description: "Smart contracts don't lie. Creators earn on every resale, automatically.",
  },
  {
    icon: Users,
    title: "Human Support",
    description: "Real people answer your emails. No bots, no ticket queues that go nowhere.",
  },
];

const stats = [
  { value: "2,847", label: "Artists supported" },
  { value: "$1.2M", label: "ETH traded" },
  { value: "12,483", label: "NFTs minted" },
  { value: "47", label: "Countries" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Nexus NFT</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              Hey, I'm Alex. I built Nexus because I was tired of seeing artists get screwed.
            </p>
            <p className="text-gray-600 mb-4">
              I'm a photographer turned developer. I spent 5 years posting my work on Instagram, getting likes but making nothing. Then I tried NFTs on a major marketplace. Sold a few pieces, but they took 15% fees, my royalties were ignored, and support was non-existent.
            </p>
            <p className="text-gray-600 mb-4">
              I thought: "I can build something better."
            </p>
            <p className="text-gray-600 mb-4">
              So I quit my job (scary), learned Solidity (hard), and spent 6 months building Nexus with my co-founder Maria (she's the smart one).
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is simple: Help artists make money from their art. Not 'someday maybe' money. Actual money, today.
            </p>
            <p className="text-gray-600 mb-4">
              We take 2.5% fees (not 15%). We enforce royalties (actually). We respond to support tickets (within 24 hours, promise). And we're building features artists actually want, not just what looks good in a pitch deck.
            </p>
            <p className="text-gray-600 mb-6">
              This isn't a VC-backed moonshot. This is a real business helping real creators.
            </p>
            <p className="text-gray-900 font-semibold">
              Thanks for being here.
            </p>
            <p className="text-gray-600">
              Alex & Maria<br />
              Founders, Nexus NFT
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-4">
                  <span>📍 {member.location}</span>
                </div>
                <p className="text-xs text-gray-400">P.S. {member.funFact}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
