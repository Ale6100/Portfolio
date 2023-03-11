import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { PersonalContext } from "./PersonalContext";

const activarScroll = (claseScroll) => { // Conecta las etiquetas de las nav con las de las secciones mediante un scroll animado
    const [ etiquetaEnlace1, etiquetaEnlace2, etiquetaDestino ] = document.querySelectorAll(claseScroll)

    etiquetaEnlace1.addEventListener("click", () => {
        window.scrollTo({
            top: etiquetaDestino.offsetTop,
            behavior: "smooth"
        })
    })
    etiquetaEnlace2.addEventListener("click", () => {
        window.scrollTo({
            top: etiquetaDestino.offsetTop,
            behavior: "smooth"
        })
    })
}

const NavBar = () => {
    const { sobreMiMontado, proyectosMontado, tecnologiasMontado, misEstudios, experiencia, contactoMontado } = useContext(PersonalContext);
    
    const [ navBarRespVisible, setNavBarRespVisible ] = useState(false)

    useEffect(() => { // Activa los scroll, pero antes debe asegurarse de que las secciones existan
        if (sobreMiMontado) activarScroll(".scroolToSobreMi")
        if (proyectosMontado) activarScroll(".scroolToProyectos")
        if (tecnologiasMontado) activarScroll(".scroolToTecnologias")
        if (misEstudios) activarScroll(".scroolToMisEstudios")
        if (experiencia) activarScroll(".scroolToExperiencia")
        if (contactoMontado) activarScroll(".scroolToContacto")

        const fondoDifuminado = document.getElementById(`fondoDifuminadoResponsive`)
        fondoDifuminado.style.setProperty("backdrop-filter", "blur(3px)")
        fondoDifuminado.style.setProperty("filter", "brightness(75%)")
    }, [sobreMiMontado, proyectosMontado, tecnologiasMontado, misEstudios, experiencia, contactoMontado]);

    useEffect(() => { 
        const navBarResponsive = document.querySelector(".navResponsive");
        const fondoDifuminado = document.getElementById(`fondoDifuminadoResponsive`)
        const botonNavBar = document.getElementById("botonNavBar")
        const anchoBotonNavBar = botonNavBar.offsetWidth

        if (navBarRespVisible) { // Comportamiento de la "navbar responsive", fondo difuminado, y el botón cuando dicha navbar es visible o no
            navBarResponsive.style.setProperty("transform", "translateX(-100vw)") // Hacemos que la navbar pequeña y el fondo se vean
            fondoDifuminado.style.setProperty("transform", "translateX(-120vw)")

            botonNavBar.children[0].style.setProperty("transform", `translate(0vw, ${Math.round(anchoBotonNavBar)/2}px) rotate(45deg) scale(1.41421356237)`) // Hacemos aparecer la X
            botonNavBar.children[1].style.setProperty("transform", "scale(0)")
            botonNavBar.children[2].style.setProperty("transform", `translate(0vw, ${Math.round(-anchoBotonNavBar)/2}px) rotate(-45deg) scale(1.41421356237)`)
        
        } else if (!navBarRespVisible) {
            navBarResponsive.style.setProperty("transform", "translateX(0vw)")
            fondoDifuminado.style.setProperty("transform", "translateX(0vw)")

            botonNavBar.children[0].style.setProperty("transform", `translate(0vw, 0px) rotate(0) scale(1)`)
            botonNavBar.children[1].style.setProperty("transform", "scale(1)")
            botonNavBar.children[2].style.setProperty("transform", `translate(0vw, 0px) rotate(0) scale(1)`)
        }
        
    }, [navBarRespVisible])

    return (
        <>
        <header className="sticky z-50 h-12 top-0 w-full text-xl flex flex-col justify-center border-black border-b max-md:items-end">            
            <div id="botonNavBar" onClick={() => setNavBarRespVisible(!navBarRespVisible)} className='p-0 h-7 w-7 hidden max-md:flex mr-4 flex-col justify-between cursor-pointer select-none'>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
            </div>

            <nav className="w-full max-md:hidden"> {/* Por problemas relacionados a tailwind tuve que separar las nav */}
                <ul className="flex justify-evenly w-full h-full text-center">
                    <li className="scroolToSobreMi">Sobre mí</li>
                    <li className="scroolToProyectos">Proyectos</li>
                    <li className="scroolToTecnologias">Tecnologias</li>
                    <li className="scroolToMisEstudios">Estudios</li>
                    <li className="scroolToExperiencia">Experiencia</li>
                    <li className="scroolToContacto">Contacto</li>
                </ul>
            </nav>
        </header>

        <div id="fondoDifuminadoResponsive" onClick={() => setNavBarRespVisible(!navBarRespVisible)} className={`md:hidden fixed z-20 left-[120vw] w-screen h-screen transition-all duration-200`}></div>
        
        <nav className="w-[33vw] right-[-100vw] p-1 navResponsive md:hidden fixed z-30 rounded-bl-md bg-blue-400 border-l-2 border-b-2 border-blue-600 transition-all duration-200">
            <ul className="flex justify-evenly w-full h-56 flex-col ulResponsive">
                <li className="scroolToSobreMi">Sobre mí</li>
                <li className="scroolToProyectos">Proyectos</li>
                <li className="scroolToTecnologias">Tecnologias</li>
                <li className="scroolToMisEstudios">Estudios</li>
                <li className="scroolToExperiencia">Experiencia</li>
                <li className="scroolToContacto">Contacto</li>
            </ul>
        </nav>
        </>
    );
}

export default NavBar;
