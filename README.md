# Advanced React Todo App

A hands-on Todo application built with React and advanced hooks.

## Features

- Add, delete, and mark todos as completed
- Edit existing todos inline
- Filter todos by `All`, `Completed`, and `Pending`
- Persist todos using `localStorage`
- Responsive UI with basic animations

## Hooks Used

### `useCallback`

Used to memoize handlers so child components wrapped with `memo` do not re-render unnecessarily when parent renders:

- `handleAddTodo`
- `handleDeleteTodo`
- `handleToggleTodo`
- `handleEditTodo`
- `handleFilterChange`
- Form and item-specific handlers in `TodoForm` and `TodoItem`

### `useMemo`

Used to memoize derived/computed values:

- `filteredTodos`: returns visible todos based on active filter
- `summary`: computes total/completed/pending counts

### `useRef`

Used for mutable/persistent values and DOM access without causing re-renders:

- Focus input after add/validation in `TodoForm`
- Focus/select edit field in `TodoItem`
- Track `nextTodoNumberRef` in `App` without triggering UI updates

### Additional Advanced Hooks

- `useTransition`: used when switching filters for non-blocking updates (`isPending` feedback shown)
- Custom hook `useLocalStorage`: encapsulates load/save logic for persistent state
- `React.memo`: applied to presentational components to reduce unnecessary re-renders

## Project Structure

- `src/App.jsx` - main state, hook orchestration, and composition
- `src/components/TodoForm.jsx` - create todo form
- `src/components/FilterBar.jsx` - all/completed/pending filters
- `src/components/TodoList.jsx` - list container
- `src/components/TodoItem.jsx` - individual todo row with edit mode
- `src/hooks/useLocalStorage.js` - reusable localStorage state hook
- `src/styles.css` - responsive styling

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
