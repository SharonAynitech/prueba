# prueba

Lista de tareas personal, local y minimalista (React, persistencia en el navegador).

## Levantar la aplicación

```sh
docker compose up --build
```

Abre http://localhost:8080. No requiere configuración ni login.

- `GET /health` responde `{"status":"ok"}`.

## Desarrollo sin Docker

```sh
npm install
npm run build && npm start   # http://localhost:8080
```

## Tests unitarios

```sh
npm run test:unit
```

## Tests E2E

Con la app levantada en el puerto 8080:

```sh
npx playwright install chromium
npm run test:e2e
```

Usa `BASE_URL` para apuntar a otra dirección.
