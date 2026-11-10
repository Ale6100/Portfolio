# Portfolio | Alejandro Portaluppi

Mi portfolio personal. Es una página única en español con secciones de presentación, experiencia, tecnologías, educación, proyectos y un formulario de contacto.

## Stack

- **Next.js 16** (App Router) con **React 19** y TypeScript.
- **Tailwind CSS 4** con componentes de **shadcn/ui** (`components/ui/`, estilo `radix-nova`).
- **next-themes** para el modo claro/oscuro (sigue la preferencia del sistema por defecto).
- **react-hook-form** + **zod** para el formulario de contacto, y **sonner** para las notificaciones.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción
npm run lint
npm test         # corre los tests
npm run cv       # compila el CV de cv/ a PDF (public/utils/CV_Alejandro_Portaluppi.pdf)
```

`npm run agents:update` reemplaza `AGENTS.md` por la última versión de la plantilla del repositorio [Templates-IA](https://github.com/Ale6100/Templates-IA).

## Tests

Usa **Vitest** con **Testing Library** sobre `jsdom` para tests unitarios y de integración de componentes (`*.test.ts` y `*.test.tsx` junto al archivo que prueban). No requieren variables de entorno ni servicios levantados: las llamadas a servicios externos como Web3Forms se simulan en los tests.

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `app/` | Layout raíz (fuentes, tema, metadata) y la página única. |
| `components/<sección>/` | Un componente por sección de la página, y `common/` para los compartidos entre secciones. |
| `content/` | Los datos que muestra la página (experiencia, educación, tecnologías, skills, redes). **Para actualizar el contenido del portfolio se editan estos archivos**, no los componentes. |
| `lib/` | Utilidades y el envío del formulario de contacto. |
| `public/` | Imágenes y PDFs (CV y certificados). |

## Decisiones de diseño

- **Dirección visual**: editorial y minimalista. Una columna, la tipografía como protagonista (Bricolage Grotesque en títulos, Geist en texto corrido y Geist Mono), paleta neutra con un único color de acento (`--brand` en `app/globals.css`). Los colores se definen como tokens en `:root` y `.dark`; los componentes usan esos tokens y no colores fijos, para que ambos temas funcionen.
- **Animaciones**: se animan solo los elementos que comunican un cambio o estado (como la rotación de skills en el hero y el estado de envío del formulario), respetando la preferencia de reducir movimiento.
- **Formulario de contacto**: no tiene backend propio. El navegador envía los mensajes a [Web3Forms](https://web3forms.com/), que se usa para reenviarlos por mail (en el plan gratuito solo acepta envíos desde el navegador). La access key de `lib/contact.ts` es pública por diseño y se obtiene en web3forms.com con el mail que recibe los mensajes.
