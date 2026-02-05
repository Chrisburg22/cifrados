# 🌍 Dashboard de Crisis Climática - Guía Rápida

## ✅ Integración Completada

Se ha integrado exitosamente un componente React a tu proyecto Astro. Aquí está lo que se ha hecho:

### 📦 Archivos Creados

1. **`src/components/React/ClimateApp.jsx`** (Nuevo)
   - Componente React interactivo con 4 secciones
   - Sidebar de navegación
   - Dashboard educativo sobre cambio climático
   - ~400 líneas de código React

2. **`src/pages/ingenieria-en-energia/energia-renovable/cambio-climatico/index.astro`** (Nuevo)
   - Página Astro que integra el componente React
   - Usa la directiva `client:load` para hidratación
   - Ruta: `/ingenieria-en-energia/energia-renovable/cambio-climatico/`

### 🔧 Configuraciones Actualizadas

1. **`astro.config.mjs`**
   - Agregado: `import react from '@astrojs/react'`
   - Agregado: `react()` en integrations

2. **`package.json`**
   - ✅ @astrojs/react: ^4.4.2
   - ✅ react: ^19.2.4
   - ✅ react-dom: ^19.2.4
   - ✅ lucide-react: ^0.563.0

3. **`src/layouts/Layout.astro`**
   - Mejorado para soportar props de título
   - Reset CSS global agregado

### 🚀 Cómo Iniciar

```bash
# Desarrollo
npm run dev
# Luego visita: http://localhost:3000/ingenieria-en-energia/energia-renovable/cambio-climatico/

# Producción
npm run build
npm run preview
```

### 📊 Secciones del Dashboard

| Sección | Descripción |
|---------|-------------|
| **Inicio** | Presentación y navegación al resto de secciones |
| **Ciencia Climática** | Datos de CO₂, dinámica radiativa, consenso científico |
| **México y Política** | Estrategia ENCC, vulnerabilidades regionales, consecuencias |
| **Renovables** | Matriz energética limpia, mitigación de emisiones |

### 🎨 Características Técnicas

✨ **Interactividad**
- Navegación por tabs
- Hover effects
- Animaciones suaves con Tailwind

📱 **Responsivo**
- Sidebar colapsable en mobile
- Grid layouts adaptables
- Fuente legible en todos los dispositivos

🌓 **Tema**
- Soporte para dark mode
- Colores con Tailwind CSS

### 💡 Cómo Personalizar

#### Cambiar Colores
En `ClimateApp.jsx`, busca las clases de Tailwind como:
- `bg-emerald-500` → Cambia a `bg-blue-500`
- `text-orange-700` → Cambia a `text-red-700`

#### Actualizar Datos
Modifica el array `CO2Data`:
```javascript
const CO2Data = [
  { year: 1960, value: 315 },
  { year: 1980, value: 338 },
  // Agrega más años/datos aquí
];
```

#### Agregar Nueva Sección
1. Crea un componente tipo `const NewSection = () => (...)`
2. Agrega un botón en la navegación
3. Agrega la sección al `return` principal

### 📚 Recursos

- [Documentación Astro - React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

### ⚙️ Estructura de Carpetas

```
src/
├── components/
│   ├── React/
│   │   └── ClimateApp.jsx ← Tu componente React
│   └── Vue/
├── pages/
│   ├── ingenieria-en-energia/
│   │   └── energia-renovable/
│   │       └── cambio-climatico/
│   │           └── index.astro ← Tu nueva página
│   ├── index.astro
│   └── ...
└── layouts/
    └── Layout.astro ← Mejorado
```

### ✅ Verificación

✅ Compilación exitosa: `npm run build`
✅ Página generada: `/dist/ingenieria-en-energia/energia-renovable/cambio-climatico/index.html`
✅ Componente React hidratado en el cliente

---

**¡Listo para usar! 🎉**
