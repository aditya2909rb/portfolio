import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
  const points = useRef<THREE.Points>(null);
  const count = 2000;
  
  const [positions, initialPositions] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [pos, initial];
  }, []);

  useFrame((state) => {
    if (points.current) {
      const t = state.clock.getElapsedTime();
      points.current.rotation.y = t * 0.02;
      
      const posAttr = points.current.geometry.attributes.position;
      const mouse = new THREE.Vector3(state.mouse.x * 30, state.mouse.y * 30, 0);

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const p = new THREE.Vector3(initialPositions[ix], initialPositions[iy], initialPositions[iz]);
        
        // Add some noise movement
        p.x += Math.sin(t * 0.5 + initialPositions[ix]) * 0.5;
        p.y += Math.cos(t * 0.5 + initialPositions[iy]) * 0.5;

        // Mouse interaction
        const dist = mouse.distanceTo(p);
        if (dist < 15) {
          const force = (15 - dist) / 15;
          const dir = mouse.clone().sub(p).normalize();
          p.add(dir.multiplyScalar(force * 0.5));
        }

        posAttr.setXYZ(i, p.x, p.y, p.z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00d4ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const TechGrid = () => {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.getElapsedTime() * 2) % 2;
    }
  });
  return (
    <gridHelper ref={ref} args={[100, 40, '#00d4ff', '#00d4ff']} rotation={[Math.PI / 2, 0, 0]} position={[0, -15, 0]}>
      <meshBasicMaterial transparent opacity={0.03} />
    </gridHelper>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingParticles />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[10, 5, -10]}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#00d4ff" wireframe transparent opacity={0.1} />
          </mesh>
        </Float>
        <TechGrid />
      </Canvas>
    </div>
  );
};
