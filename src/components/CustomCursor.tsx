import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);

      // Add trail particle
      const newParticle = {
        id: particleId.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#00d4ff] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
        }}
      >
        <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
      </motion.div>
      
      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-1 h-1 bg-[#00d4ff] rounded-full pointer-events-none z-[9998]"
            style={{
              x: p.x - 2,
              y: p.y - 2,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00d4ff] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </>
  );
};
