import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
              ADITYA ROY <br />
              <span className="text-[#00d4ff]">BARDHAN.</span>
            </h2>
            <p className="text-xl text-white/40 max-w-md mb-10">
              Currently open for high-impact collaborations in LLM training, AI infrastructure, and cybersecurity.
            </p>
            <a 
              href="mailto:adityaroybardhan@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#00d4ff] text-black font-bold hover:scale-105 transition-transform"
            >
              GET IN TOUCH <ArrowUpRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-mono text-white/20 uppercase tracking-widest">Connect</p>
              <ul className="space-y-3">
                <li><a href="https://github.com/aditya2909rb" className="text-white/60 hover:text-[#00d4ff] transition-colors flex items-center gap-2">Github</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] transition-colors flex items-center gap-2">LinkedIn</a></li>
                <li><a href="https://instagram.com/adityaroybardhan2025" className="text-white/60 hover:text-[#00d4ff] transition-colors flex items-center gap-2">Instagram</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-mono text-white/20 uppercase tracking-widest">Platforms</p>
              <ul className="space-y-3">
                <li><a href="https://leetcode.com/u/adityaroybardhan2909" className="text-white/60 hover:text-[#00d4ff] transition-colors flex items-center gap-2">LeetCode</a></li>
                <li><a href="https://kaggle.com/aditya2909rb" className="text-white/60 hover:text-[#00d4ff] transition-colors flex items-center gap-2">Kaggle</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5">
          <div className="space-y-2">
            <p className="text-white/20 text-sm font-mono">
              © 2026 ADITYA ROY BARDHAN. ALL RIGHTS RESERVED.
            </p>
            <p className="text-white/10 text-[10px] font-mono max-w-xs leading-relaxed">
              Portfolio of Aditya Roy Bardhan, ML Engineer specializing in hyperscale LLM training and AI systems. Graduate of IIT Guwahati.
            </p>
          </div>
          <div className="flex gap-8">
            <p className="text-white/20 text-sm font-mono">ENCRYPTED CONNECTION</p>
            <p className="text-white/20 text-sm font-mono">A.S.H.A. UPLINK: STABLE</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
