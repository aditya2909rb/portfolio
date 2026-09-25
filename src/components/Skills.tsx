import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, BookOpen, Compass, Terminal, Shield, Cpu } from 'lucide-react';

const skillTiers = [
  {
    tier: 'Core Proficiency',
    status: 'Comfortably interview-ready & primary production stack',
    color: '#00d4ff',
    icon: CheckCircle2,
    description: 'Technologies I use independently on a daily basis for model development, data engineering, and core algorithm implementation.',
    skills: [
      'Python',
      'PyTorch',
      'SQL',
      'Pandas',
      'NumPy',
      'Computer Vision (OpenCV)',
      'Machine Learning (Scikit-Learn)',
      'Data Structures & Algorithms'
    ]
  },
  {
    tier: 'Working Knowledge',
    status: 'Applied across projects, tooling & deployments',
    color: '#10b981',
    icon: BookOpen,
    description: 'Tools and languages I have built systems with, handled pipelines for, and deploy with confidence in team environments.',
    skills: [
      'JavaScript',
      'TypeScript',
      'C++',
      'TensorFlow',
      'ONNX Runtime',
      'Docker',
      'GitHub Actions (CI/CD)',
      'Linux / Bash',
      'FastAPI',
      'Git'
    ]
  },
  {
    tier: 'Exploring & Specializing',
    status: 'Active research, experimental builds & advanced study',
    color: '#a855f7',
    icon: Compass,
    description: 'Emerging architectures and frontier topics I am actively building experiments around and studying at IIT Guwahati.',
    skills: [
      'Large Language Models (LLMs)',
      'Retrieval-Augmented Generation (RAG)',
      'Agentic AI & Safety Sandboxing',
      'Geospatial AI & Remote Sensing',
      'Distributed Model Training (Megatron-LM, DeepSpeed ZeRO-3)'
    ]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#00d4ff] mb-2 uppercase tracking-wider">
            Technical Stack &amp; Depth
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Technical Arsenal
          </h2>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">
            Honest, structured tiering of competencies. Core skills represent technologies I can defend in an in-depth technical interview without hesitation.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillTiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${tier.color}15`, color: tier.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{tier.tier}</h3>
                      <p className="text-[11px] font-mono text-white/40">{tier.status}</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Clean unboxed text with typographic separators (Zero-Pill discipline) */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-white/80 font-mono">
                      {tier.skills.map((skill, idx) => (
                        <React.Fragment key={skill}>
                          <span className="hover:text-white transition-colors">{skill}</span>
                          {idx < tier.skills.length - 1 && (
                            <span aria-hidden="true" className="text-white/20">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/30">
                  <span>{tier.skills.length} competencies listed</span>
                  <span style={{ color: tier.color }}>Verified in code</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
