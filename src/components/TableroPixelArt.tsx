import { useEffect, useState } from 'react';
import arrayLetras from "../utils/arrayLetras.js"
import { waitFor, deCeroAN } from '../utils/utils.js';

interface TableroPixelArtProps {
    cantidadVerticalDeCuadraditos: number;
    cantidadHorizontalDeCuadraditos: number;
    frases: string[];
    cantidadCuadraditosHorizontalesPorFrase: number[];
    anchoEspacioVacio: number;
}

const TableroPixelArt = ({ cantidadVerticalDeCuadraditos, cantidadHorizontalDeCuadraditos, frases, cantidadCuadraditosHorizontalesPorFrase, anchoEspacioVacio }: TableroPixelArtProps) => {   
    const [ montado, setMontado ] = useState(false);

    const filaIndices = deCeroAN(cantidadVerticalDeCuadraditos)
    const colores = ["rgb(0, 0, 0)", "rgb(255, 0, 0)"]
    const tiempoDeVidaCuadradito = 5000 // Esta variable debe ser 10 veces más grande que la de abajo
    const tiempoDeVidaCuadraditoVerde = tiempoDeVidaCuadradito/10

    const pintarCuadradito = (k: number, l: number, timeEnds: number, color: string) => { // Pinta el cuadradito con coordenadas (k, l)
        for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
            for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
                if (i===l && j===k) { 
                    const casillero = document.getElementById(`fila-${i}-columna-${j}`)
                    if (casillero) {
                        if (color === "rgb(0, 0, 0)") {
                            casillero.classList.add("bgBlack")
                            setTimeout(() => {
                                casillero.classList.remove("bgBlack")
                            }, timeEnds)
                        } else {
                            casillero.classList.add("bgGreen")
                            casillero.classList.remove("bgBlack")
                            setTimeout(() => {
                                casillero.classList.remove("bgGreen")
                                casillero.classList.add("bgBlack")
                            }, tiempoDeVidaCuadraditoVerde) // Tiempo de vida de los cuadraditos verdes
                        }
                    }
                }
            }
        }
    }

    const pintarLetra = async (coordenadas: any[], dx: number, color: string) => { // Pinta una letra en las coordenadas de la letra indicada, según diga el arrayLetras y el espaciado horizontal dx indicado
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
    }

    const pintarFrase = async (frase: string, color: string) => { // Necesito las coordenadas de cada letra y el color con el que se va a pintar
        let j = 0
        while (true) {
            if (frases[j] !== frase) {
                j++
            } else {
                break
            }
        }
        
        let anchoAcumulado = Math.floor((cantidadHorizontalDeCuadraditos - cantidadCuadraditosHorizontalesPorFrase[j])/2)
        for (let i=0; i<frase.length; i++) {
            if (arrayLetras.some(obj => obj.letra === frase[i].toLowerCase())) {
                const letraPixeles = arrayLetras.find(obj => obj.letra === frase[i].toLowerCase())
                if (letraPixeles) {
                    await pintarLetra(letraPixeles.coordenadas, anchoAcumulado, color)
                    anchoAcumulado+=letraPixeles.ancho+1
                }
            }
            else {
                anchoAcumulado += anchoEspacioVacio
            }
        }
    }

    const animacionPintarFrase = async (frase: string, colores: string[]) => { // Pinta una frase varias veces con distintos colores
        for (let i=0; i<colores.length; i++) {
            await pintarFrase(frase, colores[i])
            if (i!=colores.length-1) {
                const timeSpaceEvenly = tiempoDeVidaCuadradito/2 - tiempoDeVidaCuadraditoVerde/2 // Tiempo hasta que aparece el cuadradito verde
                await waitFor(timeSpaceEvenly)
                
            } else {
                await waitFor(tiempoDeVidaCuadradito*0.75)
            }
        }
    }

    const limpiarTabla = () => { // Quita todos los colores del tablero
        for (let i=0; i<cantidadVerticalDeCuadraditos; i++) {
            for (let j=0; j<cantidadHorizontalDeCuadraditos; j++) {
                const casillero = document.getElementById(`fila-${i}-columna-${j}`)
                casillero?.classList.remove("bgBlack", "bgGreen")
            }
        }
    }

    const animacion = async (frases: string[], colores: string[]) => { // Muestro todas las frases disponibles
        while (true) {
            for (let i=0; i<frases.length; i++) { 
                const indiceRandom = Math.floor(Math.random()*frases.length)
                await animacionPintarFrase(frases[indiceRandom], colores)
                limpiarTabla()
            }
        }
    }
    
    useEffect(() => {
        if (montado) animacion(frases, colores)
        setMontado(true)
    }, [montado]);

    interface FilaProps {
        i: number,
        cantidadHorizontalDeCuadraditos: number
    }

    const Fila = ({ i, cantidadHorizontalDeCuadraditos }: FilaProps) => {
        const columnaIndices = deCeroAN(cantidadHorizontalDeCuadraditos)

        return (
            <div className="flex justify-center">
                {columnaIndices.map((j) => (
                    <div key={j} id={`fila-${i}-columna-${j}`} className="p-0 w-1 h-1 duration-700 transition-all"></div>
                ))}
            </div>
        )
    }

    return (
        <>
            {filaIndices.map((i) => (
                <Fila key={i} i={i} cantidadHorizontalDeCuadraditos={cantidadHorizontalDeCuadraditos}/>
            ))}
        </>
    )
}

export default TableroPixelArt;
