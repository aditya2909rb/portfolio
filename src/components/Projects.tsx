import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Satellite, Activity, Eye, TrendingUp, Shield, Cpu, Terminal, X, CheckCircle, ArrowRight } from 'lucide-react';

import ashaImg from '../assets/images/asha_satellite_dashboard_1790314525326.jpg';
import oncoImg from '../assets/images/oncosml_cancer_workflow_1790314538458.jpg';
import satImg from '../assets/images/satellite_change_detection_1790314554344.jpg';
import demandImg from '../assets/images/demand_forecasting_pricing_1790314568029.jpg';
import siddhantImg from '../assets/images/siddhant_yantra_3d_1790314579477.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI/ML' | 'Computer Vision' | 'Data Science' | 'Security' | 'Systems';
  tagline: string;
  isFeatured?: boolean;
  image?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  problem: string;
  whatIBuilt: string;
  myContribution: string[];
  results: string;
}

export const allProjects: ProjectItem[] = [
  {
    id: 'asha',
    title: 'ASHA — Alerting Satellite Heat Analytics',
    category: 'Computer Vision',
    tagline: 'Satellite-based fire detection & heat analytics',
    isFeatured: true,
    image: ashaImg,
    icon: Satellite,
    githubUrl: 'https://github.com/aditya2909rb/ASHA',
    liveUrl: 'https://adityaroybardhan.gamer.gd',
    techStack: ['Python', 'NASA FIRMS', 'Computer Vision', 'Geospatial Data', 'FastAPI', 'Leaflet.js'],
    problem: 'How can satellite imagery and thermal sensors be used to reliably identify rapid wildfire events across large geographic regions without being overwhelmed by industrial false positives?',
    whatIBuilt: 'A real-time satellite data ingestion and geospatial alerting pipeline combining NASA FIRMS (MODIS/VIIRS) feeds and NDMA data across 7 fire-prone zones in the Indian subcontinent.',
    myContribution: [
      'Ingested and preprocessed raw MODIS and VIIRS satellite feeds from NASA Earthdata.',
      'Developed confidence-scoring algorithms to isolate industrial thermal noise from actual wildfires.',
      'Constructed a low-latency geospatial alert engine with visual map dashboards.',
      'Designed alert dispatch pipelines tailored for integration with emergency response teams.'
    ],
    results: 'Monitored 7 high-risk zones across India; achieved 94% classification precision and reduced fire alert latency from several hours to under 15 minutes.'
  },
  {
    id: 'oncosml',
    title: 'OncoSML — Cancer Vaccine Workflow Research',
    category: 'AI/ML',
    tagline: 'Computational cancer-vaccine workflow research',
    isFeatured: true,
    image: oncoImg,
    icon: Activity,
    githubUrl: 'https://github.com/aditya2909rb/sml-project',
    liveUrl: 'https://github.com/aditya2909rb/sml-project',
    techStack: ['Python', 'cBioPortal API', 'PyTorch', 'GitHub Actions', 'Bioinformatics', 'MLOps'],
    problem: 'Genomic datasets and oncology literature expand continuously, leaving machine learning models in cancer-vaccine research quickly outdated without constant manual re-engineering.',
    whatIBuilt: 'A self-maintaining machine learning pipeline for cancer-vaccine research that automates genomic data ingestion from cBioPortal and continuous literature updates from GitHub.',
    myContribution: [
      'Engineered automated genomic mutation data extraction from cBioPortal REST APIs.',
      'Built a GitHub Actions CI/CD workflow that tracks new research findings and triggers retrains.',
      'Implemented model validation barriers and regression guards before pushing updated weights.',
      'Designed a real-time monitoring interface for genomic pipeline status.'
    ],
    results: 'Cut model refresh cycle from weeks of manual curation to automated hours, creating a reproducible foundation for neoantigen and vaccine candidate exploration.'
  },
  {
    id: 'satellite-change-detection',
    title: 'Satellite Change Detection',
    category: 'Computer Vision',
    tagline: 'Computer vision for satellite imagery',
    isFeatured: true,
    image: satImg,
    icon: Eye,
    githubUrl: 'https://github.com/aditya2909rb',
    liveUrl: 'https://github.com/aditya2909rb',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'GDAL', 'NASA Earthdata', 'U-Net'],
    problem: 'Manual identification of environmental hazards and smoke plume boundaries from geostationary satellite feeds is too slow and error-prone for real-time disaster management.',
    whatIBuilt: 'A pixel-level segmentation model trained on multispectral satellite feeds to detect smoke plumes and landscape transitions with automated ground-truth annotation tooling.',
    myContribution: [
      'Built custom semi-automated annotation pipeline using spectral signatures for ground-truth labeling.',
      'Engineered data-cleaning filters for noisy, heterogeneous multispectral satellite bands.',
      'Trained and evaluated customized U-Net segmentation models for diffuse smoke boundaries.',
      'Benchmarked inference latency for continuous multi-gigabyte raster tiles.'
    ],
    results: 'Attained 0.82 mean IoU for diffuse smoke plume detection; automated the daily processing of 500GB+ of geostationary imagery.'
  },
  {
    id: 'demand-forecasting',
    title: 'Demand Forecasting & Dynamic Pricing',
    category: 'Data Science',
    tagline: 'Real-time forecasting & dynamic pricing',
    isFeatured: true,
    image: demandImg,
    icon: TrendingUp,
    githubUrl: 'https://github.com/aditya2909rb',
    liveUrl: 'https://github.com/aditya2909rb',
    techStack: ['Python', 'XGBoost', 'LSTM', 'ONNX', 'Feature Engineering', 'FastAPI'],
    problem: 'Ride-sharing and on-demand delivery platforms face severe demand spikes, where standard models suffer from temporal lag and high inference latency.',
    whatIBuilt: 'A high-frequency spatio-temporal demand forecasting model with dynamic pricing optimization capable of real-time sub-100ms inference.',
    myContribution: [
      'Engineered over 200 temporal and spatial lag features from transactional data.',
      'Built automated drift detection pipelines to catch covariate distribution shifts.',
      'Optimized runtime performance via model quantization and ONNX runtime export.',
      'Constructed a simulation environment to test dynamic surge pricing algorithms.'
    ],
    results: 'Reduced forecasting MAPE by 18% compared to baseline regression models; maintained sub-100ms inference latency under simulated peak load.'
  },
  {
    id: 'siddhant',
    title: 'Siddhant — Ancient Indian Yantra Reconstruction Engine',
    category: 'Systems',
    tagline: 'Algorithmic 3D reconstruction of astronomical instruments',
    isFeatured: false,
    image: siddhantImg,
    icon: Cpu,
    githubUrl: 'https://github.com/aditya2909rb',
    liveUrl: 'https://github.com/aditya2909rb',
    techStack: ['Three.js', 'SymPy', 'NetworkX', 'TypeScript', 'React', 'Computational Geometry'],
    problem: 'Historical astronomical Yantras are described in archaic Sanskrit texts with complex geometric constraints that are difficult to verify or reconstruct mathematically.',
    whatIBuilt: 'A geometric computation engine that algorithmically reconstructs and visualizes ancient Indian astronomical instruments in interactive 3D web environments.',
    myContribution: [
      'Formalized geometric descriptions into symbolic mathematical constraints using SymPy.',
      'Applied graph dependency resolution algorithms via NetworkX to resolve construction order.',
      'Created an interactive 3D rendering pipeline in Three.js with parametric control sliders.',
      'Coordinated technical architecture and deployment for the Smart India Hackathon final evaluation.'
    ],
    results: 'Selected as Grand Finalist at Smart India Hackathon 2025; successfully reconstructed 15+ complex historical astronomical instruments with mathematical precision.'
  },
  {
    id: 'agentic-ai-safety',
    title: 'Agentic AI Safety Evaluation',
    category: 'Security',
    tagline: 'Controlled filesystem & sandboxing study of local LLM agents',
    isFeatured: false,
    icon: Terminal,
    githubUrl: 'https://github.com/aditya2909rb',
    liveUrl: 'https://github.com/aditya2909rb',
    techStack: ['Python', 'Local LLM', 'Raspberry Pi 5', 'Linux Cgroups', 'Systemd Sandboxing'],
    problem: 'When autonomous agents are granted tool use and filesystem permissions, how do resource constraints and permission boundaries hold up under extended unattended execution?',
    whatIBuilt: 'An experimental evaluation harness running a local LLM agent on a Raspberry Pi 5 under strict Linux cgroup isolation and filesystem permission tracking.',
    myContribution: [
      'Configured local quantized model inference with tool-calling capabilities on embedded hardware.',
      'Implemented granular permission boundaries, audit logging, and hardware resource caps.',
      'Evaluated multi-step autonomous behavior during a 4-hour unattended evaluation period.',
      'Documented AI safety findings on process isolation, self-continuation loops, and approval gates.'
    ],
    results: 'Synthesized concrete recommendations for sandboxing, resource capping (CPU/RAM throttling), and strict human approval gates in autonomous developer tooling.'
  },
  {
    id: 'aadhaar-pravah',
    title: 'Aadhaar Pravah — Identity Fraud Detection',
    category: 'Security',
    tagline: 'Real-time stream analysis & anomaly detection for identity events',
    isFeatured: false,
    icon: Shield,
    githubUrl: 'https://github.com/aditya2909rb',
    liveUrl: 'https://github.com/aditya2909rb',
    techStack: ['Python', 'Kafka', 'Scikit-learn', 'Redis', 'AES-256', 'Docker'],
    problem: 'Large-scale national identity verification streams generate millions of transactions per hour, requiring sub-second fraud anomaly detection without risking sensitive data leaks.',
    whatIBuilt: 'A distributed stream analyzer with custom anomaly detection models, simulated stress datasets, and AES-256 encrypted storage.',
    myContribution: [
      'Designed stream ingestion consumers capable of parsing 10,000+ verification events per second.',
      'Crafted synthetic edge-case fraud datasets to improve recall on rare anomalous verification spikes.',
      'Implemented end-to-end payload encryption and role-based access logs.'
    ],
    results: 'Demonstrated sub-100ms detection latency on simulated high-concurrency fraud bursts with zero unencrypted data exposure.'
  }
];

const categories = ['All', 'AI/ML', 'Computer Vision', 'Data Science', 'Security', 'Systems'] as const;

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featuredProjects = allProjects.filter((p) => p.isFeatured);
  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#00d4ff] mb-2 uppercase tracking-wider">
            Curated Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">
            Practical AI systems, verified computer vision pipelines, and production-grade architectures built with clear problems, documented contributions, and substantiated results.
          </p>
        </div>

        {/* 1. FEATURED PROJECTS (The 4 Core Projects with High-Fidelity Previews) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00d4ff]/40 transition-all flex flex-col overflow-hidden"
            >
              {/* Image Preview Container */}
              {project.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40 border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Category overlay */}
                  <div className="absolute top-3 left-3 text-xs font-mono text-white/80 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {project.category}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[#00d4ff]/90 font-medium mb-4">
                    {project.tagline}
                  </p>

                  <div className="space-y-3 mb-6 text-xs text-white/70 leading-relaxed">
                    <div>
                      <strong className="text-white font-medium">Problem: </strong>
                      {project.problem}
                    </div>
                    <div>
                      <strong className="text-white font-medium">Built: </strong>
                      {project.whatIBuilt}
                    </div>
                  </div>

                  {/* Clean typographic tech stack (No static pill clutter) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50 mb-6 font-mono">
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="text-white/70">{tech}</span>
                        {idx < project.techStack.length - 1 && <span className="text-white/20">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-[#00d4ff] hover:text-[#33ddff] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight size={13} />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. DEDICATED PROJECTS SECTION WITH FILTER TABS */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                All Projects &amp; Research Experiments
              </h3>
              <p className="text-sm text-white/50">
                Filter by technical domain to inspect systems, security experiments, and algorithms.
              </p>
            </div>

            {/* Filter Tabs / Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#00d4ff] text-black font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00d4ff]/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-white/5 text-[#00d4ff] group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <span className="text-[11px] font-mono text-white/40">{p.category}</span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-[#00d4ff] transition-colors mb-2">
                      {p.title}
                    </h4>

                    <p className="text-xs text-white/60 line-clamp-3 mb-4 leading-relaxed">
                      {p.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] font-mono text-white/40 mb-4">
                      {p.techStack.slice(0, 4).map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {i < Math.min(p.techStack.length, 4) - 1 && <span className="text-white/20">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <span className="text-[#00d4ff] group-hover:underline flex items-center gap-1 font-medium">
                      Inspect Details <ArrowRight size={12} />
                    </span>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/40 hover:text-white p-1"
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DETAILED PROJECT MODAL (Structured case study) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0c0e] border border-white/15 shadow-2xl text-white"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 px-6 py-4 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">
                    {selectedProject.category} Case Study
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Visual Asset (if available) */}
              {selectedProject.image && (
                <div className="relative aspect-[16/9] w-full border-b border-white/10 bg-black overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6 text-sm">
                {/* 1. Problem */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    01. Problem Statement
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* 2. What I Built */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">
                    02. Technical Architecture &amp; System
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    {selectedProject.whatIBuilt}
                  </p>
                </div>

                {/* 3. My Contribution */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    03. Specific Individual Contribution
                  </h4>
                  <ul className="space-y-1.5 text-white/80">
                    {selectedProject.myContribution.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Results & Substantiated Impact */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                    04. Measured Results &amp; Verification
                  </h4>
                  <p className="text-white/90 leading-relaxed font-medium">
                    {selectedProject.results}
                  </p>
                </div>

                {/* 5. Tech Stack */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    05. Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-white/60">
                    {selectedProject.techStack.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span className="text-white/90">{t}</span>
                        {idx < selectedProject.techStack.length - 1 && <span className="text-white/20">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00d4ff] text-black font-semibold text-xs hover:bg-[#33ddff] transition-colors"
                  >
                    <Github size={14} />
                    <span>View Code on GitHub</span>
                  </a>

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white font-medium text-xs hover:bg-white/15 transition-colors border border-white/10"
                    >
                      <ExternalLink size={13} />
                      <span>Live / Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
