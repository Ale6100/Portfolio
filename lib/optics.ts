export interface OpticsPalette {
  readonly isDark: boolean;
  readonly background: readonly [number, number, number];
  readonly grid: readonly [number, number, number];
  readonly brand: readonly [number, number, number];
}

export interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export const OPTICS_CAMERA_Z = 3.75;
export const OPTICS_CAMERA_FOV = 1.55;
export const OPTICS_DROPLET_RADIUS = 0.82;

export const OPTICS_PALETTES: Record<"light" | "dark", OpticsPalette> = {
  light: {
    isDark: false,
    background: [0.975, 0.975, 0.965],
    grid: [0.82, 0.82, 0.8],
    brand: [0.27, 0.37, 0.88],
  },
  dark: {
    isDark: true,
    background: [0.075, 0.08, 0.1],
    grid: [0.2, 0.215, 0.26],
    brand: [0.49, 0.61, 0.96],
  },
};

/** Selecciona la paleta RGB que coincide con los tokens del tema activo. */
export function getOpticsPalette(resolvedTheme: string | undefined): OpticsPalette {
  return resolvedTheme === "dark" ? OPTICS_PALETTES.dark : OPTICS_PALETTES.light;
}

/**
 * Proyecta un punto 2D dentro del lienzo sobre la superficie 3D frontal de la gota,
 * usando la misma cámara perspectiva que el shader WebGL2.
 */
export function projectPointerToDroplet(
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  clampToRim = false
): Point3D | null {
  if (width <= 0 || height <= 0) return null;

  const minDim = Math.min(width, height);
  const uvX = (offsetX - width * 0.5) / minDim;
  const uvY = -(offsetY - height * 0.5) / minDim;

  const invLen = 1 / Math.hypot(uvX, uvY, -OPTICS_CAMERA_FOV);
  const dx = uvX * invLen;
  const dy = uvY * invLen;
  const dz = -OPTICS_CAMERA_FOV * invLen;

  const b = OPTICS_CAMERA_Z * dz;
  const c = OPTICS_CAMERA_Z * OPTICS_CAMERA_Z - OPTICS_DROPLET_RADIUS * OPTICS_DROPLET_RADIUS;
  const disc = b * b - c;

  if (disc >= 0) {
    const t = -b - Math.sqrt(disc);
    return {
      x: dx * t,
      y: dy * t,
      z: OPTICS_CAMERA_Z + dz * t,
    };
  }

  // Punto más cercano al centro sobre el rayo; permite respuesta suave cerca del borde
  const closestX = dx * -b;
  const closestY = dy * -b;
  const closestZ = OPTICS_CAMERA_Z + dz * -b;
  const dist = Math.hypot(closestX, closestY, closestZ);

  if (!clampToRim && dist > OPTICS_DROPLET_RADIUS * 1.12) {
    return null;
  }

  const scale = OPTICS_DROPLET_RADIUS / Math.max(dist, 1e-6);
  return {
    x: closestX * scale,
    y: closestY * scale,
    z: Math.max(0, closestZ * scale),
  };
}
