interface IEstudios {
    img?: `${string}.webp`
    titulo: string
    fontSize?: string
    institucionLink: string
    institucionNombre: string
    encurso?: boolean
    certificado?: string
    linkExtra?: string
}

const estudios: IEstudios[] = [
  {
    titulo: "Licenciatura en Ciencias de la Computación",
    institucionLink: "https://exactas.uba.ar/",
    institucionNombre: "Facultad de Ciencias Exactas y Naturales",
    encurso: true,
    linkExtra: 'https://progresocarrera.netlify.app/'
  },
  {
    img: "carrera-de-desarrollo-full-stack-python.webp",
    titulo: "Carrera de Desarrollo Full Stack Python",
    institucionLink: "https://buenosaires.gob.ar/educacion/codo-codo-40",
    institucionNombre: "Codo a Codo 4.0",
    certificado: "https://drive.google.com/file/d/1OBlFV9sZJ4zhQoPOV-Ags64_O3j_AWbD/view?usp=sharing"
  },
  {
    img: "carrera-de-desarrollo-full-stack.webp",
    titulo: "Carrera de Desarrollo Full Stack",
    institucionLink: "https://www.coderhouse.com/",
    institucionNombre: "Coderhouse",
    certificado: "https://pub.coderhouse.com/legacy-certificates/640ceaac6936da000e35f86c?lang=es"
  },
  {
    img: "programacion-backend.webp",
    titulo: "Programación Backend",
    institucionLink: "https://www.coderhouse.com/",
    institucionNombre: "Coderhouse",
    certificado: "https://pub.coderhouse.com/legacy-certificates/640ceaac6936da000e35f869?lang=es"
  },
  {
    img: "Habilidades-para-el-trabajo.webp",
    titulo: "Habilidades para el trabajo y carrera de desarrollo web",
    fontSize: "text-sm",
    institucionLink: "https://fundacionempujar.org/",
    institucionNombre: "Fundación Empujar",
    certificado: "./utils/Diploma_empujar_Alejandro_Portaluppi.pdf"
  },
  {
    img: "carrera-frontend.webp",
    titulo: "Carrera de Desarrollo Frontend React",
    institucionLink: "https://www.coderhouse.com/",
    institucionNombre: "Coderhouse",
    certificado: "https://pub.coderhouse.com/legacy-certificates/63400c49908d9e000ef3edde?lang=es"
  },
  {
    img: "taller_python_exactas.webp",
    titulo: "Taller de Python",
    institucionLink: "https://exactas.uba.ar/",
    institucionNombre: "Facultad de Ciencias Exactas y Naturales",
    certificado: "./utils/Certificado_taller_python_exactas_Alejandro_Portaluppi.pdf"
  },
]

export default estudios
