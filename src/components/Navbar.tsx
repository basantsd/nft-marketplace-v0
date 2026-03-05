"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Wallet, Search, Bell, Copy, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

import { useAccount, useDisconnect } from 'wagmi';
import { useWalletModal } from "@/context/WalletModalContext";

const navLinks = [
  { name: "Browse", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "List NFT", href: "/list" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { open: openWalletModal } = useWalletModal();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <span className="text-xl">🔗</span>
            </motion.div>
            <span className="text-xl font-bold text-gradient">Nexus NFT Protocol</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.href === "/profile" || link.href == "/list") {
                if (!isConnected || !address) return null;
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    pathname === link.href 
                      ? "text-primary bg-primary/5" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </motion.button> */}
            
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-sm font-medium text-primary">{formatAddress(address)}</span>
                  <button 
                    onClick={handleCopyAddress}
                    className="p-1 hover:bg-primary/20 rounded-full transition-colors cursor-pointer"
                    title={copied ? "Copied!" : "Copy address"}
                  >
                    {copied ? (
                      <span className="text-xs text-primary">✓</span>
                    ) : (
                      <Copy className="w-3 h-3 text-primary" />
                    )}
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDisconnect}
                  className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                  title="Disconnect"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openWalletModal()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-primary cursor-pointer"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </motion.button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 text-sm font-medium rounded-lg ${
                  pathname === link.href 
                    ? "text-primary bg-primary/5" 
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isConnected && address ? (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Connected</p>
                    <p className="font-medium text-primary">{formatAddress(address)}</p>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); openWalletModal(); }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full btn-primary font-medium"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
