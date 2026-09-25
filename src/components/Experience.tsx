import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle, ShieldCheck, Cpu, Terminal } from 'lucide-react';

const experiences = [
  {
    company: 'Distributed Model Training Engagement',
    role: 'Independent ML Consultant / Contributor (Contract)',
    period: 'Dec 2025 – Feb 2026',
    engagementType: 'Contract / Independent Technical Engagement',
    icon: Cpu,
    summary: 'Contributed to distributed training workflows and data pipeline optimization for large-scale language model infrastructure.',
    points: [
      'Contributed to large-scale distributed training workflows utilizing 3D parallelism (Data, Pipeline, and Tensor Parallelism via Megatron-LM and DeepSpeed ZeRO-3) across multi-node GPU clusters.',
      'Constructed and curated reasoning-trace datasets for knowledge distillation into smaller student models, ensuring chain-of-thought fidelity and annotation quality.',
      'Diagnosed and addressed training instabilities (loss spikes, gradient explosions) by conducting systematic data quality audits across preprocessing and batching pipelines.',
      'Collaborated on prompt engineering standards and output evaluation rubrics to feed verified feedback into continuous model improvement.'
    ],
    color: '#00d4ff'
  },
  {
    company: 'Confidential Cybersecurity Engagements',
    role: 'Authorized Security Assessor & Advisor',
    period: 'Jan 2023 – Aug 2025',
    engagementType: 'Client Engagements Under NDA',
    icon: ShieldCheck,
    summary: 'Conducted authorized security assessments for financial-sector and enterprise clients under strict NDA.',
    points: [
      'Conducted authorized security assessments for financial-sector clients, including REST API security testing, threat modeling, and authentication flow verification.',
      'Identified and provided remediation roadmaps for 29 high/critical security vulnerabilities across multiple authorized client engagements.',
      'Designed anomaly detection and alerting heuristics for financial transaction monitoring and identity event verification.',
      'Advised engineering teams on encryption (AES-256), network segmentation, and defense-in-depth architectural best practices.'
    ],
    color: '#10b981'
  },
  {
    company: 'Gaming Infrastructure Support',
    role: 'Technical Operations Contributor',
    period: 'Jun 2021 – Aug 2024',
    engagementType: 'Remote / Independent Operations Support',
    icon: Terminal,
    summary: 'Maintained backend service stability and observability for high-concurrency systems.',
    points: [
      'Maintained backend service health, low-latency synchronization monitoring, and uptime reporting for high-concurrency gaming server infrastructure.',
      'Worked with observability tooling, distributed telemetry analysis, and incident triage for systems handling large concurrent user volumes.',
      'Documented operational procedures and automated recurring health-check workflows.'
    ],
    color: '#ef4444'
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#00d4ff] mb-2 uppercase tracking-wider">
            Verified Engagements
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Professional Experience &amp; Engagements
          </h2>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">
            Unambiguous, verifiable records of contract work, authorized cybersecurity audits under NDA, and technical systems support.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                      >
                        <Icon size={18} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    </div>

                    <div className="text-sm font-semibold text-[#00d4ff] mb-1">
                      {exp.role}
                    </div>

                    <div className="text-xs font-mono text-white/40">
                      {exp.engagementType}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 self-start">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-5 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Specific Contributions */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">
                    Substantiated Responsibilities &amp; Impact:
                  </h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="text-[#00d4ff] shrink-0 mt-1" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
