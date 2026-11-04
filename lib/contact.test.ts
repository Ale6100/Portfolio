import { afterEach, describe, expect, it, vi } from "vitest";
import { enviarMensaje } from "./contact";

const mensajeValido = {
  nombre: "Ada Lovelace",
  email: "ada@example.com",
  mensaje: "Hola, me gustaría contactarte.",
  botcheck: false,
};

describe("enviarMensaje", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("envía los datos del formulario a Web3Forms y retorna true cuando responde con éxito", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    const resultado = await enviarMensaje(mensajeValido);

    expect(resultado).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(init?.body as string)).toMatchObject({
      subject: "Portfolio | Ada Lovelace",
      from_name: "Portfolio",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hola, me gustaría contactarte.",
      botcheck: false,
    });
  });

  it("retorna false cuando la API responde que el envío no fue exitoso", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 400 })
    );

    await expect(enviarMensaje(mensajeValido)).resolves.toBe(false);
  });

  it("retorna false si falla la petición de red", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    await expect(enviarMensaje(mensajeValido)).resolves.toBe(false);
  });
});
