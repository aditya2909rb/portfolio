import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Instagram, Cpu, ShieldCheck, ChevronDown, Download } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const DataCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Base rotation
      meshRef.current.rotation.y = t * 0.5;
      wireRef.current.rotation.y = -t * 0.3;
      
      // Mouse reaction
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mouseX, 0.1);
      
      wireRef.current.rotation.x = THREE.MathUtils.lerp(wireRef.current.rotation.x, -mouseY * 1.5, 0.1);
      wireRef.current.rotation.z = THREE.MathUtils.lerp(wireRef.current.rotation.z, mouseX * 1.5, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#00d4ff"
          speed={3}
          distort={0.3}
          radius={1}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={wireRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

export const Hero = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 40,
            damping: 15,
            duration: 1.2 
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
            </span>
            SYSTEM OVERRIDE ACTIVE
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4 leading-none relative group">
            <span className="relative inline-block">
              ADITYA ROY
              <span className="absolute inset-0 text-[#00d4ff] opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 pointer-events-none">ADITYA ROY</span>
              <span className="absolute inset-0 text-emerald-400 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 pointer-events-none">ADITYA ROY</span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-emerald-400 relative inline-block">
              BARDHAN
              <span className="absolute inset-0 text-[#00d4ff] opacity-0 group-hover:opacity-30 group-hover:animate-glitch-3 pointer-events-none">BARDHAN</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-mono text-white/60 mb-8 max-w-xl">
            ML Engineer · LLM Training (500B+ Parameters) · AI Systems · Cybersecurity
          </p>
          
          <p className="text-lg text-white/40 mb-10 max-w-2xl leading-relaxed">
            ML Engineer specializing in hyperscale LLM training and AI systems, with hands-on production experience on a 519B-parameter model. Unique combination of deep model-training expertise — 3D parallelism, DeepSpeed, reasoning-trace construction — and a rigorous cybersecurity background securing international financial infrastructure. Driven by the intersection of frontier AI systems and real-world data quality, with a track record of owning end-to-end pipelines from raw data ingestion to production model deployment.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/aditya2909rb' },
                { icon: Linkedin, href: 'https://linkedin.com/in/aditya-roy-bardhan-a22ba22b7' },
                { icon: Instagram, href: 'https://instagram.com/adityaroybardhan2025' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#00d4ff' }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
            
            <div className="flex gap-4">
              <a href="https://leetcode.com/u/adityaroybardhan2909" target="_blank" className="text-sm font-mono text-white/40 hover:text-[#00d4ff] transition-colors">LeetCode</a>
              <a href="https://kaggle.com/aditya2909rb" target="_blank" className="text-sm font-mono text-white/40 hover:text-[#00d4ff] transition-colors">Kaggle</a>
            </div>
          </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenResume}
                className="px-8 py-4 rounded-xl bg-[#00d4ff] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
              >
                VIEW RESUME <Download size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      const nameInput = contactSection.querySelector('input[name="name"]') as HTMLInputElement;
                      if (nameInput) nameInput.focus();
                    }, 800);
                  }
                }}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
              >
                GET IN TOUCH
              </motion.button>
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block h-[500px]"
        >
          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <DataCore />
              <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
          </div>
          
          <div className="absolute bottom-0 right-0 z-20 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col gap-4 max-w-[240px]">
            <div className="flex items-center gap-3">
              <Cpu className="text-[#00d4ff]" size={24} />
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Model Scale</div>
                <div className="text-xl font-bold text-white">519B</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={24} />
              <div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Security</div>
                <div className="text-xl font-bold text-white">L8 Bank</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
