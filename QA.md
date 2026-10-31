# Validación · v1.0

## Comprobaciones realizadas

- Comprobación de sintaxis de los cuatro módulos y build estático.
- 36 pruebas automáticas: resolución y persistencia de las ocho láminas; respuestas erróneas y parciales; conservación de aciertos al reintentar; intercambio de etiquetas sin duplicación; entradas inválidas; solución asistida; reset; validación de datos almacenados; independencia entre actividades; retirada de completada al editar una respuesta; integridad del catálogo.
- Resolución completa de las ocho actividades en Chrome mediante interacción con sus controles: 53 etiquetas colocadas y resultado completo observado en cada actividad.
- Arrastre real de Flor desde el banco hasta su destino; colocación por selección y pulsación; selección y colocación mediante Enter.
- Comprobación de respuestas acertadas, erróneas y vacías; revisión conservando aciertos; solución asistida; reinicio; navegación y recarga conservando trabajo.
- Revisión visual de las ocho láminas y sus puntos de referencia; ampliación de la flor; temas oscuro y claro; ocultación de descripciones en modo de memoria; ventana de fuentes desde el pie.
- Vistas de 390 y 768 píxeles mediante un iframe de comprobación en el navegador. A 390: sin desbordamiento del documento, lámina completa, etiquetas largas legibles y colocación por selección y pulsación. A 768: sin desbordamiento del documento. No se ha utilizado un dispositivo táctil físico.

## Iteraciones derivadas de fallos observados

1. Se corrigieron referencias de la yema axilar, sépalo, filamento, óvulo, margen de la hoja y tejidos del tallo para situar el punto sobre la estructura correspondiente.
2. Se corrigió una marca de completada que permanecía al mover respuestas; se añadió una prueba de regresión.
3. La vista estrecha reveló un ancho mínimo implícito de la cuadrícula: el menú horizontal ensanchaba toda la página. Se corrigieron las columnas y los mínimos de sus hijos.
4. Se ajustaron altura, tipografía y numeración de los destinos móviles y se eliminó la necesidad de desplazar horizontalmente la lámina.
5. Se añadió acceso a las fuentes desde el pie para mantenerlo disponible cuando se oculta el lateral.

## Alcance

Los esquemas son material de repaso inicial, sin escala. No sustituyen las preparaciones microscópicas ni representan toda la diversidad de plantas. La selección se apoya en el contexto docente recuperado, no en una cotejación literal de todos los guiones originales. No se afirma una revisión independiente por otro botánico. Se han probado Chrome y las anchuras indicadas; no Safari/Firefox ni hardware táctil real.
