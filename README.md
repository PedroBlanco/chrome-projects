# chrome-projects

En app-1, se cargan los estilos y seguramente las imágenes, pero no consigo que algunos scripts se carguen correctamente.

Parece ser que al menos algunos sí se cargan bien, porque podemos ejecutar el siguiente script en la consola y obtener los 

```javascript
$.bootstrapGrowl( '<strong>Test conseguido</strong>', {
  type: 'success',
  align: 'center',
  width: 'auto'
} );
```

Tengo que averiguar dónde y cómo poner los diferentes scripts. Puede que tenga que definirlos como ```bootstrapGrowl``` o similar.

Además, para portar la aplicación de ```gbl-1``` hay que limpiar mucho más el código, para separar las definiciones de funciones del código que debe ejecutarse, pues seguramente esto es donde falla.
