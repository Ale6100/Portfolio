import { useEffect, useRef, useState } from "react"

const NavBar = () => {
    const [ navBarRespVisible, setNavBarRespVisible ] = useState(false)

    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const divContainer = buttonRef.current;

        const div1 = divContainer?.children[0]
        const div2 = divContainer?.children[1]
        const div3 = divContainer?.children[2]

        if (!div1 || !div2 || !div3) return;

        if (navBarRespVisible) {
            div1.classList.replace("rotate-0", "rotate-45")
            div1.classList.replace("scale-1", "scale-[1.41421356237]")
            div1.classList.replace("translate-y-0", "translate-y-[14px]")

            div2.classList.replace("scale-1", "scale-0")

            div3.classList.replace("rotate-0", "-rotate-45")
            div3.classList.replace("scale-1", "scale-[1.41421356237]")
            div3.classList.replace("translate-y-0", "translate-y-[-14px]")
        } else {
            div1.classList.replace("rotate-45", "rotate-0")
            div1.classList.replace("scale-[1.41421356237]", "scale-1")
            div1.classList.replace("translate-y-[14px]", "translate-y-0")

            div2.classList.replace("scale-0", "scale-1")

            div3.classList.replace("-rotate-45", "rotate-0")
            div3.classList.replace("scale-[1.41421356237]", "scale-1")
            div3.classList.replace("translate-y-[-14px]", "translate-y-0")
        }
    }, [navBarRespVisible])

    return (
        <header className="sticky z-30 top-0 h-12 text-xl flex flex-col justify-center border-black border-b max-md:items-end max-md:flex-row">
            <nav className={`nav-tv-blur max-md:top-12 max-md:fixed max-md:z-40 max-md:w-[33vw] ${navBarRespVisible ? "max-md:right-0" : "max-md:right-[100vw]"} max-md:p-1 max-md:rounded-bl-md max-md:border-b-2 max-md:border-l-2 max-md:border-blue-600 max-md:bg-blue-400 transition-all duration-200`}>
                <ul className="h-full items-center flex justify-evenly text-center max-md:h-56 max-md:flex-col max-md:ulResponsive">
                    <li><a href="#sobreMi">Sobre mí</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#tecnologias">Tecnologías</a></li>
                    <li><a href="#estudios">Estudios</a></li>
                    <li><a href="#experiencia">Experiencia</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>

            <div className={`custom-blur md:hidden top-12 z-30 fixed ${navBarRespVisible ? "right-0" : "right-[100vw]"} w-screen h-screen transition-all duration-200`}></div>

            <div className="header-responsive-container flex-1 h-full flex justify-end items-center md:hidden">
                <div ref={buttonRef} onClick={() => setNavBarRespVisible(!navBarRespVisible)} className='p-0 z-30 h-7 w-7 hidden max-md:flex mr-4 flex-col justify-between cursor-pointer select-none'>
                    <div className="transition-all duration-200 h-0 outline outline-1 rotate-0 scale-1 translate-y-0"></div>
                    <div className="transition-all duration-200 h-0 outline outline-1 scale-1"></div>
                    <div className="transition-all duration-200 h-0 outline outline-1 rotate-0 scale-1 translate-y-0"></div>
                </div>
            </div>
        </header>
    )
}

export default NavBar
