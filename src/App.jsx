import { useEffect, useRef, useState } from 'react';
import { createTask, isValidTitle, loadTasks, saveTasks, updateTaskTitle } from './tasks.js';
import TaskItem from './TaskItem.jsx';

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [titulo, setTitulo] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValidTitle(titulo)) {
      setError('El título es obligatorio');
      inputRef.current?.focus();
      return;
    }
    const next = [createTask(titulo), ...tasks];
    saveTasks(next);
    setTasks(next);
    setTitulo('');
    setError('');
    setSaved(true);
  }

  function handleRename(id, nuevoTitulo) {
    const next = updateTaskTitle(tasks, id, nuevoTitulo);
    saveTasks(next);
    setTasks(next);
    setSaved(true);
  }

  return (
    <main className="app">
      <header>
        <h1>prueba</h1>
      </header>

      <form className="crear" onSubmit={handleSubmit} noValidate>
        <label htmlFor="titulo">Título</label>
        <div className="crear-fila">
          <input
            ref={inputRef}
            id="titulo"
            name="titulo"
            type="text"
            autoComplete="off"
            value={titulo}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'titulo-error' : undefined}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (error) setError('');
            }}
          />
          <button type="submit">Crear</button>
        </div>
        {error && (
          <p id="titulo-error" className="error" role="alert">
            {error}
          </p>
        )}
      </form>

      <section className="tareas" aria-labelledby="tareas-titulo">
        <h2 id="tareas-titulo">Tareas</h2>
        <ul data-testid="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onRename={handleRename} />
          ))}
        </ul>
      </section>

      <p className="estado" role="status" aria-live="polite">
        {saved ? 'Guardado' : ''}
      </p>
    </main>
  );
}
