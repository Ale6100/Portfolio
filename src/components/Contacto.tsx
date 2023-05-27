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

    const superTrim = (string: string) => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }
    
    const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formTarget = e.target as HTMLFormElement;
        const buttonSubmit = formTarget.elements.namedItem("submit") as HTMLInputElement;
        const form = new FormData(formTarget)
        const obj: { [key: string]: string } = {};
        form.forEach((value: FormDataEntryValue, key: string) => obj[key] = superTrim(value as string))

        Toastify({
            text: "Espere por favor...",
            duration: 3000,
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/SendMail`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())

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
                text: "Error inesperado. Si deseas comunicarte conmigo por favor contáctate a la dirección de mail alejandro_portaluppi@outlook.com",
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
                        <input name="Nombre" type="text" className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400 animate-input-border" required />
                    </label>

                    <label className="my-5">Email
                        <input name="Email" type="email"className="p-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400" required />
                    </label>

                    <label className="mb-3">Mensaje
                        <textarea name="Mensaje" className="p-1 border-b-2 border-black outline-none text-xl w-full h-40 hover:bg-slate-50 focus:border-blue-400" required></textarea>
                    </label>

                    <button type="submit" name='submit' className='mx-auto w-60 max-sm:w-56 border-2 border-gray-600 rounded-sm bg-gray-300 cursor-pointer hover:bg-white hover:border-black active:bg-gray-200'>Enviar</button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;
