import React, { useEffect, useContext } from 'react';
import { PersonalContext } from "./PersonalContext";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const Contacto = () => {
    const { setContactoMontado } = useContext(PersonalContext);
    
    useEffect(() => {
        setContactoMontado(true)
    }, );

    const superTrim = (string) => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }
    
    const sendMail = async (e) => {
        e.preventDefault()
        
        const buttonSubmit = e.target.elements.submit
        const form = new FormData(e.target)
    
        const obj = {}
        form.forEach((value, key) => obj[key] = superTrim(value))

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
        if (response.status === "sucess") {
            e.target.reset()
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
        } 
    }

    return (
        <section className="scroolToContacto my-5">
            <div>
                <h2 className='mb-5 text-center'>Contacto</h2>
            </div>

            <form onSubmit={sendMail} id="idFormContacto" className="mx-auto p-5 max-w-5xl flex flex-col border-2 border-black rounded-sm">
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
        </section>
    );
}

export default Contacto;
