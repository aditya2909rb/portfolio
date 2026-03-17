import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SOUNDS = {
  typing: 'https://assets.mixkit.co/sfx/preview/mixkit-keyboard-typing-1386.mp3',
  laser: 'https://assets.mixkit.co/sfx/preview/mixkit-laser-weapon-shot-1681.mp3',
  explosion: 'https://assets.mixkit.co/sfx/preview/mixkit-distant-explosion-with-debris-2185.mp3',
  hyperspace: 'https://assets.mixkit.co/sfx/preview/mixkit-fast-rocket-whoosh-1714.mp3',
  ignition: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-single-drum-hit-550.mp3'
};

const playSound = (url: string, volume = 0.2) => {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play().catch(() => {
    // Ignore autoplay errors
  });
};

const Laser = ({ start, end, color, delay = 0 }: { start: THREE.Vector3, end: THREE.Vector3, color: string, delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const hasPlayed = useRef(false);
  
  useFrame((state) => {
    if (ref.current) {
      const time = (state.clock.getElapsedTime() * 3 + delay) % 1.5;
      if (time < 1) {
        const pos = new THREE.Vector3().lerpVectors(start, end, time);
        ref.current.position.copy(pos);
        ref.current.visible = true;
        
        // Play sound at the start of the laser cycle
        if (time < 0.1 && !hasPlayed.current) {
          playSound(SOUNDS.laser, 0.05);
          hasPlayed.current = true;
        }
      } else {
        ref.current.visible = false;
        hasPlayed.current = false;
      }
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.015, 0.015, 0.8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const Ship = ({ color, isEnemy, offset = 0, type = 'orbit' }: { color: string, isEnemy?: boolean, offset?: number, type?: 'orbit' | 'evasive' | 'pursuit' }) => {
  const ref = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const flareRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const initialized = useRef(false);
  
  // Randomize ship-specific movement parameters
  const params = useMemo(() => ({
    bobSpeed: 0.5 + Math.random() * 0.8,
    bobAmount: 0.05 + Math.random() * 0.15,
    rollIntensity: 0.8 + Math.random() * 0.4,
    pitchIntensity: 0.4 + Math.random() * 0.3,
    flareSpeed: 8 + Math.random() * 12,
    maneuverSpeed: 0.8 + Math.random() * 0.4,
  }), []);

  const lastPos = useRef(new THREE.Vector3());
  const targetRotY = useRef(0);
  const trailPoints = useRef<THREE.Vector3[]>([]);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() + offset;
      
      // 1. Core Movement
      if (type === 'evasive') {
        ref.current.position.x = Math.sin(t * 1.5 * params.maneuverSpeed) * 6 + Math.cos(t * 3) * 2;
        ref.current.position.y = Math.cos(t * 1.2 * params.maneuverSpeed) * 4 + Math.sin(t * 2.5) * 1.5;
        ref.current.position.z = Math.sin(t * 0.8 * params.maneuverSpeed) * 3 + 2;
        targetRotY.current = Math.sin(t * 2) * 0.8;
      } else if (type === 'pursuit') {
        ref.current.position.x = Math.sin(t * 0.8 * params.maneuverSpeed) * 10;
        ref.current.position.y = Math.cos(t * 0.5 * params.maneuverSpeed) * 5;
        ref.current.position.z = Math.sin(t * 1.2 * params.maneuverSpeed) * 8 - 5;
        targetRotY.current = Math.PI + Math.sin(t * 0.8) * 0.4;
      } else {
        if (isEnemy) {
          ref.current.position.x = Math.sin(t * 0.5 * params.maneuverSpeed) * 8;
          ref.current.position.y = Math.cos(t * 0.8 * params.maneuverSpeed) * 4;
          ref.current.position.z = Math.sin(t * 0.3 * params.maneuverSpeed) * 5 - 10;
          targetRotY.current = Math.PI + Math.sin(t) * 0.5;
        } else {
          ref.current.position.x = Math.cos(t * 0.6 * params.maneuverSpeed) * 4;
          ref.current.position.y = Math.sin(t * 0.4 * params.maneuverSpeed) * 3;
          ref.current.position.z = Math.cos(t * 0.5 * params.maneuverSpeed) * 2 + 2;
          targetRotY.current = Math.sin(t * 0.5) * 0.3;
        }
      }

      // 2. Subtle Bobbing
      ref.current.position.y += Math.sin(t * params.bobSpeed) * params.bobAmount;

      // 3. Smooth Rotations
      if (!initialized.current) {
        lastPos.current.copy(ref.current.position);
        ref.current.rotation.y = targetRotY.current;
        initialized.current = true;
      } else {
        const velocity = ref.current.position.clone().sub(lastPos.current);
        
        // Roll based on horizontal velocity
        const targetRoll = -velocity.x * 12 * params.rollIntensity;
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRoll, 0.05);
        
        // Pitch based on vertical velocity
        const targetPitch = velocity.y * 6 * params.pitchIntensity;
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetPitch, 0.05);
        
        // Smooth Y rotation
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY.current, 0.1);
        
        lastPos.current.copy(ref.current.position);
      }

      // 4. Thruster Flares
      if (lightRef.current && flareRef.current) {
        const flare = 1 + Math.sin(t * params.flareSpeed) * 0.4;
        lightRef.current.intensity = 3 * flare;
        flareRef.current.scale.setScalar(0.8 + flare * 0.4);
        const material = flareRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = 0.4 + flare * 0.4;
        }
      }

      // 5. Trail Update
      if (trailRef.current) {
        trailPoints.current.push(ref.current.position.clone());
        if (trailPoints.current.length > 20) trailPoints.current.shift();
        
        const positions = new Float32Array(trailPoints.current.length * 3);
        trailPoints.current.forEach((p, i) => {
          positions[i * 3] = p.x;
          positions[i * 3 + 1] = p.y;
          positions[i * 3 + 2] = p.z;
        });
        
        const geometry = trailRef.current.geometry as THREE.BufferGeometry;
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={ref}>
      {/* Engine Trail */}
      <line ref={trailRef as any}>
        <bufferGeometry />
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
      {isEnemy ? (
        /* Detailed TIE Interceptor Style */
        <group>
          {/* Cockpit Sphere */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Cockpit Window (The Eye) */}
          <mesh position={[0, 0, 0.12]}>
            <circleGeometry args={[0.08, 8]} />
            <meshBasicMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0, 0.121]}>
            <circleGeometry args={[0.06, 8]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
          </mesh>
          {/* Struts */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Dagger Wings */}
          {[-0.2, 0.2].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]}>
                <coneGeometry args={[0.3, 0.6, 3]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Solar Panel Detail */}
              <mesh position={[i === 0 ? -0.01 : 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[0.4, 0.4]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
              </mesh>
            </group>
          ))}
        </group>
      ) : (
        /* Detailed X-Wing Style */
        <group>
          {/* Fuselage */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.07, 0.7, 8]} />
            <meshStandardMaterial color="#ddd" metalness={0.4} roughness={0.6} />
          </mesh>
          {/* Cockpit Canopy */}
          <mesh position={[0, 0.05, 0.1]}>
            <sphereGeometry args={[0.06, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#333" transparent opacity={0.7} />
          </mesh>
          {/* Nose Cone */}
          <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.04, 0.2, 8]} />
            <meshStandardMaterial color="#eee" />
          </mesh>
          {/* S-Foils (X-configuration) */}
          {[
            { pos: [0.2, 0.1, 0.05], rot: Math.PI / 6 },
            { pos: [-0.2, 0.1, 0.05], rot: -Math.PI / 6 },
            { pos: [0.2, -0.1, 0.05], rot: -Math.PI / 6 },
            { pos: [-0.2, -0.1, 0.05], rot: Math.PI / 6 },
          ].map((wing, i) => (
            <group key={i} position={[wing.pos[0], wing.pos[1], wing.pos[2]]} rotation={[0, 0, wing.rot]}>
              <mesh>
                <boxGeometry args={[0.45, 0.015, 0.25]} />
                <meshStandardMaterial color="#ccc" />
              </mesh>
              {/* Engine Nacelle */}
              <mesh position={[-0.18, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.2]} />
                <meshStandardMaterial color="#555" />
              </mesh>
              {/* Laser Cannon */}
              <mesh position={[0.2, 0, 0.1]}>
                <boxGeometry args={[0.1, 0.02, 0.02]} />
                <meshStandardMaterial color="#444" />
              </mesh>
            </group>
          ))}
          {/* Red Stripe Detail */}
          <mesh position={[0, 0.07, 0.2]}>
            <boxGeometry args={[0.02, 0.01, 0.1]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
        </group>
      )}

      {/* Engine Glow / Thruster Flare */}
      <pointLight ref={lightRef} color={color} intensity={2} distance={3} />
      
      {/* Visual Thruster Flare Mesh */}
      <mesh ref={flareRef} position={[0, 0, isEnemy ? 0.2 : -0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0, 0.3, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const Explosion = ({ position }: { position: THREE.Vector3 }) => {
  const ref = useRef<THREE.Points>(null);
  const hasPlayed = useRef(false);
  const [particles] = useState(() => {
    const p = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      p[i * 3] = (Math.random() - 0.5) * 0.1;
      p[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return p;
  });

  useFrame((state) => {
    if (ref.current) {
      if (!hasPlayed.current) {
        playSound(SOUNDS.explosion, 0.1);
        hasPlayed.current = true;
      }
      ref.current.scale.multiplyScalar(1.05);
      const material = ref.current.material as THREE.PointsMaterial;
      material.opacity *= 0.95;
    }
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={100} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffaa00" transparent opacity={1} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const DataCore = () => {
  const ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.2;
      ref.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.5;
      wireRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={ref}>
      {/* Main Core Body */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.2, 2]} />
        <MeshDistortMaterial
          color="#00d4ff"
          speed={3}
          distort={0.3}
          radius={1}
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer Wireframe Shell */}
      <mesh ref={wireRef}>
        <octahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Orbiting Data Rings */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <mesh>
            <torusGeometry args={[2 + i * 0.4, 0.02, 16, 100]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Core Glow */}
      <pointLight color="#00d4ff" intensity={5} distance={10} />
    </group>
  );
};

const BattleScene = () => {
  const [explosions, setExplosions] = useState<{ id: number, pos: THREE.Vector3 }[]>([]);
  const explosionId = useRef(0);
  
  useFrame((state) => {
    if (Math.random() > 0.95) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15 - 5
      );
      setExplosions(prev => [...prev.slice(-10), { id: explosionId.current++, pos }]);
    }
    
    // Intense Camera shake + Mouse Parallax
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX + Math.sin(time * 10) * 0.02, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouseY + Math.cos(time * 12) * 0.02, 0.1);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00d4ff" />
      <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={2} />
      
      <DataCore />
      
      {/* Defenders - More ships with variety */}
      <Ship color="#00d4ff" offset={0} type="evasive" />
      <Ship color="#00d4ff" offset={Math.PI * 0.6} type="orbit" />
      <Ship color="#00d4ff" offset={Math.PI * 1.2} type="evasive" />
      <Ship color="#00d4ff" offset={Math.PI * 0.3} type="orbit" />
      
      {/* Enemies - More ships with variety */}
      <Ship color="#ff4444" isEnemy offset={0} type="pursuit" />
      <Ship color="#ff4444" isEnemy offset={Math.PI * 0.4} type="pursuit" />
      <Ship color="#ff4444" isEnemy offset={Math.PI * 0.8} type="orbit" />
      <Ship color="#ff4444" isEnemy offset={Math.PI * 1.2} type="pursuit" />
      <Ship color="#ff4444" isEnemy offset={Math.PI * 1.6} type="orbit" />
      <Ship color="#ff4444" isEnemy offset={Math.PI * 0.2} type="pursuit" />

      {/* Dynamic Lasers - Varied patterns */}
      {Array.from({ length: 24 }).map((_, i) => {
        const isEnemyLaser = i % 2 === 0;
        const isBurst = i % 4 === 0;
        
        const start = new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          isEnemyLaser ? -15 : 10
        );
        const end = new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          isEnemyLaser ? 10 : -15
        );
        
        return (
          <Laser 
            key={i} 
            start={start} 
            end={end} 
            color={isEnemyLaser ? "#ff0000" : "#00ff00"} 
            delay={isBurst ? (i * 0.05) : (i * 0.15)} 
          />
        );
      })}

      {explosions.map(exp => (
        <Explosion key={exp.id} position={exp.pos} />
      ))}
    </>
  );
};

const Hyperspace = ({ active }: { active: boolean }) => {
  const starsRef = useRef<THREE.Group>(null);
  const tunnelRef = useRef<THREE.Mesh>(null);
  
  const starData = useMemo(() => {
    return Array.from({ length: 2000 }).map(() => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      z: Math.random() * 1000 - 500,
      radius: 5 + Math.random() * 20,
      angle: Math.random() * Math.PI * 2,
      speed: 15 + Math.random() * 20
    }));
  }, []);

  useFrame((state) => {
    const mouseX = state.mouse.x * 2;
    const mouseY = state.mouse.y * 2;

    if (starsRef.current && active) {
      const t = state.clock.getElapsedTime();
      starsRef.current.rotation.z = t * 0.5;
      
      // Steering effect
      starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, -mouseX, 0.05);
      starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, -mouseY, 0.05);
      
      starsRef.current.children.forEach((star: any, i) => {
        const data = starData[i];
        star.position.z += data.speed;
        
        // Tunnel distortion: stars move outwards as they get closer
        const progress = (star.position.z + 500) / 1000;
        const spread = 1 + progress * 5;
        star.position.x = Math.cos(data.angle) * data.radius * spread;
        star.position.y = Math.sin(data.angle) * data.radius * spread;
        
        if (star.position.z > 100) {
          star.position.z = -900;
        }
        
        // Scale based on speed and proximity
        star.scale.z = data.speed * 0.5;
      });
    }
    
    if (tunnelRef.current && active) {
      tunnelRef.current.rotation.z -= 0.01;
      tunnelRef.current.position.x = THREE.MathUtils.lerp(tunnelRef.current.position.x, -mouseX * 0.5, 0.05);
      tunnelRef.current.position.y = THREE.MathUtils.lerp(tunnelRef.current.position.y, -mouseY * 0.5, 0.05);
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        {starData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]}>
            <boxGeometry args={[0.05, 0.05, 1]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
      
      {/* Warp Tunnel Glow */}
      <mesh ref={tunnelRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[10, 10, 1000, 32, 1, true]} />
        <meshBasicMaterial 
          color="#00d4ff" 
          wireframe 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide}
        />
      </mesh>
      
      <pointLight position={[0, 0, -100]} intensity={10} color="#00d4ff" />
    </group>
  );
};

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [battleLog, setBattleLog] = useState<string>("");

  const lines = [
    "INITIALIZING NEURAL PATHWAYS...",
    "DECRYPTING SECURITY PROTOCOLS...",
    "A.S.H.A. SATELLITE UPLINK ESTABLISHED...",
    "SYSTEM OVERRIDE BY: ADITYA ROY BARDHAN."
  ];

  const battleLogs = [
    "INCOMING THREAT DETECTED: BRUTE FORCE ATTACK",
    "DEPLOYING X-WING DEFENSE GRID...",
    "LASER FIRE EXCHANGED: 88% ACCURACY",
    "SECURING CV DATA CORE...",
    "THREAT NEUTRALIZED. PREPARING JUMP."
  ];

  useEffect(() => {
    if (phase === 1) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          setTerminalText(prev => [...prev, lines[currentLine]]);
          playSound(SOUNDS.typing, 0.1);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            playSound(SOUNDS.ignition, 0.3);
            setPhase(2);
          }, 1000);
        }
      }, 600);
      return () => clearInterval(interval);
    }
    
    if (phase === 2) {
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < battleLogs.length) {
          setBattleLog(battleLogs[currentLog]);
          playSound(SOUNDS.typing, 0.05);
          currentLog++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            playSound(SOUNDS.hyperspace, 0.4);
            setPhase(3);
          }, 1000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    
    if (phase === 3) {
      setTimeout(() => onComplete(), 3000);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-none">
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[#00d4ff] text-sm md:text-lg space-y-2 text-center"
          >
            {terminalText.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="tracking-widest"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            key="phase2-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} />
              <color attach="background" args={['#000000']} />
              {phase === 2 && <BattleScene />}
              {phase === 3 && <Hyperspace active={true} />}
            </Canvas>
            
            {phase === 2 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={battleLog}
                  className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#00d4ff] bg-black/50 px-6 py-2 border border-[#00d4ff]/30 backdrop-blur-sm"
                >
                  {battleLog}
                </motion.div>
              </div>
            )}

            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [1, 1.2, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  times: [0, 0.1, 0.8, 1],
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white pointer-events-none z-[110]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
