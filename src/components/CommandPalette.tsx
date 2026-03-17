import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command, Briefcase, Box, Lightbulb, ArrowRight } from 'lucide-react';
import fuzzysort from 'fuzzysort';

interface SearchResult {
  title: string;
  type: 'Project' | 'Experience' | 'Skill';
  href: string;
  description?: string;
}

const searchData: SearchResult[] = [
  // Projects
  { title: 'ASHA — Alerting Satellite Heat Analytics', type: 'Project', href: '#projects', description: 'Real-time satellite fire detection system' },
  { title: 'Aadhaar Pravah — Identity Fraud Detection', type: 'Project', href: '#projects', description: 'Real-time data flow analyzer for Aadhaar-scale identity streams' },
  { title: 'Satellite Imagery for Global Change Detection', type: 'Project', href: '#projects', description: 'Pixel-level segmentation model for environmental changes' },
  { title: 'Real-Time Demand Forecasting & Price Optimization', type: 'Project', href: '#projects', description: 'High-frequency demand forecasting for ride requests' },
  { title: 'J.A.R.V.I.S. — Multimodal AI Assistant', type: 'Project', href: '#projects', description: 'End-to-end multimodal AI assistant' },
  { title: 'Siddhant — Ancient Indian Yantra Reconstruction Engine', type: 'Project', href: '#projects', description: 'Geometric computation engine for ancient Indian astronomical Yantras' },
  // About
  { title: 'About Aditya Roy Bardhan', type: 'Experience', href: '#about', description: 'ML Engineer & AI Systems Specialist profile' },
  // Experience
  { title: 'SK TELECOM', type: 'Experience', href: '#experience', description: 'ML Training Engineer (Contract)' },
  { title: 'INDEPENDENT CYBERSECURITY ADVISOR', type: 'Experience', href: '#experience', description: 'Freelance Security Consultant' },
  { title: 'RIOT GAMES', type: 'Experience', href: '#experience', description: 'Technical Operations' },
  // Skills
  { title: 'LLM Training', type: 'Skill', href: '#skills', description: 'Megatron-LM, DeepSpeed ZeRO-3, FlashAttention-2' },
  { title: 'ML / AI', type: 'Skill', href: '#skills', description: 'PyTorch, Transformers, XGBoost, LSTM' },
  { title: 'Data Engineering', type: 'Skill', href: '#skills', description: 'Pipeline Design, Annotation Quality, Feature Engineering' },
  { title: 'Security', type: 'Skill', href: '#skills', description: 'API Penetration Testing, Threat Modeling' },
  { title: 'Systems', type: 'Skill', href: '#skills', description: 'Python, C++, CUDA, Java, SQL' },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchData.slice(0, 5));
      return;
    }
    const fuzzyResults = fuzzysort.go(query, searchData, { key: 'title', limit: 8, threshold: -10000 });
    setResults(fuzzyResults.map(r => r.obj));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    const element = document.querySelector(result.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Search Trigger Button (Navbar) */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-[#00d4ff]/30 transition-all group"
      >
        <Search size={16} className="group-hover:text-[#00d4ff] transition-colors" />
        <span className="text-xs font-mono">Search...</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
          <Command size={10} /> K
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-4 p-6 border-b border-white/5">
                <Search size={20} className="text-[#00d4ff]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, experience, skills..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/20"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-white/5 text-white/20 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result, i) => (
                      <button
                        key={i}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => handleSelect(result)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                          i === selectedIndex ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/20' : 'bg-transparent border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          result.type === 'Project' ? 'bg-purple-500/10 text-purple-400' :
                          result.type === 'Experience' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-[#00d4ff]/10 text-[#00d4ff]'
                        }`}>
                          {result.type === 'Project' ? <Box size={18} /> :
                           result.type === 'Experience' ? <Briefcase size={18} /> :
                           <Lightbulb size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold">{result.title}</h4>
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{result.type}</span>
                          </div>
                          {result.description && (
                            <p className="text-white/40 text-xs mt-1 line-clamp-1">{result.description}</p>
                          )}
                        </div>
                        {i === selectedIndex && (
                          <ArrowRight size={16} className="text-[#00d4ff]" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-white/20 font-mono text-sm">No results found for "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">Enter</kbd> Select</span>
                </div>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">Esc</kbd> Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
