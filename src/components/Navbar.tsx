import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { CommandPalette } from './CommandPalette';

const navItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-white/10 py-3.5'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="text-base font-semibold tracking-tight text-white hover:text-[#00d4ff] transition-colors"
        >
          Aditya Roy Bardhan
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/70">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <CommandPalette />

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors cursor-pointer"
          >
            <FileText size={13} />
            <span>Resume</span>
          </button>

          <a
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Aditya_Roy_Bardhan_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-[#00d4ff] hover:bg-[#33ddff] rounded-lg transition-colors shadow-sm"
          >
            <Download size={13} />
            <span>CV</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-base font-medium text-white/80 hover:text-[#00d4ff] py-1 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="flex-1 py-2 text-xs font-medium text-center text-white bg-white/10 rounded-lg"
                >
                  View Full Resume
                </button>
                <a
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Aditya_Roy_Bardhan_Resume.pdf"
                  className="flex-1 py-2 text-xs font-medium text-center text-black bg-[#00d4ff] rounded-lg"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
