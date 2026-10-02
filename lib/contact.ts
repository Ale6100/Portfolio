// lib\contact.ts

const WEB3FORMS_ACCESS_KEY = "39e5245d-f997-4aaa-8902-d9abb51c3393";

export const EMAIL_CONTACTO = "alejandro_portaluppi@outlook.com";

export type MensajeContacto = {
  nombre: string;
  email: string;
  mensaje: string;
  botcheck: boolean;
}

export async function enviarMensaje({ nombre, email, mensaje, botcheck }: MensajeContacto): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio | ${nombre}`,
        from_name: "Portfolio",
        name: nombre,
        email,
        message: mensaje,
        botcheck
      })
    });
    const result: { success: boolean } = await response.json();
    return result.success;
  } catch {
    return false;
  }
}
