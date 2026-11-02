import { useEffect, useRef } from 'react';

// Diálogo modal para confirmar la eliminación de una tarea.
export default function ConfirmDelete({ task, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (task && !dialog.open) dialog.showModal();
    if (!task && dialog.open) dialog.close();
  }, [task]);

  return (
    <dialog
      ref={dialogRef}
      className="confirmar"
      data-testid="delete-dialog"
      aria-labelledby="confirmar-titulo"
      aria-describedby="confirmar-texto"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <h2 id="confirmar-titulo">¿Eliminar la tarea?</h2>
      <p id="confirmar-texto">Esta acción no se puede deshacer.</p>
      <div className="acciones">
        <button type="button" className="secundario" onClick={onCancel} autoFocus>
          Cancelar
        </button>
        <button
          type="button"
          className="peligro"
          data-testid="confirm-delete"
          onClick={() => onConfirm(task.id)}
        >
          Eliminar
        </button>
      </div>
    </dialog>
  );
}
