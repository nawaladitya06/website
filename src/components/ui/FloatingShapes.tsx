"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { Suspense } from "react";

function Geometries() {
  return (
    <group>
      {/* 1. MAIN ACCENT: The "Liquid Purple" Blob (Top Right) */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[5, 3, -5]} scale={2.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#a855f7" // Purple
            envMapIntensity={0.4}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      {/* 2. TECH VIBE: The "Cyan Crystal" (Bottom Left) */}
      <Float speed={2} rotationIntensity={3} floatIntensity={1.5}>
        <mesh position={[-6, -4, -6]} scale={2.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#06b6d4" // Cyan
            wireframe
            emissive="#06b6d4"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* 3. DYNAMIC ENERGY: The "Green Wobble" Knot (Mid Right) */}
      <Float speed={3} rotationIntensity={4} floatIntensity={3}>
        <mesh position={[6, -2, -4]} scale={1.2}>
          <torusKnotGeometry args={[0.5, 0.2, 128, 16]} />
          <MeshWobbleMaterial
            color="#22c55e" // Green
            factor={0.6}
            speed={1.5}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* 4. CHROME ELEMENT: The "Silver Cube" (Top Left) */}
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-5, 4, -8]} scale={1.8}>
          {/* FIX: Added segments (32, 32, 32) so the distortion works! */}
          <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
          <MeshDistortMaterial
            color="#ffffff"
            speed={3}
            distort={0.3}
            radius={1}
            roughness={0.1}
            metalness={0.8} // Lowered slightly so it catches light better
          />
        </mesh>
      </Float>

      {/* 5. HALO EFFECT: The "Glowing Ring" (Center-ish Depth) */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[0, 1, -12]} rotation={[Math.PI / 3, 0, 0]} scale={3}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial 
             color="#a855f7" 
             emissive="#a855f7" 
             emissiveIntensity={2} 
             toneMapped={false} 
          />
        </mesh>
      </Float>

      {/* 6. GEOMETRIC DETAIL: The "Wireframe Pyramid" (Bottom Center) */}
      <Float speed={2.5} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[2, -5, -9]} scale={1.5}>
          <tetrahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#e879f9" // Soft Pink/Purple accent
            wireframe
            roughness={0}
          />
        </mesh>
      </Float>

      {/* 7. GLASS SHAPE: The "Capsule" (Far Right) */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[8, 0, -10]} rotation={[0, 0, Math.PI / 4]} scale={1.5}>
          <capsuleGeometry args={[0.5, 2, 4, 8]} />
          <meshPhysicalMaterial
            color="#06b6d4"
            roughness={0.1}
            metalness={0.1}
            transmission={0.5} // Glass-like effect
            thickness={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
        <pointLight position={[10, 5, -5]} intensity={2} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <Geometries />
        </Suspense>
      </Canvas>
    </div>
  );
}