import { useEffect } from 'react';
import proyectos from "../utils/proyectos"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const Proyectos = () => {
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
    }, );

    return (
        <section className="border-l-2 border-blue-400 mt-14">
            <h2 id="proyectos" className='mb-5'>Principales proyectos personales</h2>

            <div id="contenedorProyectos" className="flex justify-around flex-wrap gap-x-[1px] gap-y-4">
                {proyectos.map((proyecto, index) => (
                    <div className="w-[250px] flex flex-col justify-between border-2 border-black rounded-sm" key={index}>
                        <p className="text-lg font-semibold flex flex-col justify-center text-center h-14 bg-blue-400">{proyecto.titulo}</p>
                        
                        <div className="relative">
                            <div>
                                <img className="hover:brightness-105 w-full h-[127px] transition-all duration-200" src={proyecto.img} alt="Imagen proyecto"/>
                            </div>
                
                            <img className={"absolute right-[5%] top-[5%] w-8 pe-"+index} src="https://cdn-icons-png.flaticon.com/512/453/453635.png" alt="Icono herramientas"/>
                        </div>
                
                        <div className="flex">
                            <a rel="noopener noreferrer" href={proyecto.linkSitio} className="py-[1px] w-1/2 h-full disabled px-3 text-center bg-blue-400 border-2 rounded-sm hover:bg-white hover:scale-105 hover:border-black" target="_blank">Visitar</a>
                            <a rel="noopener noreferrer" href={proyecto.linkGitHub} className="py-[1px] w-1/2 h-full px-3 text-center bg-blue-400 border-2 rounded-sm hover:bg-white hover:scale-105 hover:border-black" target="_blank">GitHub</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Proyectos;
