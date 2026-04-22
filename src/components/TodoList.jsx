import { memo } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  if (!todos.length) {
      // Removed empty state message as per new requirements
      return null;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
