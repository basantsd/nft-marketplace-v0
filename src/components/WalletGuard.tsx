"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import WalletConnectionModal from "@/components/WalletConnectionModal";

export default function WalletGuard() {
  const { isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);

  return null;
}
