// components\about\About.tsx

import { differenceInYears } from 'date-fns';

export default function About() {
  const birthDate = new Date(2000, 0, 6);
  const currentAge = differenceInYears(new Date(), birthDate);

  return (
    <section id="about" className="space-y-3 text-sm sm:text-base">
      <p>🎓 Desarrollador Web de {currentAge} años titulado en tecnologías Frontend y Backend</p>
      <p>🔧 Comencé como estudiante de Física en la UBA donde aprendí lógica, matemática y programación. Estos conocimientos me llevaron a descubrir mi pasión por la programación y me animaron a cambiar mi carrera a Ciencias de la Computación. Ahora soy un Desarrollador Web Full Stack con un constante interés por aprender nuevas tecnologías</p>
      <p>🤝 Quienes me conocen saben que colaboro con mis pares para impulsar el crecimiento profesional grupal.</p>
      <p>📌 Actualmente estoy trabajando en el rubro IT, lo que me permite seguir desarrollándome en el puesto</p>
      <p>🗒️ Para más información puedes ver mi <a className="text-blue-900 hover:text-blue-600" href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Linkedin</a> o mi <a rel="noopener noreferrer" className="text-blue-900 hover:text-blue-600" href="./utils/CV_Alejandro_Portaluppi.pdf" target="_blank">CV</a></p>
    </section>
  )
}
