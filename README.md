# chrome-projects

Este repositorio contiene varios pequeños proyectos relacionados con el uso de Generadores Yeoman de aplicaciones y extensiones para Google Chrome.

El proyecto más desarrollado es una prueba de portabilidad de https://github.com/PedroBlanco/gift-editor para construir una aplicación Chrome. Es un trabajo experimental y no se asegura su desarrollo continuado ni su utilidad; esta aplicación Chrome es sólo una instantánea de prueba.

## Instalación

1. Descargar [gift app 1-5.crx](https://github.com/PedroBlanco/chrome-projects/blob/master/gift-app-1/package/gift%20app%201-5.crx?raw=true) (es la versión actual).
2. Abrir en Google Chrome (o Chromium) la ventana de extensiones, mediante el menú "Más herramientas" -> "Extensiones", o introduciendo en una pestaña nueva la dirección ```chrome://extensions/```
3. Arrastrar el archivo ```gift app 1-5.crx``` que nos hemos descargado al interior de esta pestaña.
4. En la pequeña ventana emergente que nos aparece "Instalar nueva aplicación", pulsar sobre "Añadir".
5. Debería aparecer una nueva entrada en la páginas de extensiones (con el fondo en gris).
6. Para ejecutar la aplicación, pulsamos (normalmente en una pestaña nueva) en la barra de marcadores el botón de "Aplicaciones" (con un icono de 3x3 puntos cuadrados de colores), o podemos escribir en la barra de direcciones ```chrome://apps```. Debería aparecer la aplicación "GIFT Editor".

Para más información sobre añadir extensiones foráneas:
*  https://support.google.com/chrome_webstore/answer/2664769?p=crx_warning&rd=1

### Actualización

Para actualizar la aplicación sólo hay que seguir los pasos 1-3, pues tras arrastrar el nuevo archivo la aplicación se actualiza automáticamente.


## Uso

Por el momento la aplicación contiene muchos elementos que no hacen nada.

Lo que debería funcionar:
* Ocultar/mostrar los paneles laterales.
* Convertir el contenido del texto bajo "Texto GIFT a procesar" a preguntas en el panel central.
* Reordenar (mediante el arrastre), desplegar y recoger las preguntas en el panel central.
* En el menú de "Lista de preguntas":
  *  Eliminar todas las preguntas (con diálogo de confirmación).
* Eliminar preguntas individuales (con diálogo de confirmación).
* Avisos emergentes temporales en la parte superior de la pantalla tras realizar algunas de las acciones.

Por ahora la aplicación no tiene barras de desplazamiento, por lo que para ver las partes que no se muestran directamente (parte inferior de la página) se puede usar el botón central del ratón.
