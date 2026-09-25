import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Github, Linkedin, ExternalLink, Download, ArrowDown, Sparkles, GraduationCap, Award, GitBranch, Layers, Copy, Check, Code, Gamepad2, Brain, Compass } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

type FocusTrack = 'versatile' | 'fullstack' | 'game' | 'ai';

interface ProfileLens {
  id: FocusTrack;
  label: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  pitch: string;
  tags: string[];
}

const focusProfiles: Record<FocusTrack, ProfileLens> = {
  versatile: {
    id: 'versatile',
    label: 'Core / Versatile',
    badge: 'Full-Stack • Game & 3D • AI/Data Science',
    icon: Compass,
    headline: 'Software Engineer & Systems Developer | Full-Stack • 3D Interactive • AI/ML',
    pitch: 'Results-driven Software Engineer with a strong foundation in building high-performance web applications, interactive systems, and scalable backends. Adept at bridging clean UI/UX with robust engineering principles, leveraging TypeScript, modern system architectures, and practical machine learning pipelines to deliver seamless digital experiences.',
    tags: ['Full-Stack Systems', 'Interactive 3D / WebGL', 'AI & Spatio-Temporal ML', 'High-Performance APIs']
  },
  fullstack: {
    id: 'fullstack',
    label: 'Full-Stack Engineer',
    badge: 'Option A: Scalable Systems & Product Delivery',
    icon: Code,
    headline: 'Software & Full-Stack Engineer | Scalable Systems & Modern Web',
    pitch: 'Results-driven Software Engineer with a strong foundation in building high-performance web applications, interactive systems, and scalable backends. Adept at bridging clean UI/UX with robust engineering principles, leveraging TypeScript, Next.js, and modern system architectures to deliver seamless digital experiences.',
    tags: ['TypeScript & Next.js', 'High-Performance Web', 'Scalable Backends', 'RESTful APIs & UI/UX']
  },
  game: {
    id: 'game',
    label: 'Game & Interactive Dev',
    badge: 'Option B: Performance, Logic & Real-Time Sync',
    icon: Gamepad2,
    headline: 'Technical / Game & Interactive Systems Developer | Real-Time State & 3D Logic',
    pitch: 'Performance-focused Developer specializing in interactive systems, game logic, and real-time state synchronization. Combines a strong academic foundation in computer science with practical expertise in modern web stacks, 3D graphics logic, and performance optimization.',
    tags: ['Three.js & WebGL', 'Custom Rendering Loops', 'Real-Time State Sync', 'Game Logic & Math']
  },
  ai: {
    id: 'ai',
    label: 'AI & Data Science',
    badge: 'Computer Vision & Applied Machine Learning',
    icon: Brain,
    headline: 'Data Science & AI Engineer | Computer Vision • PyTorch • MLOps',
    pitch: 'Applied AI & Data Science engineer with a rigorous academic foundation at IIT Guwahati and Grand Finalist recognition at SIH 2025. Specializes in building practical computer vision pipelines, real-time spatio-temporal forecasting, and robust MLOps workflows with measurable real-world precision.',
    tags: ['Computer Vision (OpenCV)', 'PyTorch & U-Net', 'Spatio-Temporal ML', 'MLOps & CI/CD']
  }
};

const DataCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      const t = state.clock.getElapsedTime();
      
      meshRef.current.rotation.y = t * 0.45;
      wireRef.current.rotation.y = -t * 0.25;
      
      const mouseX = state.mouse.x * 0.4;
      const mouseY = state.mouse.y * 0.4;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.08);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mouseX, 0.08);
      
      wireRef.current.rotation.x = THREE.MathUtils.lerp(wireRef.current.rotation.x, -mouseY * 1.2, 0.08);
      wireRef.current.rotation.z = THREE.MathUtils.lerp(wireRef.current.rotation.z, mouseX * 1.2, 0.08);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#00d4ff"
          speed={2.5}
          distort={0.25}
          radius={1}
          emissive="#005577"
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={wireRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  );
};

export const Hero = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [activeTrack, setActiveTrack] = useState<FocusTrack>('versatile');
  const [copied, setCopied] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  const activeProfile = focusProfiles[activeTrack];

  const handleCopySummary = () => {
    navigator.clipboard.writeText(activeProfile.pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Content */}
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          {/* Institution Subtitle */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-5 font-mono flex-wrap">
            <span className="text-[#00d4ff] font-semibold">IIT Guwahati</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>B.Sc. (Hons.) Data Science &amp; AI</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-emerald-400">SIH 2025 Grand Finalist</span>
          </div>
          
          {/* Main Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            ADITYA ROY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-emerald-400">BARDHAN</span>
          </h1>

          {/* Role Lens Switcher / Track Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={13} className="text-[#00d4ff]" />
                <span>Tailor Focus to Job Role:</span>
              </span>
              <span className="text-[11px] font-mono text-[#00d4ff]">
                {activeProfile.badge}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(Object.keys(focusProfiles) as FocusTrack[]).map((trackKey) => {
                const track = focusProfiles[trackKey];
                const Icon = track.icon;
                const isActive = activeTrack === trackKey;
                return (
                  <button
                    key={trackKey}
                    onClick={() => setActiveTrack(trackKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/50 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                        : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    <Icon size={13} />
                    <span>{track.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-sky-200 to-emerald-300 mb-4 tracking-tight">
                {activeProfile.headline}
              </h2>
              
              {/* Dynamic Pitch / Professional Summary */}
              <div className="relative mb-5 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                <p className="text-sm sm:text-base text-white/85 leading-relaxed pr-10">
                  {activeProfile.pitch}
                </p>

                <button
                  onClick={handleCopySummary}
                  title="Copy professional summary for job application / cover letter"
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#00d4ff] transition-all cursor-pointer"
                  aria-label="Copy summary to clipboard"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>

                {copied && (
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-400">
                    Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Focus Skill Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeProfile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-xl bg-[#00d4ff] text-black font-semibold text-sm hover:bg-[#33ddff] hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-all cursor-pointer"
            >
              View Projects
            </button>

            <a
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aditya_Roy_Bardhan_Resume.pdf"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={15} />
              <span>Download CV</span>
            </a>

            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 text-white/80 hover:text-white font-medium text-sm border border-white/10 transition-all cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Profiles and Social Adjacency */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-white/50">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/aditya2909rb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-[#00d4ff] transition-colors"
                aria-label="GitHub profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <span aria-hidden="true" className="text-white/20">·</span>
              <a
                href="https://linkedin.com/in/aditya-roy-bardhan-a22ba22b7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-[#00d4ff] transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-white/20">·</span>
              <a
                href="https://leetcode.com/u/adityaroybardhan2909"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00d4ff] transition-colors"
              >
                LeetCode
              </a>
              <span aria-hidden="true" className="text-white/20">·</span>
              <a
                href="https://kaggle.com/aditya2909rb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00d4ff] transition-colors"
              >
                Kaggle
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Visualization + Grounded Trust Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:block h-[480px]"
        >
          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <DataCore />
              <Stars radius={50} depth={40} count={900} factor={3.5} saturation={0} fade speed={0.8} />
            </Canvas>
          </div>
          
          {/* Grounded Credential Markers (Anti-Slop, No fake telemetry) */}
          <div className="absolute bottom-4 right-4 z-20 p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl flex flex-col gap-3 min-w-[220px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="text-[11px] text-white/50">Institution</div>
                <div className="text-sm font-semibold text-white">IIT Guwahati</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Award size={18} />
              </div>
              <div>
                <div className="text-[11px] text-white/50">Hackathon</div>
                <div className="text-sm font-semibold text-white">SIH 2025 Grand Finalist</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <GitBranch size={18} />
              </div>
              <div>
                <div className="text-[11px] text-white/50">Open Source</div>
                <div className="text-sm font-semibold text-white">GitHub Pro Contributor</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-white/30">
        <span>Scroll to explore projects</span>
        <ArrowDown size={13} className="animate-bounce" />
      </div>
    </section>
  );
};
