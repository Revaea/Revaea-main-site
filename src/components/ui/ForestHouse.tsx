"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const DEFAULT_CAMERA_POSITION: [number, number, number] = [1.5, 4, 9];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 2, 0];

type FitOffsetMode = "radius" | "screen" | "px";

export type ForestHouseProps = {
  /** Default: "/models/forest_house.glb" */
  modelUrl?: string;
  className?: string;
  children?: React.ReactNode;

  /** Default: true. When false, the component fills its parent container instead of using fixed fullscreen positioning. */
  fullScreen?: boolean;

  /**
   * Default: false.
   * When true, renders with an alpha canvas and no scene background.
   * Useful when you want the model to sit on top of a page-colored background (e.g. bottom-right corner).
   */
  transparentBackground?: boolean;

  /** Default: "#f6eedc" (matches your sample) */
  backgroundColor?: string;

  /**
   * Interaction mode.
   * - "static": no animation
   * - "autoRotate": rotates automatically
   * - "followMouse": subtly follows mouse movement
   * - "drag": OrbitControls drag to rotate
   *
   * Default: "static".
   */
  mode?: "static" | "autoRotate" | "followMouse" | "drag";

  /** Back-compat: when true and mode is not set, behaves like mode="drag". */
  interactive?: boolean;

  /** Default: 0.6. Used by autoRotate. */
  autoRotateSpeed?: number;

  /** Default: 0.35. Used by followMouse. */
  followStrength?: number;

  /** Default: 0.35. Max horizontal angle delta (radians) for followMouse. Smaller = more "locked". */
  followThetaRange?: number;

  /** Default: 0.22. Max vertical angle delta (radians) for followMouse. */
  followPhiRange?: number;

  /** Default: "https://www.gstatic.com/draco/v1/decoders/" */
  dracoDecoderPath?: string;

  /** Camera settings (defaults match your sample) */
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];

  /** Default: true. Auto-frames the camera after model load to avoid cropping. */
  fitToModel?: boolean;

  /** Default: 1.25. Bigger = more padding around model when fitting. */
  fitPadding?: number;

  /** Default: 0. Additional azimuth rotation (radians) applied after fitToModel around the world up axis. */
  fitAzimuthOffset?: number;

  /**
   * Optional framing bias used when `fitToModel` is enabled.
   * Positive `x` moves the model toward the right side of the viewport.
   * Positive `y` moves the model toward the top of the viewport.
   * Values are roughly relative to the model radius (typical range: -0.6..0.6).
   */
  fitOffset?: {
    /**
     * How to interpret x/y.
     * - "radius": offsets are relative to the model radius (existing behavior)
     * - "screen": offsets are relative to the viewport half-size (more stable across aspect ratios)
     * - "px": offsets are in CSS pixels (stable during window resize)
     */
    mode?: "radius" | "screen" | "px";
    x?: number;
    y?: number;
  };

  /**
   * Optional render region inside the canvas.
   * When set, the canvas can stay fullscreen while the model is rendered only into a corner region
   * via WebGL scissor/viewport (no extra DOM wrapper needed).
   */
  renderRegion?: {
      anchor?:
        | "bottomRight"
        | "bottomLeft"
        | "topRight"
        | "topLeft"
        | "bottomCenter"
        | "center";
    widthVw?: number;
    heightVh?: number;
    maxWidthPx?: number;
    maxHeightPx?: number;
    marginPx?: number;
  };
};

function disposeMaterial(material: THREE.Material) {
  const anyMaterial = material as unknown as Record<string, unknown>;

  for (const value of Object.values(anyMaterial)) {
    if (value instanceof THREE.Texture) value.dispose();
  }

  material.dispose();
}

function disposeObject3D(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;

    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material;
    if (!material) return;

    if (Array.isArray(material)) {
      for (const m of material) disposeMaterial(m);
    } else {
      disposeMaterial(material);
    }
  });
}

function computeHalfViewportWorldSizeAtDistance(camera: THREE.PerspectiveCamera, distance: number) {
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const halfH = Math.tan(vFov / 2) * distance;
  const halfW = halfH * camera.aspect;
  return { halfW, halfH };
}

function resolveFitOffsetMode(mode: ForestHouseProps["fitOffset"] extends infer T
  ? T extends { mode?: infer M }
    ? M
    : unknown
  : unknown): FitOffsetMode {
  if (mode === "px" || mode === "screen") return mode;
  return "radius";
}

function clampFitOffset(value: number, mode: FitOffsetMode) {
  if (!Number.isFinite(value)) return 0;
  return mode === "px" ? THREE.MathUtils.clamp(value, -4096, 4096) : THREE.MathUtils.clamp(value, -1, 1);
}

function computeFitOffsetScales(args: {
  mode: FitOffsetMode;
  radius: number;
  halfW: number;
  halfH: number;
  viewW: number;
  viewH: number;
}) {
  const { mode, radius, halfW, halfH, viewW, viewH } = args;

  if (mode === "screen") return { scaleX: halfW, scaleY: halfH };
  if (mode === "px") {
    // Convert CSS pixels to world units at the target depth.
    // 2*halfW spans the full viewport width in world units.
    const scaleX = viewW > 0 ? (2 * halfW) / viewW : 0;
    const scaleY = viewH > 0 ? (2 * halfH) / viewH : 0;
    return { scaleX, scaleY };
  }

  return { scaleX: radius, scaleY: radius };
}

export default function ForestHouse({
  modelUrl = "/models/forest_house.glb",
  className,
  children,
  fullScreen = true,
  transparentBackground = false,
  backgroundColor = "#f6eedc",
  mode,
  interactive = false,
  autoRotateSpeed = 0.6,
  followStrength = 0.35,
  followThetaRange = 0.35,
  followPhiRange = 0.22,
  dracoDecoderPath = "https://www.gstatic.com/draco/v1/decoders/",
  cameraPosition = DEFAULT_CAMERA_POSITION,
  cameraTarget = DEFAULT_CAMERA_TARGET,
  fitToModel = true,
  fitPadding = 1.25,
  fitAzimuthOffset = 0,
  fitOffset,
  renderRegion,
}: ForestHouseProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const effectiveMode: NonNullable<ForestHouseProps["mode"]> =
    mode ?? (interactive ? "drag" : "static");
  const pointerEventsClass = effectiveMode === "drag" ? "pointer-events-auto" : "pointer-events-none";

  const backgroundStyle = useMemo(() => {
    return {
      backgroundColor: "transparent",
    } as React.CSSProperties;
  }, []);

  const cameraPosX = cameraPosition[0];
  const cameraPosY = cameraPosition[1];
  const cameraPosZ = cameraPosition[2];
  const cameraTgtX = cameraTarget[0];
  const cameraTgtY = cameraTarget[1];
  const cameraTgtZ = cameraTarget[2];
  const fitOffsetMode = fitOffset?.mode;
  const fitOffsetX = fitOffset?.x;
  const fitOffsetY = fitOffset?.y;
  const renderRegionDefined = renderRegion !== undefined;
  const renderAnchor = renderRegion?.anchor;
  const renderWidthVw = renderRegion?.widthVw;
  const renderHeightVh = renderRegion?.heightVh;
  const renderMaxWidthPx = renderRegion?.maxWidthPx;
  const renderMaxHeightPx = renderRegion?.maxHeightPx;
  const renderMarginPx = renderRegion?.marginPx;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;

    let scene: THREE.Scene | undefined;
    let camera: THREE.PerspectiveCamera | undefined;
    let renderer: THREE.WebGLRenderer | undefined;
    let controls: OrbitControls | undefined;
    let gltfRoot: THREE.Object3D | undefined;

    let rafId: number | undefined;
    const clock = new THREE.Clock();

    const pointer = new THREE.Vector2(0, 0);

    const baseTarget = new THREE.Vector3(cameraTgtX, cameraTgtY, cameraTgtZ);
    const baseDir = new THREE.Vector3(cameraPosX, cameraPosY, cameraPosZ).sub(baseTarget).normalize();

    const spherical = new THREE.Spherical();
    const baseSpherical = new THREE.Spherical();
    const desiredSpherical = new THREE.Spherical();

    const fittedTarget = new THREE.Vector3(cameraTgtX, cameraTgtY, cameraTgtZ);

    let lastViewW = 0;
    let lastViewH = 0;

    const renderOnce = () => {
      if (!renderer || !scene || !camera) return;

      if (renderRegionDefined && transparentBackground) {
        const sizeCss = renderer.getSize(new THREE.Vector2());
        const sizeBuf = renderer.getDrawingBufferSize(new THREE.Vector2());
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, sizeBuf.x, sizeBuf.y);
        renderer.clear(true, true, true);
        applyViewport(sizeCss.x, sizeCss.y);
      }

      renderer.render(scene, camera);
    };

    const applyViewport = (containerWidthCss: number, containerHeightCss: number) => {
      if (!renderer) return { viewW: containerWidthCss, viewH: containerHeightCss };

      if (!renderRegionDefined) {
        renderer.setScissorTest(false);
        const sizeBuf = renderer.getDrawingBufferSize(new THREE.Vector2());
        renderer.setViewport(0, 0, sizeBuf.x, sizeBuf.y);
        return { viewW: containerWidthCss, viewH: containerHeightCss };
      }

      const anchor = renderAnchor ?? "bottomRight";
      const marginPx = Number.isFinite(renderMarginPx) ? Math.max(0, renderMarginPx as number) : 0;

      const pr = renderer.getPixelRatio();

      const targetW = (containerWidthCss * (Number.isFinite(renderWidthVw) ? (renderWidthVw as number) : 100)) / 100;
      const targetH = (containerHeightCss * (Number.isFinite(renderHeightVh) ? (renderHeightVh as number) : 100)) / 100;

      const maxW = Number.isFinite(renderMaxWidthPx) ? (renderMaxWidthPx as number) : containerWidthCss;
      const maxH = Number.isFinite(renderMaxHeightPx) ? (renderMaxHeightPx as number) : containerHeightCss;

      const viewW = Math.max(1, Math.min(Math.floor(targetW), Math.floor(maxW)));
      const viewH = Math.max(1, Math.min(Math.floor(targetH), Math.floor(maxH)));

      const x =
        anchor === "bottomLeft" || anchor === "topLeft"
          ? marginPx
          : anchor === "bottomCenter" || anchor === "center"
            ? Math.max(marginPx, (containerWidthCss - viewW) / 2)
            : Math.max(marginPx, containerWidthCss - viewW - marginPx);
      const y =
        anchor === "topLeft" || anchor === "topRight"
          ? Math.max(marginPx, containerHeightCss - viewH - marginPx)
          : anchor === "center"
            ? Math.max(marginPx, (containerHeightCss - viewH) / 2)
            : marginPx;

      const xBuf = Math.round(x * pr);
      const yBuf = Math.round(y * pr);
      const wBuf = Math.max(1, Math.round(viewW * pr));
      const hBuf = Math.max(1, Math.round(viewH * pr));

      renderer.setScissorTest(true);
      renderer.setViewport(xBuf, yBuf, wBuf, hBuf);
      renderer.setScissor(xBuf, yBuf, wBuf, hBuf);

      return { viewW, viewH };
    };

    const updateSize = () => {
      if (!renderer || !camera) return { ok: false as const };
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return { ok: false as const };

      renderer.setSize(width, height, false);

      const { viewW, viewH } = applyViewport(width, height);

      lastViewW = viewW;
      lastViewH = viewH;

      camera.aspect = viewW / viewH;
      camera.updateProjectionMatrix();

      renderOnce();

      return { ok: true as const, width, height, viewW, viewH };
    };

    // --- init ---
    scene = new THREE.Scene();
    scene.background = transparentBackground ? null : new THREE.Color(backgroundColor);

    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(cameraPosX, cameraPosY, cameraPosZ);

    const contextAttributes: WebGLContextAttributes = {
      alpha: transparentBackground,
      antialias: true,
      powerPreference: "high-performance",
    };

    const gl =
      (canvas.getContext("webgl2", contextAttributes) as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl", contextAttributes) as WebGLRenderingContext | null);

    if (!gl) {
      console.error("WebGL context creation failed (WebGL unsupported or blocked).");
      return;
    }

    renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: true,
      alpha: transparentBackground,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (transparentBackground) {
      renderer.setClearColor(0x000000, 0);
    }

    updateSize();

    if (effectiveMode === "drag" || effectiveMode === "autoRotate") {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", renderOnce);
      controls.target.copy(baseTarget);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = effectiveMode === "autoRotate";
      controls.autoRotateSpeed = autoRotateSpeed;
      controls.update();
    } else {
      camera.lookAt(baseTarget);
    }

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(dracoDecoderPath);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    function fitCameraToObject(root: THREE.Object3D) {
      if (!camera) return;

      const box = new THREE.Box3().setFromObject(root);
      const sphere = box.getBoundingSphere(new THREE.Sphere());

      const radius = Math.max(0.0001, sphere.radius);
      const center = sphere.center;

      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const minFov = Math.min(vFov, hFov);
      const rawPadding = Number.isFinite(fitPadding) ? fitPadding : 1.25;

      const padding = Math.max(0.85, rawPadding);
      if (padding !== rawPadding) {
        console.warn(
          `[ForestHouse] fitPadding (${rawPadding}) is too small and may clip; clamped to ${padding}.`
        );
      }

      const distance = (radius / Math.tan(minFov / 2)) * padding;

      const dir = baseDir.lengthSq() > 0 ? baseDir.clone() : new THREE.Vector3(0.2, 0.2, 1).normalize();
      camera.position.copy(center).add(dir.multiplyScalar(distance));

      camera.near = Math.max(0.01, distance - radius * 4);
      camera.far = distance + radius * 8;
      camera.updateProjectionMatrix();

      const mode = resolveFitOffsetMode(fitOffsetMode);
      const ox = clampFitOffset(fitOffsetX ?? 0, mode);
      const oy = clampFitOffset(fitOffsetY ?? 0, mode);

      const viewDir = center.clone().sub(camera.position).normalize();
      const right = new THREE.Vector3().crossVectors(viewDir, camera.up).normalize();
      const up = new THREE.Vector3().crossVectors(right, viewDir).normalize();

      const { halfW, halfH } = computeHalfViewportWorldSizeAtDistance(camera, distance);
      const { scaleX, scaleY } = computeFitOffsetScales({
        mode,
        radius,
        halfW,
        halfH,
        viewW: lastViewW,
        viewH: lastViewH,
      });

      const biasedTarget = center
        .clone()
        .addScaledVector(right, -ox * scaleX)
        .addScaledVector(up, -oy * scaleY);

      if (Number.isFinite(fitAzimuthOffset) && Math.abs(fitAzimuthOffset) > 1e-6) {
        const offsetVec = camera.position.clone().sub(biasedTarget);
        offsetVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), fitAzimuthOffset);
        camera.position.copy(biasedTarget).add(offsetVec);
      }

      fittedTarget.copy(biasedTarget);
      if (controls) controls.target.copy(biasedTarget);

      camera.lookAt(biasedTarget);
      controls?.update();

      spherical.setFromVector3(camera.position.clone().sub(biasedTarget));
      baseSpherical.copy(spherical);
      desiredSpherical.copy(spherical);
    }

    loader
      .loadAsync(modelUrl)
      .then((gltf) => {
        if (disposed) return;
        gltfRoot = gltf.scene;
        scene?.add(gltf.scene);

        if (fitToModel) {
          let attempts = 0;
          const maxAttempts = 20;

          const tryFit = () => {
            if (disposed) return;

            const sized = updateSize();
            if (sized.ok && sized.viewW > 0 && sized.viewH > 0) {
              fitCameraToObject(gltf.scene);
              updateSize();
              return;
            }

            if (attempts++ < maxAttempts) {
              requestAnimationFrame(tryFit);
            } else {
              renderOnce();
            }
          };

          tryFit();
        }

        renderOnce();
      })
      .catch((err) => {
        console.error("Failed to load GLB model:", err);
      });

    const handleResize = () => {
      const sized = updateSize();
      if (!sized.ok) return;

      if (fitToModel && gltfRoot) {
        fitCameraToObject(gltfRoot);
        updateSize();
      }
    };

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(handleResize) : null;
    ro?.observe(container);

    window.addEventListener("resize", handleResize);

    function onPointerMove(ev: PointerEvent) {
      const x = (ev.clientX / window.innerWidth) * 2 - 1;
      const y = (ev.clientY / window.innerHeight) * 2 - 1;
      pointer.set(
        Number.isFinite(x) ? THREE.MathUtils.clamp(x, -1, 1) : 0,
        Number.isFinite(y) ? THREE.MathUtils.clamp(y, -1, 1) : 0
      );
    }

    if (effectiveMode === "followMouse") {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!renderer || !scene || !camera) return;

      if (controls) {
        controls.update();
        renderer.render(scene, camera);
        return;
      }

      if (!gltfRoot) return;

      const target = fitToModel ? fittedTarget : baseTarget;

      const dt = clock.getDelta();

      if (effectiveMode === "autoRotate") {
        desiredSpherical.theta += dt * autoRotateSpeed;
      } else if (effectiveMode === "followMouse") {
        const rangeTheta = Number.isFinite(followThetaRange) ? Math.max(0, followThetaRange) : 0.35;
        const rangePhi = Number.isFinite(followPhiRange) ? Math.max(0, followPhiRange) : 0.22;

        desiredSpherical.theta = baseSpherical.theta + pointer.x * rangeTheta;
        desiredSpherical.phi = THREE.MathUtils.clamp(
          baseSpherical.phi - pointer.y * rangePhi,
          0.15,
          Math.PI - 0.15
        );
      } else {
        return;
      }

      const k = 1 - Math.exp(-dt * (6 * Math.max(0.05, followStrength)));
      spherical.theta = THREE.MathUtils.lerp(spherical.theta, desiredSpherical.theta, k);
      spherical.phi = THREE.MathUtils.lerp(spherical.phi, desiredSpherical.phi, k);
      spherical.radius = desiredSpherical.radius;

      const offset = new THREE.Vector3().setFromSpherical(spherical);
      camera.position.copy(target).add(offset);
      camera.lookAt(target);

      renderer.render(scene, camera);
    };

    if (effectiveMode !== "static") {
      clock.start();
      animate();
    }

    return () => {
      disposed = true;

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      ro?.disconnect();

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (controls) {
        controls.removeEventListener("change", renderOnce);
        controls.dispose();
      }

      if (gltfRoot) {
        scene?.remove(gltfRoot);
        disposeObject3D(gltfRoot);
      }

      dracoLoader.dispose();

      renderer?.dispose();

      scene = undefined;
      camera = undefined;
      renderer = undefined;
      controls = undefined;
      gltfRoot = undefined;
    };
  }, [
    modelUrl,
    backgroundColor,
    transparentBackground,
    effectiveMode,
    autoRotateSpeed,
    followStrength,
    followThetaRange,
    followPhiRange,
    dracoDecoderPath,
    cameraPosX,
    cameraPosY,
    cameraPosZ,
    cameraTgtX,
    cameraTgtY,
    cameraTgtZ,
    fitToModel,
    fitPadding,
    fitAzimuthOffset,
    fitOffsetMode,
    fitOffsetX,
    fitOffsetY,
    renderRegionDefined,
    renderAnchor,
    renderWidthVw,
    renderHeightVh,
    renderMaxWidthPx,
    renderMaxHeightPx,
    renderMarginPx,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${fullScreen ? "fixed inset-0" : "relative h-full w-full"} overflow-hidden z-0 ${pointerEventsClass} ${className ?? ""}`.trim()}
      style={backgroundStyle}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  );
}
