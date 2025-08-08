// lib\contact.ts

'use server'

import { errorResponse } from "@/utils/handleErrorResponses";
import { handleApiJson } from "./utils";

export type sendEmailProps = {
  data: {
    nombre: string;
    email: string;
    mensaje: string;
  }
}

export async function sendEmail({ data }: sendEmailProps) {
  const config = { // Estas son las especificaciones que solicito en https://github.com/Ale6100/backend-personal.git#endpoints-%EF%B8%8F
    from: data.email,
    to: "alejandro_portaluppi@outlook.com",
    subject: `Portfolio | ${data.nombre}`,
    html: `
    <div>
        <h1>Nuevo mail enviado desde el <a href="https://portfolioalejandrop.netlify.app/">portfolio</a></h1>
        <p>Email: ${data.email}</p>
        <p>Nombre: ${data.nombre}</p>
        <p>Mensaje:</p>
        <p>${data.mensaje}</p>
    </div>
    `
  }

  try {
    // En mis otros proyectos oculto esto con un .env, acá no tengo ganas la verdad porque tengo sueño pero eventualmente lo haré
    const response = await fetch('https://backend-personal-dev.onrender.com/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer fhl93k23sd`
      },
      body: JSON.stringify(config),
      cache: 'no-cache'
    })
    return await handleApiJson(response, 'Error al enviar el correo');
  } catch (e) {
    return errorResponse({ status: 'error', message: 'Error al enviar el correo' });
  }
}
