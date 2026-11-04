import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EMAIL_CONTACTO, enviarMensaje } from "@/lib/contact";
import Contact from "./Contact";

vi.mock("@/lib/contact", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/contact")>();
  return {
    ...actual,
    enviarMensaje: vi.fn(),
  };
});

vi.mock("sonner", () => ({
  toast: {
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    {
      caso: "nombre vacío",
      nombre: "",
      email: "ada@example.com",
      mensaje: "Hola",
      errorEsperado: /el nombre es requerido/i,
    },
    {
      caso: "nombre con más de 100 caracteres",
      nombre: "a".repeat(101),
      email: "ada@example.com",
      mensaje: "Hola",
      errorEsperado: /carácteres máximos excedidos/i,
    },
    {
      caso: "correo inválido",
      nombre: "Ada",
      email: "correo-invalido",
      mensaje: "Hola",
      errorEsperado: /formato de correo inválido/i,
    },
    {
      caso: "mensaje vacío",
      nombre: "Ada",
      email: "ada@example.com",
      mensaje: "",
      errorEsperado: /el mensaje es requerido/i,
    },
  ])("impide el envío y muestra el error cuando hay $caso", async ({ nombre, email, mensaje, errorEsperado }) => {
    const user = userEvent.setup();
    render(<Contact />);

    if (nombre) await user.type(screen.getByLabelText(/nombre/i), nombre);
    if (email) await user.type(screen.getByLabelText(/correo electrónico/i), email);
    if (mensaje) await user.type(screen.getByLabelText(/mensaje/i), mensaje);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(errorEsperado)).toBeInTheDocument();
    expect(enviarMensaje).not.toHaveBeenCalled();
  });

  it("envía el formulario válido en el límite de 100 caracteres, notifica el éxito y limpia los campos", async () => {
    vi.mocked(enviarMensaje).mockResolvedValue(true);
    const user = userEvent.setup();
    const nombreEnLimite = "a".repeat(100);
    render(<Contact />);

    const inputNombre = screen.getByLabelText(/nombre/i);
    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputMensaje = screen.getByLabelText(/mensaje/i);

    await user.type(inputNombre, nombreEnLimite);
    await user.type(inputEmail, "ada@example.com");
    await user.type(inputMensaje, "Consulta de trabajo");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(enviarMensaje).toHaveBeenCalledWith({
      nombre: nombreEnLimite,
      email: "ada@example.com",
      mensaje: "Consulta de trabajo",
      botcheck: false,
    });
    expect(toast.success).toHaveBeenCalledWith(
      "Mensaje enviado con éxito",
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(inputNombre).toHaveValue("");
    expect(inputEmail).toHaveValue("");
    expect(inputMensaje).toHaveValue("");
  });

  it("conserva los datos ingresados y ofrece el correo de respaldo si falla el envío", async () => {
    vi.mocked(enviarMensaje).mockResolvedValue(false);
    const user = userEvent.setup();
    render(<Contact />);

    const inputNombre = screen.getByLabelText(/nombre/i);
    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputMensaje = screen.getByLabelText(/mensaje/i);

    await user.type(inputNombre, "Ada");
    await user.type(inputEmail, "ada@example.com");
    await user.type(inputMensaje, "Mi mensaje importante");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(EMAIL_CONTACTO),
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(inputNombre).toHaveValue("Ada");
    expect(inputEmail).toHaveValue("ada@example.com");
    expect(inputMensaje).toHaveValue("Mi mensaje importante");
  });
});
