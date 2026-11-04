// app\page.tsx

import About from "@/components/about/About";
import Section from "@/components/common/Section";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Technologies from "@/components/technologies/Technologies";

// La edad que muestra "Sobre mí" se calcula al generar la página; esto la regenera una vez por día
export const revalidate = 86400;

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6">
      <Hero />

      <Section id="about" title="Sobre mí">
        <About />
      </Section>

      <Section id="experience" title="Experiencia">
        <Experience />
      </Section>

      <Section
        id="technologies"
        title="Tecnologías"
        subtitle="Principales herramientas empleadas en mis trabajos"
      >
        <Technologies />
      </Section>

      <Section id="education" title="Educación">
        <Education />
      </Section>

      <Section id="projects" title="Proyectos">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">Antes solía mostrar acá mis proyectos personales, que son muchos, pero la verdad quedaron algo anticuados para lo que puedo hacer hoy. Más adelante voy a crear nuevos que reflejen lo que sé ahora, pero si igual te da curiosidad, podés ver mi <a className="font-medium text-foreground underline decoration-brand/50 underline-offset-4 hover:decoration-brand transition-colors" href="https://github.com/Ale6100" target="_blank" rel="noopener noreferrer">listado de proyectos principales en mi GitHub</a>.</p>
      </Section>

      <Section id="contact" title="Contacto">
        <Contact />
      </Section>

      <Footer />
    </main>
  );
}
