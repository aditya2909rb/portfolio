import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 print-modal-container">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              #main-app-layout, .no-print {
                display: none !important;
              }
              body {
                background: white !important;
                color: black !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
              }
              .print-modal-container {
                position: static !important;
                display: block !important;
                padding: 0 !important;
                overflow: visible !important;
              }
              .print-actual-content {
                position: relative !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 15mm !important;
                background: white !important;
                box-shadow: none !important;
                border: none !important;
                overflow: visible !important;
                max-height: none !important;
              }
              @page {
                size: A4;
                margin: 10mm;
              }
            }
          `}} />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md no-print"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl print-actual-content"
          >
            {/* Action Bar (Hidden on Print) */}
            <div className="sticky top-0 z-30 px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex justify-between items-center no-print">
              <div className="flex items-center gap-3">
                <a
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Aditya_Roy_Bardhan_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-xs font-bold hover:bg-[#33ddff] transition-colors"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Resume</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Resume Content */}
            <div className="p-8 md:p-14 text-slate-800 font-sans leading-relaxed selection:bg-[#00d4ff]/20">
              
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-6 mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
                  ADITYA ROY BARDHAN
                </h1>
                
                <p className="text-base font-semibold text-[#007799] mb-3">
                  Data Science &amp; AI Student | AI/ML • Computer Vision • Software Engineering
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
                  <span>Kolkata, India</span>
                  <span>·</span>
                  <span>+91 9681418024</span>
                  <span>·</span>
                  <a href="mailto:adityaroybardhan@gmail.com" className="text-[#007799] hover:underline">
                    adityaroybardhan@gmail.com
                  </a>
                  <span>·</span>
                  <a href="https://github.com/aditya2909rb" target="_blank" rel="noopener noreferrer" className="text-[#007799] hover:underline">
                    github.com/aditya2909rb
                  </a>
                  <span>·</span>
                  <a href="https://linkedin.com/in/aditya-roy-bardhan-a22ba22b7" target="_blank" rel="noopener noreferrer" className="text-[#007799] hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Professional Summary
                </h2>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  Data Science &amp; AI undergraduate at IIT Guwahati building practical AI systems, data-driven applications, and intelligent software. Demonstrated experience spanning computer vision, machine learning, distributed training workflows, and authorized cybersecurity assessments.
                </p>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Education
                </h2>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Indian Institute of Technology (IIT) Guwahati
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">2025 – 2029</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-1">
                  Bachelor of Science (Hons.) in Data Science &amp; Artificial Intelligence
                </p>
                <p className="text-[11px] text-slate-600">
                  Key coursework: Machine Learning Theory, Statistical Inference, Deep Learning, Computer Vision, Distributed Systems, Algorithms.
                </p>
              </div>

              {/* Technical Arsenal */}
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Technical Arsenal
                </h2>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <strong className="text-slate-900">Core Proficiency: </strong>
                    <span className="text-slate-700">Python, PyTorch, SQL, Pandas, NumPy, Computer Vision (OpenCV), Machine Learning, Data Structures</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Working Knowledge: </strong>
                    <span className="text-slate-700">JavaScript, TypeScript, C++, TensorFlow, ONNX Runtime, Docker, GitHub Actions, Linux / Bash</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Exploring &amp; Research: </strong>
                    <span className="text-slate-700">Large Language Models (LLMs), RAG, Agentic AI, Geospatial AI (NASA FIRMS), Distributed Training</span>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-4">
                  Professional Experience &amp; Engagements
                </h2>

                <div className="space-y-6">
                  {/* Exp 1 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xs md:text-sm font-bold text-slate-900">
                        Independent ML Consultant / Contributor (Contract) — Distributed Model Training
                      </h3>
                      <span className="text-xs text-slate-500">Dec 2025 – Feb 2026</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5">
                      <li>Contributed to large-scale distributed training workflows utilizing 3D parallelism (Data, Pipeline, and Tensor Parallelism via Megatron-LM and DeepSpeed ZeRO-3) across GPU cluster nodes.</li>
                      <li>Curated and verified reasoning-trace datasets for knowledge distillation into compact student models, maintaining chain-of-thought coherence.</li>
                      <li>Diagnosed loss spikes and gradient instabilities by conducting systematic data quality audits across preprocessing and batching pipelines.</li>
                    </ul>
                  </div>

                  {/* Exp 2 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xs md:text-sm font-bold text-slate-900">
                        Confidential Cybersecurity Engagements — Authorized Security Assessor
                      </h3>
                      <span className="text-xs text-slate-500">Jan 2023 – Aug 2025</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5">
                      <li>Conducted authorized security assessments for financial-sector and enterprise clients under strict NDA, focusing on REST API security, threat modeling, and authentication controls.</li>
                      <li>Identified and provided remediation roadmaps for 29 high/critical security vulnerabilities across multiple authorized client engagements.</li>
                      <li>Designed rule-based and anomaly-based detection mechanisms for real-time transaction integrity monitoring and automated log alerts.</li>
                    </ul>
                  </div>

                  {/* Exp 3 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-xs md:text-sm font-bold text-slate-900">
                        Gaming Infrastructure Support — Technical Operations Contributor
                      </h3>
                      <span className="text-xs text-slate-500">Jun 2021 – Aug 2024</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5">
                      <li>Maintained backend service health, low-latency synchronization monitoring, and uptime reporting for high-concurrency gaming server infrastructure.</li>
                      <li>Collaborated on observability tooling, distributed telemetry log analysis, and rapid incident triage.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-4">
                  Selected Technical Projects
                </h2>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">
                      ASHA — Alerting Satellite Heat Analytics
                      <span className="font-normal text-slate-500"> [Python, NASA FIRMS, Computer Vision, FastAPI]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Real-time satellite fire detection pipeline across the Indian subcontinent covering 7 high-risk zones; reduced alert latency to sub-15 minutes with 94% classification precision. (github.com/aditya2909rb/ASHA)
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      OncoSML — Computational Cancer Vaccine Workflow
                      <span className="font-normal text-slate-500"> [Python, cBioPortal, PyTorch, MLOps]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Self-maintaining ML pipeline for genomic data ingestion and automated cancer-vaccine candidate learning, cutting manual refresh time from weeks to hours. (github.com/aditya2909rb/sml-project)
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Satellite Imagery Change Detection
                      <span className="font-normal text-slate-500"> [PyTorch, OpenCV, GDAL, U-Net]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Pixel-level segmentation model detecting wildfire smoke plumes and landscape anomalies from geostationary feeds; achieved 0.82 mean IoU.
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Real-Time Demand Forecasting &amp; Dynamic Pricing
                      <span className="font-normal text-slate-500"> [XGBoost, LSTM, ONNX]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Spatio-temporal forecasting engine with 200+ features and sub-100ms inference for real-time ride request surge pricing.
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Siddhant — Ancient Indian Yantra Reconstruction Engine
                      <span className="font-normal text-slate-500"> [Three.js, SymPy, NetworkX]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Grand Finalist at Smart India Hackathon 2025. Algorithmic engine that parses Sanskrit geometric descriptions and renders interactive 3D models.
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Agentic AI Safety Evaluation
                      <span className="font-normal text-slate-500"> [Local LLM, Raspberry Pi 5, Linux Cgroups]</span>
                    </div>
                    <p className="text-slate-700 mt-0.5">
                      Empirical evaluation of an autonomous LLM agent under local filesystem sandboxing, permission gates, and CPU/RAM constraints.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honors & References */}
              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-300 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Key Honors</h3>
                  <p className="text-slate-700">• Smart India Hackathon 2025 — Grand Finalist</p>
                  <p className="text-slate-700">• GitHub Pro &amp; Active Open Source Contributor</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">References</h3>
                  <p className="text-slate-600 italic">
                    Academic and professional references are available upon request.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
