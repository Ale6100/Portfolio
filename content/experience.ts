// content\experience.ts

export interface IExperiencia {
  img: string
  nombre: string
  puesto: string
  /** Formato MM/AAAA */
  fechaInicio: string
  /** Formato MM/AAAA. Si no está, es un trabajo actual */
  fechaFin?: string
  tecnologias: string[]
  tareas: string[]
}

const experiencia: IExperiencia[] = [
  {
    img: "virtualisa_logo.webp",
    nombre: "Virtualisa",
    puesto: "Desarrollador Frontend",
    fechaInicio: "03/2025",
    tecnologias: ["Next.js"],
    tareas: [
      "Desarrollo integral del frontend"
    ]
  },
  {
    img: "minDef.webp",
    nombre: "Ministerio de Defensa",
    puesto: "Desarrollador Full Stack",
    fechaInicio: "12/2023",
    tecnologias: ["React.js", "NestJS", "Entity Framework"],
    tareas: [
      "Supervisión y mejora continua de bases de datos con alcance a cientos de miles de usuarios",
      "Desarrollador principal en dos de los tres proyectos asignados"
    ]
  },
  {
    img: "unahur.webp",
    nombre: "Universidad Nacional de Hurlingham",
    puesto: "Desarrollador Full Stack Junior",
    fechaInicio: "07/2023",
    fechaFin: "10/2023",
    tecnologias: ["HumHub (Yii 2)", "HumHub UI"],
    tareas: [
      "Desarrollo, en un equipo de dos personas, de una aplicación web similar a una red social en un plazo de tres meses, como programador principal",
      "Investigación y selección de las herramientas con mejor balance entre costo y funcionalidad"
    ]
  }
]

export default experiencia
