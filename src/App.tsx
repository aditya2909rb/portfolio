/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import { LoadingSequence } from './components/LoadingSequence';
import { CustomCursor } from './components/CustomCursor';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ResumeModal } from './components/ResumeModal';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'auto';
      lenisRef.current?.start();
    }
  }, [isLoading]);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.5 });
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#00d4ff]/30 selection:text-[#00d4ff]">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00d4ff] z-[10000] origin-left"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSequence key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="relative">
            <motion.main
              key="content"
              id="main-app-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative no-print"
            >
              <Background3D />
              <Navbar onOpenResume={() => setIsResumeOpen(true)} />
              <Hero onOpenResume={() => setIsResumeOpen(true)} />
              <Projects />
              <Skills />
              <Experience />
              <About />
              <Contact />
              <Footer />
              
              {/* Global Scanline Effect */}
              <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </motion.main>

            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

            {/* Scroll to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#00d4ff] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-110 transition-transform active:scale-95 no-print"
                >
                  <ChevronUp size={24} strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
