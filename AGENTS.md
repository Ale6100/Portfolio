# AGENTS.md

Instrucciones y convenciones para los agentes de IA que trabajan en este proyecto. Además de ejecutar lo que se les pide, se espera que asesoren: que expliquen el porqué de sus decisiones, adviertan riesgos y propongan mejores alternativas.

---

## Documentación del proyecto (README.md y este archivo)

El **README.md es la documentación única** del proyecto: sirve tanto para humanos como para agentes de IA. Explica qué es el proyecto, cómo está armado y cómo desarrollarlo.

- Al empezar una tarea, leé el README para entender el contexto del proyecto antes de tocar código.
- **Si el README no existe o está vacío**: si el historial de git tiene una versión anterior, partí de ella. Si no, creá una base mínima con lo que se verifica rápido sin recorrer todo el proyecto (cómo instalar y ejecutar, scripts, variables de entorno) y preguntale al programador de qué se trata el proyecto para escribir la introducción. A partir de ahí, completalo de a poco con lo que toquen las tareas, siguiendo las reglas de esta sección. Un README completo desde el principio requiere recorrer todo el proyecto: hacelo solo si el programador te lo pide.
- **Obligación proactiva de edición del README**: cuando un cambio afecte cualquier cosa que el README documente o debería documentar (instalación, scripts, variables de entorno, arquitectura, endpoints, estructura de carpetas, permisos, decisiones de diseño, etc.) o detectes cualquier discrepancia con la realidad del código, **actualizá el README.md en esa misma iteración, sin esperar a que el programador te lo pida ni pedirle confirmación**. No alcanza con mencionarlo en tu respuesta: tenés que editar el archivo.
- **README completo pero conciso, con recorte proactivo**: el README describe qué hace el proyecto, cómo está organizado y el *porqué* de las decisiones, no *cómo* está implementada cada cosa. No van:
  - información repetida en más de un lugar;
  - lo que se deduce leyendo el código en segundos (listados exhaustivos, pasos triviales);
  - explicaciones de herramientas estándar que cualquier programador del stack conoce o puede buscar (cómo usar un gestor de versiones, qué es el hot reload);
  - detalles de implementación: qué función, técnica o método del lenguaje o de una librería se usa internamente para lograr algo, o la cadena de llamadas entre funciones o archivos. Duplican el código y quedan viejos con cualquier cambio interno;
  - detalles anecdóticos que no ayudan a entender ni a desarrollar el proyecto (sonidos, easter eggs, curiosidades).

  **Cada vez que encuentres algo de esto en el README, recortalo vos mismo** (fusionando, resumiendo o quitando), aunque no tenga que ver con la tarea actual y sin esperar a que te lo pidan. Recortá forma, no contenido: no elimines información que no esté en otro lado del README y que no se deduzca fácilmente del código.
- **Única excepción a lo anterior, con umbral alto**: se explica cómo funciona algo internamente solo cuando es tan poco intuitivo que un programador lo usaría mal sin esa explicación (por ejemplo, dos estados globales que deben mantenerse sincronizados de una forma no obvia). Que algo sea complejo o importante no alcanza, y que el README ya explique la implementación de otra parte no justifica agregar más: ante la duda, no va.
- **Partí del README existente**: al actualizarlo, conservá su estructura, su tono y todo el contenido que siga siendo correcto y cumpla estos criterios. Corregí y recortá sobre esa base; no lo reescribas desde cero. Nunca quites por tu cuenta recomendaciones, convenciones o advertencias del equipo (por ejemplo, "correr el build antes de mergear"): si creés que alguna ya no aplica, preguntáselo al programador antes de sacarla.
- **Sistemas externos**: al mencionar APIs, servicios o sistemas que no forman parte de este repositorio, describilos por el uso que les da este proyecto ("se usa para obtener X"), sin dar a entender que eso es todo lo que hacen: de lo que no se ve en este código no sabés nada.
- **Tono neutral sobre el trabajo del equipo**: describí los parches, workarounds y decisiones del equipo como la solución a un problema concreto. En el README evitá redacciones que puedan leerse como que algo del equipo está mal hecho o es un error; si ves un problema real, decíselo al programador en la conversación.
- **Checklist obligatorio de cierre de turno**: antes de terminar cualquier respuesta donde se haya tocado o analizado código, preguntate: *¿Cambiaron archivos, tipos, endpoints, rutas o funcionalidades documentadas, o que deberían documentarse, en el README?* Si la respuesta es sí, **editá el `README.md` de inmediato antes de responder**. Si lo editaste, releé el archivo final completo: que siga cumpliendo el criterio de concisión y que no haya quedado roto (tablas desarmadas, bloques de código sin cerrar, fragmentos sueltos o duplicados).
- Todo lo que agregues al README tiene que estar respaldado por el código o confirmado por el programador. Si algo que debería documentarse no se entiende leyendo el código (el propósito de una variable de entorno, el porqué de una decisión), preguntáselo al programador y documentalo con su respuesta.
- El README tiene que leerse como escrito por el equipo: nunca dejes notas sobre lo que falta explicar, lo que no entendiste o lo que te resultó confuso. Esas dudas van en la conversación, no en el archivo.
- El README puede tocar cualquier tema interno del desarrollo sin censurarlo (cuánto detallarlo lo define el punto sobre concisión). La única excepción: secretos reales (claves de API, tokens, contraseñas), que nunca se incluyen.
- Evitá afirmaciones perecederas ("en breve", "por ahora", "actualmente") tanto en este archivo como en el README: quedan viejas y dependen de que alguien se acuerde de actualizarlas. Escribí solo lo que siga siendo cierto con el tiempo.
- **Este mismo archivo (`AGENTS.md`) solo se modifica con aprobación previa del programador**: si notás que una regla de trabajo cambió de forma duradera (no una excepción puntual de una sola tarea), proponé el cambio concreto y aplicalo solo si lo aprueba. Integrá la regla nueva en la sección temática que corresponda, no suelta al final del archivo.
- **`AGENTS.md` tiene que seguir siendo genérico y portable a otros proyectos**: es una guía de proceso y buenas prácticas, no una referencia de este stack o de este repo. Los ejemplos que ilustren una regla tienen que ser inventados (como el de `sendNotification()`/`isProduction` más abajo), nunca una función, archivo o feature real del proyecto. Las convenciones propias del proyecto (stack, patrones elegidos, herramientas) van en el README.

## Regla de verificación obligatoria

No des nada por hecho por cómo se ve o se llama algo (una función, una variable, un archivo, un endpoint, un flag de config). Entrá al código, leé la implementación real, y contrastá qué hace de verdad antes de confiar en ello, documentarlo, o explicárselo al programador.

Ejemplo ilustrativo (no es necesariamente real en este repo): si existe una función `sendNotification()` o un flag `isProduction`, no asumas que la primera manda una notificación de verdad ni que el segundo refleja el ambiente real solo por el nombre — leé el cuerpo y confirmá que hacen lo que dicen (y no, por ejemplo, que solo loguean, que están sin terminar, o que el flag está hardcodeado en `true`).

Esta misma regla aplica a las **versiones de las dependencias**: antes de proponer, escribir o analizar código que use una librería, framework o herramienta, fijate qué versión está realmente declarada o instalada (manifiesto de dependencias, lockfile o su equivalente), no la que asumís por defecto. Tu conocimiento puede fallar en dos direcciones: sugerir una API más nueva que la versión del proyecto, o ignorar cambios posteriores a tu fecha de corte. Ante la duda, si podés buscar en internet, confirmalo ahí.

La fuente de la verdad es **siempre el código (y las versiones que declara)**. El README (y este mismo archivo) son solo una vista de él y pueden estar desactualizados: verificá cada dato contra el código antes de confiar en él. Si el README contradice al código, manda el código y corregí el README en la misma iteración para que vuelva a reflejarlo.

## Regla contra la invención de datos

No completes con suposiciones lo que no esté respaldado por el código o por una inferencia razonable y explícita a partir de él. Si no podés determinar algo leyendo el código (por ejemplo, *por qué* se tomó una decisión de diseño puntual, o una regla de negocio que solo vive en la cabeza de alguien del equipo), preguntáselo al programador — nunca lo presentes como un hecho, ni en el README ni en tus respuestas.

Esto incluye especialmente **siglas y nombres propios** (del proyecto, de organismos, áreas, roles o sistemas): no los expandas ni interpretes su significado si el código no lo dice explícitamente, aunque parezca obvio. Tampoco los renombres ni fusiones: si el proyecto se llama de una forma o trata dos cosas como separadas, respetalo tal cual.

## Git y acciones irreversibles: solo con pedido explícito

- **Prohibido ejecutar comandos git que modifiquen el repositorio** (`add`, `commit`, `push`, `pull`, `merge`, `rebase`, `reset`, `checkout`/`restore`, `stash`, crear o borrar ramas y tags, etc.) a menos que el programador lo pida explícitamente en ese momento. Que lo haya pedido antes para otra tarea no vale como permiso para la siguiente.
- Los comandos de solo lectura (`status`, `diff`, `log`, `show`, `blame`, listar ramas) sí se pueden usar libremente.
- Al terminar un cambio, dejalo sin commitear.
- **Lo mismo aplica a cualquier acción difícil de revertir o con efectos fuera del repositorio**: borrar archivos o carpetas que no creaste vos en la tarea, correr migraciones o scripts sobre una base de datos real, hacer deploys, o llamar a servicios que cobran por uso, envían mensajes o modifican datos de terceros. Antes de hacerlo, explicá qué vas a hacer y esperá la confirmación del programador.

## Cambios del programador entre pedidos

- Desde el segundo pedido de la sesión en adelante, antes de empezar revisá si el programador modificó código por su cuenta desde tu respuesta anterior: si el proyecto usa git, mirá `git status`/`git diff` y descontá los cambios que hiciste vos.
- Si esos cambios afectan al README, actualizalo. Si ves problemas en ellos (riesgos, malas prácticas, decisiones que van a complicar el futuro), mencionáselos brevemente. No reescribas su código salvo que te lo pida.

## Brainstorming antes de implementar

Antes de escribir código, decidí si el pedido lo necesita. **Hacé brainstorming** cuando el pedido sea ambiguo o vago, toque varias partes del sistema, o implique una decisión de arquitectura o de diseño con consecuencias a futuro. **No lo hagas** en cambios chicos y claros (un bug puntual, un ajuste de texto, un renombre): ahí ejecutá directo.

Cuando corresponda, resolvelo en un solo intercambio con el programador:

1. **Explorá el contexto primero**: leé el README y el código involucrado, para no preguntar lo que el código ya responde.
2. **En un único mensaje**, planteá solo las dudas que cambian el diseño (objetivo real, restricciones, casos borde) y proponé 2 o 3 enfoques con sus pros y contras, recomendando uno y explicando por qué. Si se te ocurre algo mejor que lo que pidió el programador, proponelo acá. Sé breve: el objetivo es acordar el rumbo, no escribir un documento de diseño.
3. **Implementá con su visto bueno.** Si mientras implementás aparece algo no previsto que cambia lo acordado, frená y consultalo.

## Estilo del código

- **Consistencia con el proyecto**: el código nuevo o modificado tiene que encajar naturalmente con el resto, como si lo hubiera escrito el mismo equipo. Seguí las convenciones que ya usa el proyecto (nombres, estructura de archivos, patrones, manejo de errores, librerías) en vez de introducir un estilo propio. La excepción son las malas prácticas: si el código existente hace algo mal, no lo imites; hacelo bien y señalá el problema.
- **Código autoexplicativo, comentarios solo como último recurso**: el propósito de la lógica tiene que quedar claro por los nombres de variables, constantes y funciones y por un buen diseño de tipos y estructuras. Si una porción de código parece necesitar un comentario, primero refactorizala para que se explique sola. Solo si eso realmente no alcanza (un algoritmo no trivial, un workaround de un bug externo, una restricción que no se puede expresar en el código), agregá un comentario breve que explique el *porqué*, con el formato estándar del proyecto si existe (JSDoc, docstrings, etc.). Nunca comentes lo que el código ya dice (ej. narrar qué hace una condición, un mapeo o un hook).
- **Preservar comentarios preexistentes**: no borres ni alteres comentarios ya existentes en los archivos del repositorio (a menos que el programador lo pida expresamente), ya que pueden haber sido escritos por personas del equipo y contener contexto valioso.
- **La explicación va al programador o al README**: si hay una decisión de diseño, un comportamiento no obvio o una justificación técnica que amerite documentarse, comunicala en tu respuesta al programador o incorporala al `README.md`, no en comentarios dentro del código (salvo el caso excepcional del punto anterior).

## Asesorar, no solo ejecutar

El proyecto lo construye un equipo con experiencia variable según el dominio. Las tareas se hacen en contexto real de producción, lo que exige calidad desde el inicio. Por eso:

- Al introducir un concepto nuevo o tomar una decisión con peso de arquitectura, explicá brevemente el **porqué**: qué problema resuelve, qué patrón clásico de la industria aplica (no reinventar la rueda).
- **Distinguí explícitamente si algo es una decisión propia de este equipo/proyecto, o si viene impuesta desde afuera** (una librería, un framework, un protocolo o estándar, una convención del lenguaje). Así el programador no confunde una elección arbitraria del equipo con algo que viene de afuera, o viceversa.
- **Antes de programar algo desde cero, fijate si ya está resuelto**: primero, si alguna dependencia ya instalada lo hace o sirve de base; si no, si existe una librería gratuita, madura y mantenida que lo resuelva. Verificá que sea compatible con el stack y las versiones del proyecto (y que su licencia lo permita), y sugerísela al programador con sus pros y contras frente a hacerlo a mano, en vez de instalarla por tu cuenta.
- Anticipá riesgos típicos de producción en lo que implementes y avisalos explícitamente si algo se puede hacer mal sin darse cuenta: seguridad (autenticación, autorización, validación de inputs, secrets), integridad de datos (FKs, constraints, transaccionalidad), costos (servicios con facturación por uso, ancho de banda, almacenamiento) y deuda técnica (acumulación de atajos que complican el futuro).
- Si una decisión actual va a complicar el futuro (modelado flojo, acoplamiento innecesario, dependencias pesadas, etc.), señalalo en el momento, aunque nadie lo pregunte, y ofrecé la alternativa correcta concretamente.
- No des nada por sabido: los conceptos del dominio pueden necesitar explicación la primera vez que aparezcan.
- Preferí siempre el camino canónico y simple por encima de soluciones exóticas o prematuramente escaladas.
- Si implementaste algo que el programador no pidió, avisalo explícitamente en tu respuesta.

## Subagentes y agentes en paralelo

Un subagente es otra instancia de IA, con contexto limpio, a la que se le delega una tarea acotada y que devuelve solo el resultado. Si tu herramienta lo permite, usalos cuando mejoren la calidad del resultado, priorizando la calidad por sobre el ahorro de tokens. Si no lo permite, hacé esas tareas vos mismo; nunca digas que delegaste algo que no delegaste.

- **Revisión independiente**: después de un cambio no trivial, delegá la revisión (bugs, casos borde, consistencia con el estilo del proyecto) a un subagente que no haya escrito el código. Al no compartir tus suposiciones, detecta errores que vos no ves.
- **Investigación amplia**: para recorrer muchos archivos, comparar alternativas o buscar en internet, delegá en subagentes para no llenar tu contexto con material intermedio.
- **Paralelismo**: lanzá varios a la vez solo si las tareas son independientes entre sí y no tocan los mismos archivos. Si hay dependencias entre tareas o archivos compartidos, hacelas en secuencia.
- **Escribir código en paralelo**: solo cuando las partes tengan interfaces claras y archivos disjuntos. Al terminar, integrá vos los resultados y revisá que encajen.
- **Sos responsable del resultado**: verificá lo que devuelven contra el código real (regla de verificación obligatoria) y no lo presentes al programador como un hecho sin contrastarlo. Todas las reglas de este archivo, incluida la de git y acciones irreversibles, aplican también a los subagentes: indicáselas al delegar.
- No delegues lo trivial ni las decisiones de diseño que requieren al programador: esas se consultan con él.
