import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Config ──────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 2200;
const BRAND_BLUE = new THREE.Color("#1A73AB");
const BRAND_LIGHT = new THREE.Color("#3BA0D8");
const BRAND_GLOW = new THREE.Color("#64C4F7");
const ACCENT_CYAN = new THREE.Color("#00E5FF");

// ─── Nano Particle Field ─────────────────────────────────────────────────────
function NanoParticleField({
  handPos,
}: {
  handPos: { x: number; y: number } | null;
}) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const { viewport } = useThree();

  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start in a larger, looser cloud around origin
      const radius = 2.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Small initial velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, velocities: vel, phases: ph };
  }, []);

  useFrame((state) => {
    if (!geometryRef.current) return;

    const time = state.clock.elapsedTime;
    const pos = geometryRef.current.attributes.position
      .array as Float32Array;

    const targetX = handPos ? (handPos.x - 0.5) * viewport.width * 0.7 : 0;
    const targetY = handPos
      ? -(handPos.y - 0.5) * viewport.height * 0.7
      : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      let x = pos[ix];
      let y = pos[iy];
      let z = pos[iz];

      let vx = velocities[ix];
      let vy = velocities[iy];
      let vz = velocities[iz];

      const phase = phases[i];

      // Subtle orbital vortex around origin (weaker so particles stay spread)
      const radius = Math.sqrt(x * x + z * z) + 0.0001;
      const swirlSpeed = 0.08 + Math.sin(time * 0.2 + phase) * 0.03;
      const swirlAngle = swirlSpeed * 0.015;
      const cosA = Math.cos(swirlAngle);
      const sinA = Math.sin(swirlAngle);
      const sx = (x / radius) * radius * cosA - (z / radius) * radius * sinA;
      const sz = (x / radius) * radius * sinA + (z / radius) * radius * cosA;

      x = THREE.MathUtils.lerp(x, sx, 0.1);
      z = THREE.MathUtils.lerp(z, sz, 0.1);

      // Gentle float
      vy += (Math.sin(time * 0.6 + phase) * 0.0025 - vy) * 0.08;

      // Very soft attraction towards a core so particles don't clump
      const toCoreX = -x;
      const toCoreY = -y * 0.5;
      const toCoreZ = -z;
      const distCore = Math.sqrt(
        toCoreX * toCoreX + toCoreY * toCoreY + toCoreZ * toCoreZ
      );
      const coreStrength = 0.0005;
      vx += (toCoreX / (distCore + 0.1)) * coreStrength;
      vy += (toCoreY / (distCore + 0.1)) * coreStrength;
      vz += (toCoreZ / (distCore + 0.1)) * coreStrength;

      // Hand / mouse interaction
      if (handPos) {
        const hx = targetX * 0.3;
        const hy = targetY * 0.3;
        const hz = 0;
        const dx = x - hx;
        const dy = y - hy;
        const dz = z - hz;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < 2.2) {
          // Repel nearby particles sharply
          const force = (2.2 - d) * 0.025;
          vx += (dx / (d + 0.1)) * force;
          vy += (dy / (d + 0.1)) * force;
          vz += (dz / (d + 0.1)) * force;
        } else if (d < 5) {
          // Slight attraction for outer band
          const force = (d - 2.2) * 0.001;
          vx -= (dx / (d + 0.1)) * force;
          vy -= (dy / (d + 0.1)) * force;
          vz -= (dz / (d + 0.1)) * force;
        }
      }

      // Velocity damping to keep things under control
      const damping = 0.94;
      vx *= damping;
      vy *= damping;
      vz *= damping;

      // Integrate
      x += vx * 0.6;
      y += vy * 0.6;
      z += vz * 0.6;

      // Soft bounds – fade back toward center if too far
      const maxRadius = 9.5;
      const distFromCenter = Math.sqrt(x * x + y * y + z * z);
      if (distFromCenter > maxRadius) {
        const factor = (distFromCenter - maxRadius) * 0.02;
        x -= (x / distFromCenter) * factor;
        y -= (y / distFromCenter) * factor;
        z -= (z / distFromCenter) * factor;
      }

      pos[ix] = x;
      pos[iy] = y;
      pos[iz] = z;

      velocities[ix] = vx;
      velocities[iy] = vy;
      velocities[iz] = vz;
    }

    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={BRAND_GLOW}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Energy Core ─────────────────────────────────────────────────────────────
function EnergyCore({
  handPos,
}: {
  handPos: { x: number; y: number } | null;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const base = 0.9 + Math.sin(t * 1.4) * 0.15;
    ref.current.scale.set(base, base, base);

    ref.current.rotation.y += 0.004;
    ref.current.rotation.x += 0.002;

    if (handPos) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        (handPos.x - 0.5) * viewport.width * 0.12,
        0.08
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        -(handPos.y - 0.5) * viewport.height * 0.12,
        0.08
      );
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0.5, 0, -1.5]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color={ACCENT_CYAN}
          emissive={BRAND_LIGHT}
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* soft halo */}
      <mesh position={[0.5, 0, -1.8]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color={BRAND_GLOW}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Scene Composition ──────────────────────────────────────────────────────
function Scene({ handPos }: { handPos: { x: number; y: number } | null }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <pointLight
        position={[-6, 4, 6]}
        intensity={0.9}
        color={BRAND_LIGHT}
        distance={30}
      />
      <pointLight
        position={[6, -3, 4]}
        intensity={0.7}
        color={ACCENT_CYAN}
        distance={22}
      />

      {/* Nano particle cloud */}
      <group position={[2.3, 0, -2]}>
        <NanoParticleField handPos={handPos} />
      </group>

      {/* Core */}
      <group position={[2.3, 0, 0]}>
        <EnergyCore handPos={handPos} />
      </group>
    </>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const [handPos, setHandPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<any>(null);
  const handsRef = useRef<any>(null);

  // Mouse fallback — always active when hand tracking is off
  useEffect(() => {
    if (cameraActive) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setHandPos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      } else {
        setHandPos(null);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [cameraActive]);

  // Hand tracking via MediaPipe
  const toggleHandTracking = useCallback(async () => {
    if (cameraActive) {
      try {
        if (cameraRef.current) {
          cameraRef.current.stop();
          cameraRef.current = null;
        }
        if (handsRef.current) {
          handsRef.current.close();
          handsRef.current = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      } catch (e) {
        console.log("Cleanup error:", e);
      }
      setCameraActive(false);
      setHandPos(null);
      return;
    }

    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      handsRef.current = hands;

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0
        ) {
          const landmark = results.multiHandLandmarks[0][9];
          setHandPos({ x: 1 - landmark.x, y: landmark.y });
        }
      });

      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && handsRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 320,
          height: 240,
        });
        camera.start();
        cameraRef.current = camera;
      }
      setCameraActive(true);
    } catch (err) {
      console.log("Camera not available, using mouse control", err);
      setCameraActive(false);
    } finally {
      setLoading(false);
    }
  }, [cameraActive]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Three.js canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 55 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Scene handPos={handPos} />
        </Canvas>
      </div>

      {/* Camera toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleHandTracking();
        }}
        disabled={loading}
        className={`absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-display transition-all duration-300 pointer-events-auto cursor-pointer ${
          cameraActive
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "border border-foreground/10 bg-background/80 text-foreground backdrop-blur-sm hover:border-primary hover:shadow-md"
        } ${loading ? "opacity-70" : ""}`}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {cameraActive ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </>
            )}
          </svg>
        )}
        {loading
          ? "Initializing..."
          : cameraActive
          ? "Disable Hand Tracking"
          : "Enable Hand Control"}
      </button>

      {/* Hidden video for camera */}
      <video ref={videoRef} className="hidden" playsInline />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
