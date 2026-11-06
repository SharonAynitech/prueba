# Ejecución y despliegue — estado observado

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

## Observación

El archivo de exclusión de Docker define las rutas que se omiten durante el contexto de imagen, incluyendo dependencias de Node.js.

Evidencia:

Archivo: `.dockerignore`

> node_modules

## Observación

El archivo .gitignore excluye directorios generados por dependencias y de artefactos de prueba, como node_modules y playwright-report.

Evidencia:

Archivo: `.gitignore`

> node_modules/

Archivo: `.gitignore`

> test-results/

Archivo: `.gitignore`

> playwright-report/

## Observación

La imagen de construcción inicia con la base node:20-slim y se etiqueta como 'build'.

Evidencia:

Archivo: `Dockerfile`

> FROM node:20-slim AS build

## Observación

El directorio de trabajo se establece en '/app' para ambas etapas del proceso.

Evidencia:

Archivo: `Dockerfile`

> WORKDIR /app

Archivo: `Dockerfile`

> FROM node:20-slim

## Observación

La imagen final utiliza node:20-slim, establece NODE_ENV=production y copia los archivos server.js y package.json, además del directorio dist desde la etapa de construcción.

Evidencia:

Archivo: `Dockerfile`

> FROM node:20-slim

Archivo: `Dockerfile`

> ENV NODE_ENV=production

Archivo: `Dockerfile`

> COPY server.js package.json ./

## Observación

La imagen expone el puerto 8080 y ejecuta node server.js como comando predeterminado.

Evidencia:

Archivo: `Dockerfile`

> EXPOSE 8080

Archivo: `Dockerfile`

> CMD ["node", "server.js"]

## Observación

La documentación indica que la aplicación puede levantarse mediante el comando 'docker compose up --build'.

Evidencia:

Archivo: `README.md`

> docker compose up --build

## Observación

Para el desarrollo sin Docker, el README especifica los comandos 'npm install' y 'npm run build && npm start' para escuchar en http://localhost:8080.

Evidencia:

Archivo: `README.md`

> npm install

Archivo: `README.md`

> npm run build && npm start   # http://localhost:8080

## Observación

El servicio Docker se construye desde la ruta actual y expone el puerto 8080 tanto en el contenedor como en el host.

Evidencia:

Archivo: `docker-compose.yml`

>     build: .

Archivo: `docker-compose.yml`

>     ports: ["8080:8080"]

## Observación

El entorno de ejecución se configura con la variable APP_ENV en desarrollo y define el puerto 8080 mediante la variable PORT.

Evidencia:

Archivo: `docker-compose.yml`

>       APP_ENV: development

Archivo: `docker-compose.yml`

>       PORT: "8080"

## Observación

El healthcheck está programado para ejecutar cada 5 segundos y realizar hasta 15 reintentos.

Evidencia:

Archivo: `docker-compose.yml`

>       interval: 5s

Archivo: `docker-compose.yml`

>       retries: 15

## Observación

El HTML carga la entrada de la aplicación mediante un módulo ECMAScript que apunta a “/src/main.jsx”.

Evidencia:

Archivo: `index.html`

>     <script type="module" src="/src/main.jsx"></script>

## Observación

El script de producción arranca un servidor Node mediante `node server.js`.

Evidencia:

Archivo: `package.json`

>     "start": "node server.js",

## Observación

El servidor está diseñado para exponer un endpoint de salud y servir el build estático de React en el mismo puerto.

Evidencia:

Archivo: `server.js`

> // Servidor mínimo: /health y el build estático de React en un solo puerto.

## Observación

El puerto de escucha se obtiene de la variable de entorno PORT con un valor predeterminado de 8080.

Evidencia:

Archivo: `server.js`

> const PORT = Number(process.env.PORT) || 8080;

## Observación

El servidor se configura para escuchar en la interfaz '0.0.0.0' y registra un mensaje de inicio con el puerto activo.

Evidencia:

Archivo: `server.js`

> server.listen(PORT, '0.0.0.0', () => {

Archivo: `server.js`

>   console.log(`prueba escuchando en http://0.0.0.0:${PORT}`);

## Observación

Se manejan las señales SIGTERM y SIGINT para cerrar el servidor de forma controlada y finalizar el proceso con código de salida 0.

Evidencia:

Archivo: `server.js`

> for (const signal of ['SIGTERM', 'SIGINT']) {

Archivo: `server.js`

>   process.on(signal, () => server.close(() => process.exit(0)));

## Observación

El archivo importa `useEffect` y `useRef` de React para gestionar el enfoque automático del campo de texto al iniciar la edición.

Evidencia:

Archivo: `src/TaskItem.jsx`

> import { useEffect, useRef, useState } from 'react';

Archivo: `src/TaskItem.jsx`

>   const inputRef = useRef(null);

Archivo: `src/TaskItem.jsx`

>     if (editing) inputRef.current?.focus();

## Decisiones y límites

Motivación y alternativas históricas: no documentadas por este análisis. Confirmar con el equipo antes de tratar una observación como requisito futuro.
