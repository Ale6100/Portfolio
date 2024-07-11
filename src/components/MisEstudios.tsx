import estudios from '../utils/estudios';

const MisEstudios = () => {
    return (
        <section className="mt-14 border-l-2 border-blue-600">
            <h2 id="estudios" className='mb-5 font-semibold'>Mis estudios</h2>

            <div className="flex justify-evenly flex-wrap gap-y-5 gap-x-1">
                {
                estudios.map(estudio => (
                    <div key={estudio.id} className='px-1 py-2 w-56 border-2 border-black rounded-sm flex flex-col justify-between h-80 items-center text-sm'>
                        <div className='h-36'>
                            <img loading='lazy' src={estudio.img ? `/img/${estudio.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png"} alt="Imagen Certificado" className='w-full h-full' />
                        </div>
                        <p className={`font-semibold text-center ${estudio.fontSize ?? "text-base"}`}>{estudio.titulo}</p>
                        <p className='text-center'>Institución: <a rel="noopener noreferrer" href={estudio.institucionLink} className='font-semibold text-blue-900' target="_blank">{estudio.institucionNombre}</a></p>
                        <p>Estado: {estudio.finalizado ? <span className='text-green-900 font-bold'>finalizado</span> : <span className='text-yellow-900 font-bold'>en curso</span>}</p>
                        {estudio.finalizado ? <a rel="noopener noreferrer" href={estudio.certificado} className="py-[1px] px-3 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:scale-105 hover:border-black" target="_blank">Ver certificado</a>
                        : estudio.linkExtra &&
                        <a rel="noopener noreferrer" href={estudio.linkExtra} className="py-[1px] px-3 border-2 border-gray-600 rounded-sm bg-gray-300 hover:bg-white hover:scale-105 hover:border-black" target="_blank">Ver progreso</a>
                        }
                    </div>
                ))
                }
            </div>
        </section>
    );
}

export default MisEstudios;
