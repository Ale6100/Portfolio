export const waitFor = (time: number): Promise<void> => {
    if (typeof time !== "number" || time < 0) throw new Error(`waitFor debe recibir un número positivo (en milisegundos). Se ha recibido ${JSON.stringify(time)} (${typeof time})`)
    return new Promise((resolve) => setTimeout(resolve, time))
}

export const deCeroAN = (n: number): number[] => { // Array que inicia en 0 y termina en N
    const array = []
    for (let i=0; i<n; i++) {
        array.push(i)
    }
    return array
}

export const numeroAlAzar = (num1: number, num2: number): number => {
    const randomAmpliado = Math.random()*(num2-num1) //  Número al azar entre 0 y (num2-num1) (este último sin incluir)
    return num1 + randomAmpliado // Desplazo el rango para que inicie donde inicia el número más pequeño (num1)
}
