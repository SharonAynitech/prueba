import { test, expect } from '@playwright/test';

// US-01-1: la aplicación levanta con un solo comando y muestra el nombre del proyecto.

test('GET /health responde 200 con {"status":"ok"}', async ({ request }) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ status: 'ok' });
});

test('criterio 0: al abrir la URL se ve el nombre del proyecto', async ({ page }) => {
  const res = await page.goto('/');
  expect(res.status()).toBe(200);
  await expect(page).toHaveTitle('prueba');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('prueba');
});

test('criterio 1: en una pestaña nueva carga la misma página sin login', async ({ context }) => {
  const first = await context.newPage();
  await first.goto('/');
  await expect(first.getByRole('heading', { level: 1 })).toHaveText('prueba');

  const second = await context.newPage();
  await second.goto('/');
  await expect(second.getByRole('heading', { level: 1 })).toHaveText('prueba');
  await expect(second.locator('input[type=password]')).toHaveCount(0);
});
