import { useEffect, useContext } from 'react';
import experiencia from '../utils/experiencia';
import { PersonalContext } from './PersonalContext';

const Experiencia = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return <></>
    const { setExperiencia } = personalContext

    useEffect(() => {
        setExperiencia(true)
    }, );

    return (
        <section className="scroolToExperiencia mt-14 border-l-2 border-blue-400">
            <h2 className='mb-5'>Experiencia laboral en el rubro IT</h2>

            <div className="flex justify-evenly flex-wrap gap-y-5 gap-x-1">
            {
            experiencia.map((exp, i) => (
                <div key={i} className='p-2  border-2 border-black rounded-sm flex flex-col justify-between h-96 items-center'>
                    <div className='h-48'>
                        <img src={exp.img ? `/img/${exp.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png"} alt="Imagen Certificado" className='w-full h-full rounded-sm' />
                    </div>
                    <p className={`font-semibold text-lg text-center`}>{exp.nombre}</p>
                    <p className='text-center'>Puesto: {exp.puesto}</p>
                    <p>Período: {exp.fechaInicio} - ACTUAL</p>
                    {exp.freelance && <p>Equipo de trabajo freelance</p>}
                    <a href={exp.linkTrabajo} className="py-[1px] px-3 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:scale-105 hover:border-black" target="_blank">Conocer más</a>
                </div>
            ))
            }
            </div>
        </section>
    );
}

export default Experiencia;
