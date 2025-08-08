// app\page.tsx

import About from "@/components/about/About";
import CardSection from "@/components/common/CardSection";
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

      {
        isProduction && <Link className='fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://portfolioalejandrop.netlify.app/" target="_blank" rel="noopener noreferrer">Ver 1ra versión</Link>
      }
    </main>
  );
}
