import React, { useEffect, useContext } from 'react';
import { PersonalContext } from "./PersonalContext";
import Toastify from 'toastify-js'
import Swal from 'sweetalert2'
import "toastify-js/src/toastify.css"

const Contacto = () => {
    const { setContactoMontado } = useContext(PersonalContext);

    useEffect(() => {
        setContactoMontado(true)
    }, );

    const sendMail = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
    
        const obj = {}
        form.forEach((value, key) => obj[key] = value)

        Toastify({
            text: "Espere por favor...",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(100, 100, 100), rgb(200, 200, 200))",
            }
        }).showToast();

        const response = await fetch("https://servidor-backend-personal-ap.netlify.app/.netlify/functions/api/SendMail", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
        
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
                }
            }).showToast();
        } 
    }

    return (
        <section id="seccionContacto" className="scroolToContacto my-5">
            <div>
                <h2 className='mb-5 text-center'>Contacto</h2>
            </div>

            <form onSubmit={sendMail} className="mx-auto p-5 max-w-5xl flex flex-col border-2 border-black rounded-md">
                <label>Nombre
                    <input name="Nombre" type="text" className="p-1 px-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400" required />
                </label>

                <label className="my-5">Email
                    <input name="Email" type="email"className="pt-1 px-1 border-b-2 border-black outline-none text-xl w-full hover:bg-slate-50 focus:border-blue-400" required />
                </label>

                <label className="mb-3">Mensaje
                    <textarea name="Mensaje" className="pt-1 px-1 border-b-2 border-black outline-none text-xl w-full h-40 hover:bg-slate-50 focus:border-blue-400" required></textarea>
                </label>

                <button type="submit" className='mx-auto w-60 max-sm:w-56 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:border-black active:bg-gray-200'>Enviar</button>
            </form>
        </section>
    );
}

export default Contacto;
