"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function Counter({ 
  value, 
  prefix = "", 
  suffix = "", 
  decimals = 0,
  duration = 2,
  className = ""
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });
  
  const display = useTransform(spring, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}
