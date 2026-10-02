// content\technologies.ts

export const categorias = ["Lenguajes", "Frontend", "Backend", "Bases de datos", "Herramientas"] as const

type Categoria = typeof categorias[number]

type tec = {
  title: string,
  img: string,
  link: string,
  categoria: Categoria,
  /** Para íconos oscuros que no se distinguirían sobre el fondo del modo oscuro */
  invertirEnOscuro?: boolean
}

const tecnologias: tec[] = [
  {
    title: "HTML",
    img: "https://img.icons8.com/color/100/null/html-5--v1.png",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    categoria: "Lenguajes"
  },
  {
    title: "CSS",
    img: "/img/logo/cssLogo.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    categoria: "Lenguajes"
  },
  {
    title: "Tailwind CSS",
    img: "https://img.icons8.com/color/100/null/tailwindcss.png",
    link: "https://tailwindcss.com/",
    categoria: "Frontend"
  },
  {
    title: "JavaScript",
    img: "https://img.icons8.com/color/100/null/javascript--v1.png",
    link: "https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript",
    categoria: "Lenguajes"
  },
  {
    title: "TypeScript",
    img: "https://img.icons8.com/color/100/null/typescript.png",
    link: "https://www.typescriptlang.org/",
    categoria: "Lenguajes"
  },
  {
    title: "SQL Server",
    img: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg",
    link: "https://www.microsoft.com/en-us/sql-server",
    categoria: "Bases de datos"
  },
  {
    title: 'MySQL',
    img: "https://img.icons8.com/color/100/null/mysql.png",
    link: "https://www.mysql.com/",
    categoria: "Bases de datos"
  },
  {
    title: "ExpressJS",
    img: "https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png",
    link: "https://expressjs.com/",
    categoria: "Backend",
    invertirEnOscuro: true
  },
  {
    title: "ReactJS",
    img: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/null/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
    link: "https://reactjs.org/",
    categoria: "Frontend"
  },
  {
    title: "NodeJS",
    img: "https://img.icons8.com/color/100/null/nodejs.png",
    link: "https://nodejs.org/",
    categoria: "Backend"
  },
  {
    title: "Vite",
    img: "https://vitejs.dev/logo.svg",
    link: "https://vitejs.dev/",
    categoria: "Herramientas"
  },
  {
    title: "NestJS",
    img: "https://img.icons8.com/color/100/null/nestjs.png",
    link: "https://nestjs.com/",
    categoria: "Backend"
  },
  {
    title: "C#",
    img: "/img/logo/csharpLogo.webp",
    link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    categoria: "Lenguajes"
  },
  {
    title: "Entity Framework",
    img: "/img/logo/EntityFramework.webp",
    link: "https://docs.microsoft.com/en-us/ef/",
    categoria: "Backend"
  },
  {
    title: "PHP",
    img: "https://img.icons8.com/color/100/null/php.png",
    link: "https://www.php.net/",
    categoria: "Lenguajes"
  },
  {
    title: "Git",
    img: "https://img.icons8.com/color/100/null/git.png",
    link: "https://git-scm.com/",
    categoria: "Herramientas"
  },
  {
    title: "GitHub",
    img: "https://img.icons8.com/ios-glyphs/100/undefined/github.png",
    link: "https://github.com/",
    categoria: "Herramientas",
    invertirEnOscuro: true
  },
  {
    title: "GitLab",
    img: "https://img.icons8.com/color/100/null/gitlab.png",
    link: "https://about.gitlab.com/",
    categoria: "Herramientas"
  },
  {
    title: "Docker",
    img: "https://img.icons8.com/color/100/null/docker.png",
    link: "https://docs.docker.com/",
    categoria: "Herramientas"
  },
  {
    title: "Yii 2",
    img: "/img/logo/yii.svg",
    link: "https://www.yiiframework.com/",
    categoria: "Backend"
  },
  {
    title: "XAMPP",
    img: "/img/logo/xampp.svg",
    link: "https://www.apachefriends.org/",
    categoria: "Herramientas"
  },
  {
    title: "HumHub",
    img: "https://www.humhub.com/wp-content/uploads/2023/03/HumHub_Logo.png",
    link: "https://www.humhub.com",
    categoria: "Backend"
  },
  {
    title: "Next.js",
    img: "https://img.icons8.com/color/100/null/nextjs.png",
    link: "https://nextjs.org/",
    categoria: "Frontend",
    invertirEnOscuro: true
  }
]

export default tecnologias
