// components\about\About.tsx

import { differenceInYears } from 'date-fns';
import { CV_URL } from '@/content/social';

const linkClassName = "font-medium text-foreground underline decoration-brand/50 underline-offset-4 hover:decoration-brand transition-colors";

export default function About() {
  const birthDate = new Date(2000, 0, 6);
  const currentAge = differenceInYears(new Date(), birthDate);

  return (
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
      <p>
        Soy <span className="text-foreground">desarrollador web full stack</span>, tengo {currentAge} años y estoy titulado en tecnologías frontend y backend.
      </p>
      <p>
        Empecé estudiando Física en la UBA, donde aprendí lógica, matemática y programación. Ahí descubrí que lo que más me apasionaba era programar, así que me cambié a Ciencias de la Computación. Hoy trabajo en el rubro IT y sigo aprendiendo tecnologías nuevas de forma constante.
      </p>
      <p>
        Me importa trabajar en equipo: colaboro con mis pares para que crezcamos profesionalmente en conjunto.
      </p>
      <p>
        Si querés saber más, podés ver mi <a className={linkClassName} href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">LinkedIn</a> o descargar mi <a className={linkClassName} href={CV_URL} target="_blank" rel="noopener noreferrer">CV</a>.
      </p>
    </div>
  )
}
