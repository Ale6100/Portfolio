# Portfolio | Alejandro Portaluppi

Mi portfolio personal. Es una página única en español con secciones de presentación, experiencia, tecnologías, educación, proyectos y un formulario de contacto.

## Stack

- **Next.js 16** (App Router) con **React 19** y TypeScript.
- **Tailwind CSS 4** con componentes de **shadcn/ui** (`components/ui/`, estilo `radix-nova`).
- **next-themes** para el modo claro/oscuro (sigue la preferencia del sistema por defecto).
- **GSAP** para las animaciones de aparición al hacer scroll.
- **react-hook-form** + **zod** para el formulario de contacto, y **sonner** para las notificaciones.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción
npm run lint
```

`npm run agents:update` reemplaza `AGENTS.md` por la última versión de la plantilla del repositorio [Templates-IA](https://github.com/Ale6100/Templates-IA).

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `app/` | Layout raíz (fuentes, tema, metadata) y la página única. |
| `components/<sección>/` | Un componente por sección de la página. `common/Section.tsx` es el contenedor común de todas las secciones numeradas. |
| `content/` | Los datos que muestra la página (experiencia, educación, tecnologías, skills, redes). **Para actualizar el contenido del portfolio se editan estos archivos**, no los componentes. |
| `lib/` | Utilidades y el envío del formulario de contacto. |
| `public/` | Imágenes y PDFs (CV y certificados). |

## Decisiones de diseño

- **Dirección visual**: editorial y minimalista. Una columna, la tipografía como protagonista (Geist y Geist Mono), paleta neutra con un único color de acento (`--brand` en `app/globals.css`). Los colores se definen como tokens en `:root` y `.dark`; los componentes usan esos tokens y no colores fijos, para que ambos temas funcionen.
- **Animaciones**: la entrada del hero es CSS puro para que se vea desde el primer pintado, sin esperar a que cargue el JavaScript. El resto de las secciones aparecen con GSAP al entrar en pantalla. Todas las animaciones se desactivan si el usuario tiene activada la preferencia de reducir movimiento.
- **Tecnologías**: cada una tiene una categoría (definidas en `content/technologies.ts`), que es la que determina en qué grupo se muestra. Los íconos oscuros llevan `invertirEnOscuro` para que se distingan en el modo oscuro.
- **Revalidación diaria**: la página es estática, pero la edad que muestra "Sobre mí" se calcula al generarla, por eso se regenera una vez por día (`revalidate` en `app/page.tsx`).
- **Formulario de contacto**: no tiene backend propio. El navegador envía los mensajes a [Web3Forms](https://web3forms.com/), que se usa para reenviarlos por mail. En el plan gratuito, Web3Forms solo acepta envíos hechos desde el navegador, no desde un servidor. La access key de `lib/contact.ts` es pública por diseño y se obtiene en web3forms.com con el mail que va a recibir los mensajes. El formulario incluye un campo trampa invisible (`botcheck`) para filtrar bots.
