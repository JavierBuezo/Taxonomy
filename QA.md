# Validación · v1.1

## Cambio solicitado

Se retiran las actividades independientes de semilla y aparato estomático. Se conservan seis láminas y 44 etiquetas, con ilustraciones vectoriales originales completamente redibujadas. El estoma sigue presente como estructura del corte de hoja.

## Verificación de esta versión

- Sintaxis, build estático y 32 pruebas automáticas aprobadas. Incluyen las seis actividades, estados parciales, intercambio de etiquetas, revisión de errores, persistencia y migración desde una actividad retirada.
- Resolución completa de las seis actividades en Chrome mediante los controles: 44 etiquetas, con resultado completo observado en cada actividad.
- Arrastre real de Xilema a su destino en el nuevo corte de raíz; colocación mediante Enter en la empalizada; corrección parcial y reinicio.
- Revisión visual de todas las láminas con solución y ampliación del corte foliar. Los puntos de identificación se revisaron sobre cada dibujo.
- Iteración del tejido esponjoso: se sustituyeron las células aisladas repetidas por una malla irregular conectada con lagunas en las uniones celulares y cámara subestomática.
- Iteración de la hoja externa: se recortó la nerviación al contorno del limbo para evitar trazos externos.
- Progreso ajustado a seis actividades; la prueba de migración comprueba que las actividades retiradas no quedan seleccionadas ni se conservan en las sesiones válidas.

## Alcance

Los colores son didácticos, sin correspondencia con una tinción. Son esquemas de tipos anatómicos concretos y no microfotografías. Los cambios se concentran en las figuras; las interacciones y el diseño adaptable proceden de la versión anterior. No se afirma una revisión independiente por otro botánico ni pruebas en dispositivos táctiles físicos.

## Reparación de arranque v1.1.1

- La página de GitHub Pages funcionaba en la comprobación inicial; no se pudo reproducir el fallo del usuario ni identificar su causa exacta con la captura.
- El estado de la captura corresponde a una inicialización incompleta: no aparecen menú, título dinámico, etiquetas ni lámina.
- Se sustituye la carga de módulos independientes por un único script clásico versionado, generado para raíz y dist. Se evita depender de que el navegador complete las importaciones de cuatro módulos.
- Aviso de inicio y recuperación ante errores de carga o de ejecución, con botón para recargar sin borrar progreso.
- 42 pruebas pasan, incluyendo ejecución real del script generado en un contexto DOM mínimo: carga limpia, JSON inválido, null, formato vacío, actividad retirada, sesiones null, flor guardada, almacenamiento bloqueado y recuperación de errores.
- Navegación real en Chrome por las seis actividades: en todas aparecen SVG, destinos y etiquetas (44 en total). Colocación y corrección de Xilema en raíz verificadas.

- Simulación de script ausente en el navegador: se reprodujo la pantalla sin actividades y se verificó que el aviso de recuperación aparece inmediatamente. La página de prueba no se incluye en la publicación.
