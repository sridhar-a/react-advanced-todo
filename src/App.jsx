import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  useTransition,
} from "react";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import { useLocalStorage } from "./hooks/useLocalStorage";

const makeTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false,
});

function App() {
  const [todos, setTodos] = useLocalStorage("advanced-react-todos", []);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  // Track stable next todo number for display without causing renders.
  const nextTodoNumberRef = useRef(todos.length + 1);

  useEffect(() => {
    if (todos.length >= nextTodoNumberRef.current) {
      nextTodoNumberRef.current = todos.length + 1;
    }
  }, [todos.length]);

  const handleAddTodo = useCallback(
    (text) => {
      setTodos((current) => {
        const next = [...current, makeTodo(text)];
        nextTodoNumberRef.current += 1;
        return next;
      });
    },
    [setTodos],
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos((current) => current.filter((todo) => todo.id !== id));
    },
    [setTodos],
  );

  const handleToggleTodo = useCallback(
    (id) => {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const handleEditTodo = useCallback(
    (id, text) => {
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    },
    [setTodos],
  );

  const handleFilterChange = useCallback((filter) => {
    startTransition(() => {
      setActiveFilter(filter);
    });
  }, []);

  const filteredTodos = useMemo(() => {
    if (activeFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    if (activeFilter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }, [activeFilter, todos]);

  const summary = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed: completedCount,
      pending: todos.length - completedCount,
    };
  }, [todos]);

  return (
    <main className="page-shell">
      <section className="todo-card">
        <header>
          <p className="eyebrow">Advanced React Task</p>
          <h1>Todo Flow</h1>
          <p className="subtext">
            Next todo index: #{nextTodoNumberRef.current}
          </p>
        </header>

        <TodoForm onAddTodo={handleAddTodo} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {isPending && <p className="pending">Applying filter...</p>}

        <TodoList
          todos={filteredTodos}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
        />

        <footer className="summary">
          <span>Total: {summary.total}</span>
          <span>Completed: {summary.completed}</span>
          <span>Pending: {summary.pending}</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
