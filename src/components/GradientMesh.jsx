import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GradientMesh() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(scrolled, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseOpacity = 0.7 - scrollProgress * 0.15;

  return (
    <motion.svg
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      initial={{ opacity: 0 }}
      animate={{ opacity: baseOpacity }}
      transition={{ duration: 2 }}
    >
      <defs>
        {/* Animated gradient mesh with flowing colors */}
        <motion.linearGradient
          id="meshGradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          animate={{
            x1: ['0%', '20%', '0%'],
            y1: ['0%', '-20%', '0%'],
            x2: ['100%', '80%', '100%'],
            y2: ['100%', '120%', '100%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.35)" />
          <stop offset="50%" stopColor="rgba(251, 146, 60, 0.2)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0.1)" />
        </motion.linearGradient>

        <motion.radialGradient
          id="meshGradient2"
          cx="30%"
          cy="20%"
          r="60%"
          animate={{
            cx: ['30%', '50%', '30%'],
            cy: ['20%', '40%', '20%'],
            r: ['60%', '70%', '60%'],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <stop offset="0%" stopColor="rgba(251, 146, 60, 0.28)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
        </motion.radialGradient>

        <motion.radialGradient
          id="meshGradient3"
          cx="70%"
          cy="80%"
          r="50%"
          animate={{
            cx: ['70%', '55%', '70%'],
            cy: ['80%', '60%', '80%'],
            r: ['50%', '65%', '50%'],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.24)" />
          <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
        </motion.radialGradient>
      </defs>

      {/* Layered mesh rectangles for depth */}
      <rect width="100" height="100" fill="url(#meshGradient1)" opacity="0.8" />
      <rect width="100" height="100" fill="url(#meshGradient2)" opacity="0.6" />
      <rect width="100" height="100" fill="url(#meshGradient3)" opacity="0.5" />

      {/* Subtle flowing paths */}
      <motion.path
        d="M -20,50 Q 25,20 50,30 T 120,50"
        stroke="rgba(245, 158, 11, 0.08)"
        strokeWidth="0.5"
        fill="none"
        animate={{
          d: [
            'M -20,50 Q 25,20 50,30 T 120,50',
            'M -20,50 Q 25,35 50,45 T 120,50',
            'M -20,50 Q 25,20 50,30 T 120,50',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.path
        d="M 50,-20 Q 80,25 70,50 T 60,120"
        stroke="rgba(251, 146, 60, 0.06)"
        strokeWidth="0.5"
        fill="none"
        animate={{
          d: [
            'M 50,-20 Q 80,25 70,50 T 60,120',
            'M 50,-20 Q 65,25 70,50 T 60,120',
            'M 50,-20 Q 80,25 70,50 T 60,120',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </motion.svg>
  );
}
