import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, MapPin, CheckCircle, FileCheck, Users, Code, BookOpen } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#00d4ff] mb-2 uppercase tracking-wider">
            Background &amp; Honors
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Education &amp; Key Recognition
          </h2>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">
            Academic foundation in Data Science &amp; AI at IIT Guwahati, alongside national hackathon achievements and competitive problem solving.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education & Background (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="p-2.5 rounded-xl bg-[#00d4ff]/10 text-[#00d4ff]">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Indian Institute of Technology Guwahati
                  </h3>
                  <p className="text-xs font-mono text-[#00d4ff]">2025 – 2029</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-white/80 leading-relaxed mb-6">
                <p className="font-semibold text-white">
                  Bachelor of Science (Hons.) in Data Science &amp; Artificial Intelligence
                </p>
                <p className="text-xs text-white/60">
                  Rigorous curriculum spanning machine learning theory, deep neural networks, statistical inference, computer vision, natural language processing, and distributed systems.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-white/40 uppercase mb-2">Key Coursework</div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/70 font-mono">
                  <span>ML Theory</span>
                  <span className="text-white/20">·</span>
                  <span>Deep Learning</span>
                  <span className="text-white/20">·</span>
                  <span>Computer Vision</span>
                  <span className="text-white/20">·</span>
                  <span>Distributed Systems</span>
                  <span className="text-white/20">·</span>
                  <span>Algorithms &amp; Optimization</span>
                </div>
              </div>
            </div>

            {/* Quick Profile Bio & Capabilities */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase">
                <MapPin size={13} className="text-[#00d4ff]" />
                <span>Location: Kolkata, India · Open to Remote &amp; On-Site</span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Results-driven engineer combining an academic foundation in Data Science &amp; AI at IIT Guwahati with versatile execution across:
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-white/70">
                  <span className="text-[#00d4ff] font-bold">1.</span>
                  <span><strong>Full-Stack &amp; Scalable Systems:</strong> High-performance web applications, TypeScript, and resilient API architectures.</span>
                </div>
                <div className="flex items-start gap-2 text-white/70">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span><strong>Game &amp; Interactive Dev:</strong> Real-time rendering loops, Three.js 3D state sync, and computational geometry.</span>
                </div>
                <div className="flex items-start gap-2 text-white/70">
                  <span className="text-sky-300 font-bold">3.</span>
                  <span><strong>AI &amp; Data Science:</strong> Real-time computer vision pipelines, spatio-temporal forecasting, and robust MLOps.</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-emerald-400" />
                  <span>References:</span>
                </span>
                <span className="text-white/70 font-medium">Available upon request</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dedicated SIH 2025 Feature Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-transparent border border-emerald-500/30">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <Award size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                      National Achievement
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Smart India Hackathon 2025
                    </h3>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold self-start">
                  GRAND FINALIST
                </div>
              </div>

              {/* SIH Project Breakdown */}
              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">
                    Project
                  </div>
                  <div className="text-lg font-bold text-white">
                    Siddhant — Ancient Indian Yantra Reconstruction Engine
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">
                    Role in Team
                  </div>
                  <p className="text-white/80 font-medium">
                    System Integration / AI / Technical Coordination
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-xs font-mono text-[#00d4ff] uppercase">The Problem</div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Reconstructing historically lost geometric construction logic of ancient Indian astronomical instruments from ambiguous Sanskrit textual treatises.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-xs font-mono text-emerald-400 uppercase">The Solution</div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Symbolic constraint engine (SymPy) combined with graph dependency traversal (NetworkX) and real-time Three.js 3D parametric visualization.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    My Specific Execution
                  </div>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Formulated the topological dependency graph to resolve geometric construction sequences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Engineered interactive WebGL / Three.js 3D viewport rendering with celestial arc alignments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Coordinated technical delivery under rigorous hackathon evaluation criteria.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Evaluation: Thousands of nationwide engineering teams</span>
                  <span className="text-emerald-400 font-semibold">Grand Finalist Status</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
