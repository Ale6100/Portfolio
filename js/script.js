import arrayProyectos from "./proyectos.js"

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
