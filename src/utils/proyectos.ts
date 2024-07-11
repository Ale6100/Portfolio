import { numeroAlAzar } from "./utils"

type TypeProyect = {
    id: number,
    title: string,
    img: string,
    linkGitHub: string,
    linkSitio: string,
    herramientas: string[]
}

const proyectos: TypeProyect[] = [
    {
        id: numeroAlAzar(1, 10000),
        title: 'E-commerce',
        img: "./img/proyecto_full.webp",
        linkGitHub: "https://github.com/Ale6100/Curso-backend.git",
        linkSitio: "https://proyectocompleto.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "NodeJS", "MongoDB", "ExpressJS", "Bycrypt", "Cors", "cookie-parser", "Dotenv", "EJS", "Jsonwebtoken", "Minimist", "Multer", "Nodemailer", "Stripe", "Swagger", "Winston", "ReactJS", "Tailwind", "Vite", "Moment", "Toastify", "copyfiles"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Proyecto Polo IT (en grupo)',
        img: './img/proyecto_polo_it.webp',
        linkGitHub: "https://github.com/Ale6100/Proyecto-Polo-IT.git",
        linkSitio: 'https://proyecto-polo-it.netlify.app',
        herramientas: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'ReactJS', 'NodeJS', 'MongoDB', 'ExpressJS', 'mongoose', 'dotenv', 'winston', 'cors', 'nodemailer', 'react-icons', 'react-router-dom', 'react-toastify', 'styled-components', 'swiper']
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Juego Buscagatos",
        img: "./img/Buscagatos.webp",
        linkGitHub: "https://github.com/Ale6100/Buscagatos_primer_juego_JS.git",
        linkSitio: "https://buscagatos.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "Sweet Alert 2", "Toastify", "@ts-check"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Módulo en npm',
        img: "./img/npm.webp",
        linkGitHub: "https://github.com/Ale6100/codigos-utiles-ap.git",
        linkSitio: "https://www.npmjs.com/package/codigos-utiles-ap",
        herramientas: ["JavaScript", "TypeScript", "NodeJS"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Lista de Notas",
        img: "./img/listaDeNotas.webp",
        linkGitHub: "https://github.com/Ale6100/Lista-de-notas.git",
        linkSitio: "https://lista-de-notas.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "NodeJs", "Tailwind", "Vite", "react-router-dom", "react-toastify", "sweetalert2", "mongoose", "ExpressJS", "cookie-parser", "cors", "dotenv", "jsonwebtoken", "bcrypt", "winston"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Simulador de plazo fijo',
        img: "./img/simuladorPlazoFijo.webp",
        linkGitHub: "https://github.com/Ale6100/Simulador-plazo-fijo.git",
        linkSitio: "https://simuladorplazofijo.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "NodeJs", "Tailwind", "Vite", "echarts", "react-katex", "react-toastify"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Reproductor de videos',
        img: "./img/reproductorDeVideos.webp",
        linkGitHub: "https://github.com/Ale6100/Reproductor-de-videos.git",
        linkSitio: "https://reproductordevideos.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "NodeJS", "Tailwind", "Vite", "Framer Motion", "Lodash"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Sala de chat',
        img: "./img/salaDeChat.webp",
        linkGitHub: "https://github.com/Ale6100/Chat-js.git",
        linkSitio: "https://chat-ts.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "MongoDB", "Socket.io", "ExpressJS", "NodeJS", "EJS", "dotenv", "winston", "cors", "ReactJS", "Vite", "Tailwind", "Toastify", "Sweet Alert 2", "copyfiles"]
    },
    {
        id: numeroAlAzar(1, 10000),
        title: 'Asistente Virtual',
        img: './img/asistenteVirtual.svg',
        linkGitHub: "https://github.com/Ale6100/Asistente-Virtual-Python.git",
        linkSitio: "https://github.com/Ale6100/Asistente-Virtual-Python.git",
        herramientas: ['Python', 'venv', 'Tkinter', 'pyinstaller', 'pyttsx3', 'SpeechRecognition', 'PyAudio', 'y muchos más...']
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Juego Lucy",
        img: "./img/juegoLucy.webp",
        linkGitHub: "https://github.com/Ale6100/Lucy.git",
        linkSitio: "https://lucy-ia.netlify.app/",
        herramientas: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "NodeJS", "Tailwind", "Vite", "react-router-dom"]
    }
]

export default proyectos
