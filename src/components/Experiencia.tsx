import experiencia from '../utils/experiencia';

const Experiencia = () => {
    return (
        <section className="mt-14 border-l-2 border-blue-400">
            <h2 id="experiencia" className='mb-5'>Experiencia laboral en el rubro IT</h2>

            <div className="space-y-4 px-4">
                {
                experiencia.map((exp) => (
                    <div key={exp.id} className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <img loading="lazy" className="w-24 h-24 rounded-md" src={exp.img ? `/img/${exp.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png" } alt={`Logo de ${exp.nombre}`}/>
                        <div className="flex-1">
                            <p className="text-xl max-sm:text-lg font-semibold text-gray-800 mb-2">{exp.nombre}</p>
                            <p className="text-lg max-sm:text-base text-blue-600 mb-1">{exp.puesto}</p>
                            <p className="text-sm text-gray-600 mb-2">{exp.fechaInicio} - {exp.fechaFin ?? "ACTUAL"}</p>
                            {
                                exp.freelance && <p className="text-sm text-gray-500 italic">Equipo de trabajo freelance</p>
                            }
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    );
};

export default Experiencia;
