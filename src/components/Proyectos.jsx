import React, { useEffect, useContext } from 'react';
import proyectos from "../utils/proyectos"
import { PersonalContext } from "./PersonalContext";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const Proyectos = () => {
    const { setProyectosMontado } = useContext(PersonalContext);

    useEffect(() => {
        proyectos.forEach((proyecto, index) => {
            let htmlContent = ""
            proyecto.herramientas.forEach(h => {
                htmlContent += `<p>${h}</p>`
            })
        
            tippy(`.pe-${index}`, {
                content: `<div class="htmlContent">${htmlContent}</div>`,
                allowHTML: true,
                placement: 'top',
                arrow: true,
                interactive: true,
                delay: 0,
                hideOnClick: false,
                interactiveBorder: 10,
                interactiveDebounce: 0,
                moveTransition: '',
                offset: [0, 15],
                showOnCreate: false,
                touch: ['hold', 500],
                trigger: 'mouseenter focus',
            });
        })
        
        tippy(".tippyChat", {
            content: `Debido al sitio gratuito donde está subido, la primera vez que entres vas a tener que esperar aproximadamente 15 segundos hasta que abra`,
            placement: 'top',
            arrow: true,
            interactive: true,
            delay: 0,
            hideOnClick: false,
            interactiveBorder: 10,
            interactiveDebounce: 0,
            moveTransition: '',
            offset: [0, 15],
            showOnCreate: false,
            touch: ['hold', 500],
            trigger: 'mouseenter focus',
        });

        setProyectosMontado(true)
    }, );

    return (
        <section id="seccionProyectos" className="scroolToProyectos py-5">
            <div>
                <h2 className="mb-5 text-center">Proyectos personales</h2>
            </div>

            <div id="contenedorProyectos" className="mt-3 flex justify-around flex-wrap gap-x-[1px] gap-y-4">
                {proyectos.map((proyecto, index) => (
                    <div className="p-3 max-w-[300px] h-[340px] flex flex-col justify-between border-2 border-black rounded-md" key={index}>
                        <p className="text-lg font-semibold flex flex-col justify-center text-center h-14 bg-blue-400 rounded-t-md">{proyecto.titulo}</p>
                        
                        <div className="relative">
                            <div>
                                <img className="hover:brightness-105 w-full border-2 border-dashed border-black transition-all duration-500" src={proyecto.img} />
                            </div>
                
                            <img className={"absolute right-[5%] top-[5%] w-8 hover:brightness-105 pe-"+index} src="https://img.icons8.com/ios-filled/50/null/support.png" />
                        </div>
                
                        <p className="flex flex-col justify-center text-center h-11 bg-blue-400 font-semibold">{proyecto.descripcion}</p>
                
                        <div className="flex justify-evenly">
                            <a href={proyecto.linkSitio} className={`py-[1px] px-3 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:scale-105 hover:border-black ${proyecto.linkSitio.includes("chat") ? "tippyChat" : undefined}`} target="_blank">Visitar</a>
                            <a href={proyecto.linkGitHub} className={"py-[1px] px-3 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:scale-105 hover:border-black"} target="_blank">GitHub</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Proyectos;
