// lib\experience.ts

interface IExperiencia {
  img: string
  nombre: string
  puesto: string
  fechaInicio: string
  fechaFin?: string
  tecnologias?: {
    frontend?: string[]
    backend?: string[]
  }
  responsabilidades?: {
    tareas: string[]
  }
}

const experiencia: IExperiencia[] = [
  {
    img: "virtualisa_logo.webp",
    nombre: "Virtualisa",
    puesto: "Desarrollador Frontend",
    fechaInicio: "03/2025",
    tecnologias: {
      frontend: ["Next.js"]
    },
    responsabilidades: {
      tareas: [
        "Desarrollo completo del frontend"
      ],
    }
  },
  {
    img: "minDef.webp",
    nombre: "Ministerio de Defensa",
    puesto: "Desarrollador Full Stack",
    fechaInicio: "12/2023",
    tecnologias: {
      frontend: ["React.js"],
      backend: ["NestJS", "Entity Framework"]
    },
    responsabilidades: {
      tareas: [
        "Supervisión y mejora continua de bases de datos con alcance a cientos de miles de usuarios",
        "Responsabilidad principal en el desarrollo de dos de los tres proyectos asignados"
      ]
    }
  },
  {
    img: "unahur.webp",
    nombre: "Universidad Nacional de Hurlingham",
    puesto: "Desarrollador Full Stack Junior",
    fechaInicio: "07/2023",
    fechaFin: "10/2023",
    tecnologias: {
      backend: ["HumHub (Yii 2)"],
      frontend: ["HumHub UI"]
    },
    responsabilidades: {
      tareas: [
        "En un equipo de dos personas, desarrollamos una aplicación web similar a una red social en un plazo de tres meses",
        "Investigué y seleccioné herramientas tecnológicas que optimizaran el balance entre costo y funcionalidad",
        "Fui el programador principal del proyecto."
      ],
    }
  }
]

export default experiencia
