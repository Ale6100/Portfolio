import experiencia from '../utils/experiencia';

const Experiencia = () => {
    return (
        <section className="mt-14 border-l-2 border-blue-400">
            <h2 id="experiencia" className='mb-5'>Experiencia laboral en el rubro IT</h2>

            <div className="flex flex-col w-full px-10 gap-10 max-md:px-5 max-md:gap-5">
            {experiencia.map((exp, i) => (
                <div className="flex items-center" key={i}>
                    <img loading='lazy' className='w-32 max-md:w-16' src={exp.img ? `/img/${exp.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png"} alt={`Imagen ${exp.nombre}`} />
                    <div className="ml-10 max-md:ml-5">
                        <h4 className='font-medium'>{exp.nombre}</h4>
                        <p>{exp.puesto}</p>
                        <p>{exp.fechaInicio} - { exp.fechaFin ?? "ACTUAL"}</p>
                        {exp.freelance && <p>Equipo de trabajo freelance</p>}
                    </div>
                </div>
            ))}
            </div>
        </section>
    );
}

export default Experiencia;
