import { useEffect, useContext } from 'react';
import tecnologias from "../utils/tecnologias"
import { PersonalContext } from "./PersonalContext";

const Tecnologias = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return <></>
    const { setTecnologiasMontado } = personalContext

    useEffect(() => {
        setTecnologiasMontado(true)
    }, );
    return (
        <section className="scroolToTecnologias my-10">
            <div>
                <h2 className="text-center">Principales tecnologías aprendidas</h2>
            </div>

            <div>
                <h3 className="mt-5 mb-3 text-center">Primarias</h3>
                <div id="principalesTecnologias" className="flex justify-evenly flex-wrap gap-1">
                    {
                        tecnologias.map((tecnologia, index) => (
                            (tecnologia.priority) && (
                                <div key={index}>
                                    <a className="py-1 w-[100px] h-28 flex flex-col justify-evenly items-center border-2 rounded-sm text-base transition-all duration-200 no-underline border-black hover:bg-white hover:scale-110" href={tecnologia.link} target="_blank">
                                        <div className="w-16 h-16">
                                            <img className="w-full h-full transition-all duration-200" src={tecnologia.img} alt={tecnologia.alt} />
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
                <div id="tecnologiasSecundarias" className="flex justify-evenly flex-wrap gap-1">
                    {
                        tecnologias.map((tecnologia, index) => (
                            (!tecnologia.priority) && (
                                <div key={index}>
                                    <a className="py-1 w-[100px] h-28 flex flex-col justify-evenly items-center border-2 rounded-sm text-base transition-all duration-200 no-underline border-black hover:bg-white hover:scale-110" href={tecnologia.link} target="_blank">
                                        <div className="w-16 h-16">
                                            <img className="w-full h-full text transition-all duration-200" src={tecnologia.img} alt={tecnologia.alt} />
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
