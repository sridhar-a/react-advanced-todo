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

        <TodoForm onAddTodo={handleAddTodo} />
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
    </main>
  );
}

export default App;
