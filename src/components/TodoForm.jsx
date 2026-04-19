import { memo, useCallback, useRef, useState } from "react";

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const nextText = text.trim();
      if (!nextText) {
        inputRef.current?.focus();
        return;
      }
      onAddTodo(nextText);
      setText("");
      inputRef.current?.focus();
    },
    [onAddTodo, text],
  );

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={text}
        onChange={handleChange}
        placeholder="What needs to be done?"
        aria-label="Todo text"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default memo(TodoForm);
