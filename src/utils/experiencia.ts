interface IExperiencia {
    img: string
    nombre: string
    puesto: string
    fechaInicio: string
    fechaFin?: string
    freelance?: boolean
}

const experiencia: IExperiencia[] = [
    {
        img: "minDef.webp",
        nombre: "Ministerio de Defensa",
        puesto: "Desarrollador Full Stack",
        fechaInicio: "12/2023",
    },
    {
        img: "unahur.webp",
        nombre: "Universidad Nacional de Hurlingham",
        puesto: "Desarrollador Junior",
        fechaInicio: "07/2023",
        fechaFin: "10/2023",
    },
    {
        img: "DevsAnts.webp",
        nombre: "Devs Ants",
        puesto: "Backend Developer",
        fechaInicio: "11/2022",
        fechaFin: "07/2023",
        freelance: true
    }
]

export default experiencia
