import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, ExternalLink, Download, ArrowDown, Sparkles, GraduationCap, Award, GitBranch } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

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
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

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
          <div className="flex items-center gap-2 text-xs text-white/60 mb-5 font-mono">
            <span className="text-[#00d4ff] font-semibold">IIT Guwahati</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>B.Sc. (Hons.) Data Science & AI</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-emerald-400">SIH 2025 Grand Finalist</span>
          </div>
          
          {/* Main Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            ADITYA ROY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-emerald-400">BARDHAN</span>
          </h1>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-sky-200 to-emerald-300 mb-4 tracking-tight">
            Data Science &amp; AI Student | AI/ML • Computer Vision • Software Engineering
          </h2>
          
          {/* Pitch */}
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
            I build practical AI systems, data-driven applications, and intelligent software — with interests spanning computer vision, LLMs, cybersecurity, and real-time systems.
          </p>
          
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
