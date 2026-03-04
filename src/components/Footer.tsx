"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Instagram, Send, Github } from "lucide-react";

const footerLinks = {
  Marketplace: [
    { name: "Explore", href: "/explore" },
    { name: "Trending", href: "/trending" },
    { name: "Collections", href: "/collections" },
    { name: "Artists", href: "/artists" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Help Center", href: "/help" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/nexusnft", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/nexusnft", label: "Instagram" },
  { icon: Send, href: "https://discord.gg/nexusnft", label: "Discord" },
  { icon: Github, href: "https://github.com/nexusnft", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xl">🔗</span>
              </div>
              <span className="text-xl font-bold text-gradient">Nexus NFT Protocol</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Built by artists, for artists. We're a small team fighting for fair creator economics.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-full bg-gray-50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5 text-gray-500" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Nexus NFT Protocol. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
