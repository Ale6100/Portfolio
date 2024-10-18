import { useState } from 'react';
import proyectos from "../utils/proyectos"

const Proyectos = () => {
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setActiveTooltip(index);
    };

    const handleMouseLeave = () => {
        setActiveTooltip(null);
    };

    return (
        <section className="border-l-2 border-blue-600 mt-14">
            <h2 id="proyectos" className='mb-5 font-semibold'>Principales proyectos personales</h2>

            <div id="contenedorProyectos" className="flex justify-around flex-wrap gap-x-[1px] gap-y-4">
                {
                proyectos.map((proyecto, index) => (
                    <div key={proyecto.id} className="w-72 bg-white rounded-lg transition-all hover:shadow-xl">
                        <div className="relative">
                            <img className="w-full h-48 transition-all hover:brightness-110" src={proyecto.img} alt={`Proyecto: ${proyecto.title}`} />
                            <div className="absolute top-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                                <img className="w-6 h-6" src="./img/hammer.svg" alt="Herramientas" />
                            </div>
                            {
                            activeTooltip === index && (
                                <div className="absolute right-0 top-12 bg-white p-4 rounded shadow-lg z-10 max-w-xs">
                                    <p className="font-semibold mb-2 text-gray-800">Herramientas:</p>
                                    <ul className="list-disc pl-5">
                                        {
                                        proyecto.herramientas.map(herramienta => (
                                            <li key={herramienta} className="text-sm text-gray-600">{herramienta}</li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            )
                            }
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">{proyecto.title}</h3>
                            <div className="flex space-x-4">
                                <a href={proyecto.linkSitio} className="flex-1 text-white py-2 px-4 bg-blue-600 rounded transition-all duration-300 hover:bg-blue-700 text-center"target="_blank" rel="noopener noreferrer">Visitar</a>
                                <a href={proyecto.linkGitHub} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded transition-all duration-300 hover:bg-gray-300 text-center" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    );
}

export default Proyectos;
