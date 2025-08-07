// lib\experience.ts

interface IExperiencia {
  img: string
  nombre: string
  puesto: string
  fechaInicio: string
  fechaFin?: string
}

const experiencia: IExperiencia[] = [
  {
    img: "virtualisa_logo.webp",
    nombre: "Virtualisa",
    puesto: "Desarrollador Full Stack Junior",
    fechaInicio: "03/2025",
  },
  {
    img: "minDef.webp",
    nombre: "Ministerio de Defensa",
    puesto: "Desarrollador Full Stack",
    fechaInicio: "12/2023",
  },
  {
    img: "unahur.webp",
    nombre: "Universidad Nacional de Hurlingham",
    puesto: "Desarrollador Full Stack Junior",
    fechaInicio: "07/2023",
    fechaFin: "10/2023",
  }
]

export default experiencia
