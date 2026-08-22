'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ImageReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: ImageRevealProps) {
  const isReduced = useReducedMotion();

  return (
    <motion.div
      initial={isReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '150px 0px -50px 0px' }}
      transition={{
        duration: isReduced ? 0 : duration,
        delay: isReduced ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
