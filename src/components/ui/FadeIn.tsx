'use client';
import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
}

export default function FadeIn({
  children,
  className = '',
}: FadeInProps) {
  return <div className={className}>{children}</div>;
}

