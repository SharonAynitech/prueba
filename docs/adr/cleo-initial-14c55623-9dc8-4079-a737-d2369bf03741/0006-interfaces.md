# Interfaces e integraciones — estado observado

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

## Observación

Según el README, la aplicación se abre en http://localhost:8080 y no requiere configuración ni login.

Evidencia:

Archivo: `README.md`

> Abre http://localhost:8080. No requiere configuración ni login.

## Observación

El README documenta que el endpoint GET /health responde con un JSON que incluye el estado 'ok'.

Evidencia:

Archivo: `README.md`

> - `GET /health` responde `{"status":"ok"}`.

## Observación

El endpoint '/health' devuelve un estado 200 con un cuerpo JSON que indica { status: 'ok' }.

Evidencia:

Archivo: `server.js`

>   if (pathname === '/health') {

Archivo: `server.js`

>     res.writeHead(200, { 'Content-Type': 'application/json' });

Archivo: `server.js`

>     res.end(JSON.stringify({ status: 'ok' }));

## Observación

La aplicación React importa una API de tareas desde un módulo local './tasks.js' que incluye funciones para crear, eliminar, validar, cargar, guardar y actualizar el estado de las tareas.

Evidencia:

Archivo: `src/App.jsx`

> import {

Archivo: `src/App.jsx`

>   createTask,

Archivo: `src/App.jsx`

>   deleteTask,

## Observación

La lógica de persistencia de las tareas se delega en la función `saveTasks`, que se invoca dentro de la función de control `commit` antes de actualizar el estado de React y emitir un aviso.

Evidencia:

Archivo: `src/App.jsx`

>   function commit(next, text) {

Archivo: `src/App.jsx`

>     saveTasks(next);

## Observación

La validación de título exige que sea un string con longitud positiva tras aplicar trim.

Evidencia:

Archivo: `src/tasks.js`

> export function isValidTitle(titulo) {

Archivo: `src/tasks.js`

>   return typeof titulo === 'string' && titulo.trim().length > 0;

## Observación

updateTaskTitle y toggleTaskCompleted devuelven nuevas listas de tareas inmutables mediante map, validando el título en el primer caso.

Evidencia:

Archivo: `src/tasks.js`

> export function updateTaskTitle(tasks, id, titulo) {

Archivo: `src/tasks.js`

>   if (!isValidTitle(titulo)) throw new Error('El título es obligatorio');

Archivo: `src/tasks.js`

>   return tasks.map((task) => (task.id === id ? { ...task, titulo: titulo.trim() } : task));

## Observación

deleteTask elimina la tarea correspondiente filtrando la lista por id.

Evidencia:

Archivo: `src/tasks.js`

> export function deleteTask(tasks, id) {

Archivo: `src/tasks.js`

>   return tasks.filter((task) => task.id !== id);

## Observación

La ruta /health se espera que devuelva estado HTTP 200 con el cuerpo JSON { status: 'ok' }.

Evidencia:

Archivo: `tests/e2e/inicio.spec.js`

>   expect(res.status()).toBe(200);

Archivo: `tests/e2e/inicio.spec.js`

>   expect(await res.json()).toEqual({ status: 'ok' });

## Decisiones y límites

Motivación y alternativas históricas: no documentadas por este análisis. Confirmar con el equipo antes de tratar una observación como requisito futuro.
