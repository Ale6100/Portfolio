"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  getOpticsPalette,
  OPTICS_DROPLET_RADIUS,
  projectPointerToDroplet,
} from "@/lib/optics";
import { createHeroOpticsProgram } from "./heroOpticsShader";

const MAX_DPR = 1.5;
const HERO_IOR = 1.38;
const HERO_DISPERSION = 0.085;
const TRAIL_POINTS = 8;
const TRAIL_MAX_AGE_S = 1.25;
const TRAIL_MIN_STEP_3D = 0.055;
const IDLE_FRAME_MS = 33;

export default function HeroOptics() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [unsupported, setUnsupported] = useState(false);

  const themeRef = useRef(resolvedTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const interactionRef = useRef({
    pointerX: 0,
    pointerY: 0,
    pointerHitX: 0,
    pointerHitY: 0,
    pointerHitZ: OPTICS_DROPLET_RADIUS,
    targetDepth: 0,
    depth: 0,
    dragging: false,
    nextTrailSlot: 0,
    trail: new Float32Array(TRAIL_POINTS * 4).fill(-1),
    needsRender: true,
  });

  const requestRenderRef = useRef<() => void>(() => {});

  useEffect(() => {
    requestRenderRef.current();
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      gl = null;
    }

    if (!gl) {
      queueMicrotask(() => setUnsupported(true));
      return;
    }

    let compiled;
    try {
      compiled = createHeroOpticsProgram(gl);
    } catch {
      queueMicrotask(() => setUnsupported(true));
      return;
    }

    const mediaQuery = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reduceMotion = mediaQuery?.matches ?? false;
    let inViewport = true;
    let tabVisible = document.visibilityState !== "hidden";
    let rafId = 0;
    let animTime = 0;
    let lastDrawTime = performance.now();
    let smoothPointerX = 0;
    let smoothPointerY = 0;
    let smoothHitX = 0;
    let smoothHitY = 0;
    let smoothHitZ = OPTICS_DROPLET_RADIUS;

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(globalThis.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        interactionRef.current.needsRender = true;
      }
    };

    const hasActiveWaves = () => {
      const state = interactionRef.current;
      if (state.dragging || state.targetDepth > 0 || state.depth > 0.01) return true;
      for (let i = 0; i < TRAIL_POINTS; i++) {
        if (state.trail[i * 4 + 3] >= 0) return true;
      }
      return false;
    };

    const drawFrame = (now: number) => {
      if (!gl || gl.isContextLost()) return;

      const dt = Math.min(0.06, Math.max(0, (now - lastDrawTime) / 1000));
      lastDrawTime = now;

      const state = interactionRef.current;
      if (!reduceMotion) {
        animTime += dt;
        for (let i = 0; i < TRAIL_POINTS; i++) {
          const ageIdx = i * 4 + 3;
          if (state.trail[ageIdx] >= 0) {
            state.trail[ageIdx] += dt;
            if (state.trail[ageIdx] > TRAIL_MAX_AGE_S) {
              state.trail[ageIdx] = -1;
            }
          }
        }
      }

      const lerpFactor = reduceMotion ? 1 : Math.min(1, dt * 22);
      smoothPointerX += (state.pointerX - smoothPointerX) * lerpFactor;
      smoothPointerY += (state.pointerY - smoothPointerY) * lerpFactor;
      smoothHitX += (state.pointerHitX - smoothHitX) * lerpFactor;
      smoothHitY += (state.pointerHitY - smoothHitY) * lerpFactor;
      smoothHitZ += (state.pointerHitZ - smoothHitZ) * lerpFactor;
      state.depth += (state.targetDepth - state.depth) * lerpFactor;

      const palette = getOpticsPalette(themeRef.current);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(compiled.program);
      if (compiled.vao) gl.bindVertexArray(compiled.vao);

      const { uniforms } = compiled;
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uTime, animTime);
      gl.uniform2f(uniforms.uPointer, smoothPointerX, smoothPointerY);
      gl.uniform3f(uniforms.uPointerHit, smoothHitX, smoothHitY, smoothHitZ);
      gl.uniform1f(uniforms.uPointerDepth, state.depth);
      gl.uniform4fv(uniforms.uTrail, state.trail);
      gl.uniform1f(uniforms.uIor, HERO_IOR);
      gl.uniform1f(uniforms.uDispersion, HERO_DISPERSION);
      gl.uniform1f(uniforms.uIsDark, palette.isDark ? 1 : 0);
      gl.uniform3fv(uniforms.uBgColor, palette.background);
      gl.uniform3fv(uniforms.uGridColor, palette.grid);
      gl.uniform3fv(uniforms.uBrandColor, palette.brand);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      state.needsRender = false;
    };

    const tick = (now: number) => {
      rafId = 0;
      if (!inViewport || !tabVisible) return;

      const active = hasActiveWaves();
      const shouldDraw = reduceMotion
        ? interactionRef.current.needsRender
        : active || interactionRef.current.needsRender || now - lastDrawTime >= IDLE_FRAME_MS;

      if (shouldDraw) {
        drawFrame(now);
      }

      if (!reduceMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const scheduleRender = () => {
      interactionRef.current.needsRender = true;
      if (!rafId && inViewport && tabVisible) {
        lastDrawTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };
    requestRenderRef.current = scheduleRender;

    syncSize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncSize();
            scheduleRender();
          })
        : null;
    resizeObserver?.observe(canvas);

    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              inViewport = entries[0]?.isIntersecting ?? true;
              if (inViewport) scheduleRender();
            },
            { threshold: 0.05 }
          )
        : null;
    intersectionObserver?.observe(canvas);

    const handleVisibilityChange = () => {
      tabVisible = document.visibilityState !== "hidden";
      if (tabVisible) scheduleRender();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      scheduleRender();
    };
    mediaQuery?.addEventListener("change", handleMotionChange);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    scheduleRender();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery?.removeEventListener("change", handleMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      compiled.dispose();
    };
  }, []);

  if (unsupported) {
    return null;
  }

  const emitWaveAt = (x: number, y: number, z: number) => {
    const state = interactionRef.current;
    const offset = state.nextTrailSlot * 4;
    state.trail[offset] = x;
    state.trail[offset + 1] = y;
    state.trail[offset + 2] = z;
    state.trail[offset + 3] = 0;
    state.nextTrailSlot = (state.nextTrailSlot + 1) % TRAIL_POINTS;
  };

  const updatePointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    const state = interactionRef.current;

    state.pointerX = Math.max(-1, Math.min(1, (offsetX / rect.width) * 2 - 1));
    state.pointerY = Math.max(-1, Math.min(1, -((offsetY / rect.height) * 2 - 1)));

    const exactHit = projectPointerToDroplet(offsetX, offsetY, rect.width, rect.height, false);
    if (exactHit) {
      state.pointerHitX = exactHit.x;
      state.pointerHitY = exactHit.y;
      state.pointerHitZ = exactHit.z;
      state.targetDepth = state.dragging ? 1 : 0.32;
    } else {
      state.targetDepth = 0;
    }
    requestRenderRef.current();
    return exactHit;
  };

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Gota 3D interactiva con refracción de luz y dispersión arcoíris; mové el cursor o hacé clic para generar ondas"
      className="block size-full cursor-pointer touch-pan-y select-none"
      onPointerDown={(e) => {
        const state = interactionRef.current;
        state.dragging = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);

        const hit = updatePointer(e.clientX, e.clientY);
        if (hit) {
          emitWaveAt(hit.x, hit.y, hit.z);
        }
      }}
      onPointerMove={(e) => {
        const state = interactionRef.current;
        const hit = updatePointer(e.clientX, e.clientY);
        if (!state.dragging || !hit) return;

        const prevSlot = (state.nextTrailSlot + TRAIL_POINTS - 1) % TRAIL_POINTS;
        const prevOffset = prevSlot * 4;
        const hasPrev = state.trail[prevOffset + 3] >= 0;
        const dist = hasPrev
          ? Math.hypot(
              hit.x - state.trail[prevOffset],
              hit.y - state.trail[prevOffset + 1],
              hit.z - state.trail[prevOffset + 2]
            )
          : Infinity;

        if (dist >= TRAIL_MIN_STEP_3D) {
          emitWaveAt(hit.x, hit.y, hit.z);
        }
      }}
      onPointerUp={(e) => {
        const state = interactionRef.current;
        state.dragging = false;
        state.targetDepth = state.targetDepth > 0 ? 0.32 : 0;
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        requestRenderRef.current();
      }}
      onPointerCancel={() => {
        const state = interactionRef.current;
        state.dragging = false;
        state.targetDepth = 0;
        requestRenderRef.current();
      }}
      onPointerLeave={() => {
        const state = interactionRef.current;
        if (state.dragging) return;
        state.targetDepth = 0;
        state.pointerX = 0;
        state.pointerY = 0;
        requestRenderRef.current();
      }}
    />
  );
}
