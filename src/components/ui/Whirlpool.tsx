"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  InstancedBufferAttribute,
  InstancedMesh,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export type WhirlpoolProps = {
  particleCount?: number;
  spread?: number;
  enablePointerTracking?: boolean;
  attractionStrength?: number;
  saturation?: number;
  className?: string;
  blur?: number;
  children?: React.ReactNode;
};

type Instance = {
  position: Vector3;
  scale: number;
  scaleZ: number;
  velocity: Vector3;
  attraction: number;
  vLimit: number;
};

export default function Whirlpool({
  particleCount = 2000,
  spread = 200,
  enablePointerTracking = true,
  attractionStrength = 1,
  saturation = 1,
  className,
  blur = 0,
  children,
}: WhirlpoolProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const blurStyle = useMemo(
    () =>
      ({
        "--bubbles-blur": `${blur}px`,
      }) as React.CSSProperties,
    [blur]
  );

  const canvasStyle = useMemo(() => {
    const s = Number.isFinite(saturation) ? saturation : 1;
    if (Math.abs(s - 1) < 0.001) return undefined;
    return { filter: `saturate(${s})` } as React.CSSProperties;
  }, [saturation]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const containerEl = containerRef.current;
    if (!canvasEl || !containerEl) return;

    const canvas = canvasEl;
    const container = containerEl;

    const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

    const instances: Instance[] = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    const pointer = new Vector2();
    const raycaster = new Raycaster();
    const planeZ = new Plane(new Vector3(0, 0, 1), 0);

    const viewBounds = { x: 0, y: 0 };

    let renderer: WebGLRenderer | undefined;
    let scene: Scene | undefined;
    let camera: PerspectiveCamera | undefined;
    let imesh: InstancedMesh | undefined;
    let effectComposer: EffectComposer | undefined;
    let rafId: number | undefined;

    const light = new PointLight(0x0060ff, 0.5);

    function loadParticleInstances() {
      instances.length = 0;
      for (let i = 0; i < particleCount; i++) {
        instances.push({
          position: new Vector3(rndFS(spread), rndFS(spread), rndFS(spread)),
          scale: rnd(0.2, 1),
          scaleZ: rnd(0.1, 1),
          velocity: new Vector3(rndFS(2), rndFS(2), rndFS(2)),
          attraction: 0.03 + rnd(-0.01, 0.01),
          vLimit: 1.2 + rnd(-0.1, 0.1),
        });
      }
    }

    function updateViewBounds() {
      if (!camera) return;
      const dist = camera.position.z; 
      const vFOV = MathUtils.degToRad(camera.fov); 
      const height = 2 * Math.tan(vFOV / 2) * dist; 
      const width = height * camera.aspect; 
      
      viewBounds.y = height / 2;
      viewBounds.x = width / 2;
    }

    function setupScene() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      renderer = new WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.autoClear = false;

      camera = new PerspectiveCamera(50, width / height, 0.1, 1000); 
      camera.position.set(0, 0, 200);
      camera.updateProjectionMatrix();

      updateViewBounds();

      scene = new Scene();
      scene.add(new AmbientLight(0x808080));
      scene.add(new PointLight(0xff6000));
      scene.add(light);

      const pointLight2 = new PointLight(0xff6000, 0.5);
      pointLight2.position.set(100, 0, 0);
      scene.add(pointLight2);

      const pointLight3 = new PointLight(0x0000ff, 0.5);
      pointLight3.position.set(-100, 0, 0);
      scene.add(pointLight3);

      const boxGeometry = new BoxGeometry(2, 2, 10);
      const material = new MeshBasicMaterial({
        transparent: true,
        opacity: 0.9,
      });
      imesh = new InstancedMesh(boxGeometry, material, particleCount);
      scene.add(imesh);

      effectComposer = new EffectComposer(renderer);
      effectComposer.setSize(width, height);
      effectComposer.addPass(new RenderPass(scene, camera));
      effectComposer.addPass(new UnrealBloomPass(new Vector2(width, height), 1, 0, 0));
    }

    function initInstances() {
      if (!imesh) return;

      for (let i = 0; i < particleCount; i++) {
        const { position, scale, scaleZ } = instances[i];
        dummyO.position.copy(position);
        dummyO.scale.set(scale, scale, scaleZ);
        dummyO.updateMatrix();
        imesh.setMatrixAt(i, dummyO.matrix);
      }

      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        colors[i * 3] = rnd(0, 1);
        colors[i * 3 + 1] = rnd(0, 1);
        colors[i * 3 + 2] = rnd(0, 1);
      }

      imesh.instanceColor = new InstancedBufferAttribute(colors, 3);
      imesh.instanceMatrix.needsUpdate = true;
    }

    function animate() {
      rafId = window.requestAnimationFrame(animate);
      if (!imesh || !effectComposer) return;
      light.position.copy(target);

      for (let i = 0; i < particleCount; i++) {
        const { position, scale, scaleZ, velocity, attraction, vLimit } = instances[i];

        dummyV.copy(target)
          .sub(position)
          .normalize()
          .multiplyScalar(attraction * attractionStrength);
        velocity.add(dummyV).clampScalar(-vLimit, vLimit);
        position.add(velocity);

        const padding = 5; 
        const limitX = viewBounds.x + padding;
        const limitY = viewBounds.y + padding;

        if (position.x > limitX) {
          position.x = limitX;
          velocity.x *= -1; 
        } else if (position.x < -limitX) {
          position.x = -limitX;
          velocity.x *= -1;
        }

        if (position.y > limitY) {
          position.y = limitY;
          velocity.y *= -1;
        } else if (position.y < -limitY) {
          position.y = -limitY;
          velocity.y *= -1;
        }

        if (position.z > 150) {
            position.z = 150;
            velocity.z *= -1;
        } else if (position.z < -100) {
            position.z = -100;
            velocity.z *= -1;
        }

        dummyO.position.copy(position);
        dummyO.scale.set(scale, scale, scaleZ);
        dummyO.lookAt(dummyV.copy(position).add(velocity));
        dummyO.updateMatrix();
        imesh.setMatrixAt(i, dummyO.matrix);
      }

      imesh.instanceMatrix.needsUpdate = true;
      effectComposer.render();
    }

    function onPointerMove(event: PointerEvent) {
      if (!camera) return;
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = (x / rect.width) * 2 - 1;
        pointer.y = -(y / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const point = new Vector3();
        raycaster.ray.intersectPlane(planeZ, point);
        target.copy(point);
      } else {
        target.set(0, 0, 0);
      }
    }

    function onWindowResize() {
      if (!renderer || !camera || !effectComposer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Recompute bounds when the viewport size changes.
      updateViewBounds();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      effectComposer.setSize(width, height);
    }

    loadParticleInstances();
    setupScene();
    initInstances();
    animate();

    if (enablePointerTracking) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
    } else {
      target.set(0, 0, 0);
    }
    window.addEventListener("resize", onWindowResize);

    return () => {
      if (rafId !== undefined) window.cancelAnimationFrame(rafId);
      if (enablePointerTracking) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerMove);
      }
      window.removeEventListener("resize", onWindowResize);

      if (imesh) {
        imesh.geometry.dispose();
        const material = imesh.material;
        if (Array.isArray(material)) {
          for (const m of material) m.dispose();
        } else {
          material.dispose();
        }
      }

      renderer?.dispose();
      
      scene = undefined;
      camera = undefined;
      imesh = undefined;
      effectComposer = undefined;
      renderer = undefined;
    };
  }, [particleCount, spread, enablePointerTracking, attractionStrength]);

  return (
    <div ref={containerRef} className={`relative h-full w-full${className ? ` ${className}` : ""}`}>
      <canvas ref={canvasRef} className="size-full" style={canvasStyle} />
      {blur > 0 ? <div style={blurStyle} className="absolute inset-0 backdrop-blur-[--bubbles-blur]" /> : null}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}