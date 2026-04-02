import type { RefObject } from "react";
import { useEffect } from "react";

type Bounds = {
  W: number;
  H: number;
};

class Particle {
  x = 0;
  y = 0;
  size = 0;
  speedX = 0;
  speedY = 0;
  opacity = 0;
  life = 0;
  maxLife = 0;
  type: "hex" | "dot" = "dot";

  constructor(bounds: Bounds) {
    this.reset(bounds);
  }

  reset(bounds: Bounds) {
    this.x = Math.random() * bounds.W;
    this.y = Math.random() * bounds.H;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = 0;
    this.maxLife = 200 + Math.random() * 300;
    this.type = Math.random() > 0.7 ? "hex" : "dot";
  }

  draw(ctx: CanvasRenderingContext2D) {
    const t = this.life / this.maxLife;
    const alpha = this.opacity * Math.sin(t * Math.PI);
    ctx.globalAlpha = alpha;

    if (this.type === "hex") {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const r = this.size * 3;
        const px = this.x + Math.cos(a) * r;
        const py = this.y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(126,200,227,0.6)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(184,223,245,0.8)";
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  update(bounds: Bounds) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life >= this.maxLife) this.reset(bounds);
  }
}

export function useCanvasParticles(params: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  count?: number;
}) {
  const { canvasRef, count = 80 } = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bounds: Bounds = { W: 0, H: 0 };
    let rafId = 0;

    const particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      bounds.W = window.innerWidth;
      bounds.H = window.innerHeight;

      canvas.width = Math.floor(bounds.W * dpr);
      canvas.height = Math.floor(bounds.H * dpr);
      canvas.style.width = `${bounds.W}px`;
      canvas.style.height = `${bounds.H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ensureParticles = () => {
      if (particles.length) return;
      for (let i = 0; i < count; i++) {
        const p = new Particle(bounds);
        p.life = Math.random() * p.maxLife;
        particles.push(p);
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, bounds.W, bounds.H);
      for (const p of particles) {
        p.update(bounds);
        p.draw(ctx);
      }
      rafId = window.requestAnimationFrame(drawParticles);
    };

    resize();
    ensureParticles();
    rafId = window.requestAnimationFrame(drawParticles);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
    };
  }, [canvasRef, count]);
}
