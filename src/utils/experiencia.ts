import { numeroAlAzar } from "./utils"

interface IExperiencia {
    id: number
    img: string
    nombre: string
    puesto: string
    fechaInicio: string
    fechaFin?: string
    freelance?: boolean
}

const experiencia: IExperiencia[] = [
    {
        id: numeroAlAzar(1, 10000),
        img: "minDef.webp",
        nombre: "Ministerio de Defensa",
        puesto: "Desarrollador Full Stack",
        fechaInicio: "12/2023",
    },
    {
        id: numeroAlAzar(1, 10000),
        img: "unahur.webp",
        nombre: "Universidad Nacional de Hurlingham",
        puesto: "Desarrollador Full Stack Junior",
        fechaInicio: "07/2023",
        fechaFin: "10/2023",
    },
    {
        id: numeroAlAzar(1, 10000),
        img: "DevsAnts.webp",
        nombre: "Devs Ants",
        puesto: "Backend Developer",
        fechaInicio: "11/2022",
        fechaFin: "07/2023",
        freelance: true
    }
]

export default experiencia
