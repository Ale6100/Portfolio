"use strict";

import arrayLetras from "./letras.js"

const waitFor = (time) => { // Hace que tu código asincrónico espere el tiempo (en milisegundos) que le pases como parámetro
    if (typeof time !== "number" || time < 0) throw new Error("waitFor debe recibir un número positivo")
    return new Promise((res, rej) => setTimeout(() => {res()}, time))
}

const contPalabras = document.getElementById("contenedor-palabras")

const frases = ["Full Stack Developer", "Backend Developer", "Frontend Developer", "HTML CSS JavaScript", "MongoDB ExpressJs ReactJS NodeJs"]
const anchoEspacioVacío = 3 // Cantidad de cuadraditos horizontales que representa un espacio vacío entre palabras
const colores = ["rgb(0, 0, 0)", "rgb(255, 0, 0)"]
const tiempoDeVidaCuadradito = 5000 // Esta variable debe ser 10 veces más grande que la de abajo
const tiempoDeVidaCuadraditoVerde = tiempoDeVidaCuadradito/10

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

const cantidadHorizontalDeCuadraditos = Math.max(...cantidadCuadraditosHorizontalesPorFrase)
const cantidadVerticalDeCuadraditos = Math.max(...cantCuadraditosVerticalesPorLetra)

for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
    let fila = ""
    for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
        fila += `<div id="fila-${i}-columna-${j}" class="cuadradito-pixel-art"></div>`
    }
    contPalabras.innerHTML += `<div class="fila-pixel-art">${fila}</div>`
}

const pintarCuadradito = (k, l, timeEnds, color) => { // Pinta el cuadradito con coordenadas (k, l)
    for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
        for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
            if (i===l && j===k) { 
                const casillero = document.getElementById(`fila-${i}-columna-${j}`)
                
                if (color === "rgb(0, 0, 0)") {
                    casillero.classList.add("negro")
                    setTimeout(() => {
                        casillero.classList.remove("negro")
                    }, timeEnds)
                } else {
                    casillero.classList.add("verde")
                    casillero.classList.remove("negro")
                    setTimeout(() => {
                        casillero.classList.remove("verde")
                        casillero.classList.add("negro")
                    }, tiempoDeVidaCuadraditoVerde) // Tiempo de vida de los cuadraditos verdes
                }
            }
        }
    }
} // pintarCuadradito(1, 2, 1000, "rgb(0, 0, 0)")

const pintarLetra = async (coordenadas, dx, color) => { // Pinta una letra en las coordenadas de la letra indicada, según diga el arrayLetras y el espaciado horizontal dx indicado
    let contador = 0
    for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
        for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
            for (let z=0; z<coordenadas.length; z++) {
                if (coordenadas[z].x === j && coordenadas[z].y === i) {
                    pintarCuadradito(j+dx, i, tiempoDeVidaCuadradito, color)
                    contador++
                }
            }
        }
    }
} // pintarLetra(arrayLetras[0].coordenadas, 3, "rgb(0, 0, 0)")

const pintarFrase = async (frase, color) => { // Necesito las coordenadas de cada letra y el color con el que se va a pintar
    let j = 0
    while (true) {
        if (frases[j] !== frase) {
            j++
        } else {
            break
        }
    }
    
    let anchoAcumulado = parseInt((cantidadHorizontalDeCuadraditos - cantidadCuadraditosHorizontalesPorFrase[j])/2)
    for (let i=0; i<frase.length; i++) {
        if (arrayLetras.some(obj => obj.letra === frase[i].toLowerCase())) {
            const letraPixeles = arrayLetras.find(obj => obj.letra === frase[i].toLowerCase())
            await pintarLetra(letraPixeles.coordenadas, anchoAcumulado, color)
            anchoAcumulado+=letraPixeles.ancho+1
        }
        else {
            anchoAcumulado += anchoEspacioVacío
        }
    }
} // pintarFrase(frases[0], "rgb(0, 0, 0)")

const animacionPintarFrase = async (frase, colores) => { // Pinta una frase varias veces con distintos colores
    for (let i=0; i<colores.length; i++) {
        await pintarFrase(frase, colores[i])
        if (i!=colores.length-1) {
            const timeSpaceEvenly = tiempoDeVidaCuadradito/2 - tiempoDeVidaCuadraditoVerde/2 // Tiempo hasta que aparece el cuadradito verde
            await waitFor(timeSpaceEvenly)
            
        } else {
            await waitFor(tiempoDeVidaCuadradito*0.75)
        }
    }
} // animacionPintarFrase(frases[0], colores)

const limpiarTabla = () => { // Quita todos los colores del tablero
    for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
        for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
            const casillero = document.getElementById(`fila-${i}-columna-${j}`)
            casillero.classList.remove("negro")
            casillero.classList.remove("verde")
        }
    }
}

const animacion = async (frases, colores) => { // Muestro todas las frases disponibles
    while (true) {
        for (let i=0; i<frases.length; i++) { 
            const indiceRandom = parseInt(Math.random()*frases.length)
            await animacionPintarFrase(frases[indiceRandom], colores)
            limpiarTabla()
        }
    }
}

animacion(frases, colores)
