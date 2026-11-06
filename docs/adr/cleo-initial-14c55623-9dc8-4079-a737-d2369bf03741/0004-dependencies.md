# Dependencias — estado observado

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

## Observación

Los archivos package.json se copian y se instalan las dependencias usando npm ci con las banderas --no-audit y --no-fund.

Evidencia:

Archivo: `Dockerfile`

> COPY package*.json ./

Archivo: `Dockerfile`

> RUN npm ci --no-audit --no-fund

## Observación

El servidor HTTP se crea utilizando el módulo nativo de Node.js 'node:http'.

Evidencia:

Archivo: `server.js`

> import { createServer } from 'node:http';

## Observación

La lectura de archivos se realiza a través del módulo nativo 'node:fs/promises'.

Evidencia:

Archivo: `server.js`

> import { readFile } from 'node:fs/promises';

## Observación

El archivo de pruebas importa las funciones de creación, validación, persistencia y modificación de tareas desde el módulo de tareas principal.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> import {

Archivo: `tests/unit/tasks.test.js`

> } from '../../src/tasks.js';

## Observación

Se configura el soporte para React mediante la importación y el registro del plugin '@vitejs/plugin-react'.

Evidencia:

Archivo: `vite.config.js`

> import react from '@vitejs/plugin-react';

## Decisiones y límites

Motivación y alternativas históricas: no documentadas por este análisis. Confirmar con el equipo antes de tratar una observación como requisito futuro.
