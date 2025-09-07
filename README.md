
#  Technical Test - React + Vite

Este proyecto corresponde a una **prueba técnica** en la cual se consume un solo endpoint de una API externa.  
Fue desarrollado con **React**, **Vite**, **TailwindCSS**, **TanStack Query**, **Axios** y se despliega en **Netlify**.  

---

##  Tecnologías principales

- [React 19](https://react.dev/) – Librería principal para la construcción de interfaces.
- [Vite 7](https://vitejs.dev/) – Herramienta de build y servidor de desarrollo.
- [TailwindCSS 4](https://tailwindcss.com/) – Framework de estilos CSS.
- [TanStack Query](https://tanstack.com/query/latest) – Manejo de estados asíncronos y caché de datos.
- [Axios](https://axios-http.com/) – Cliente HTTP para el consumo de APIs.
- [React Router DOM](https://reactrouter.com/) – Manejo de rutas.
- [Framer Motion](https://www.framer.com/motion/) – Animaciones.
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – Linter y formateo de código.

---

## Requisitos previos

- Última versión de **Node.js** instalada (mínimo recomendada: `>=20.x`).

---

##  Instalación y ejecución

Clona este repositorio e instala las dependencias con **npm**:

```bash
## Clonar el repositorio
git clone https://github.com/usuario/technical_test.git

# Entrar en el proyecto
cd technical_test

# Instalar dependencias
npm install

# Correr proyecto
npm run dev

```
# Estructura del proyecto
```bash
technical_test/
│   ErrorPage.tsx         # Página de error
│   index.css             # Estilos globales
│   main.tsx              # Punto de entrada principal
│   vite-env.d.ts         # Tipos de Vite
│
├───api
│       productsApi.ts    # Configuración y llamadas a la API
│
├───assets
│   ├───icons             # Íconos SVG + proveedor de íconos
│   └───images            # Imágenes + proveedor de imágenes
│
├───helpers
│       truncatePrice.ts  # Función helper para formatear precios
│
├───product
│   ├───actions           # Llamadas encapsuladas a la API
│   ├───components        # UI de productos (cards, carousels, etc.)
│   ├───hooks             # Hooks personalizados (ej: useProducts)
│   ├───interfaces        # Tipados de TypeScript
│   ├───layout            # Layout principal (LayoutWeb)
│   └───pages             # Páginas: Home, Contracts
│
├───router
│       paths.tsx         # Definición de rutas
│       router.tsx        # Configuración de React Router
│
└───shared
    ├───components        # Componentes compartidos (Header, Aside, Footer, etc.)
    └───hooks             # Hooks generales reutilizables

```

#  Despliegue en Netlify

- Este proyecto está configurado para desplegarse en Netlify.
- Cada push en la rama principal dispara un build automático que:

