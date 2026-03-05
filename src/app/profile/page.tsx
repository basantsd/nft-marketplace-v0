"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

import { motion } from "framer-motion";
import { Wallet, Settings, Share2, Edit3, ExternalLink, Copy, Instagram, Twitter, Send, TrendingUp, TrendingDown, X, Eye, Clock, LogOut, Globe, Loader2 } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import { mockNFTs } from "@/lib/data";
import { useAccount, useDisconnect } from "wagmi";
import { useWalletModal } from "@/context/WalletModalContext";

interface UserProfile {
  walletAddress: string;
  name: string;
  avatar: string;
  bio: string;
  website: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

interface ListedNFT {
  id: string;
  name: string;
  image: string;
  price: number;
  listedAt: string;
  views: number;
  endsIn: string;
}

const listedNFTs: ListedNFT[] = [
  { id: "1", name: "Cosmic Dreams #001", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", price: 2.5, listedAt: "2024-01-15", views: 234, endsIn: "6 days" },
  { id: "2", name: "Digital Phoenix", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=400&h=400&fit=crop", price: 1.8, listedAt: "2024-01-14", views: 189, endsIn: "5 days" },
  { id: "3", name: "Neon Cityscapes", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", price: 3.2, listedAt: "2024-01-12", views: 456, endsIn: "3 days" },
];

const portfolioData = [
  { month: "Jul", value: 12.5 },
  { month: "Aug", value: 18.3 },
  { month: "Sep", value: 15.7 },
  { month: "Oct", value: 22.1 },
  { month: "Nov", value: 28.4 },
  { month: "Dec", value: 35.2 },
  { month: "Jan", value: 42.8 },
];

const defaultProfile = {
  name: "",
  avatar: "",
  bio: "",
  website: "",
  twitter: "",
  instagram: "",
  youtube: "",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"owned" | "listings">("owned");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultProfile);
  
  const { open: openWalletModal } = useWalletModal();
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!isConnected || !address) {
      notFound();
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (address) {
      fetchUserProfile();
    }
  }, [address]);

  const fetchUserProfile = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/user?walletAddress=${address}`);
      
      if (!res.ok) {
        setLoading(false);
        return;
      }
      
      const text = await res.text();
      if (!text) {
        setLoading(false);
        return;
      }
      
      const data = JSON.parse(text);
      if (data.exists && data.user) {
        setUserProfile(data.user);
        setFormData({
          name: data.user.name || "",
          avatar: data.user.avatar || "",
          bio: data.user.bio || "",
          website: data.user.website || "",
          twitter: data.user.twitter || "",
          instagram: data.user.instagram || "",
          youtube: data.user.youtube || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!address) return;
    
    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          ...formData,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUserProfile(data.user);
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };
  
  const userNFTs = mockNFTs.slice(0, 4);
  const maxValue = Math.max(...portfolioData.map(d => d.value));

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.name || formatAddress(address || "");
  const displayAvatar = userProfile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop')] bg-cover bg-center opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
            >
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex-1 pb-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col md:flex-row md:items-center gap-3"
              >
                <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </motion.div>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-500 font-mono text-sm">{formatAddress(address || "")}</span>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {copied ? (
                    <span className="text-green-500 text-xs">✓</span>
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {userProfile?.bio && (
                <p className="mt-3 text-gray-600 max-w-xl">{userProfile.bio}</p>
              )}

              <div className="flex flex-wrap gap-3 mt-4">
                {userProfile?.website && (
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {userProfile?.twitter && (
                  <a
                    href={`https://twitter.com/${userProfile.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    {userProfile.twitter}
                  </a>
                )}
                {userProfile?.instagram && (
                  <a
                    href={`https://instagram.com/${userProfile.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {userProfile.instagram}
                  </a>
                )}
                {userProfile?.youtube && (
                  <a
                    href={`https://youtube.com/@${userProfile.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {userProfile.youtube}
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-2 pb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDisconnect}
                className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-500" />
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="lg:col-span-2">
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Portfolio Value
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">7D</span>
                  <span className="text-sm text-gray-300">|</span>
                  <span className="text-sm text-gray-500">1M</span>
                  <span className="text-sm text-gray-300">|</span>
                  <span className="text-sm font-medium text-gray-900">ALL</span>
                </div>
              </div>
              
              <div className="flex items-end gap-2 h-48 mb-4">
                {portfolioData.map((item, index) => (
                  <motion.div
                    key={item.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.value} ETH
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">42.8 ETH</p>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">+12.5%</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="font-semibold text-gray-900">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Collected</span>
                  <span className="font-semibold text-gray-900">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Sold</span>
                  <span className="font-semibold text-gray-900">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Followers</span>
                  <span className="font-semibold text-gray-900">12.5K</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab("owned")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "owned"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Owned
            </button>
            <button
              onClick={() => setActiveTab("listings")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "listings"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Listings
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "owned" ? (
              userNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <NFTCard nft={nft} />
                </motion.div>
              ))
            ) : (
              listedNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="card overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                        {nft.price} ETH
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {nft.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {nft.endsIn}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {showEditModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowEditModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                    <p className="text-sm text-gray-500 mt-1">Update your profile information</p>
                  </div>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Enter your display name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => updateField("avatar", e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateField("website", e.target.value)}
                        placeholder="https://yoursite.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Twitter className="w-4 h-4 inline mr-1" />
                        Twitter
                      </label>
                      <input
                        type="text"
                        value={formData.twitter}
                        onChange={(e) => updateField("twitter", e.target.value)}
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Instagram className="w-4 h-4 inline mr-1" />
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => updateField("instagram", e.target.value)}
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Send className="w-4 h-4 inline mr-1" />
                        YouTube
                      </label>
                      <input
                        type="text"
                        value={formData.youtube}
                        onChange={(e) => updateField("youtube", e.target.value)}
                        placeholder="Channel name"
                        className="w-full px-4 py-10py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors font-medium text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full btn-primary font-medium disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
