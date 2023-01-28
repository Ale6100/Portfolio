export const waitFor = (time) => { // Hace que tu código asincrónico espere el tiempo (en milisegundos) que le pases como parámetro
    if (typeof time !== "number" || time < 0) throw new Error("waitFor debe recibir un número positivo")
    return new Promise((res, rej) => setTimeout(() => {res()}, time))
}

export const deCeroAN = (n) => { // Array que inicia en 0 y termina en N
    const array = []
    for (let i=0; i<n; i++) {
        array.push(i)
    }
    return array
}
