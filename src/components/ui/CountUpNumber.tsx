'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUpNumber({
  value,
  suffix = '',
  duration = 1.8,
  className = '',
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // luxury smooth ease-out
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration, isReduced]);

  const formattedDisplay = displayValue.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {isReduced ? value.toLocaleString() : formattedDisplay}
      {suffix}
    </span>
  );
}

