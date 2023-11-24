import experiencia from '../utils/experiencia';

const Experiencia = () => {
    return (
        <section className="mt-14 border-l-2 border-blue-400">
            <h2 id="experiencia" className='mb-5'>Experiencia laboral en el rubro IT</h2>

            <div className="flex justify-evenly flex-wrap gap-y-5 gap-x-1">
            {
            experiencia.map((exp, i) => (
                <div key={i} className='border-2 border-black rounded-sm flex flex-col justify-evenly h-80 w-56 items-center'>
                    <div className='h-40'>
                        <img loading='lazy' src={exp.img ? `/img/${exp.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png"} alt="Imagen Certificado" className='w-full h-full rounded-sm' />
                    </div>
                    <p className={`font-semibold text-lg text-center`}>{exp.nombre}</p>
                    <p className='text-center'>Puesto: {exp.puesto}</p>
                    <p className='text-sm'>Período: {exp.fechaInicio} - { exp.fechaFin ?? "ACTUAL"}</p>
                    {exp.freelance && <p>Equipo de trabajo freelance</p>}
                </div>
            ))
            }
            </div>
        </section>
    );
}

export default Experiencia;
