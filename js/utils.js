const waitFor = (time) => { // Hace que tu código asincrónico espere el tiempo (en milisegundos) que le pases como parámetro
    if (typeof time !== "number" || time < 0) throw new Error("waitFor debe recibir un número positivo")
    return new Promise((resolve, reject) => setTimeout(resolve, time))
}

const animacionFrase = async (html, frases) => { // Escribe y borra frases de un array en una etiqueta del html
    while (true) {
        for (let frase of frases) {
            for (let letra of frase) { // Coloco lentamente las letras de una frase
                html.textContent += `${letra}`
                await waitFor(100)
            }
            await waitFor(2000)
    
            for (let letra of frase) { // Borro lentamente las letras
                const texto = html.textContent
                html.textContent = texto.substr(0, texto.length-1)
                await waitFor(100)
            }
        }
    }
}

const animacionInput = (htmlInput, htmlContPalabra, stringPalabra) => { // Activa una animación en el input que hace que un pseudo "placeholder" se mueva para arriba cuando clickeamos sobre un input
    for (let i=0; i<stringPalabra.length; i++) {
        htmlContPalabra.innerHTML += ` <span class="letrasColor" style="transition: all ${i*0.1}s">${stringPalabra[i]}</span>`
    }
    const marginBottomLabelForm = "35px"
    htmlInput.parentNode.style.setProperty("margin-bottom", marginBottomLabelForm)

    const contPalabraHijos = htmlContPalabra.children
    htmlInput.addEventListener("focusin", () => {
        for (let i=0; i<contPalabraHijos.length; i++) {
            contPalabraHijos[i].classList.add("letrasArriba")
            htmlInput.style.setProperty("border", "0px solid rgb(0, 0, 255)")
            htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 255)")
        }
    })
    
    htmlInput.addEventListener("focusout", () => {
        if (!htmlInput.value.trim()) {
            for (let i=0; i<contPalabraHijos.length; i++) {
                contPalabraHijos[i].classList.remove("letrasArriba")
                htmlInput.style.setProperty("border", "0px solid rgb(0, 0, 0)")
                htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 0)")
                htmlInput.parentNode.style.setProperty("margin-bottom", marginBottomLabelForm)
            }
        } else {
            htmlInput.parentNode.style.setProperty("margin-bottom", "50px")
        }
    })
}

const animacionTextArea = (htmlInput, htmlContPalabra, stringPalabra) => { // Análogo a animacionInput pero con el text area que representa al campo donde se escribe el mensaje
    for (let i=0; i<stringPalabra.length; i++) {
        htmlContPalabra.innerHTML += ` <span class="letrasColor" style="transition: all ${i*0.1}s">${stringPalabra[i]}</span>`
    }

    const contPalabraHijos = htmlContPalabra.children
    htmlInput.addEventListener("focusin", () => {
        for (let i=0; i<contPalabraHijos.length; i++) {
            contPalabraHijos[i].classList.add("letrasArriba")
            htmlInput.style.setProperty("border", "0px solid rgb(0, 0, 255)")
            htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 255)")
        }
    })
    
    htmlInput.addEventListener("focusout", () => {
        if (!htmlInput.value.trim()) {
            for (let i=0; i<contPalabraHijos.length; i++) {
                contPalabraHijos[i].classList.remove("letrasArriba")
                htmlInput.style.setProperty("border", "0px solid rgb(0, 0, 0)")
                htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 0)")
            }
        }
    })
}

export {
    waitFor,
    animacionFrase,
    animacionInput,
    animacionTextArea
}
