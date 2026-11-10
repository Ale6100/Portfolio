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
    img: "/img/logo/html.svg",
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
    img: "/img/logo/tailwindcss.svg",
    link: "https://tailwindcss.com/",
    categoria: "Frontend"
  },
  {
    title: "JavaScript",
    img: "/img/logo/javascript.svg",
    link: "https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript",
    categoria: "Lenguajes"
  },
  {
    title: "TypeScript",
    img: "/img/logo/typescript.svg",
    link: "https://www.typescriptlang.org/",
    categoria: "Lenguajes"
  },
  {
    title: "SQL Server",
    img: "/img/logo/sqlserver.svg",
    link: "https://www.microsoft.com/en-us/sql-server",
    categoria: "Bases de datos"
  },
  {
    title: 'MySQL',
    img: "/img/logo/mysql.svg",
    link: "https://www.mysql.com/",
    categoria: "Bases de datos"
  },
  {
    title: "ExpressJS",
    img: "/img/logo/express.svg",
    link: "https://expressjs.com/",
    categoria: "Backend",
    invertirEnOscuro: true
  },
  {
    title: "ReactJS",
    img: "/img/logo/react.svg",
    link: "https://reactjs.org/",
    categoria: "Frontend"
  },
  {
    title: "NodeJS",
    img: "/img/logo/nodejs.svg",
    link: "https://nodejs.org/",
    categoria: "Backend"
  },
  {
    title: "Vite",
    img: "/img/logo/vite.svg",
    link: "https://vitejs.dev/",
    categoria: "Herramientas"
  },
  {
    title: "NestJS",
    img: "/img/logo/nestjs.svg",
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
    img: "/img/logo/php.svg",
    link: "https://www.php.net/",
    categoria: "Lenguajes"
  },
  {
    title: "Git",
    img: "/img/logo/git.svg",
    link: "https://git-scm.com/",
    categoria: "Herramientas"
  },
  {
    title: "GitHub",
    img: "/img/logo/github.svg",
    link: "https://github.com/",
    categoria: "Herramientas",
    invertirEnOscuro: true
  },
  {
    title: "GitLab",
    img: "/img/logo/gitlab.svg",
    link: "https://about.gitlab.com/",
    categoria: "Herramientas"
  },
  {
    title: "Docker",
    img: "/img/logo/docker.svg",
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
    img: "/img/logo/humhub.svg",
    link: "https://www.humhub.com",
    categoria: "Backend"
  },
  {
    title: "Next.js",
    img: "/img/logo/nextjs.svg",
    link: "https://nextjs.org/",
    categoria: "Frontend",
    invertirEnOscuro: true
  },
  {
    title: "Vue.js",
    img: "/img/logo/vue.svg",
    link: "https://vuejs.org/",
    categoria: "Frontend"
  }
]

export default tecnologias
