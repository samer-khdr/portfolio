import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NeuralBackground() {
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

  // Organically scattered nodes across the canvas
  const nodes = [
    { x: 8, y: 12, delay: 0 },
    { x: 15, y: 8, delay: 0.1 },
    { x: 22, y: 18, delay: 0.2 },
    { x: 30, y: 10, delay: 0.3 },
    { x: 38, y: 15, delay: 0.25 },
    { x: 45, y: 8, delay: 0.15 },
    { x: 52, y: 12, delay: 0.35 },
    { x: 60, y: 10, delay: 0.2 },
    { x: 68, y: 16, delay: 0.1 },
    { x: 75, y: 9, delay: 0.4 },
    { x: 82, y: 14, delay: 0.25 },
    { x: 90, y: 11, delay: 0.3 },

    { x: 5, y: 35, delay: 0.15 },
    { x: 12, y: 42, delay: 0.2 },
    { x: 20, y: 38, delay: 0.25 },
    { x: 28, y: 45, delay: 0.1 },
    { x: 35, y: 40, delay: 0.35 },
    { x: 42, y: 48, delay: 0.2 },
    { x: 50, y: 43, delay: 0.3 },
    { x: 58, y: 38, delay: 0.15 },
    { x: 65, y: 46, delay: 0.25 },
    { x: 72, y: 40, delay: 0.1 },
    { x: 80, y: 44, delay: 0.3 },
    { x: 88, y: 39, delay: 0.2 },
    { x: 95, y: 45, delay: 0.35 },

    { x: 10, y: 70, delay: 0.2 },
    { x: 18, y: 65, delay: 0.1 },
    { x: 26, y: 72, delay: 0.3 },
    { x: 34, y: 68, delay: 0.25 },
    { x: 41, y: 75, delay: 0.15 },
    { x: 48, y: 70, delay: 0.35 },
    { x: 56, y: 73, delay: 0.2 },
    { x: 64, y: 69, delay: 0.1 },
    { x: 72, y: 76, delay: 0.3 },
    { x: 80, y: 71, delay: 0.25 },
    { x: 88, y: 74, delay: 0.15 },

    { x: 6, y: 92, delay: 0.25 },
    { x: 15, y: 88, delay: 0.1 },
    { x: 24, y: 95, delay: 0.2 },
    { x: 32, y: 90, delay: 0.35 },
    { x: 40, y: 94, delay: 0.15 },
    { x: 48, y: 89, delay: 0.3 },
    { x: 56, y: 96, delay: 0.2 },
    { x: 64, y: 91, delay: 0.1 },
    { x: 72, y: 93, delay: 0.25 },
    { x: 80, y: 88, delay: 0.35 },
    { x: 88, y: 95, delay: 0.15 },
    { x: 95, y: 90, delay: 0.2 },
  ];

  const getConnections = () => {
    const connections = [];
    const connectionDistance = 20;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          connections.push({
            from: i,
            to: j,
            distance,
            delay: (nodes[i].delay + nodes[j].delay) / 2,
          });
        }
      }
    }

    return connections;
  };

  const connections = getConnections();

  const baseOpacity = 0.35 - scrollProgress * 0.15;

  return (
    <motion.svg
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      initial={{ opacity: 0 }}
      animate={{ opacity: baseOpacity }}
      transition={{ duration: 1.5 }}
    >
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.6)" />
          <stop offset="100%" stopColor="rgba(251, 146, 60, 0.4)" />
        </linearGradient>
      </defs>

      {/* Neural connections */}
      {connections.map((conn, idx) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        return (
          <motion.line
            key={`connection-${idx}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="rgba(245, 158, 11, 0.28)"
            strokeWidth="0.32"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 4.5,
              delay: conn.delay,
              repeat: Infinity,
            }}
          />
        );
      })}

      {/* Signals traveling along connections */}
      {connections.slice(0, Math.max(5, Math.floor(connections.length / 8))).map((conn, idx) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        return (
          <motion.circle
            key={`signal-${idx}`}
            cx={fromNode.x}
            cy={fromNode.y}
            r="0.25"
            fill="rgba(245, 158, 11, 0.9)"
            animate={{
              cx: [fromNode.x, toNode.x],
              cy: [fromNode.y, toNode.y],
            }}
            transition={{
              duration: 3,
              delay: conn.delay + 0.5,
              repeat: Infinity,
            }}
          />
        );
      })}

      {/* Neuron nodes */}
      {nodes.map((node, idx) => (
        <g key={`neuron-${idx}`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="0.5"
            fill="rgba(245, 158, 11, 0.85)"
            animate={{
              r: [0.5, 0.7, 0.5],
              opacity: [0.75, 0.95, 0.75],
            }}
            transition={{
              duration: 3.2,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.circle
            cx={node.x}
            cy={node.y}
            r="0.95"
            fill="none"
            stroke="rgba(245, 158, 11, 0.18)"
            strokeWidth="0.22"
            animate={{ r: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 3.8,
              delay: node.delay + 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}
    </motion.svg>
  );
}
