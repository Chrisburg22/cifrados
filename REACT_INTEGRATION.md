# Integración React en Astro - Dashboard de Crisis Climática

## 📋 Cambios Realizados

### 1. **Dependencias Instaladas**
Se han instalado las siguientes dependencias:
- `@astrojs/react` - Integración de React en Astro
- `react` - Librería React
- `react-dom` - DOM de React
- `lucide-react` - Librería de iconos SVG

### 2. **Configuración de Astro Actualizada**
El archivo `astro.config.mjs` ha sido actualizado para incluir la integración de React:

```javascript
import react from '@astrojs/react';

export default defineConfig({
  // ... otras configuraciones
  integrations: [vue(), react()]
});
```

### 3. **Componente React Creado**
- **Ubicación:** `src/components/React/ClimateApp.jsx`
- **Descripción:** Componente que implementa un dashboard interactivo sobre crisis climática
- **Características:**
  - Navegación por tabs interactivos
  - Dashboard educativo sobre cambio climático
  - Ciencia climática e impacto en México
  - Soluciones en energías renovables
  - Diseño responsivo con Tailwind CSS
  - Modo oscuro/claro soportado

### 4. **Nueva Página Astro Creada**
- **Ubicación:** `src/pages/clima.astro`
- **Ruta:** `/clima/`
- **Descripción:** Página que integra el componente React

```astro
---
import Layout from '../layouts/Layout.astro';
import ClimateApp from '../components/React/ClimateApp.jsx';
---

<Layout title="Dashboard de Crisis Climática">
  <ClimateApp client:load />
</Layout>
```

**Nota importante:** Se utiliza la directiva `client:load` para hidratar el componente React en el cliente.

### 5. **Layout Actualizado**
El archivo `src/layouts/Layout.astro` ha sido mejorado para:
- Soportar props de título dinámico
- Mejor compatibilidad con Tailwind CSS
- Reset CSS global

## 🚀 Cómo Usar

### Desarrollo
```bash
npm run dev
```
Accede a `http://localhost:3000/clima/` para ver el dashboard

### Producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── React/
│   │   └── ClimateApp.jsx (Nuevo)
│   └── Vue/
│       ├── CryptoForm.vue
│       ├── CryptoInfo.vue
│       ├── CryptoResult.vue
│       └── Welcome.vue
├── layouts/
│   └── Layout.astro (Actualizado)
├── pages/
│   ├── index.astro
│   ├── clima.astro (Nuevo)
│   ├── blowfish.html
│   └── simulador-blowfish.html
├── composables/
│   └── useCrypto.js
├── styles/
│   └── global.css
└── utils/
    └── crypto.ts
```

## ⚙️ Directivas de Hidratación React

En Astro, cuando usas componentes React, necesitas especificar cómo deben hidratarse:

- `client:load` - Hidrata el componente apenas carga la página
- `client:idle` - Hidrata cuando el navegador esté libre
- `client:visible` - Hidrata cuando el componente sea visible
- `client:only="react"` - Solo renderiza en el cliente (útil para componentes sin SSR)

En este caso, usamos `client:load` porque el dashboard es interactivo desde el inicio.

## ✨ Características del Dashboard

### Secciones Disponibles:
1. **Inicio** - Presentación y navegación principal
2. **Ciencia Climática** - Datos sobre CO₂ y dinámica del clima
3. **Impacto en México** - Políticas (ENCC/PECC) y vulnerabilidades regionales
4. **Energías Renovables** - Soluciones de mitigación y matriz energética limpia

### Tecnologías Utilizadas:
- React 19
- Tailwind CSS 4
- Lucide React (iconos)
- Astro 5

## 🎨 Personalización

Puedes personalizar el componente editando `src/components/React/ClimateApp.jsx`:
- Cambiar colores en las clases de Tailwind
- Actualizar datos en el array `CO2Data`
- Modificar contenido de las secciones
- Agregar nuevas secciones siguiendo el mismo patrón

## 📝 Notas

- Las advertencias sobre imports no utilizados (como `Wind`, `useMemo`) pueden ignorarse o limpiarse si no se usan
- El componente está optimizado para mobile y desktop
- Utiliza animaciones de Tailwind CSS para transiciones suaves
