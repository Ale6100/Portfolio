import React, { useState, useEffect, useContext } from 'react';
import arrayLetras from "../utils/arrayLetras.js"
import TableroPixelArt from './TableroPixelArt.jsx';
import { PersonalContext } from "./PersonalContext";

const SobreMi = () => {
    const { setSobreMiMontado } = useContext(PersonalContext);
    const [ montado, setMontado ] = useState(false)
    const [ cantidadCuadraditosHorizontalesPorFraseState, setCantidadCuadraditosHorizontalesPorFrase] = useState(0)
    const [ cantidadHorizontalDeCuadraditos, setCantidadHorizontalDeCuadraditos ] = useState(0)
    const [ cantidadVerticalDeCuadraditos, setCantidadVerticalDeCuadraditos ] = useState(0)

    const frases = ["Full Stack Web Developer", "Backend Web Developer", "Frontend Web Developer", "HTML CSS JavaScript", "MongoDB ExpressJS ReactJS NodeJS", "Tailwind Bootstrap", "Autodidacta"] // Por ahora sólo se dibujan letras mayúsculas, con excepción de la ñ
    const anchoEspacioVacío = 3 // Cantidad de cuadraditos horizontales que representa un espacio vacío entre palabras

    useEffect(() => {
        const cantidadCuadraditosHorizontalesPorFrase = frases.map(frase => {
            let cantidadCuadraditosFrase = 0
            for (let i=0; i<frase.length; i++) {
                if (arrayLetras.some(obj => obj.letra === frase[i].toLowerCase())) {
                    const anchoLetraPixel = arrayLetras.find(obj => obj.letra === frase[i].toLowerCase()).ancho
                    cantidadCuadraditosFrase += anchoLetraPixel
                    cantidadCuadraditosFrase += 1 // Agrego un espacio vacío entre una letra y otra
                    if (i === frase.length-1) cantidadCuadraditosFrase -= 1 // Quito el último espacio vacío
                } else {
                    cantidadCuadraditosFrase += anchoEspacioVacío
                    if (i === frase.length-1) cantidadCuadraditosFrase -= anchoEspacioVacío
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
                {montado ? <TableroPixelArt cantidadVerticalDeCuadraditos={cantidadVerticalDeCuadraditos} cantidadHorizontalDeCuadraditos={cantidadHorizontalDeCuadraditos} arrayLetras={arrayLetras} frases={frases} cantidadCuadraditosHorizontalesPorFrase={cantidadCuadraditosHorizontalesPorFraseState} anchoEspacioVacío={anchoEspacioVacío} /> : null}
            </div>
            <div className="p-3">
                <p className="mb-3 text-lg max-md:text-base">🎓 Soy desarrollador web titulado en el área Frontend. Actualmente me encuentro aprendiendo tecnologías Backend para poder tener conocimiento de un Stack completo en el área de la programación que más me interesa</p>
                <p className="mb-3 text-lg max-md:text-base">🤝 Quienes me conocen saben que estoy dispuesto a dar una mano a mis pares fomentando así el crecimiento profesional grupal</p>
                <p className="mb-3 text-lg max-md:text-base">🔧 Cuento con amplias herramientas para resolver problemas utilizando la lógica gracias a mi experiencia en la carrera de Ciencias Físicas en la UBA, cursos de programación y constante interés por aprender nuevas tecnologías</p>
                <p className="mb-3 text-lg max-md:text-base">📌 Aspiro insertarme en el mundo laboral guiado por el trabajo en equipo y el autoaprendizaje</p>
                <p className="text-lg max-md:text-base">🗒️ Para más info puedes ver mi <a className="text-blue-900" href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank">Linkedin</a> o mi <a className="text-blue-900" href="./utils/CV_Alejandro_Portaluppi.pdf" target="_blank">CV</a></p>
            </div>
        </section>
    );
}

export default SobreMi;
