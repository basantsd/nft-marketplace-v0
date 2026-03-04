"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Twitter, Instagram, Globe, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const contactOptions = [
  {
    icon: Mail,
    title: "General Questions",
    email: "hello@nexusnft.com",
    description: "For: General inquiries, feedback, suggestions",
    responseTime: "24-48 hours",
  },
  {
    icon: MessageCircle,
    title: "Support",
    email: "help@nexusnft.com",
    discord: "discord.gg/nexusnft",
    description: "For: Technical issues, account problems, transaction help",
    responseTime: "Within 24 hours",
  },
  {
    icon: Mail,
    title: "Partnerships",
    email: "partnerships@nexusnft.com",
    description: "For: Wallet integrations, collaborations, business development",
    responseTime: "48 hours",
  },
  {
    icon: Mail,
    title: "Press",
    email: "press@nexusnft.com",
    description: "For: Media inquiries, interviews, press kit requests",
    responseTime: "24 hours",
  },
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact us</h1>
          <p className="text-gray-500 text-lg">
            We're real humans. We actually read every message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in touch</h2>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <option.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                      <a
                        href={`mailto:${option.email}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {option.email}
                      </a>
                      {option.discord && (
                        <a
                          href={`https://${option.discord}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm block"
                        >
                          {option.discord}
                        </a>
                      )}
                      <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                      <p className="text-xs text-gray-400 mt-2">Response time: {option.responseTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Or send us a message</h2>
            {formSubmitted ? (
              <div className="card p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24-48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Question</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="press">Press/Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl input-field resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow us</h3>
          <p className="text-gray-500 mb-6">Join 3,847 other creators and collectors.</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com/nexusnft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full btn-secondary"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
            <a
              href="https://discord.gg/nexusnft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full btn-secondary"
            >
              <MessageCircle className="w-5 h-5" />
              Discord
            </a>
            <a
              href="https://instagram.com/nexusnft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full btn-secondary"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">We're most active on Discord. Come say hi!</p>
        </motion.div>
      </div>
    </div>
  );
}
