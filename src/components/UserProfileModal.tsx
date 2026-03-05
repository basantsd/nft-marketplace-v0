"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Link as LinkIcon, Twitter, Instagram, Youtube, Globe, Save, Loader2 } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  walletAddress: string;
  onClose: () => void;
  onProfileCreated: () => void;
}

export default function UserProfileModal({
  isOpen,
  walletAddress,
  onClose,
  onProfileCreated,
}: UserProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    bio: "",
    website: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    if (isOpen && walletAddress) {
      checkExistingUser();
    }
  }, [isOpen, walletAddress]);

  const checkExistingUser = async () => {
    try {
      const res = await fetch(`/api/user?walletAddress=${walletAddress}`);
      
      if (!res.ok) {
        return;
      }
      
      const text = await res.text();
      if (!text) return;
      
      const data = JSON.parse(text);
      
      if (data.exists) {
        onProfileCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          ...formData,
        }),
      });

      if (res.ok) {
        onProfileCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Complete Your Profile</h2>
                    <p className="text-sm text-gray-500 mt-1">Set up your profile to get started</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name *
                    </label>
                    <input
                      type="text"
                      required
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
                        <Youtube className="w-4 h-4 inline mr-1" />
                        YouTube
                      </label>
                      <input
                        type="text"
                        value={formData.youtube}
                        onChange={(e) => updateField("youtube", e.target.value)}
                        placeholder="Channel name"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors font-medium text-gray-600"
                    >
                      Skip
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full btn-primary font-medium disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
