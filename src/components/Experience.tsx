import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'SK TELECOM',
    role: 'ML Training Engineer (Contract)',
    period: 'Dec 2025 – Feb 2026',
    location: 'Seoul, South Korea',
    points: [
      'Aditya Roy Bardhan owned end-to-end training cycles for a 519B-parameter production LLM — one of the largest models in deployment in East Asia.',
      'Implemented 3D parallelism (Data, Pipeline, Tensor) via Megatron-LM across multi-node GPU clusters, sustaining high Model FLOP Utilization (MFU).',
      'Integrated DeepSpeed ZeRO-3 for optimizer state sharding and FlashAttention-2 for memory-efficient attention, reducing peak VRAM consumption.',
      'Constructed and curated reasoning-trace datasets for knowledge distillation, transferring capabilities from the 500B+ teacher to smaller student models.',
      'Diagnosed and fixed training instabilities (loss spikes, gradient explosions) by auditing data pipelines.',
      'Collaborated cross-functionally with data, infra, and alignment teams on prompt engineering standards and output evaluation rubrics.',
    ],
    color: '#00d4ff'
  },
  {
    company: 'INDEPENDENT CYBERSECURITY ADVISOR',
    role: 'Freelance Security Consultant',
    period: 'Jan 2023 – Aug 2025',
    location: 'International',
    points: [
      'Held legal security mandates with 8 international banks, conducting API penetration testing and threat modeling for systems processing multi-million dollar transactions.',
      'Designed anomaly detection and alerting systems for real-time financial transaction monitoring, directly transferable to data quality assurance pipelines.',
      'Delivered detailed vulnerability reports and remediation roadmaps; advised on encryption, network segmentation, and identity verification.',
    ],
    color: '#10b981'
  },
  {
    company: 'RIOT GAMES',
    role: 'Technical Operations',
    period: 'June 2021 – Aug 2024',
    location: 'Remote',
    points: [
      'Maintained backend service stability and performance for high-concurrency gaming infrastructure, specializing in low-latency synchronization.',
      'Worked on observability tooling, performance profiling, and incident response for distributed systems serving millions of concurrent users.',
    ],
    color: '#ef4444'
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Aditya's <span className="text-[#00d4ff]">Trajectory</span></h2>
          <div className="h-1 w-20 bg-[#00d4ff]" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00d4ff] via-emerald-500 to-transparent opacity-20" />

          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  delay: i * 0.1 
                }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-0`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] w-3 h-3 rounded-full bg-black border-2 border-[#00d4ff] z-10 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

                <div className="w-full md:w-[45%]">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#00d4ff]/30 transition-all group">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">{exp.company}</h3>
                        <p className="text-[#00d4ff] font-mono text-sm">{exp.role}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs font-mono text-white/40">
                        <div className="flex items-center gap-1"><Calendar size={12} /> {exp.period}</div>
                        <div className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</div>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                          <span className="text-[#00d4ff] mt-1.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
