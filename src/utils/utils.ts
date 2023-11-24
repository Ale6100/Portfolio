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
