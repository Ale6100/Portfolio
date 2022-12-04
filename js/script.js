"use strict";

import arrayProyectos from "./proyectos.js"
import "./fondoColores.js"
import { animacionFrase, animacionInput, animacionTextArea } from "./utils.js";

const autoText = document.getElementById("autoText") // Etiqueta p donde se va a guardar el texto
const frases = ["Full Stack Developer", "FrontEnd Developer", "BackEnd Developer"]

animacionFrase(autoText, frases)

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
            <a href="${proyecto.linkSitio}" target="_blank">Visitar</a>
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

const inputNombre = document.getElementById("inputNombre")
const contNombre = document.getElementById("container-nombre")
const stringNombre = "Nombre"
animacionInput(inputNombre, contNombre, stringNombre)

const inputEmail = document.getElementById("inputEmail")
const contEmail  = document.getElementById("container-email")
const stringEmail  = "Email"
animacionInput(inputEmail, contEmail, stringEmail)

const textAreaMensaje = document.getElementById("textAreaMensaje")
const contMensaje = document.getElementById("container-textArea")
const stringMensaje = "Mensaje"
animacionTextArea(textAreaMensaje, contMensaje, stringMensaje)

const formContacto = document.getElementById("contenedorContacto")

formContacto.addEventListener("submit", (e) => { // Por ahora el formulario no hace nada
    e.preventDefault()
})
