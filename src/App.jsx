import {
  useCallback,
  useMemo,
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
  const [, startTransition] = useTransition(); // used for filter changes

  const summary = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed: completedCount,
      pending: todos.length - completedCount,
    };
  }, [todos]);



  const handleAddTodo = useCallback(
    (text) => {
      setTodos((current) => {
        const exists = current.some(
          (todo) =>
            todo.text.trim().toLowerCase() === text.trim().toLowerCase(),
        );
        if (exists) {
          const confirmAdd = window.confirm(
            "A todo with this text already exists. Add duplicate anyway ?",
          );
          if (!confirmAdd) return current;
        }
        return [...current, makeTodo(text)];
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




  // If the active filter's count becomes 0, switch to 'all'
  useEffect(() => {
    if (activeFilter !== "all") {
      if (
        (activeFilter === "completed" && summary.completed === 0) ||
        (activeFilter === "pending" && summary.pending === 0)
      ) {
        setActiveFilter("all");
      }
    }
  }, [activeFilter, summary.completed, summary.pending]);

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



  return (
    <main className="page-shell">
      <section className="todo-card">
        <header>
          <h1>Advanced React Todo</h1>
        </header>

        <TodoForm onAddTodo={handleAddTodo} todoCount={todos.length} />
        {todos.length > 0 && (
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            allCount={todos.length}
            completedCount={summary.completed}
            pendingCount={summary.pending}
          />
        )}

        {/* No loading indicator needed for instant filter transitions */}

        <TodoList
          todos={filteredTodos}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
        />

        {/* Removed summary footer as counts will be shown in filter buttons */}
      </section>
      <footer style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'fixed', left: 0, bottom: 16, zIndex: 100 }}>
        <a
          href="https://github.com/sridhar-a/react-advanced-todo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="black" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </footer>
    </main>
  );
}

export default App;
