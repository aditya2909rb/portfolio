import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Brand & Focus */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Aditya Roy Bardhan
            </h2>
            <p className="text-sm text-[#00d4ff] font-medium">
              Data Science &amp; AI | AI/ML • Computer Vision • Software Engineering
            </p>
            <p className="text-xs text-white/50 max-w-md leading-relaxed">
              Undergraduate at Indian Institute of Technology Guwahati building practical AI systems, computer vision pipelines, and intelligent software.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#projects" className="hover:text-[#00d4ff] transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#00d4ff] transition-colors">
                  Technical Arsenal
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#00d4ff] transition-colors">
                  Professional Experience
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00d4ff] transition-colors">
                  Education &amp; SIH 2025
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00d4ff] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Profiles */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
              Profiles &amp; Code
            </p>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a
                  href="https://github.com/aditya2909rb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>GitHub (@aditya2909rb)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/aditya-roy-bardhan-a22ba22b7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com/u/adityaroybardhan2909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors"
                >
                  LeetCode Profile
                </a>
              </li>
              <li>
                <a
                  href="https://kaggle.com/aditya2909rb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors"
                >
                  Kaggle Profile
                </a>
              </li>
              <li>
                <a
                  href="mailto:adityaroybardhan@gmail.com"
                  className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5"
                >
                  <Mail size={13} />
                  <span>adityaroybardhan@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright and References */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 Aditya Roy Bardhan · IIT Guwahati
          </div>
          <div>
            Academic &amp; professional references available upon request
          </div>
        </div>
      </div>
    </footer>
  );
};
