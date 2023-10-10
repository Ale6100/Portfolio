import { useState, useEffect, useContext } from 'react';
import arrayLetras from "../utils/arrayLetras.js"
import TableroPixelArt from './TableroPixelArt';
import { PersonalContext } from "./PersonalContext";

const SobreMi = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return <></>
    const { setSobreMiMontado } = personalContext

    const [ montado, setMontado ] = useState(false)
    const [ cantidadCuadraditosHorizontalesPorFraseState, setCantidadCuadraditosHorizontalesPorFrase] = useState<number[]>([])
    const [ cantidadHorizontalDeCuadraditos, setCantidadHorizontalDeCuadraditos ] = useState(0)
    const [ cantidadVerticalDeCuadraditos, setCantidadVerticalDeCuadraditos ] = useState(0)

    const frases = ["Full Stack Web Developer", "HTML | CSS | JavaScript", "MongoDB | ExpressJS | ReactJS | NodeJS", "Tailwind | Bootstrap", "Git | GitHub", "Autodidacta", 'Yii 2 | PHP | Xampp'] // Por ahora sólo se dibujan letras mayúsculas (menos de la ñ) y el caracter |
    const anchoEspacioVacio = 3 // Cantidad de cuadraditos horizontales que representa un espacio vacío entre palabras

    useEffect(() => {
        const cantidadCuadraditosHorizontalesPorFrase: number[] = frases.map((frase: string) => {
            let cantidadCuadraditosFrase = 0
            for (let i=0; i<frase.length; i++) {
                if (arrayLetras.some(obj => obj.letra === frase[i].toLowerCase())) {
                    const anchoLetraPixel = arrayLetras.find(obj => obj.letra === frase[i].toLowerCase())?.ancho;
                    if (anchoLetraPixel) { cantidadCuadraditosFrase += anchoLetraPixel }
                    cantidadCuadraditosFrase += 1 // Agrego un espacio vacío entre una letra y otra
                    if (i === frase.length-1) cantidadCuadraditosFrase -= 1 // Quito el último espacio vacío
                } else {
                    cantidadCuadraditosFrase += anchoEspacioVacio
                    if (i === frase.length-1) cantidadCuadraditosFrase -= anchoEspacioVacio
                }
            }
            return cantidadCuadraditosFrase
        })

        const cantCuadraditosVerticalesPorLetra = arrayLetras.map(obj => obj.alto)

        setCantidadHorizontalDeCuadraditos(Math.max(...cantidadCuadraditosHorizontalesPorFrase))
        setCantidadVerticalDeCuadraditos(Math.max(...cantCuadraditosVerticalesPorLetra))

        setMontado(true)
        setCantidadCuadraditosHorizontalesPorFrase(cantidadCuadraditosHorizontalesPorFrase)
        setSobreMiMontado(true)
    }, []);

    return (
        <section className="scroolToSobreMi mt-5 flex flex-col">
            <h1 className="text-center">Portfolio | Alejandro Portaluppi</h1>
            
            <div id="contenedor-palabras" className='my-5'>
                { montado && <TableroPixelArt {...{ cantidadVerticalDeCuadraditos, cantidadHorizontalDeCuadraditos, frases, cantidadCuadraditosHorizontalesPorFrase: cantidadCuadraditosHorizontalesPorFraseState, anchoEspacioVacio }} /> }
            </div>
            
            <div className='border-l-2 border-blue-400'>
                <h2>Sobre mí</h2>
                <div className="p-3">
                    <p className="mb-3 text-lg max-md:text-base">🎓 Desarrollador Web de 23 años titulado en tecnologías Frontend y Backend</p>
                    <p className="mb-3 text-lg max-md:text-base">🔧 Comencé como estudiante de Física en la UBA donde aprendí lógica, matemática y programación. Estos conocimientos me llevaron a descubrir mi pasión por la programación y me animaron a cambiar mi carrera a Ciencias de la Computación. Ahora soy un Desarrollador Web Full Stack con un constante interés por aprender nuevas tecnologías</p>
                    <p className="mb-3 text-lg max-md:text-base">🤝 Quienes me conocen saben que estoy dispuesto a dar una mano a mis pares fomentando así el crecimiento profesional grupal</p>
                    <p className="mb-3 text-lg max-md:text-base">📌 Actualmente estoy trabajando en el mundo IT, lo que me permite seguir desarrollándome en el puesto</p>
                    <p className="text-lg max-md:text-base">🗒️ Para más información puedes ver mi <a className="text-blue-900 hover:text-blue-500" href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener">Linkedin</a> o mi <a className="text-blue-900 hover:text-blue-500" href="./utils/CV_Alejandro_Portaluppi.pdf" target="_blank">CV</a></p>
                </div>
            </div>
        </section>
    );
}

export default SobreMi;
