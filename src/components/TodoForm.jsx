import { memo, useCallback, useRef } from "react";

function TodoForm({ onAddTodo }) {
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const nextText = inputRef.current?.value.trim();
      if (!nextText) {
        inputRef.current?.focus();
        return;
      }
      onAddTodo(nextText);
      inputRef.current.value = "";
      inputRef.current?.focus();
    },
    [onAddTodo],
  );

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        defaultValue=""
        placeholder="What needs to be done ?"
        aria-label="Todo text"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default memo(TodoForm);
