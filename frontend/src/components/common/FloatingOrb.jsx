import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ParallaxOrb = ({ className, speed = 0.15 }) => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, prefersReduced ? 0 : 800 * speed]);

  if (prefersReduced) return <div className={className} />;
  return <motion.div className={className} style={{ y }} />;
};

export const FloatingOrb = ({ className, amplitude = 14, duration = 5, delay = 0 }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <div className={className} />;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};
