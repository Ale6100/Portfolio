import tecnologias from "../utils/tecnologias"

const Tecnologias = () => {
    const indexLimite = 17;

    return (
        <section className="mt-14 border-l-2 border-blue-600">
            <h2 id="tecnologias" className="font-semibold">Principales tecnologías</h2>

            <div>
                <h3 className="mt-5 mb-3 text-center">Primarias</h3>
                <div id="principalesTecnologias" className="flex justify-evenly flex-wrap gap-x-1 gap-y-2">
                    {
                        tecnologias.map((tecnologia, index) => (
                            (index <= indexLimite) && (
                                <div key={tecnologia.id}>
                                    <a rel="noopener noreferrer" className="py-1 w-[100px] h-28 flex flex-col justify-evenly items-center border-2 rounded-sm text-base transition-all duration-200 no-underline border-black hover:bg-white hover:scale-110" href={tecnologia.link} target="_blank">
                                        <div className="w-16 h-16">
                                            <img loading='lazy' className="w-full h-full transition-all duration-200" src={tecnologia.img} alt={tecnologia.alt} />
                                        </div>

                                        <p>{tecnologia.title}</p>
                                    </a>
                                </div>
                            )
                        ))
                    }
                </div>
            </div>

            <div>
                <h3 className="mt-5 mb-3 text-center">Secundarias</h3>
                <div id="tecnologiasSecundarias" className="flex justify-evenly flex-wrap gap-x-1 gap-y-2">
                    {
                        tecnologias.map((tecnologia, index) => (
                            (index > indexLimite) && (
                                <div key={tecnologia.id}>
                                    <a rel="noopener noreferrer" className="py-1 w-[100px] h-28 flex flex-col justify-evenly items-center border-2 rounded-sm text-base transition-all duration-200 no-underline border-black hover:bg-white hover:scale-110" href={tecnologia.link} target="_blank">
                                        <div className="w-16 h-16">
                                            <img loading='lazy' className="w-full h-full text transition-all duration-200" src={tecnologia.img} alt={tecnologia.alt} />
                                        </div>

                                        <p className={`${tecnologia.fontSize} text-center`}>{tecnologia.title}</p>
                                    </a>
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Tecnologias;
