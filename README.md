# Taxonomy · Aula botánica

Aplicación de repaso visual de organografía vegetal en español. **v1.1.1**.

[Acceso de revisión docente](https://taxonomy-aula-botanica.squarehedge.chatgpt.site). La copia de Sites tiene acceso privado del propietario; no es un enlace público para el alumnado. El código de este repositorio puede alojarse en cualquier servidor estático, incluido GitHub Pages.

## Actividades

| Bloque | Lámina | Etiquetas |
|---|---|---:|
| Órganos | Partes de una planta | 7 |
| Órganos | Partes de una flor | 9 |
| Órganos | Morfología de la hoja | 7 |
| Anatomía | Tejidos de una hoja dorsiventral | 8 |
| Anatomía | Tallo primario de eudicotiledónea | 6 |
| Anatomía | Raíz primaria de eudicotiledónea | 7 |

Son 44 etiquetas. La agrupación sigue los bloques docentes disponibles; no se atribuye una numeración oficial a las prácticas sin sus guiones. Las láminas son esquemas vectoriales originales, ampliables y sin escala; no microfotografías. Las descripciones y notas especifican el tipo anatómico representado.

## Uso

1. Elegir una actividad en la navegación lateral o las pestañas horizontales.
2. Pasar el ratón sobre una etiqueta para leer su descripción. También se muestra al enfocarla con el teclado o seleccionarla.
3. Arrastrarla al recuadro numerado unido por una línea a la estructura. Alternativa: pulsar etiqueta y destino. Teclado: Tab y Enter/espacio.
4. Comprobar las respuestas. Los signos ✓ y × acompañan los colores.
5. Revisar errores conservando las correctas, consultar la solución o reiniciar con las etiquetas mezcladas.

Las etiquetas colocadas siguen disponibles para moverlas. Si se intercambian dos ya colocadas, sus destinos se permutan sin duplicarlas. Cambiar de actividad conserva el trabajo. El modo «De memoria» oculta las descripciones hasta comprobar. Consultar la solución registra la actividad como asistida (◐); reiniciar permite practicar de nuevo. Al editar una respuesta se retira la marca de completada hasta volver a comprobar.

Tema oscuro inicial y tema claro opcional. Progreso guardado en localStorage, con validación al cargar. Si el navegador impide guardarlo, se muestra un aviso y se puede seguir trabajando durante la sesión. No hay cuentas de alumnos, analítica, clasificación competitiva ni envío de respuestas. La app no sirve para exámenes seguros: las soluciones están en el código del cliente.

## Ejecutar y validar

Node 22 o posterior; no se requiere instalar dependencias.

```sh
npm run check
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

Abrir `http://localhost:8000`. El arranque usa un único script clásico sin imports de red; también se puede abrir `index.html` junto a sus archivos locales. No hay recursos externos necesarios para la ejecución. Se puede desplegar la raíz del repositorio o `dist/`; esta última se genera con build.

## Organización

- `activities.js`: catálogo, nombres, descripciones y coordenadas de las estructuras.
- `diagrams.js`: seis láminas SVG originales.
- `model.js`: colocación, intercambio, corrección, ayuda y validación del progreso.
- `app.js`, `index.html`, `style.css`: interacción y presentación.
- `tests/model.test.mjs`: 42 pruebas de lógica, catálogo y persistencia.
- `QA.md`: comprobaciones reales y límites de la validación.
- `.github/workflows/checks.yml`: comprobaciones automáticas al recibir cambios.

Para añadir una lámina, crear su dibujo y su entrada de catálogo. Las posiciones del catálogo usan el sistema SVG de 900 × 640. Las etiquetas de destino y las líneas se generan a partir de las mismas coordenadas, evitando mantener un mapa de respuestas separado del dibujo.

## Referencias de consulta

Conceptos contrastados con *Biology 2e*, OpenStax: [cuerpo vegetal](https://openstax.org/books/biology-2e/pages/30-1-the-plant-body), [tallos](https://openstax.org/books/biology-2e/pages/30-2-stems), [raíces](https://openstax.org/books/biology-2e/pages/30-3-roots), [hojas](https://openstax.org/books/biology-2e/pages/30-4-leaves) y [desarrollo reproductivo](https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure). No se han copiado las figuras del libro. Los colores propios no equivalen a una tinción histológica.

## Rediseño v1.1

- Se retiran las actividades independientes de semilla y aparato estomático. El estoma permanece como estructura dentro del corte de hoja.
- Se redibujan las seis láminas: volumen y nerviación de órganos; anteras bilobuladas, cavidad ovárica y óvulos en sección; empalizada compacta y tejido esponjoso conectado con lagunas; vasos con paredes y lúmenes; capas de endodermis y periciclo diferenciadas.
- Se actualizan los puntos de identificación para los nuevos dibujos.
- El progreso usa seis actividades y descarta las retiradas al cargar datos anteriores.

La aplicación pública se encuentra en [GitHub Pages](https://javierbuezo.github.io/Taxonomy/).

## Reparación de arranque v1.1.1

La captura reportada mostraba la página estática sin menú ni etiquetas. No se reprodujo el fallo en el navegador de comprobación y no se atribuye una causa exacta al navegador del usuario. Se reemplaza la cadena de módulos de red por un único script versionado, generado en build para raíz y dist. Se incorpora un aviso de carga con recuperación, que se oculta solo al completar el render inicial. Las pruebas ejecutan el script publicado con distintos estados guardados y almacenamiento bloqueado.
