"use strict";

import arrayProyectos from "./proyectos.js"
import "./fondoColores.js"
import { animacionInput, animacionTextArea, scrollTo } from "./utils.js";
import "./autoTextPixelArt/autoTextPixelArt.js"
import arrayTecnologias from "./tecnologias.js"

const proyectos = document.getElementById("contenedorProyectos")

arrayProyectos.forEach((proyecto, index) => {
    proyectos.innerHTML += `
    <div class="proyecto-carta">
        <p class="proyecto-titulo">${proyecto.titulo}</p>
        
        <div class="proyecto-div-imagen">
            <div>
                <img class="proyecto-imagen" src="${proyecto.img}">
            </div>

            <img class="proyecto-icono pe-${index}" src="https://img.icons8.com/ios-filled/50/null/support.png">
        </div>

        <p class="proyecto-descripcion">${proyecto.descripcion}</p>

        <div class="proyecto-enlaces">
            <a href="${proyecto.linkSitio}" class="${proyecto.linkSitio.includes("chat") && "tippyChat"}" target="_blank">Visitar</a>
            <a href="${proyecto.linkGitHub}" target="_blank">GitHub</a>
        </div>
    </div>
    `
})

arrayProyectos.forEach((proyecto, index) => {
    let htmlContent = ""
    proyecto.herramientas.forEach(h => {
        htmlContent += `<p>${h}</p>`
    })

    tippy(`.pe-${index}`, {
        content: `<div class="htmlContent">${htmlContent}</div>`,
        allowHTML: true,
        placement: 'top',
        arrow: true,
        interactive: true,
        delay: 0,
        followCursor: false,
        hideOnClick: false,
        interactiveBorder: 10,
        interactiveDebounce: 0,
        moveTransition: '',
        offset: [0, 15],
        showOnCreate: false,
        touch: ['hold', 500],
        trigger: 'mouseenter focus',
    });
})

tippy(".tippyChat", {
    content: `Debido al sitio gratuito donde está subido, la primera vez que entres vas a tener que esperar aproximadamente 20 segundos hasta que abra`,
    placement: 'top',
    arrow: true,
    interactive: true,
    delay: 0,
    followCursor: false,
    hideOnClick: false,
    interactiveBorder: 10,
    interactiveDebounce: 0,
    moveTransition: '',
    offset: [0, 15],
    showOnCreate: false,
    touch: ['hold', 500],
    trigger: 'mouseenter focus',
});

const Nombre = document.getElementById("Nombre")
const contNombre = document.getElementById("container-nombre")
const stringNombre = "Nombre"
animacionInput(Nombre, contNombre, stringNombre)

const Email = document.getElementById("Email")
const contEmail  = document.getElementById("container-email")
const stringEmail  = "Email"
animacionInput(Email, contEmail, stringEmail)

const Mensaje = document.getElementById("Mensaje")
const contMensaje = document.getElementById("container-textArea")
const stringMensaje = "Mensaje"
animacionTextArea(Mensaje, contMensaje, stringMensaje)

const formContacto = document.getElementById("contenedorContacto")

formContacto.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = new FormData(formContacto)
    
    const obj = {}
    form.forEach((value, key) => obj[key] = value)

    const response = await fetch("https://servidor-backend-personal-ap.netlify.app/.netlify/functions/api/SendMail", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Accept": "application/json"
        }
    }).then(res => res.json())
    
    if (response.status === "sucess") {
        formContacto.reset()
        Swal.fire({
            icon: 'success',
            title: 'Enviado'
        })
    }
})

const [ aSobreMi, destinoSobreMi ] = document.querySelectorAll(".classSobreMi")
const [ aSeccionProyectos, destinoSeccionProyectos ] = document.querySelectorAll(".classSeccionProyectos")
const [ aSeccionTecnologias, destinoSeccionTecnologias ] = document.querySelectorAll(".classSeccionTecnologias")
const [ aSeccionContacto, destinoSeccionContacto ] = document.querySelectorAll(".classSeccionContacto")

scrollTo(aSobreMi, destinoSobreMi)
scrollTo(aSeccionProyectos, destinoSeccionProyectos)
scrollTo(aSeccionTecnologias, destinoSeccionTecnologias)
scrollTo(aSeccionContacto, destinoSeccionContacto)

const tecnologias = document.getElementById("principalesTecnologias")
const tecnologiasSecundarias = document.getElementById("tecnologiasSecundarias")

arrayTecnologias.forEach(tecnologia => {
    if (tecnologia.priority) {
        tecnologias.innerHTML += `
        <div>
            <a class="aTecnologias" href=${tecnologia.link} target="_blank">
                <div>
                    <img src=${tecnologia.img} alt=${tecnologia.alt}>
                </div>
                
                <p>${tecnologia.title}</p>
            </a>
        </div>
        `
    } else {
        tecnologiasSecundarias.innerHTML += `
        <div>
            <a class="aTecnologias" href=${tecnologia.link} target="_blank">
                <div>
                    <img src=${tecnologia.img} alt=${tecnologia.alt}>
                </div>
                
                <p>${tecnologia.title}</p>
            </a>
        </div>
        `
    }
})

const botonNavBar = document.getElementById("botonNavBar")
const ul = document.querySelector("nav ul")
const divFondo = document.querySelector(".fondo")

const removerNavBar = () => {
    ul.classList.remove("navVisible")
    botonNavBar.children[0].classList.remove("rotarHorario")
    botonNavBar.children[1].classList.remove("desaparecer")
    botonNavBar.children[2].classList.remove("rotarAntiHorario")
    divFondo.classList.remove("verFondo")
}

botonNavBar.addEventListener("click", () => { // Animo la navbar responsive
    if (!ul.classList.contains("navVisible")) {
        ul.classList.add("navVisible")
        botonNavBar.children[0].classList.add("rotarHorario")
        botonNavBar.children[1].classList.add("desaparecer")
        botonNavBar.children[2].classList.add("rotarAntiHorario")
        divFondo.classList.add("verFondo") // Agrego un fondo difuminado
    } else {
        removerNavBar()
    }
})

divFondo.addEventListener("click", () => { // Cuando se hace click sobre el fondo difuminado, se va la nav
    removerNavBar()
})
