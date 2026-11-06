# Pruebas declaradas — estado observado

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

## Observación

El archivo .cleo/verification.json define criterios de aceptación automatizados para las historias de usuario US-01-1, US-02-1, US-02-2, US-02-3 y US-02-4.

Evidencia:

Archivo: `.cleo/verification.json`

>   "stories": {

Archivo: `.cleo/verification.json`

>     "US-01-1": {

Archivo: `.cleo/verification.json`

>     "US-02-1": {

## Observación

Las directivas de ignorado en el contexto de Docker indican la exclusión de artefactos generados por las pruebas de Playwright, como los resultados y los informes.

Evidencia:

Archivo: `.dockerignore`

> test-results

Archivo: `.dockerignore`

> playwright-report

## Observación

La ejecución de tests unitarios se documenta en el README mediante el comando 'npm run test:unit'.

Evidencia:

Archivo: `README.md`

> npm run test:unit

## Observación

Los tests E2E requieren la aplicación levantada en el puerto 8080 y se ejecutan con 'npm run test:e2e', utilizando 'npx playwright install chromium' como paso previo.

Evidencia:

Archivo: `README.md`

> Con la app levantada en el puerto 8080:

Archivo: `README.md`

> npx playwright install chromium

Archivo: `README.md`

> npm run test:e2e

## Observación

La comprobación de salud (healthcheck) ejecuta una instrucción `node` que realiza una petición a `http://localhost:8080/health` y cierra el proceso según el estado de la respuesta.

Evidencia:

Archivo: `docker-compose.yml`

>       test: ["CMD", "node", "-e", "fetch('http://localhost:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

## Observación

Se definen scripts para ejecutar pruebas de extremo a extremo con Playwright y pruebas de unidad usando el módulo nativo de pruebas de Node.js.

Evidencia:

Archivo: `package.json`

>     "test:e2e": "playwright test",

Archivo: `package.json`

>     "test:unit": "node --test \"tests/unit/*.test.js\""

## Observación

La configuración de Playwright usa el paquete '@playwright/test' para definir la configuración de las pruebas.

Evidencia:

Archivo: `playwright.config.js`

> import { defineConfig } from '@playwright/test';

## Observación

El directorio de pruebas está configurado en './tests/e2e'.

Evidencia:

Archivo: `playwright.config.js`

>   testDir: './tests/e2e',

## Observación

La URL base predeterminada para las pruebas es 'http://localhost:8080', a menos que se defina la variable de entorno BASE_URL.

Evidencia:

Archivo: `playwright.config.js`

>     baseURL: process.env.BASE_URL || 'http://localhost:8080',

## Observación

El elemento principal `li` y varios subcomponentes incluyen atributos `data-testid` como `task-item`, `task-save` y `task-toggle` para facilitar el uso con herramientas de pruebas.

Evidencia:

Archivo: `src/TaskItem.jsx`

>       data-testid="task-item"

Archivo: `src/TaskItem.jsx`

>             <button type="submit" data-testid="task-save">

Archivo: `src/TaskItem.jsx`

>             data-testid="task-toggle"

## Observación

El archivo es una prueba E2E escrita con Playwright que importa el módulo de pruebas desde '@playwright/test'.

Evidencia:

Archivo: `tests/e2e/completar-tarea.spec.js`

> import { test, expect } from '@playwright/test';

## Observación

El archivo corresponde a la historia de usuario US-02-3, cuyo objetivo es marcar una tarea como completada.

Evidencia:

Archivo: `tests/e2e/completar-tarea.spec.js`

> // US-02-3: marcar una tarea como completada.

## Observación

Los elementos de la lista de tareas utilizan el atributo 'data-testid' con los valores 'task-item' y 'task-title' para su identificación en las pruebas.

Evidencia:

Archivo: `tests/e2e/completar-tarea.spec.js`

>   const item = page.getByTestId('task-item');

Archivo: `tests/e2e/completar-tarea.spec.js`

>   const title = item.getByTestId('task-title');

## Observación

El segundo test verifica que, tras recargar la página, el estado completado de una tarea persiste mientras que las tareas pendientes continúan en su estado original.

Evidencia:

Archivo: `tests/e2e/completar-tarea.spec.js`

> test('criterio 1: la tarea completada sigue completada al recargar', async ({ page }) => {

Archivo: `tests/e2e/completar-tarea.spec.js`

>   await page.reload();

Archivo: `tests/e2e/completar-tarea.spec.js`

>   await expect(done.getByRole('checkbox')).toBeChecked();

## Observación

La prueba end-to-end verifica que una tarea creada con el título 'Comprar leche' se renderiza con un elemento de fecha visible y no vacío, y que persiste tras recargar la página en la ruta '/'.

Evidencia:

Archivo: `tests/e2e/crear-tarea.spec.js`

> import { test, expect } from '@playwright/test';

Archivo: `tests/e2e/crear-tarea.spec.js`

> test('criterio 0: una tarea con título aparece con su fecha y persiste al recargar', async ({ page }) => {

Archivo: `tests/e2e/crear-tarea.spec.js`

>   await page.goto('/');

## Observación

Las pruebas asumen que la interfaz expone un formulario con un campo de entrada identificado por la etiqueta 'Título' y un botón con el rol y nombre 'Crear'.

Evidencia:

Archivo: `tests/e2e/crear-tarea.spec.js`

>   await page.goto('/');

Archivo: `tests/e2e/crear-tarea.spec.js`

>   await page.getByLabel('Título').fill('Comprar leche');

Archivo: `tests/e2e/crear-tarea.spec.js`

>   await page.getByRole('button', { name: 'Crear' }).click();

## Observación

Las pruebas evalúan la validación de la entrada rechazando títulos vacíos o conformados únicamente por espacios, verificando la aparición de un elemento con el rol 'alert' que contiene el texto 'El título es obligatorio' y que no se crea ninguna tarea.

Evidencia:

Archivo: `tests/e2e/crear-tarea.spec.js`

> test('criterio 1: un título vacío o solo con espacios se rechaza', async ({ page }) => {

Archivo: `tests/e2e/crear-tarea.spec.js`

>   await page.goto('/');

Archivo: `tests/e2e/crear-tarea.spec.js`

>   const title = page.getByLabel('Título');

## Observación

El archivo es una suite de pruebas E2E que utiliza el marco '@playwright/test' y define la referencia 'US-02-2' para la edición de títulos.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

> import { test, expect } from '@playwright/test';

Archivo: `tests/e2e/editar-tarea.spec.js`

> // US-02-2: editar el título de una tarea.

## Observación

Se define una función auxiliar 'crearTarea' que interactúa con un campo 'Título' (exacto) y un botón 'Crear' para generar una tarea en la interfaz.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

> async function crearTarea(page, titulo) {

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await page.getByLabel('Título', { exact: true }).fill(titulo);

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await page.getByRole('button', { name: 'Crear' }).click();

## Observación

El criterio 0 verifica que el título editado ('Comprar pan') persista al recargar la página y que el campo de edición desaparezca tras guardar, navegando a la ruta '/'.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

> test('criterio 0: el título editado se muestra y persiste al recargar', async ({ page }) => {

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await page.goto('/');

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await item.getByRole('button', { name: 'Guardar' }).click();

## Observación

La prueba de edición inicializa el flujo mediante el botón 'Editar' y valida que el campo 'Editar título' contenga el valor anterior antes de modificarlo.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await item.getByRole('button', { name: 'Editar' }).click();

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await expect(item.getByLabel('Editar título')).toHaveValue('Comprar leche');

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await item.getByLabel('Editar título').fill('Comprar pan');

## Observación

El criterio 1 comprueba que al intentar guardar un título vacío (solo espacios), el sistema muestra el mensaje 'El título es obligatorio' y mantiene visible el campo de edición.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

> test('criterio 1: un título vacío bloquea la edición y se conserva el anterior', async ({ page }) => {

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await item.getByLabel('Editar título').fill('   ');

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await expect(item.getByRole('alert')).toHaveText('El título es obligatorio');

## Observación

Al cancelar la edición con título inválido, el sistema restaura el título original ('Comprar leche') y persiste dicho valor tras recargar la página.

Evidencia:

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await item.getByRole('button', { name: 'Cancelar' }).click();

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await expect(page.getByTestId('task-title')).toHaveText(['Comprar leche']);

Archivo: `tests/e2e/editar-tarea.spec.js`

>   await page.reload();

## Observación

El archivo de pruebas define un caso e2e que verifica que al confirmar la eliminación, la tarea desaparece de inmediato.

Evidencia:

Archivo: `tests/e2e/eliminar-tarea.spec.js`

> test('criterio 0: al confirmar la eliminación la tarea desaparece de inmediato', async ({ page }) => {

## Observación

Los tests e2e utilizan la librería '@playwright/test' para la automatización y la verificación.

Evidencia:

Archivo: `tests/e2e/eliminar-tarea.spec.js`

> import { test, expect } from '@playwright/test';

## Observación

La suite de pruebas E2E utiliza Playwright para verificar la respuesta de la ruta /health.

Evidencia:

Archivo: `tests/e2e/inicio.spec.js`

> import { test, expect } from '@playwright/test';

Archivo: `tests/e2e/inicio.spec.js`

> test('GET /health responde 200 con {"status":"ok"}', async ({ request }) => {

Archivo: `tests/e2e/inicio.spec.js`

>   const res = await request.get('/health');

## Observación

El módulo de pruebas utiliza el módulo nativo de pruebas de Node y sus utilidades de aserción estricta.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> import { test } from 'node:test';

Archivo: `tests/unit/tasks.test.js`

> import assert from 'node:assert/strict';

## Observación

Las pruebas implementan una simulación de almacenamiento en memoria para aislar la lógica de persistencia.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> function memoryStorage() {

Archivo: `tests/unit/tasks.test.js`

>     setItem: (k, v) => data.set(k, String(v)),

## Observación

La función isValidTitle se valida para rechazar títulos vacíos o compuestos únicamente por caracteres de espacio.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('isValidTitle rechaza vacío y solo espacios', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.equal(isValidTitle('   '), false);

## Observación

La función createTask se prueba para recortar el título, asignar una fecha de creación, establecer el estado inicial pendiente y generar un identificador único.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('createTask recorta el título, registra la fecha y empieza pendiente', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.equal(task.completada, false);

Archivo: `tests/unit/tasks.test.js`

>   assert.ok(task.id);

## Observación

Las funciones saveTasks y loadTasks se prueban para verificar la capacidad de serialización y deserialización de la lista de tareas en el almacenamiento proporcionado.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('saveTasks y loadTasks hacen ida y vuelta', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(loadTasks(storage), tasks);

## Observación

La función loadTasks está diseñada para retornar una lista vacía tanto en ausencia de datos como ante un formato de datos corrupto en la clave de almacenamiento.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('loadTasks devuelve lista vacía con datos ausentes o corruptos', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(loadTasks(storage), []);

## Observación

La función updateTaskTitle se evalúa por inmutabilidad, modificando el título de la tarea indicada sin alterar el objeto original o el resto de la lista.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('updateTaskTitle cambia solo el título de la tarea indicada', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(next, [a, { ...b, titulo: 'Tres' }]);

Archivo: `tests/unit/tasks.test.js`

>   assert.equal(b.titulo, 'Dos');

## Observación

La función updateTaskTitle se comprueba que lance una excepción al intentar actualizar con un título inválido, manteniendo el estado original.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('updateTaskTitle lanza con título vacío y no modifica nada', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.throws(() => updateTaskTitle(tasks, tasks[0].id, '   '));

Archivo: `tests/unit/tasks.test.js`

>   assert.equal(tasks[0].titulo, 'Uno');

## Observación

La función toggleTaskCompleted se verifica por su capacidad de alternar el estado de completado de la tarea indicada manteniendo inmutabilidad sobre el array de entrada.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('toggleTaskCompleted alterna solo la tarea indicada', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(once, [{ ...a, completada: true }, b]);

Archivo: `tests/unit/tasks.test.js`

>   assert.equal(a.completada, false);

## Observación

La función deleteTask se prueba para confirmar que devuelve una nueva lista con la tarea indicada eliminada, sin mutar el array original.

Evidencia:

Archivo: `tests/unit/tasks.test.js`

> test('deleteTask quita solo la tarea indicada', () => {

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(deleteTask(tasks, a.id), [b]);

Archivo: `tests/unit/tasks.test.js`

>   assert.deepEqual(tasks, [a, b]);

## Decisiones y límites

Motivación y alternativas históricas: no documentadas por este análisis. Confirmar con el equipo antes de tratar una observación como requisito futuro.
