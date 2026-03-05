import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechStackMarquee from "@/components/TechStackMarquee";
import { ToastProvider } from "@/components/Toast";
import WalletGuard from "@/components/WalletGuard";
import { Providers } from "./providers";
import { WalletModalProvider } from "@/context/WalletModalContext";
import WalletConnectionModal from "@/components/WalletConnectionModal";
import ProfileModalManager from "@/components/ProfileModalManager";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "NFTVerse - Discover, Collect & Trade NFTs",
  description: "The premier marketplace for extraordinary digital collectibles. Discover, collect, and sell unique NFTs from artists worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased bg-[#F9F9F9]`}>
        <Providers>
        <WalletModalProvider>
        <ToastProvider>
          <WalletGuard />
          <WalletConnectionModal />
          <ProfileModalManager />
          <div className="min-h-screen bg-[#F9F9F9]">
            <Navbar />
            <main className="pt-20">{children}</main>
            <TechStackMarquee />
            <Footer />
          </div>
        </ToastProvider>
        </WalletModalProvider>
        </Providers>
      </body>
    </html>
  );
}

