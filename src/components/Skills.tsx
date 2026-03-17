import React from 'react';
import { motion } from 'motion/react';
import { Brain, Code, Database, Shield, Terminal, Award, GraduationCap, Lightbulb, Github } from 'lucide-react';

const skillGroups = [
  {
    title: 'LLM Training',
    icon: Brain,
    skills: ['Megatron-LM', 'DeepSpeed ZeRO-3', 'FlashAttention-2', '3D Parallelism', 'Knowledge Distillation', 'RLHF', 'Reasoning Traces']
  },
  {
    title: 'ML / AI',
    icon: Lightbulb,
    skills: ['PyTorch', 'Transformers', 'XGBoost', 'LSTM', 'CNNs', 'Anomaly Detection', 'Time-Series Forecasting', 'Computer Vision']
  },
  {
    title: 'Data Engineering',
    icon: Database,
    skills: ['Pipeline Design', 'Annotation Quality', 'Feature Engineering', 'Synthetic Data', 'Ground-Truth Labeling', 'Data Drift Detection', 'NASA Earthdata API']
  },
  {
    title: 'Security',
    icon: Shield,
    skills: ['API Penetration Testing', 'Threat Modeling', 'AES Encryption', 'Network Defense', 'Anomaly Alerting', 'Compliance Auditing']
  },
  {
    title: 'Systems',
    icon: Terminal,
    skills: ['Python (Advanced)', 'C++', 'CUDA', 'Java', 'SQL', 'Git', 'Docker', 'Linux (Ubuntu/Kali)', 'ONNX', 'REST APIs']
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical <span className="text-[#00d4ff]">Arsenal</span></h2>
              <div className="h-1 w-20 bg-[#00d4ff]" />
            </div>
            
            <div className="space-y-8">
              {skillGroups.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    delay: i * 0.1 
                  }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
                      <group.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education & <span className="text-emerald-400">Recognition</span></h2>
                <div className="h-1 w-20 bg-emerald-400" />
              </div>

              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 group hover:bg-emerald-500/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className="text-emerald-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white">IIT Guwahati</h3>
                      <p className="text-emerald-400/60 font-mono text-sm">Graduation in Data Science & Artificial Intelligence</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Coursework: Machine Learning Theory, Deep Learning, NLP, Computer Vision, Distributed Systems, Statistical Inference.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-transparent border border-[#00d4ff]/20 group hover:bg-[#00d4ff]/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <Award className="text-[#00d4ff]" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white">SIH 2025 Grand Finalist</h3>
                      <p className="text-[#00d4ff]/60 font-mono text-sm">Smart India Hackathon 2025</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    National-level competition with thousands of teams. Recognized for "Siddhant" — Ancient Indian Yantra Reconstruction Engine.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 group hover:bg-purple-500/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <Github className="text-purple-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white">GitHub Pro Contributor</h3>
                      <p className="text-purple-400/60 font-mono text-sm">Active Open-Source Contributor</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Consistent contributions to ML and Cybersecurity projects. Maintaining high-quality code standards and documentation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="text-white/40" size={20} /> Interests
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60">
                  Advanced Algorithm Design (Rubik's Cube group theory)
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60">
                  Computational History
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
