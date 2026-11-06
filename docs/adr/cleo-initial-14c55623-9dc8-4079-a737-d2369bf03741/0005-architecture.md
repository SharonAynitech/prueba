# Arquitectura — estado observado

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

## Observación

Los archivos de configuración de la interfaz, index.html y vite.config.js, junto con el directorio src, se copian antes de ejecutar npm run build.

Evidencia:

Archivo: `Dockerfile`

> COPY index.html vite.config.js ./

Archivo: `Dockerfile`

> COPY src ./src

Archivo: `Dockerfile`

> RUN npm run build

## Observación

El README describe la aplicación como una lista de tareas personal, local y minimalista construida con React y persistencia en el navegador.

Evidencia:

Archivo: `README.md`

> Lista de tareas personal, local y minimalista (React, persistencia en el navegador).

## Observación

El README indica que se puede usar la variable de entorno 'BASE_URL' para apuntar a otra dirección en los tests.

Evidencia:

Archivo: `README.md`

> Usa `BASE_URL` para apuntar a otra dirección.

## Observación

El HTML incluye un contenedor raiz con id “root” destinado a la renderización de la aplicación cliente.

Evidencia:

Archivo: `index.html`

>     <div id="root"></div>

## Observación

El proyecto utiliza ES Modules, React 18.3.1 y Vite 5.4.11 con el plugin de React para el desarrollo y la construcción del frontend.

Evidencia:

Archivo: `package.json`

>   "type": "module",

Archivo: `package.json`

>     "dev": "vite",

Archivo: `package.json`

>     "build": "vite build",

## Observación

Las dependencias de desarrollo incluyen Vite, el plugin de Vite para React y Playwright para pruebas e2e.

Evidencia:

Archivo: `package.json`

>   "devDependencies": {

Archivo: `package.json`

>     "@playwright/test": "1.56.1",

Archivo: `package.json`

>     "@vitejs/plugin-react": "4.3.4",

## Observación

El directorio de destino para los archivos estáticos ('dist') se resuelve usando 'node:url' y 'node:path' respecto a la ubicación del archivo script.

Evidencia:

Archivo: `server.js`

> import { extname, join, normalize } from 'node:path';

Archivo: `server.js`

> import { fileURLToPath } from 'node:url';

Archivo: `server.js`

> const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');

## Observación

Se aplica una validación de ruta para impedir el acceso a archivos fuera del directorio 'dist', devolviendo un error 403 si el archivo normalizado no inicia con esa ruta.

Evidencia:

Archivo: `server.js`

>   const file = normalize(join(DIST, decodeURIComponent(pathname)));

Archivo: `server.js`

>   if (!file.startsWith(DIST)) {

Archivo: `server.js`

>     res.writeHead(403).end();

## Observación

Si el archivo solicitado no existe, el servidor intenta servir el archivo 'index.html' para soportar rutas del cliente de lado del servidor.

Evidencia:

Archivo: `server.js`

>   } catch {

Archivo: `server.js`

>     // Rutas del cliente: siempre devuelve la app.

Archivo: `server.js`

>       await sendFile(res, join(DIST, 'index.html'));

## Observación

La aplicación de React se monta mediante createRoot en el nodo del DOM con id 'root', envolviendo el componente App con StrictMode.

Evidencia:

Archivo: `src/main.jsx`

> createRoot(document.getElementById('root')).render(

Archivo: `src/main.jsx`

>   <StrictMode>

Archivo: `src/main.jsx`

>     <App />

## Observación

El módulo se declara como un modelo de tareas que usa persistencia local síncrona mediante localStorage.

Evidencia:

Archivo: `src/tasks.js`

> // Modelo y persistencia local de tareas (localStorage, escritura síncrona).

## Observación

newId prioriza globalThis.crypto.randomUUID y recurre a una combinación de Date.now y Math.random si no está disponible.

Evidencia:

Archivo: `src/tasks.js`

> function newId() {

Archivo: `src/tasks.js`

>   if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

Archivo: `src/tasks.js`

>   return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

## Observación

El proyecto utiliza Vite como herramienta de desarrollo y empaquetado, como se indica en la importación de 'defineConfig' desde el paquete 'vite'.

Evidencia:

Archivo: `vite.config.js`

> import { defineConfig } from 'vite';

## Observación

La configuración predeterminada de Vite se exporta para aplicar el plugin de React en el proyecto.

Evidencia:

Archivo: `vite.config.js`

> export default defineConfig({

Archivo: `vite.config.js`

>   plugins: [react()],

## Decisiones y límites

Motivación y alternativas históricas: no documentadas por este análisis. Confirmar con el equipo antes de tratar una observación como requisito futuro.
