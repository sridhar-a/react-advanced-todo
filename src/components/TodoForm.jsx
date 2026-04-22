import { memo, useCallback, useRef, useState, useEffect } from "react";


function TodoForm({ onAddTodo, todoCount }) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (todoCount === 0) {
      inputRef.current?.focus();
    }
  }, [todoCount]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const nextText = inputValue.trim();
      if (!nextText) {
        inputRef.current?.focus();
        return;
      }
      onAddTodo(nextText);
      setInputValue("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    },
    [onAddTodo, inputValue],
  );

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="What needs to be done ?"
        aria-label="Todo text"
      />
      <button
        type="submit"
        disabled={inputValue.trim().length < 2}
        className={inputValue.trim().length < 2 ? "disabled" : ""}
      >
        Add
      </button>
    </form>
  );
}



export default memo(TodoForm);
