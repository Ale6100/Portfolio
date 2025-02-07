import React from 'react';
import { loadingToast, sendToastUpdate } from '../utils/toast';

const Contacto = () => {
    const superTrim = (string: string): string => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }

    const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formTarget = e.target;
        if (!(formTarget instanceof HTMLFormElement)) return null

        const buttonSubmit = formTarget.elements.namedItem("submit")
        if (!(buttonSubmit instanceof HTMLButtonElement)) return null

        const form = new FormData(formTarget)

        const obj: { [key: string]: string } = {};
        form.forEach((value: FormDataEntryValue, key: string) => obj[key] = superTrim(value as string))

        buttonSubmit.disabled = true
        buttonSubmit.classList.remove("cursor-pointer", "hover:bg-white", "hover:border-black", "active:bg-gray-200", "bg-gray-300")
        buttonSubmit.classList.add("bg-gray-500")

        interface ConfigInterface {
            from: string;
            to: string;
            subject: string;
            html: string;
        }

        const config: ConfigInterface = { // Estas son las especificaciones que solicito en https://github.com/Ale6100/backend-personal.git#endpoints-%EF%B8%8F
            from: obj.email,
            to: "alejandro_portaluppi@outlook.com",
            subject: `Portfolio | ${obj.nombre}`,
            html: `
            <div>
                <h1>Nuevo mail enviado desde el <a href="https://portfolioalejandrop.netlify.app/">portfolio</a></h1>
                <p>Email: ${obj.email}</p>
                <p>Nombre: ${obj.nombre}</p>
                <p>Mensaje:</p>
                <p>${obj.mensaje}</p>
            </div>
            `
        }

        const idToast = loadingToast("Enviando mail... Si notas que tarda mucho considera que el servidor gratuito donde está alojado el backend se suspende por inactividad");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mail`, {
            method: "POST",
            body: JSON.stringify(config),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TOKEN_GRAL}`
            }
        }).then(res => res.json());

        buttonSubmit.disabled = false
        buttonSubmit.classList.add("cursor-pointer", "hover:bg-white", "hover:border-black", "active:bg-gray-200", "bg-gray-300")
        buttonSubmit.classList.remove("bg-gray-500")

        if (response.status === "success") {
            formTarget.reset()
            sendToastUpdate(idToast, "success", "Mail enviado!")

        } else { // No muestro cuál es el error porque no tengo interés que sea público. Lo conozco yo por el lado del backend
            sendToastUpdate(idToast, "error", "Servidor en mantenimiento. Si deseas comunicarte conmigo por favor contáctate a la dirección de mail alejandro_portaluppi@outlook.com")
        }
    }

    return (
        <section className="mt-14 mb-5 border-l-2 border-blue-600">
            <h2 id="contacto" className='mb-5 font-semibold'>Contacto</h2>

            <div className='mx-1'>
                <form onSubmit={ sendMail } className="mx-auto m-1 p-5 max-w-5xl flex flex-col border-2 border-black rounded-sm">
                    <label><p className='mb-1'>Nombre</p>
                        <input name="nombre" type="text" className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-600" required />
                    </label>

                    <label className="my-5"><p className='mb-1'>Email</p>
                        <input name="email" type="email"className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-600" required />
                    </label>

                    <label className="mb-3"><p className='mb-1'>Mensaje</p>
                        <textarea name="mensaje" className="p-1 border-b-2 border-black outline-none text-xl w-full h-40 hover:bg-slate-50 focus:border-blue-600" required></textarea>
                    </label>

                    <button type="submit" name='submit' className='mx-auto w-60 max-sm:w-56 border-2 border-gray-600 rounded-sm bg-gray-300 cursor-pointer hover:bg-white hover:border-black active:bg-gray-200'>Enviar</button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;
