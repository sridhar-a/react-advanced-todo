# Advanced React Todo

## Requirements

- Node.js v22.13.0 (see `.nvmrc` for version management)
- npm v10 or higher recommended

A hands-on Todo application built with React and advanced hooks.

## Features

- Prevents accidental duplicate todos (asks for confirmation if you try to add a duplicate)
- Add, delete, and mark todos as completed (only the checkbox marks as completed; clicking the text does not)
- The Add button is disabled and gray until at least two characters are typed
- Edit existing todos inline
- Filter todos by `All`, `Completed`, and `Pending` (with live counts)
- Filter buttons are only enabled if there are tasks in that category
- The active filter button is green and disabled; others are enabled if their count > 0
- The filter bar is hidden until at least one todo exists
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
	(Previously tracked next todo number for demo purposes)

### Additional Advanced Hooks

- `useTransition`: used when switching filters for non-blocking updates (`isPending` feedback shown)
- Custom hook `useLocalStorage`: encapsulates load/save logic for persistent state
- `React.memo`: applied to presentational components to reduce unnecessary re-renders

## Project Structure

- `src/App.jsx` - main state, filter logic, and UI composition
- `src/components/TodoForm.jsx` - create todo form
- `src/components/FilterBar.jsx` - filter buttons with live counts and enable/disable logic
- `src/components/TodoList.jsx` - list container
- `src/components/TodoItem.jsx` - individual todo row with edit mode
- `src/hooks/useLocalStorage.js` - reusable localStorage state hook
- `src/styles.css` - responsive styling and filter button states

## Run Locally

```bash
npm install
npm run dev
```

## Notes

- This project uses Vite (see `package.json` for version). If you upgrade Vite to v8 or higher, check the [Vite migration guide](https://vitejs.dev/guide/) for breaking changes.
- Node version is enforced via `.nvmrc` and `package.json` engines field.

## Build

```bash
npm run build
```
