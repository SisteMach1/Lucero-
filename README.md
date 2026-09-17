# Pastelería & Delicatessen — GitHub Pages

Sitio web editable para un emprendimiento de pastelería y delicatessen.

## Incluye

- Catálogo elegante y responsive.
- Foto, descripción, categoría y precio/consulta para cada producto.
- Botón **Hacer pedido** que abre WhatsApp con el producto escrito.
- Botones generales para contactar por WhatsApp.
- Panel **Admin** discreto.
- Clave inicial: `luc26`
- Edición de textos, marca, WhatsApp, colores y productos.
- Los cambios del panel se guardan en `localStorage` del navegador.
- Sin servidor ni base de datos: funciona como sitio estático en GitHub Pages.

## Cómo subirlo a GitHub

1. Creá un repositorio nuevo en GitHub.
2. Subí `index.html`, `style.css`, `app.js` y `README.md` a la raíz.
3. Entrá en **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**.
5. Elegí la rama `main` y carpeta `/ (root)`.
6. Guardá y esperá a que GitHub publique el sitio.

## Cómo personalizarlo

Abrí tu página y tocá **Admin** (es intencionalmente discreto: tiene 8% de opacidad hasta pasar el mouse).

Clave: `luc26`

Desde el panel podés cambiar:

- Nombre e inicial de la marca.
- Frases y textos.
- Número de WhatsApp.
- 8 colores del diseño.
- Productos.
- Categorías.
- Descripciones.
- Precio o texto "Consultar".
- URL de cada foto.

### Importante sobre las fotos

Para usar una imagen en un producto, colocá una URL directa a una imagen pública, por ejemplo una imagen alojada en tu propio repositorio o en un servicio de imágenes.

### Importante sobre el panel Admin

Esta versión es 100% estática y la clave se valida en el navegador. Es adecuada para personalización de un sitio estático, pero **no debe considerarse una autenticación de seguridad real** para información confidencial. Si necesitás un panel verdaderamente privado con usuarios, contraseñas seguras y base de datos, hace falta un backend.
