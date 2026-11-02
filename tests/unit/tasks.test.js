import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTask, isValidTitle, loadTasks, saveTasks } from '../../src/tasks.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
  };
}

test('isValidTitle rechaza vacío y solo espacios', () => {
  assert.equal(isValidTitle(''), false);
  assert.equal(isValidTitle('   '), false);
  assert.equal(isValidTitle('\t\n'), false);
  assert.equal(isValidTitle('Comprar leche'), true);
});

test('createTask recorta el título, registra la fecha y empieza pendiente', () => {
  const now = new Date('2026-11-02T10:00:00Z');
  const task = createTask('  Comprar leche  ', now);
  assert.equal(task.titulo, 'Comprar leche');
  assert.equal(task.fecha_creacion, '2026-11-02T10:00:00.000Z');
  assert.equal(task.completada, false);
  assert.ok(task.id);
});

test('createTask lanza con título inválido', () => {
  assert.throws(() => createTask('   '));
});

test('saveTasks y loadTasks hacen ida y vuelta', () => {
  const storage = memoryStorage();
  const tasks = [createTask('Uno'), createTask('Dos')];
  saveTasks(tasks, storage);
  assert.deepEqual(loadTasks(storage), tasks);
});

test('loadTasks devuelve lista vacía con datos ausentes o corruptos', () => {
  const storage = memoryStorage();
  assert.deepEqual(loadTasks(storage), []);
  storage.setItem('prueba.tareas', '{no es json');
  assert.deepEqual(loadTasks(storage), []);
});
