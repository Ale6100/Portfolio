import { numeroAlAzar } from "./utils"

type tec = {
    id: number,
    title: string,
    img: string,
    alt: string,
    link: string,
    fontSize?: string
}

const tecnologias: tec[] = [
    {
        id: numeroAlAzar(1, 10000),
        title: "HTML",
        img: "https://img.icons8.com/color/100/null/html-5--v1.png",
        alt: "HTML icon",
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "CSS",
        img: "./img/cssLogo.svg",
        alt: "CSS icon",
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Tailwindcss",
        img: "https://img.icons8.com/color/100/null/tailwindcss.png",
        alt: "Tailwindcss icon",
        link: "https://tailwindcss.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "JavaScript",
        img: "https://img.icons8.com/color/100/null/javascript--v1.png",
        alt: "JavaScript icon",
        link: "https://www.javascript.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Typescript",
        img: "https://img.icons8.com/color/100/null/typescript.png",
        alt: "Typescript icon",
        link: "https://www.typescriptlang.org/",
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "SQL",
        img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png",
        alt: "SQL icon",
        link: "https://support.microsoft.com/es-es/office/access-sql-conceptos-b%C3%A1sicos-vocabulario-y-sintaxis-444d0303-cde1-424e-9a74-e8dc3e460671#:~:text=las%20consultas%3A%20UNION-,%C2%BFQu%C3%A9%20es%20SQL%3F,SQL%20para%20trabajar%20con%20datos."
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "MongoDB",
        img: "https://img.icons8.com/color/100/null/mongodb.png",
        alt: "MongoDB icon",
        link: "https://www.mongodb.com/home"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "ExpressJS",
        img: "https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png",
        alt: "ExpressJS icon",
        link: "https://expressjs.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "ReactJS",
        img: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/null/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
        alt: "ReactJS icon",
        link: "https://reactjs.org/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "NodeJS",
        img: "https://img.icons8.com/color/100/null/nodejs.png",
        alt: "NodeJS icon",
        link: "https://nodejs.org/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Vite",
        img: "https://vitejs.dev/logo.svg",
        alt: "Vite icon",
        link: "https://vitejs.dev/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "NestJS",
        img: "https://img.icons8.com/color/100/null/nestjs.png",
        alt: "NestJS icon",
        link: "https://nestjs.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "C#",
        img: "./img/csharpLogo.webp",
        alt: "C# icon",
        link: "https://learn.microsoft.com/en-us/dotnet/csharp/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Entity Fw",
        img: "./img/EntityFramework.webp",
        alt: "Entity Framework icon",
        link: "https://docs.microsoft.com/en-us/ef/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "PHP",
        img: "./img/php.svg",
        alt: "PHP icon",
        link: "https://www.php.net/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Git",
        img: "https://img.icons8.com/color/100/null/git.png",
        alt: "Git icon",
        link: "https://git-scm.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "GitHub",
        img: "https://img.icons8.com/ios-glyphs/100/undefined/github.png",
        alt: "GitHub icon",
        link: "https://github.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "GitLab",
        img: "https://img.icons8.com/color/100/null/gitlab.png",
        alt: "GitLab icon",
        link: "https://about.gitlab.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Docker",
        img: "./img/docker.webp",
        alt: "Docker icon",
        link: "https://docs.docker.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Python",
        img: "https://img.icons8.com/color/100/000000/python--v1.png",
        alt: "Python icon",
        link: "https://www.python.org/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Yii 2",
        img: "./img/yii.svg",
        alt: "Yii 2 icon",
        link: "https://www.yiiframework.com/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "XAMPP",
        img: "./img/xampp.svg",
        alt: "XAMPP icon",
        link: "https://www.apachefriends.org/"
    },
    {
        id: numeroAlAzar(1, 10000),
        title: "Bootstrap",
        img: "https://img.icons8.com/color/100/null/bootstrap.png",
        alt: "Bootstrap icon",
        link: "https://getbootstrap.com/"
    }
]

export default tecnologias
