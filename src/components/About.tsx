import React from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, MapPin, Award } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-mono mb-6">
              <User size={14} /> ABOUT ME
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">
              ADITYA ROY <span className="text-[#00d4ff]">BARDHAN</span>
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                I am an <span className="text-white">ML Engineer</span> and <span className="text-white">AI Systems Specialist</span> with a deep focus on hyperscale LLM training and secure infrastructure. My work bridges the gap between theoretical machine learning and robust, production-grade systems.
              </p>
              <p>
                Currently, I specialize in <span className="text-white">distributed training</span> (Megatron-LM, DeepSpeed) and <span className="text-white">AI security</span>. I have a proven track record of building systems that handle massive data streams, from Aadhaar-scale identity fraud detection to real-time satellite fire alerts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <GraduationCap className="text-[#00d4ff] mb-3" size={20} />
                <p className="text-xs font-mono text-white/40 uppercase mb-1">Education</p>
                <p className="text-sm text-white font-medium">IIT Guwahati</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="text-[#00d4ff] mb-3" size={20} />
                <p className="text-xs font-mono text-white/40 uppercase mb-1">Location</p>
                <p className="text-sm text-white font-medium">India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/20 to-purple-500/20 rounded-3xl blur-3xl opacity-30" />
            <div className="relative h-full w-full rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center p-12">
              <div className="text-center">
                <Award className="w-24 h-24 text-[#00d4ff] mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold text-white mb-2">SIH 2025</h3>
                <p className="text-[#00d4ff] font-mono text-sm uppercase tracking-widest">Grand Finalist</p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/40 text-xs font-mono leading-relaxed">
                    Recognized for excellence in <br />
                    Ancient Indian Yantra <br />
                    Reconstruction Engine.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
