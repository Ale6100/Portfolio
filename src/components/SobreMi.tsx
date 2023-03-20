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

    const frases = ["Full Stack Web Developer", "HTML | CSS | JavaScript", "MongoDB | ExpressJS | ReactJS | NodeJS", "Tailwind | Bootstrap", "Git | GitHub", "Autodidacta"] // Por ahora sólo se dibujan letras mayúsculas, con excepción de la ñ
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
        <section className="scroolToSobreMi my-5 flex flex-col">
            <h1 className="text-center">Porfolio | Alejandro Portaluppi</h1>
            <div id="contenedor-palabras" className='my-5'>
                { montado && <TableroPixelArt cantidadVerticalDeCuadraditos={cantidadVerticalDeCuadraditos} cantidadHorizontalDeCuadraditos={cantidadHorizontalDeCuadraditos} frases={frases} cantidadCuadraditosHorizontalesPorFrase={cantidadCuadraditosHorizontalesPorFraseState} anchoEspacioVacio={anchoEspacioVacio} /> }
            </div>
            <div className="p-3">
                <p className="mb-3 text-lg max-md:text-base">🎓 Soy desarrollador web titulado tanto en tecnologías Frontend como Backend. Actualmente me encuentro fortaleciendo mis conocimientos con proyectos personales y a la par formo parte de un equipo de trabajo donde nuestro principal objetivo actual es reunir experiencia</p>
                <p className="mb-3 text-lg max-md:text-base">🤝 Quienes me conocen saben que estoy dispuesto a dar una mano a mis pares fomentando así el crecimiento profesional grupal</p>
                <p className="mb-3 text-lg max-md:text-base">🔧 Cuento con amplias herramientas para resolver problemas utilizando la lógica gracias a mi experiencia en la carrera de Ciencias Físicas en la UBA, cursos de programación y constante interés por aprender nuevas tecnologías</p>
                <p className="mb-3 text-lg max-md:text-base">📌 Aspiro insertarme en el mundo laboral guiado por el trabajo en equipo y el autoaprendizaje</p>
                <p className="text-lg max-md:text-base">🗒️ Para más info puedes ver mi <a className="text-blue-900" href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank">Linkedin</a> o mi <a className="text-blue-900" href="./utils/CV_Alejandro_Portaluppi.pdf" target="_blank">CV</a></p>
            </div>
        </section>
    );
}

export default SobreMi;
