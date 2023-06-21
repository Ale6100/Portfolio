import React, { useEffect, useContext } from 'react';
import { PersonalContext } from "./PersonalContext";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const Contacto = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return <></>
    const { setContactoMontado } = personalContext

    useEffect(() => {
        setContactoMontado(true)
    }, );

    const superTrim = (string: string): string => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }
    
    const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formTarget = e.target as HTMLFormElement;
        const buttonSubmit = formTarget.elements.namedItem("submit")

        if (!(buttonSubmit instanceof HTMLButtonElement)) return null

        const form = new FormData(formTarget)
        
        const obj: { [key: string]: string } = {};
        form.forEach((value: FormDataEntryValue, key: string) => obj[key] = superTrim(value as string))
        
        Toastify({
            text: "Espere por favor...",
            duration: 6000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(100, 100, 100), rgb(200, 200, 200))",
            },
        }).showToast();

        buttonSubmit.disabled = true
        buttonSubmit.classList.remove("cursor-pointer", "hover:bg-white", "hover:border-black", "active:bg-gray-200", "bg-gray-300")
        buttonSubmit.classList.add("bg-gray-500")

        interface configInterface {
            from: string;
            to: string;
            subject: string;
            html: string;
        }

        const config: configInterface = { // Estas son las especificaciones que solicito en https://github.com/Ale6100/backend-personal.git#endpoints-%EF%B8%8F
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

        const toleranceTime = setTimeout(() => { // Define seis segundos de tolerancia de espera hasta que se efectúe el envío del mail. Si pasa ese tiempo, aparece un mensaje pidiendo disculpas
            Toastify({
                text: "Disculpa la demora. El servidor gratuito donde está alojado el backend suele tener retrasos",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(100, 100, 100), rgba(125, 125, 125, 0.9))",
                }
            }).showToast();
        }, 6000);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mail`, {
            method: "POST",
            body: JSON.stringify(config),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TOKEN_GRAL}`
            }
        }).then(res => res.json())

        clearTimeout(toleranceTime)

        buttonSubmit.disabled = false
        buttonSubmit.classList.add("cursor-pointer", "hover:bg-white", "hover:border-black", "active:bg-gray-200", "bg-gray-300")
        buttonSubmit.classList.remove("bg-gray-500")
        
        if (response.status === "success") {
            formTarget.reset()
            Toastify({
                text: "Mail enviado!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                className: "sendMail"
            }).showToast();

        } else if (response.status === "error") { // No muestro cuál es el error porque no tengo interés que sea público. Lo conozco yo por el lado del backend
            Toastify({
                text: "Servidor en mantenimiento. Si deseas comunicarte conmigo por favor contáctate a la dirección de mail alejandro_portaluppi@outlook.com",
                duration: 10000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgba(155, 50, 50, 1), rgba(0, 0, 0, 0.9))",
                }
            }).showToast();
        }
    }

    return (
        <section className="scroolToContacto mt-14 mb-5 border-l-2 border-blue-400">
            <h2 className='mb-5'>Contacto</h2>

            <div className='mx-1'>
                <form onSubmit={ sendMail } id="idFormContacto" className="mx-auto m-1 p-5 max-w-5xl flex flex-col border-2 border-black rounded-sm">
                    <label>Nombre
                        <input name="nombre" type="text" className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400 animate-input-border" required />
                    </label>

                    <label className="my-5">Email
                        <input name="email" type="email"className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400" required />
                    </label>

                    <label className="mb-3">Mensaje
                        <textarea name="mensaje" className="p-1 border-b-2 border-black outline-none text-xl w-full h-40 hover:bg-slate-50 focus:border-blue-400" required></textarea>
                    </label>

                    <button type="submit" name='submit' className='mx-auto w-60 max-sm:w-56 border-2 border-gray-600 rounded-sm bg-gray-300 cursor-pointer hover:bg-white hover:border-black active:bg-gray-200'>Enviar</button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;
