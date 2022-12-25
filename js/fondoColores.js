"use strict";

import { waitFor } from "./utils.js"

const colorOriginal = "rgb(190, 190, 255)" // Color de fondo

const contenedor = document.getElementById("contenedor-fondoColores")

const cantidadHorizontalDeCuadraditos = 10
const cantidadVerticalDeCuadraditos = 20

let fila
for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
    fila = ""
    for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
        fila += `<div class="cuadradito"></div>`
    }
    contenedor.innerHTML += `<div class="fila">${fila}</div>`
}

const colorRandom = () => { // Color random donde el azul predomine
    const red = Math.floor(Math.random()*256)
    const green = Math.floor(Math.random()*256)
    return `rgb(${red}, ${green}, 255)`
}

contenedor.style.setProperty('background-color', `${colorOriginal}`)

const cuadraditos = document.querySelectorAll(".cuadradito")
cuadraditos.forEach(async cuadradito => { // Prende y apaga muchas pelotitas de colores en el fondo de pantalla
    while (true) {
        await waitFor(Math.random()*3600000)
        const colorRandom_ = colorRandom()
        cuadradito.style.setProperty("box-shadow", `0px 0px 5px 1px ${colorRandom_}`)
        cuadradito.style.setProperty('background-color', `${colorRandom_}`)
        await waitFor(1000)
        cuadradito.style.setProperty("box-shadow", "none")
        cuadradito.style.setProperty('background-color', `${colorOriginal}`)
    }
})
