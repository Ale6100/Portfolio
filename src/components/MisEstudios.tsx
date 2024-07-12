import estudios from '../utils/estudios';

const MisEstudios = () => {
    return (
        <section className="mt-14 border-l-2 border-blue-600">
            <h2 id="estudios" className='mb-5 font-semibold'>Mis estudios</h2>

            <div className="flex justify-evenly flex-wrap gap-y-5 gap-x-1">
                {
                estudios.map(estudio => (
                    <div key={estudio.id} className="w-72 bg-white shadow-lg rounded-lg transition-all hover:scale-105 flex flex-col justify-between">
                        <div className="h-48">
                            <img loading="lazy" src={estudio.img ? `/img/${estudio.img}` : "https://cdn-icons-png.flaticon.com/512/189/189792.png"} alt={`Certificado de ${estudio.titulo}`} className="w-full h-full"/>
                        </div>
                        <div className="p-4 pt-1">
                            <p className={`font-bold text-gray-800 mb-2 ${estudio.fontSize ?? "text-lg"}`}>{estudio.titulo}</p>
                            <p className="text-sm text-gray-600 mb-2"> Institución: <a href={estudio.institucionLink} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200" target="_blank"  rel="noopener noreferrer">{estudio.institucionNombre}</a></p>
                            <p className="text-sm mb-4">Estado: <span className={`font-semibold ${estudio.finalizado ? 'text-green-600' : 'text-yellow-600'}`}> {estudio.finalizado ? 'Finalizado' : 'En curso'}</span> </p>
                            {
                            estudio.finalizado ?
                            <a href={estudio.certificado} className="inline-block text-sm py-2 px-4 text-white bg-blue-600 rounded transition-all duration-300 hover:bg-blue-700"target="_blank" rel="noopener noreferrer">Ver certificado</a>
                            : estudio.linkExtra && <a href={estudio.linkExtra} className="inline-block text-sm py-2 px-4 text-white bg-blue-600 rounded transition-all duration-300 hover:bg-blue-700" target="_blank" rel="noopener noreferrer">Ver progreso</a>
                            }
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    );
}

export default MisEstudios;