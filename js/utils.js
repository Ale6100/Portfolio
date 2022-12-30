const waitFor = (time) => { // Hace que tu código asincrónico espere el tiempo (en milisegundos) que le pases como parámetro
    if (typeof time !== "number" || time < 0) throw new Error("waitFor debe recibir un número positivo")
    return new Promise((resolve, reject) => setTimeout(resolve, time))
}

const subirLetras = (contPalabraHijos, htmlInput) => {
    for (let i=0; i<contPalabraHijos.length; i++) {
        contPalabraHijos[i].classList.add("letrasArriba")
        htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 255)")
    }
}

const animacionInput = (htmlInput, htmlContPalabra, stringPalabra) => { // Activa una animación en el input que hace que un pseudo "placeholder" se mueva para arriba cuando clickeamos sobre un input
    for (let i=0; i<stringPalabra.length; i++) {
        htmlContPalabra.innerHTML += ` <span class="letrasAnimadas" style="transition: all ${i*0.1}s">${stringPalabra[i]}</span>`
        if (i !== 0) htmlInput.parentNode.style.setProperty("margin-bottom", "35px")
    }

    const contPalabraHijos = htmlContPalabra.children
    htmlInput.addEventListener("focusin", () => {
        subirLetras(contPalabraHijos, htmlInput)
    })

    htmlInput.addEventListener("change", (e) => {
        if (htmlInput.value.trim()) {
            subirLetras(contPalabraHijos, htmlInput)
            if (e.path[0].id !== "Nombre") htmlInput.parentNode.style.setProperty("margin-top", "20px")
        }
    })
    
    htmlInput.addEventListener("focusout", (e) => {
        if (!htmlInput.value.trim()) {
            for (let i=0; i<contPalabraHijos.length; i++) {
                contPalabraHijos[i].classList.remove("letrasArriba")
                htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 0)")
                if (i !== 0) htmlInput.parentNode.style.setProperty("margin-top", "0px")
            }
        } else {
            if (e.path[0].id !== "Nombre") htmlInput.parentNode.style.setProperty("margin-top", "20px")
        }
    })
}

const animacionTextArea = (htmlInput, htmlContPalabra, stringPalabra) => { // Análogo a animacionInput pero con el text area que representa al campo donde se escribe el mensaje
    for (let i=0; i<stringPalabra.length; i++) {
        htmlContPalabra.innerHTML += ` <span class="letrasAnimadas" style="transition: all ${i*0.1}s">${stringPalabra[i]}</span>`
    }

    const contPalabraHijos = htmlContPalabra.children
    htmlInput.addEventListener("focusin", () => {
        subirLetras(contPalabraHijos, htmlInput)
    })

    htmlInput.addEventListener("change", (e) => {
        if (htmlInput.value.trim()) {
            subirLetras(contPalabraHijos, htmlInput)
            if (e.path[0].id !== "inputTextArea") htmlInput.parentNode.style.setProperty("margin-top", "20px")
        }
    })
    
    htmlInput.addEventListener("focusout", (e) => {
        if (!htmlInput.value.trim()) {
            for (let i=0; i<contPalabraHijos.length; i++) {
                contPalabraHijos[i].classList.remove("letrasArriba")
                htmlInput.style.setProperty("border-bottom", "2px solid rgb(0, 0, 0)")
                if (i !== 0) htmlInput.parentNode.style.setProperty("margin-top", "0px")
            }
        } else {
            if (e.path[0].id !== "inputTextArea") htmlInput.parentNode.style.setProperty("margin-top", "20px")
        }
    })
}

const scrollTo = (enlace, destino) => { // Cuando se presiona sobre un enlace en particular se desplaza con una animación a la etiqueta destino deseado (es mejor que el scroll-behavior: smooth clásico de CSS)
    enlace.addEventListener("click", () => {
        window.scrollTo({
            top: destino.offsetTop,
            behavior: "smooth"
        })
    })
}

export {
    waitFor,
    animacionInput,
    animacionTextArea,
    scrollTo
}
