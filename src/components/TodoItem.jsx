import { memo, useCallback, useEffect, useRef, useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [draft, setDraft] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const startEdit = useCallback(() => {
    setDraft(todo.text);
    setIsEditing(true);
  }, [todo.text]);

  const cancelEdit = useCallback(() => {
    setDraft(todo.text);
    setIsEditing(false);
  }, [todo.text]);

  const commitEdit = useCallback(() => {
    const nextText = draft.trim();
    if (!nextText) {
      cancelEdit();
      return;
    }
    onEdit(todo.id, nextText);
    setIsEditing(false);
  }, [cancelEdit, draft, onEdit, todo.id]);

  const handleEditKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        commitEdit();
      }
      if (event.key === "Escape") {
        cancelEdit();
      }
    },
    [cancelEdit, commitEdit],
  );

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <label className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark ${todo.text} as completed`}
        />
        {isEditing ? (
          <input
            ref={editInputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleEditKeyDown}
            className="edit-input"
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </label>

      <div className="todo-actions">
        {!isEditing && (
          <button type="button" onClick={startEdit}>
            Edit
          </button>
        )}
        {isEditing && (
          <button type="button" onClick={commitEdit}>
            Save
          </button>
        )}
        <button type="button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default memo(TodoItem);
