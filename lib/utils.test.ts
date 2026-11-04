import { describe, expect, it } from "vitest";
import { elementoAlAzar } from "./utils";

describe("elementoAlAzar", () => {
  it("retorna un elemento perteneciente al array recibido", () => {
    const opciones = ["React", "TypeScript", "Next.js"];

    const resultado = elementoAlAzar(opciones);

    expect(opciones).toContain(resultado);
    expect(elementoAlAzar(["único"])).toBe("único");
    expect(elementoAlAzar([])).toBeUndefined();
  });

  it("lanza TypeError cuando el argumento no es un array", () => {
    expect(() => elementoAlAzar(null as unknown as unknown[])).toThrow(TypeError);
  });
});
