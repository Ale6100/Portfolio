import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HeroOptics from "./HeroOptics";

describe("HeroOptics", () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  it("se oculta sin errores cuando el navegador no soporta WebGL2", async () => {
    const { container } = render(<HeroOptics />);

    await vi.waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
