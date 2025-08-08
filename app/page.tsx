// app\page.tsx

import About from "@/components/about/About";
import CardSection from "@/components/common/CardSection";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Technologies from "@/components/technologies/Technologies";
import Title from "@/components/title/Title";
import Link from "next/link";

export default function Home() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <main className="px-3 mx-auto max-w-5xl space-y-5 min-h-screen">
      <p className="sm:text-lg text-center mt-5 text-gray-700 dark:text-gray-300">
        Estás viendo la nueva versión de mi portfolio, todavía no está listo, pero te agradezco por pasarte! :D
      </p>

      <Title />

      <CardSection
        id="about"
        title="Sobre mí"
      >
        <About />
      </CardSection>

      <CardSection
        id="experience"
        title="Experiencia"
        className="mb-10"
      >
        <Experience />
      </CardSection>

      <CardSection
        id="technologies"
        title="Tecnologías"
        subtitle="Principales herramientas empleadas en mis trabajos"
        className="mb-10"
      >
        <Technologies />
      </CardSection>

      <CardSection
        id="education"
        title="Educación"
        className="mb-10"
      >
        <Education />
      </CardSection>

      <CardSection
        id="contact"
        title="Contacto"
        className="mb-10"
      >
        <Contact />
      </CardSection>

      <CardSection
        id="projects"
        title="Proyectos"
        className="mb-10"
      >
        <p>Antiguamente mostraba acá mis proyectos personales, que son muchos, pero francamente quedaron algo anticuados para lo que puedo hacer actualmente. Eventualmente voy a crear nuevos que reflejen lo que sé actualmente, pero si aún así sentís curiosidad podés ver mi <Link className="text-blue-500 hover:underline" href="https://github.com/Ale6100" target="_blank" rel="noopener noreferrer">listado de proyectos principales en mi GitHub</Link>.</p>
      </CardSection>
      {
        isProduction && <Link className='fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://portfolioalejandrop.netlify.app/" target="_blank" rel="noopener noreferrer">Ver 1ra versión</Link>
      }
    </main>
  );
}
