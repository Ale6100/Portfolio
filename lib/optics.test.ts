import { describe, expect, it } from "vitest";
import {
  getOpticsPalette,
  OPTICS_DROPLET_RADIUS,
  OPTICS_PALETTES,
  projectPointerToDroplet,
} from "./optics";

describe("getOpticsPalette", () => {
  it("devuelve la paleta acorde al tema resuelto", () => {
    expect(getOpticsPalette("dark")).toEqual(OPTICS_PALETTES.dark);
    expect(getOpticsPalette("light")).toEqual(OPTICS_PALETTES.light);
    expect(getOpticsPalette(undefined)).toEqual(OPTICS_PALETTES.light);
  });
});

describe("projectPointerToDroplet", () => {
  it("proyecta el centro del lienzo al polo frontal exacto de la gota", () => {
    const hit = projectPointerToDroplet(150, 150, 300, 300);

    expect(hit).not.toBeNull();
    expect(hit?.x).toBeCloseTo(0, 5);
    expect(hit?.y).toBeCloseTo(0, 5);
    expect(hit?.z).toBeCloseTo(OPTICS_DROPLET_RADIUS, 5);
  });

  it("conserva el cuadrante del clic sobre la superficie esférica", () => {
    const hit = projectPointerToDroplet(210, 90, 300, 300);

    expect(hit).not.toBeNull();
    expect(hit!.x).toBeGreaterThan(0);
    expect(hit!.y).toBeGreaterThan(0);
    expect(hit!.z).toBeGreaterThan(0);
    expect(Math.hypot(hit!.x, hit!.y, hit!.z)).toBeCloseTo(OPTICS_DROPLET_RADIUS, 4);
  });

  it("descarta puntos alejados salvo que se pida ajuste al borde y rechaza tamaños inválidos", () => {
    expect(projectPointerToDroplet(0, 0, 0, 300)).toBeNull();
    expect(projectPointerToDroplet(10, 10, 600, 300)).toBeNull();

    const rim = projectPointerToDroplet(10, 10, 600, 300, true);
    expect(rim).not.toBeNull();
    expect(Math.hypot(rim!.x, rim!.y, rim!.z)).toBeCloseTo(OPTICS_DROPLET_RADIUS, 4);
  });
});
