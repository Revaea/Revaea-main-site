"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";

export type FlockingBackgroundProps = {
  className?: string;

  /**
   * Which local axis should be treated as the bird's "forward" direction.
   * - "z": classic three.js birds (body points forward)
   * - "x": treat the wings direction as forward (useful if your bird shape reads better that way)
   */
  forwardAxis?: "z" | "x";

  /** Default: 32 (creates 32x32 = 1024 agents). */
  simSize?: number;

  /** Default: 650. Larger = birds spread out more. */
  bounds?: number;

  /** Default: 0.9. */
  opacity?: number;

  /** Tint applied to the grayscale birds. Default: "#ffffff". */
  color?: string;

  /** Default: 0.25. Mouse repulsion strength. */
  mouseStrength?: number;

  /** Mouse interaction mode. Default: "repel". */
  mouseMode?: "repel" | "attract" | "off";

  /** Default: 20. */
  separationDistance?: number;

  /** Default: 40. */
  alignmentDistance?: number;

  /** Default: 20. */
  cohesionDistance?: number;

  /** Default: 0.75. */
  freedomFactor?: number;

  /** Default: 9. */
  speedLimit?: number;

  /** Default: 150. */
  preyRadius?: number;
};

function hash12(p: string) {
  let h = 2166136261;
  for (let i = 0; i < p.length; i++) {
    h ^= p.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export default function FlockingBackground({
  className,
  forwardAxis = "z",
  simSize = 32,
  bounds = 650,
  opacity = 0.9,
  color = "#ffffff",
  mouseStrength = 0.25,
  mouseMode = "repel",
  separationDistance = 20,
  alignmentDistance = 40,
  cohesionDistance = 20,
  freedomFactor = 0.75,
  speedLimit = 9,
  preyRadius = 150,
}: FlockingBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stableSeed = useMemo(() => hash12(`flock:${simSize}:${bounds}`), [bounds, simSize]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const contextAttributes: WebGLContextAttributes = {
      alpha: true,
      antialias: true,
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    };

    const gl =
      (canvas.getContext("webgl2", contextAttributes) as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl", contextAttributes) as WebGLRenderingContext | null);

    if (!gl) return;

    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 1, 4000);
    camera.position.z = 340;

    const clock = new THREE.Clock();
    const mouseNdc = new THREE.Vector2(1000, 1000);

    const updateMouseFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x01 = (clientX - rect.left) / rect.width;
      const y01 = (clientY - rect.top) / rect.height;

      // If pointer is outside the canvas area, disable predator effect.
      if (x01 < 0 || x01 > 1 || y01 < 0 || y01 > 1) {
        mouseNdc.set(1000, 1000);
        return;
      }

      mouseNdc.set(x01 * 2 - 1, -(y01 * 2 - 1));
    };

    const onPointerMove = (event: PointerEvent) => {
      updateMouseFromClient(event.clientX, event.clientY);
    };

    const onPointerLeaveWindow = () => {
      mouseNdc.set(1000, 1000);
    };

    // The container is pointer-events:none (so it doesn't block UI). Listen on window instead.
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeaveWindow, { passive: true });

    const updateSize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);

    const gpuCompute = new GPUComputationRenderer(simSize, simSize, renderer);

    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();

    const posArray = dtPosition.image.data as Float32Array;
    const velArray = dtVelocity.image.data as Float32Array;

    for (let i = 0; i < posArray.length; i += 4) {
      const r1 = (Math.random() + stableSeed) % 1;
      const r2 = (Math.random() + stableSeed * 0.7) % 1;
      const r3 = (Math.random() + stableSeed * 0.3) % 1;

      posArray[i + 0] = (r1 * 2 - 1) * bounds;
      posArray[i + 1] = (r2 * 2 - 1) * bounds;
      posArray[i + 2] = (r3 * 2 - 1) * bounds;
      posArray[i + 3] = Math.random() * Math.PI * 2;

      velArray[i + 0] = (Math.random() - 0.5) * 10;
      velArray[i + 1] = (Math.random() - 0.5) * 10;
      velArray[i + 2] = (Math.random() - 0.5) * 10;
      velArray[i + 3] = 1;
    }

    const fragmentShaderPosition = /* glsl */ `
      uniform float time;
      uniform float delta;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec4 tmpPos = texture2D(texturePosition, uv);
        vec3 position = tmpPos.xyz;
        vec3 velocity = texture2D(textureVelocity, uv).xyz;
        float phase = tmpPos.w;

        phase = mod(
          phase + delta +
          length(velocity.xz) * delta * 3.0 +
          max(velocity.y, 0.0) * delta * 6.0,
          62.83
        );

        gl_FragColor = vec4(position + velocity * delta * 15.0, phase);
      }
    `;

    const fragmentShaderVelocity = /* glsl */ `
      uniform float time;
      uniform float delta;
      uniform float separationDistance;
      uniform float alignmentDistance;
      uniform float cohesionDistance;
      uniform float freedomFactor;
      uniform vec3 predator;
      uniform float predatorStrength;
      uniform float predatorSign;
      uniform float preyRadius;
      uniform float speedLimit;

      const float PI = 3.141592653589793;
      const float PI_2 = PI * 2.0;

      const float UPPER_BOUNDS = BOUNDS;
      const float LOWER_BOUNDS = -UPPER_BOUNDS;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;

        vec3 selfPosition = texture2D(texturePosition, uv).xyz;
        vec3 selfVelocity = texture2D(textureVelocity, uv).xyz;
        vec3 velocity = selfVelocity;

        float zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
        float zoneRadiusSquared = zoneRadius * zoneRadius;
        float separationThresh = separationDistance / zoneRadius;
        float alignmentThresh = (separationDistance + alignmentDistance) / zoneRadius;

        // predator repulsion (mouse)
        vec3 dir = predator * UPPER_BOUNDS - selfPosition;
        dir.z = 0.0;
        float dist = length(dir);
        float distSquared = dist * dist;
        float preyRadiusSq = preyRadius * preyRadius;
        float limit = speedLimit;

        if (predatorStrength > 0.0001 && dist < preyRadius) {
          float f = (distSquared / preyRadiusSq - 1.0) * delta * 100.0 * predatorStrength * predatorSign;
          velocity += normalize(dir) * f;
          limit += 5.0;
        }

        // attract to center
        vec3 central = vec3(0.0);
        dir = selfPosition - central;
        dist = length(dir);
        dir.y *= 2.5;
        velocity -= normalize(dir) * delta * 5.0;

        // freedom / wander
        if (rand(uv + time * 0.00001) < freedomFactor) {
          velocity += (vec3(rand(uv + 0.1), rand(uv + 0.2), rand(uv + 0.3)) - 0.5) * delta * 12.0;
        }

        // full neighborhood evaluation (classic example style)
        for (int y = 0; y < ${simSize}; y++) {
          for (int x = 0; x < ${simSize}; x++) {
            vec2 ref = (vec2(float(x), float(y)) + 0.5) / resolution.xy;
            vec3 birdPosition = texture2D(texturePosition, ref).xyz;
            vec3 dp = birdPosition - selfPosition;
            float dist2 = dot(dp, dp);

            if (dist2 < 0.0001) continue;
            if (dist2 > zoneRadiusSquared) continue;

            float percent = dist2 / zoneRadiusSquared;

            if (percent < separationThresh) {
              float f = (separationThresh / percent - 1.0) * delta;
              velocity -= normalize(dp) * f;
            } else if (percent < alignmentThresh) {
              float threshDelta = alignmentThresh - separationThresh;
              float adjustedPercent = (percent - separationThresh) / threshDelta;
              vec3 birdVelocity = texture2D(textureVelocity, ref).xyz;
              float f = (0.5 - cos(adjustedPercent * PI_2) * 0.5 + 0.5) * delta;
              velocity += normalize(birdVelocity) * f;
            } else {
              float threshDelta = 1.0 - alignmentThresh;
              float adjustedPercent = threshDelta == 0.0 ? 1.0 : (percent - alignmentThresh) / threshDelta;
              float f = (0.5 - (cos(adjustedPercent * PI_2) * -0.5 + 0.5)) * delta;
              velocity += normalize(dp) * f;
            }
          }
        }

        // keep within bounds softly
        if (selfPosition.x > UPPER_BOUNDS) velocity.x -= delta * 10.0;
        if (selfPosition.x < LOWER_BOUNDS) velocity.x += delta * 10.0;
        if (selfPosition.y > UPPER_BOUNDS) velocity.y -= delta * 10.0;
        if (selfPosition.y < LOWER_BOUNDS) velocity.y += delta * 10.0;
        if (selfPosition.z > UPPER_BOUNDS) velocity.z -= delta * 10.0;
        if (selfPosition.z < LOWER_BOUNDS) velocity.z += delta * 10.0;

        // speed limit
        float s = length(velocity);
        if (s > limit) {
          velocity = normalize(velocity) * limit;
        }

        gl_FragColor = vec4(velocity, 1.0);
      }
    `;

    const velocityVariable = gpuCompute.addVariable("textureVelocity", fragmentShaderVelocity, dtVelocity);
    const positionVariable = gpuCompute.addVariable("texturePosition", fragmentShaderPosition, dtPosition);

    (velocityVariable.material.defines as Record<string, string>).BOUNDS = bounds.toFixed(2);

    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

    const velocityUniforms = velocityVariable.material.uniforms as Record<string, THREE.IUniform>;
    const positionUniforms = positionVariable.material.uniforms as Record<string, THREE.IUniform>;

    positionUniforms.time = { value: 0 };
    positionUniforms.delta = { value: 0 };

    velocityUniforms.time = { value: 0 };
    velocityUniforms.delta = { value: 0 };
    velocityUniforms.separationDistance = { value: separationDistance };
    velocityUniforms.alignmentDistance = { value: alignmentDistance };
    velocityUniforms.cohesionDistance = { value: cohesionDistance };
    velocityUniforms.freedomFactor = { value: freedomFactor };
    velocityUniforms.predator = { value: new THREE.Vector3(10000, 10000, 0) };
    velocityUniforms.predatorStrength = { value: mouseStrength };
    velocityUniforms.predatorSign = { value: 1 };
    velocityUniforms.preyRadius = { value: preyRadius };
    velocityUniforms.speedLimit = { value: speedLimit };

    const computeError = gpuCompute.init();
    if (computeError) {
      console.error(computeError);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      return;
    }

    // Geometry: 3 triangles per bird (body + 2 wings)
    const agentCount = simSize * simSize;
    const trianglesPerAgent = 3;
    const vertsPerAgent = trianglesPerAgent * 3;

    const basePositions = new Float32Array(vertsPerAgent * 3);
    const baseVertexId = new Float32Array(vertsPerAgent);

    const wingsSpan = 20;
    // body tri + 2 wing tris
    const local = [
      0, 0, -20,
      0, 4, -20,
      0, 0, 30,
      0, 0, -15,
      -wingsSpan, 0, 0,
      0, 0, 15,
      0, 0, 15,
      wingsSpan, 0, 0,
      0, 0, -15,
    ];
    
    // 🐾 麦咪修复：提前在 CPU 里把骨架缩小 0.2 倍！
    for (let i = 0; i < vertsPerAgent; i++) {
      basePositions[i * 3 + 0] = local[i * 3 + 0] * 0.2;
      basePositions[i * 3 + 1] = local[i * 3 + 1] * 0.2;
      basePositions[i * 3 + 2] = local[i * 3 + 2] * 0.2;
      baseVertexId[i] = i;
    }

    const geometry = new THREE.InstancedBufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute("aVertexId", new THREE.BufferAttribute(baseVertexId, 1));

    const references = new Float32Array(agentCount * 2);
    const birdColors = new Float32Array(agentCount * 3);
    for (let i = 0; i < agentCount; i++) {
      const x = i % simSize;
      const y = Math.floor(i / simSize);
      references[i * 2 + 0] = (x + 0.5) / simSize;
      references[i * 2 + 1] = (y + 0.5) / simSize;

      const shade = 0.35 + Math.random() * 0.65;
      birdColors[i * 3 + 0] = shade;
      birdColors[i * 3 + 1] = shade;
      birdColors[i * 3 + 2] = shade;
    }
    geometry.setAttribute("aRef", new THREE.InstancedBufferAttribute(references, 2));
    geometry.setAttribute("aBirdColor", new THREE.InstancedBufferAttribute(birdColors, 3));
    geometry.instanceCount = agentCount;

    const birdMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      defines: {
        ...(forwardAxis === "x" ? { FORWARD_AXIS_X: "1" } : {}),
      },
      uniforms: {
        uOpacity: { value: opacity },
        uTint: { value: new THREE.Color(color) },
        texturePosition: { value: null },
        textureVelocity: { value: null },
      },
      vertexShader: /* glsl */ `
        attribute vec2 aRef;
        attribute float aVertexId;
        attribute vec3 aBirdColor;
        uniform sampler2D texturePosition;
        uniform sampler2D textureVelocity;
        varying vec4 vColor;
        varying float vZ;

        void main(){
          vec4 pos4 = texture2D(texturePosition, aRef);
          vec3 pos = pos4.xyz;
          vec3 velocity = normalize(texture2D(textureVelocity, aRef).xyz);

          // flap: tiny y displacement on wing tips
          vec3 p = position;
          if (aVertexId == 4.0 || aVertexId == 7.0) {
            p.y = sin(pos4.w) * 5.0;
          }

          #ifdef FORWARD_AXIS_X
            // Rotate the local bird so that its wings direction becomes "forward".
            // (Effectively swaps forward from +Z to +X.)
            p = vec3(p.z, p.y, -p.x);
          #endif

          // orient like the classic example
          velocity.z *= -1.0;
          float xz = length(velocity.xz) + 0.0001;
          float xyz = 1.0;
          float x = sqrt(max(1e-4, 1.0 - velocity.y * velocity.y));

          float cosry = velocity.x / xz;
          float sinry = velocity.z / xz;

          float cosrz = x / xyz;
          float sinrz = velocity.y / xyz;

          mat3 maty = mat3(
            cosry, 0.0, -sinry,
            0.0,   1.0,  0.0,
            sinry, 0.0,  cosry
          );

          mat3 matz = mat3(
            cosrz,  sinrz, 0.0,
            -sinrz, cosrz, 0.0,
            0.0,    0.0,   1.0
          );

          // 🐾 麦咪修复：解除扇动幅度的封印！让翅膀彻底挥舞起来喵！
          vec3 newPosition = maty * matz * p;
          newPosition += pos;

          vZ = newPosition.z;
          vColor = vec4(aBirdColor, 1.0);

          gl_Position = projectionMatrix * viewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        uniform vec3 uTint;
        varying vec4 vColor;
        varying float vZ;
        void main(){
          float z2 = 0.2 + (1000.0 - vZ) / 1000.0 * vColor.x;
          z2 = clamp(z2, 0.0, 1.0);
          vec3 col = vec3(z2) * uTint;
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, birdMaterial);
    mesh.frustumCulled = false;
    scene.add(mesh);

    let raf = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);

      const now = performance.now();
      const delta = Math.min(0.05, clock.getDelta());

      positionUniforms.time.value = now;
      positionUniforms.delta.value = delta;

      velocityUniforms.time.value = now;
      velocityUniforms.delta.value = delta;
      velocityUniforms.separationDistance.value = separationDistance;
      velocityUniforms.alignmentDistance.value = alignmentDistance;
      velocityUniforms.cohesionDistance.value = cohesionDistance;
      velocityUniforms.freedomFactor.value = freedomFactor;
      velocityUniforms.predatorStrength.value = mouseMode === "off" ? 0 : mouseStrength;
      velocityUniforms.predatorSign.value = mouseMode === "attract" ? -1 : 1;
      velocityUniforms.preyRadius.value = preyRadius;
      velocityUniforms.speedLimit.value = speedLimit;

      // predator in [-0.5..0.5] range like the classic example
      if (Math.abs(mouseNdc.x) > 10 || Math.abs(mouseNdc.y) > 10) {
        velocityUniforms.predator.value.set(10000, 10000, 0);
      } else {
        velocityUniforms.predator.value.set(0.5 * mouseNdc.x, 0.5 * mouseNdc.y, 0);
      }

      gpuCompute.compute();

      const posTex = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      const velTex = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

      birdMaterial.uniforms.texturePosition.value = posTex;
      birdMaterial.uniforms.textureVelocity.value = velTex;

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeaveWindow);

      scene.remove(mesh);
      geometry.dispose();
      birdMaterial.dispose();

      // Best-effort GPUComputationRenderer cleanup
      try {
        const rtPos = gpuCompute.getCurrentRenderTarget(positionVariable);
        const rtVel = gpuCompute.getCurrentRenderTarget(velocityVariable);
        rtPos?.dispose();
        rtVel?.dispose();
      } catch {
        // ignore
      }

      renderer.dispose();
    };
  }, [
    alignmentDistance,
    bounds,
    cohesionDistance,
    color,
    freedomFactor,
    forwardAxis,
    mouseMode,
    mouseStrength,
    opacity,
    preyRadius,
    separationDistance,
    simSize,
    speedLimit,
    stableSeed,
  ]);

  return (
    <div
      ref={containerRef}
      className={
        [
          "fixed inset-0 z-0 pointer-events-none overflow-hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}