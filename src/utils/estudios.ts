interface IEstudios {
    id: number
    img?: `${string}.webp`
    titulo: string
    fontSize?: string
    institucionLink: string
    institucionNombre: string
    finalizado: boolean
    certificado?: string,
    linkExtra?: string
}

const estudios: IEstudios[] = [
    {
        id: 1,
        titulo: "Licenciatura en Ciencias de la Computación",
        institucionLink: "https://exactas.uba.ar/",
        institucionNombre: "Facultad de Ciencias Exactas y Naturales",
        finalizado: false,
        linkExtra: 'https://progresocarrera.netlify.app/'
    },
    {
        id: 2,
        img: "carrera-de-desarrollo-full-stack-python.webp",
        titulo: "Carrera de Desarrollo Full Stack Python",
        institucionLink: "https://buenosaires.gob.ar/educacion/codo-codo-40",
        institucionNombre: "Codo a Codo 4.0",
        finalizado: true,
        certificado: "https://drive.google.com/file/d/1OBlFV9sZJ4zhQoPOV-Ags64_O3j_AWbD/view?usp=sharing"
    },
    {
        id: 3,
        img: "carrera-de-desarrollo-full-stack.webp",
        titulo: "Carrera de Desarrollo Full Stack",
        institucionLink: "https://www.coderhouse.com/",
        institucionNombre: "Coderhouse",
        finalizado: true,
        certificado: "https://www.coderhouse.com/certificados/640ceaac6936da000e35f86c"
    },
    {
        id: 4,
        img: "programacion-backend.webp",
        titulo: "Programación Backend",
        institucionLink: "https://www.coderhouse.com/",
        institucionNombre: "Coderhouse",
        finalizado: true,
        certificado: "https://www.coderhouse.com/certificados/640ceaac6936da000e35f869"
    },
    {
        id: 5,
        img: "Habilidades-para-el-trabajo.webp",
        titulo: "Habilidades para el trabajo y carrera de desarrollo web",
        fontSize: "text-sm",
        institucionLink: "https://fundacionempujar.org/",
        institucionNombre: "Fundación Empujar",
        finalizado: true,
        certificado: "./utils/Diploma_empujar_Alejandro_Portaluppi.pdf"
    },
    {
        id: 6,
        img: "carrera-frontend.webp",
        titulo: "Carrera de Desarrollo Frontend React",
        institucionLink: "https://www.coderhouse.com/",
        institucionNombre: "Coderhouse",
        finalizado: true,
        certificado: "https://www.coderhouse.com/certificados/63400c49908d9e000ef3edde"
    },
    {
        id: 7,
        img: "taller_python_exactas.webp",
        titulo: "Taller de Python",
        institucionLink: "https://exactas.uba.ar/",
        institucionNombre: "Facultad de Ciencias Exactas y Naturales",
        finalizado: true,
        certificado: "./utils/Certificado_taller_python_exactas_Alejandro_Portaluppi.pdf"
    },
]

export default estudios
