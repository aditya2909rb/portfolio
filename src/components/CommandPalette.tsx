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
  { title: 'ASHA — Alerting Satellite Heat Analytics', type: 'Project', href: '#projects', description: 'Real-time satellite fire detection and heat analytics' },
  { title: 'OncoSML — Cancer Vaccine Workflow Research', type: 'Project', href: '#projects', description: 'Computational cancer-vaccine workflow research and self-maintaining ML' },
  { title: 'Satellite Change Detection', type: 'Project', href: '#projects', description: 'Pixel-level segmentation for smoke plumes and environmental hazard detection' },
  { title: 'Demand Forecasting & Dynamic Pricing', type: 'Project', href: '#projects', description: 'Real-time demand forecasting and sub-100ms dynamic pricing' },
  { title: 'Siddhant — Ancient Indian Yantra Reconstruction', type: 'Project', href: '#projects', description: 'SIH 2025 Grand Finalist 3D mathematical reconstruction engine' },
  { title: 'Agentic AI Safety Evaluation', type: 'Project', href: '#projects', description: 'Empirical safety study of local LLM agent execution under sandboxing' },
  { title: 'Aadhaar Pravah — Identity Fraud Detection', type: 'Project', href: '#projects', description: 'Stream processing analyzer for large-scale identity verification' },
  // Experience
  { title: 'Distributed Model Training Engagement', type: 'Experience', href: '#experience', description: 'ML Consultant / Contributor for 3D parallelism and data curation' },
  { title: 'Confidential Cybersecurity Engagements', type: 'Experience', href: '#experience', description: 'Authorized security assessments and threat modeling under NDA' },
  { title: 'Gaming Infrastructure Support', type: 'Experience', href: '#experience', description: 'Technical operations, observability, and server latency monitoring' },
  // Education & Hackathons
  { title: 'IIT Guwahati — B.Sc. (Hons.) Data Science & AI', type: 'Experience', href: '#about', description: 'Undergraduate studies in Data Science & Artificial Intelligence' },
  { title: 'Smart India Hackathon 2025 — Grand Finalist', type: 'Experience', href: '#about', description: 'National hackathon grand finalist recognition for Siddhant' },
  // Skills
  { title: 'Core Proficiency (Interview Ready)', type: 'Skill', href: '#skills', description: 'Python, PyTorch, SQL, Pandas, NumPy, Computer Vision, Machine Learning' },
  { title: 'Working Knowledge', type: 'Skill', href: '#skills', description: 'JavaScript, TypeScript, C++, TensorFlow, ONNX, Docker, GitHub Actions, Linux' },
  { title: 'Exploring & Specializing', type: 'Skill', href: '#skills', description: 'LLMs, RAG, Agentic AI, Geospatial AI, Distributed Training' },
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
