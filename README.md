# Pastelería V3 - Móvil mejorado + Estética

## Cambios de esta versión

### 1. Botón ADMIN oculto
- Puntito 14px esquina INFERIOR IZQUIERDA (left:10px bottom:10px)
- Opacidad 7% oculto, hover crece a 30px y se ve
- En celu 20px, al tocar crece

### 2. Visibilidad móvil mejorada (tu captura)
- Botón WhatsApp del nav ahora NO es transparente: en móvil es color primario sólido con sombra, súper visible
- Mejor contraste y tamaño táctil 44px mínimo
- Navegación más fluida, sin saltos

### 3. Fluidez
- Transiciones cubic-bezier, will-change, lazy loading imágenes
- Animaciones popIn, fadeIn
- Scroll suave al cambiar categoría
- Botones con hover translateY y active
- Modal bloquea scroll del fondo

### 4. Hero Card "Dulce & delicado" - CORREGIDO
- ANTES: corazón con position:absolute top:70px pegado al texto
- AHORA: estructura flex con gap, icono separado arriba con 32px margen, texto con espacio generoso
- Corazón ahora es div independiente centrado, no pegado
- Más respiración: padding, line-height 1.1

### 5. Letras más grandes
- Body 16px, títulos 58px, descripciones 17px

### 6. Consultar -> WhatsApp
- Todo "Consultar" es link a wa.me con mensaje predefinido

### 7. Subir foto desde celu/PC
- Input file con capture="environment" abre cámara en móvil

Clave: luc26

Ubicación admin:
```
· <- abajo izq 10px/10px
```
