'use client';

import { useEffect, useRef } from 'react';

export interface FlowingSphereConfig {
  /** Glow intensity (0.0 - 1.0+) Default: 0.42 */
  glow?: number;
  /** Noise texture intensity (0.0 - 0.1) Default: 0.00 */
  noise?: number;
  /** Bloom spread (0.5 - 2.0) Default: 1.21 */
  bloom?: number;
  /** Hue shift (-1.0 - 1.0) Default: -0.03 */
  hueShift?: number;
  /** Min saturation (breathing effect) Default: 0.5 */
  satMin?: number;
  /** Max saturation (breathing effect) Default: 2.5 */
  satMax?: number;
  /** Saturation breathing speed Default: 1.0 */
  satSpeed?: number;
  /** Sphere radius (0.2 - 1.0) Default: 0.50 */
  radius?: number;
  /** Overall scale (0.5 - 2.0) Default: 1.00 */
  scale?: number;
  /** Vertical offset (-1.0 - 1.0) Default: 0.00 */
  offsetY?: number;
  /** Rotation - yaw Default: 0 */
  rotationYaw?: number;
  /** Rotation - pitch Default: 0.3 */
  rotationPitch?: number;
  /** Rotation - roll Default: 0.2 */
  rotationRoll?: number;
}

export interface FlowingSphereBackgroundProps {
  /** Background configuration */
  config?: FlowingSphereConfig;
  /** Container class name */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  /** Override saturation value; set null/undefined to restore breathing */
  saturationOverride?: number | null;
}

export default function FlowingSphereBackground({ 
  config = {},
  className = '',
  style = {},
  saturationOverride
}: FlowingSphereBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  const saturationOverrideRef = useRef<number | null>(null);

  useEffect(() => {
    saturationOverrideRef.current = typeof saturationOverride === 'number' ? saturationOverride : null;
  }, [saturationOverride]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const finalConfig: Required<FlowingSphereConfig> = {
      glow: config.glow ?? 0.42,
      noise: config.noise ?? 0.00,
      bloom: config.bloom ?? 1.21,
      hueShift: config.hueShift ?? -0.03,
      satMin: config.satMin ?? 0.5,
      satMax: config.satMax ?? 2.5,
      satSpeed: config.satSpeed ?? 1.0,
      radius: config.radius ?? 0.50,
      scale: config.scale ?? 1.00,
      offsetY: config.offsetY ?? 0.00,
      rotationYaw: config.rotationYaw ?? 0,
      rotationPitch: config.rotationPitch ?? 0.3,
      rotationRoll: config.rotationRoll ?? 0.2,
    };

    let animationFrameId: number;
    let isDestroyed = false;

    const initScene = async () => {
      try {
        const { Renderer, Triangle, Program, Mesh } = await import('ogl');

        if (isDestroyed) return;

        const rotBuf = new Float32Array(9);

        const renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 2),
          alpha: false,
          antialias: true,
          depth: false 
        });

        const gl = renderer.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        container.appendChild(gl.canvas);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        gl.canvas.style.display = 'block';
        gl.canvas.style.pointerEvents = 'none';
        gl.canvas.style.touchAction = 'none';
        gl.canvas.setAttribute('aria-hidden', 'true');

        const vertex = /* glsl */ `
          attribute vec2 position;
          void main() {
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        const fragment = /* glsl */ `
          precision highp float;
          uniform vec2  iResolution;
          uniform float iTime;
          uniform float uRadius;
          uniform mat3  uRot;
          uniform float uGlow;
          uniform float uNoise;
          uniform float uScale;
          uniform float uHueShift;
          uniform float uSaturation;
          uniform float uBloom;
          uniform float uCenterShift;
          uniform float uPxScale;

          vec4 tanh4(vec4 x){ return (exp(2.0*x) - 1.0) / (exp(2.0*x) + 1.0); }
          float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123); }
          float sdSphere(vec3 p, float r) { return length(p) - r; }

          mat3 hueRotation(float a){
              float c = cos(a), s = sin(a);
              mat3 W = mat3(0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114);
              mat3 U = mat3(0.701, -0.587, -0.114, -0.299, 0.413, -0.114, -0.300, -0.588, 0.886);
              mat3 V = mat3(0.168, -0.331, 0.500, 0.328, 0.035, -0.500, -0.497, 0.296, 0.201);
              return W + U * c + V * s;
          }

          void main(){
              vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy) * uPxScale;
              float z = 5.0;
              float d = 0.0;
              vec3 p;
              vec4 o = vec4(0.0);
              const int STEPS = 80;

              for (int i = 0; i < STEPS; i++) {
                  p = vec3(f, z);
                  p = uRot * p;
                  vec3 q = p;
                  q.y += uCenterShift;
                  d = 0.1 + 0.2 * abs(sdSphere(q, uRadius));
                  z -= d;
                  o += (sin((p.y + z) * 1.0 + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
              }

              o = tanh4(o * o * (uGlow * uBloom) / 1e3);
              vec3 col = o.rgb;
              float n = rand(gl_FragCoord.xy + vec2(iTime));
              col += (n - 0.5) * uNoise;
              
              float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
              col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);
              
              if(abs(uHueShift) > 0.001){
                  col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
              }
              gl_FragColor = vec4(col, 1.0);
          }
        `;

        const geometry = new Triangle(gl);
        const iRes = new Float32Array([gl.canvas.width, gl.canvas.height]);

        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            iResolution: { value: iRes },
            iTime: { value: 0 },
            uRadius: { value: finalConfig.radius },
            uRot: { value: rotBuf },
            uGlow: { value: finalConfig.glow },
            uNoise: { value: finalConfig.noise },
            uScale: { value: finalConfig.scale },
            uHueShift: { value: finalConfig.hueShift },
            uSaturation: { value: finalConfig.satMin },
            uBloom: { value: finalConfig.bloom },
            uCenterShift: { value: finalConfig.offsetY },
            uPxScale: { value: 1.0 }
          }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setMat3FromEuler = (yaw: number, pitch: number, roll: number, out: Float32Array) => {
          const cy = Math.cos(yaw), sy = Math.sin(yaw);
          const cx = Math.cos(pitch), sx = Math.sin(pitch);
          const cz = Math.cos(roll), sz = Math.sin(roll);
          out[0] = cy * cz + sy * sx * sz;
          out[1] = cx * sz;
          out[2] = -sy * cz + cy * sx * sz;
          out[3] = -cy * sz + sy * sx * cz;
          out[4] = cx * cz;
          out[5] = sy * sz + cy * sx * cz;
          out[6] = sy * cx;
          out[7] = -sx;
          out[8] = cy * cx;
          return out;
        };

        setMat3FromEuler(
          finalConfig.rotationYaw,
          finalConfig.rotationPitch,
          finalConfig.rotationRoll,
          rotBuf
        );

        const resize = () => {
          if (isDestroyed) return;
          renderer.setSize(window.innerWidth, window.innerHeight);
          program.uniforms.iResolution.value[0] = gl.canvas.width;
          program.uniforms.iResolution.value[1] = gl.canvas.height;
          const h = gl.canvas.height;
          program.uniforms.uPxScale.value = 1 / (h * 0.1 * finalConfig.scale);
        };

        window.addEventListener('resize', resize, false);
        resize();

        let startTime: number | null = null;

        const update = (t: number) => {
          if (isDestroyed) return;
          
          animationFrameId = requestAnimationFrame(update);

          if (startTime === null) startTime = t;
          const elapsed = (t - startTime) * 0.001;

          program.uniforms.iTime.value = elapsed;

          if (saturationOverrideRef.current !== null) {
             program.uniforms.uSaturation.value = saturationOverrideRef.current;
          } else {
             const sineWave = (Math.sin(elapsed * finalConfig.satSpeed) + 1.0) / 2.0;
             const currentSat = finalConfig.satMin + (finalConfig.satMax - finalConfig.satMin) * sineWave;
             program.uniforms.uSaturation.value = currentSat;
          }

          renderer.render({ scene: mesh });
        };

        animationFrameId = requestAnimationFrame(update);

        cleanupRef.current = () => {
          isDestroyed = true;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
          window.removeEventListener('resize', resize);
          if (gl.canvas && gl.canvas.parentNode) {
            gl.canvas.parentNode.removeChild(gl.canvas);
          }
        };

      } catch (error) {
        console.error('Failed to initialize FlowingSphereBackground:', error);
      }
    };

    initScene();

    return () => {
      isDestroyed = true;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-black -z-[1] ${className}`}
      style={style}
    />
  );
}
