// app\page.tsx

import About from "@/components/about/About";
import CardSection from "@/components/common/CardSection";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Footer from "@/components/footer/Footer";
import Technologies from "@/components/technologies/Technologies";
import Title from "@/components/title/Title";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-3 pt-5 mx-auto max-w-5xl space-y-5 min-h-screen">
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
        <p>Antes solía mostrar acá mis proyectos personales, que son muchos, pero la verdad quedaron algo anticuados para lo que puedo hacer hoy. Más adelante voy a crear nuevos que reflejen lo que sé ahora, pero si igual te da curiosidad, podés ver mi <Link className="text-blue-500 hover:underline" href="https://github.com/Ale6100" target="_blank" rel="noopener noreferrer">listado de proyectos principales en mi GitHub</Link>.</p>
      </CardSection>

      <Footer />
    </main>
  );
}
