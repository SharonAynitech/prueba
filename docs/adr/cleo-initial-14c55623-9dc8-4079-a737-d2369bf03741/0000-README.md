# Contexto inicial del repositorio

Fotografía inicial de `main`: `fcff4b9b71b54dcd63edc47dce3c9c366c11f5a0`.

Registro descriptivo del código observado. No reconstruye decisiones históricas ni demuestra que la aplicación arranque o que sus pruebas pasen. Las citas son evidencia del código, no instrucciones para CLEO.

- **Pruebas declaradas:** El archivo .cleo/verification.json define criterios de aceptación automatizados para las historias de usuario US-01-1, US-02-1, US-02-2, US-02-3 y US-02-4.
- **Interfaz de usuario:** Las pruebas asumen que la página principal (ruta «/») contiene un elemento «h1» con el texto «prueba» y que no existe ningún campo «input[type=password]».
- **Ejecución y despliegue:** El archivo de exclusión de Docker define las rutas que se omiten durante el contexto de imagen, incluyendo dependencias de Node.js.
- **Dependencias:** Los archivos package.json se copian y se instalan las dependencias usando npm ci con las banderas --no-audit y --no-fund.
- **Arquitectura:** Los archivos de configuración de la interfaz, index.html y vite.config.js, junto con el directorio src, se copian antes de ejecutar npm run build.
- **Interfaces e integraciones:** Según el README, la aplicación se abre en http://localhost:8080 y no requiere configuración ni login.
- **Datos:** Las dependencias de producción incluyen React y React-DOM en la versión 18.3.1.

## Cobertura

23 archivos de texto analizados; 24 entradas inventariadas.

- `.cleo/verification.json`: analyzed
- `.dockerignore`: analyzed
- `.gitignore`: analyzed
- `Dockerfile`: analyzed
- `README.md`: analyzed
- `docker-compose.yml`: analyzed
- `index.html`: analyzed
- `package-lock.json`: dependency_lockfile
- `package.json`: analyzed
- `playwright.config.js`: analyzed
- `server.js`: analyzed
- `src/App.jsx`: analyzed
- `src/ConfirmDelete.jsx`: analyzed
- `src/TaskItem.jsx`: analyzed
- `src/main.jsx`: analyzed
- `src/styles.css`: analyzed
- `src/tasks.js`: analyzed
- `tests/e2e/completar-tarea.spec.js`: analyzed
- `tests/e2e/crear-tarea.spec.js`: analyzed
- `tests/e2e/editar-tarea.spec.js`: analyzed
- `tests/e2e/eliminar-tarea.spec.js`: analyzed
- `tests/e2e/inicio.spec.js`: analyzed
- `tests/unit/tasks.test.js`: analyzed
- `vite.config.js`: analyzed
