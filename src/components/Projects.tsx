import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Satellite, Shield, Activity, BarChart3, Bot, Box, X, CheckCircle2, Cpu, Globe, Lock } from 'lucide-react';

const projects = [
  {
    title: 'ASHA — Alerting Satellite Heat Analytics',
    description: 'Production-grade real-time satellite fire detection system for the Indian subcontinent. Integrated NASA FIRMS and NDMA data to monitor 7 fire-prone regions with confidence-scored classification.',
    icon: Satellite,
    tags: ['Python', 'NASA FIRMS', 'Real-Time', 'GeoMapping'],
    color: '#00d4ff',
    details: {
      problem: "Traditional fire detection systems often suffer from high latency and low resolution, making it difficult for emergency services in the Indian subcontinent to respond effectively to rapid wildfires.",
      solution: "Developed ASHA, a unified pipeline that ingests MODIS and VIIRS data from NASA FIRMS. Implemented a custom confidence-scoring algorithm to filter out false positives (industrial heat) and provide real-time alerts via geospatial mapping.",
      impact: "Successfully monitored 7 high-risk regions with a 94% classification accuracy. Reduced alert latency from hours to under 15 minutes.",
      tech: ['Python', 'FastAPI', 'PostGIS', 'Leaflet.js', 'NASA Earthdata API']
    }
  },
  {
    title: 'Aadhaar Pravah — Identity Fraud Detection',
    description: 'Designed a real-time data flow analyzer for Aadhaar-scale identity streams to detect fraud patterns and data integrity violations using advanced anomaly detection.',
    icon: Shield,
    tags: ['Anomaly Detection', 'AES-256', 'Fraud Detection', 'Identity Security'],
    color: '#10b981',
    details: {
      problem: "Identity fraud at the scale of 1.3 billion users requires a system that can process massive data streams without compromising on security or speed.",
      solution: "Engineered a distributed stream processing engine using Kafka and custom anomaly detection models. Implemented AES-256 end-to-end encryption for all data in transit and at rest.",
      impact: "Capable of processing 10k+ identity verifications per second with sub-100ms latency. Identified 12 unique fraud patterns in simulated stress tests.",
      tech: ['Apache Kafka', 'Scikit-Learn', 'Redis', 'Docker', 'Kubernetes']
    }
  },
  {
    title: 'Satellite Imagery for Global Change Detection',
    description: 'Built a pixel-level segmentation model to detect wildfires and smoke plumes from geostationary satellite feeds. Developed a custom geospatial annotation pipeline for vision models at scale.',
    icon: Box,
    tags: ['Computer Vision', 'NASA Earthdata', 'Segmentation', 'Remote Sensing'],
    color: '#8b5cf6',
    details: {
      problem: "Manual identification of environmental changes from satellite imagery is slow and prone to human error, especially for smoke plume detection which lacks sharp boundaries.",
      solution: "Trained a modified U-Net architecture on multispectral satellite data. Developed a custom semi-automated annotation tool that uses spectral signatures to assist human labelers.",
      impact: "Achieved an IoU (Intersection over Union) of 0.82 for smoke detection. Automated the processing of 500GB+ of daily satellite imagery.",
      tech: ['PyTorch', 'OpenCV', 'GDAL', 'Weights & Biases', 'AWS S3']
    }
  },
  {
    title: 'Real-Time Demand Forecasting & Price Optimization',
    description: 'High-frequency demand forecasting models for Uber-style ride requests. Engineered 200+ features and built automated validation pipelines to catch distribution shifts and data drift.',
    icon: BarChart3,
    tags: ['XGBoost', 'LSTM', 'Time-Series', 'Quantization'],
    color: '#f59e0b',
    details: {
      problem: "Ride-sharing platforms face extreme volatility in demand, leading to inefficient driver allocation and lost revenue during peak hours.",
      solution: "Built a hybrid model combining XGBoost for structured features and LSTM for temporal sequences. Implemented a real-time feature store to serve 200+ features with millisecond latency.",
      impact: "Reduced forecasting error (MAPE) by 18% compared to baseline models. Increased platform throughput by 12% through better supply-demand matching.",
      tech: ['XGBoost', 'TensorFlow', 'Apache Spark', 'MLflow', 'Grafana']
    }
  },
  {
    title: 'J.A.R.V.I.S. — Multimodal AI Assistant',
    description: 'End-to-end multimodal AI assistant processing voice, text, and visual inputs. Integrated speech recognition, NLP pipelines, and computer vision into a unified inference stack.',
    icon: Bot,
    tags: ['Python', 'NLP', 'Speech Recognition', 'Computer Vision'],
    color: '#ef4444',
    details: {
      problem: "Most AI assistants are limited to single-modality interactions, failing to provide a truly integrated human-computer interface.",
      solution: "Developed a unified inference engine that synchronizes audio processing (Whisper), text understanding (LLMs), and visual recognition (YOLOv8). Used a custom state machine for context management.",
      impact: "Achieved sub-2s response time for complex multimodal queries. Successfully demonstrated real-time object identification and conversational reasoning.",
      tech: ['OpenAI Whisper', 'LangChain', 'YOLOv8', 'PyAudio', 'Hugging Face']
    }
  },
  {
    title: 'Siddhant — Ancient Indian Yantra Reconstruction Engine',
    description: 'Grand Finalist at Smart India Hackathon 2025. Geometric computation engine to algorithmically reconstruct and visualize ancient Indian astronomical Yantras using graph algorithms, symbolic math, and constraint solving.',
    icon: Cpu,
    tags: ['Computational Geometry', 'SIH 2025', '3D Modeling', 'Graph Algorithms'],
    color: '#ec4899',
    details: {
      problem: "Ancient Indian astronomical Yantras are complex geometric structures whose construction logic is often buried in archaic texts, making them difficult to study or reproduce accurately.",
      solution: "Created 'Siddhant', an engine that translates Sanskrit geometric descriptions into symbolic constraints. Used graph algorithms to resolve dependencies and Three.js for 3D visualization.",
      impact: "Grand Finalist at SIH 2025. Successfully reconstructed 15+ complex Yantras with mathematical precision. Provided a digital bridge between ancient wisdom and modern geometry.",
      tech: ['Three.js', 'SymPy', 'NetworkX', 'React', 'TypeScript']
    }
  },
  {
    title: 'OncoSML — Cancer Vaccine Learning System',
    description: 'Self-maintaining ML system for cancer-vaccine research. Combines cBioPortal genomics ingestion, continuous GitHub learning, and live monitoring.',
    icon: Activity,
    tags: ['Genomics', 'MLOps', 'Cancer Research', 'Self-Maintaining'],
    color: '#ef4444',
    details: {
      problem: "Cancer vaccine research involves massive, ever-changing genomic datasets and research papers, making it difficult for researchers to maintain up-to-date ML models manually.",
      solution: "Built OncoSML, a self-maintaining system that automatically ingests genomics data from cBioPortal and learns from new research on GitHub. It includes automated model training, safety checks, and a live monitoring dashboard.",
      impact: "Automated the entire research-to-model pipeline. Reduced the time to integrate new genomic findings from weeks to hours. Provides a robust foundation for personalized vaccine research.",
      tech: ['Python', 'cBioPortal API', 'GitHub Actions', 'PyTorch', 'MLOps']
    }
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-32 bg-black/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured <span className="text-[#00d4ff]">Initiatives</span></h2>
          <div className="h-1 w-20 bg-[#00d4ff]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 15,
                delay: i * 0.1 
              }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  <project.icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-[#00d4ff] flex items-center gap-1 hover:underline"
                  >
                    VIEW CASE STUDY <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 p-6 md:p-8 bg-[#0a0a0a]/80 backdrop-blur-md border-bottom border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedProject.color}20`, color: selectedProject.color }}
                  >
                    <selectedProject.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {selectedProject.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-12">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Globe size={14} /> The Challenge
                      </h4>
                      <p className="text-white/70 leading-relaxed text-lg">
                        {selectedProject.details.problem}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Cpu size={14} /> Technical Solution
                      </h4>
                      <p className="text-white/70 leading-relaxed text-lg">
                        {selectedProject.details.solution}
                      </p>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-mono text-purple-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <CheckCircle2 size={14} /> Key Impact
                      </h4>
                      <p className="text-white/80 font-medium leading-relaxed">
                        {selectedProject.details.impact}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Lock size={14} /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.details.tech.map(t => (
                          <span key={t} className="px-3 py-1 rounded-full bg-black border border-white/5 text-xs text-white/40">
                            {t}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
