import { useEffect, useMemo, useState } from "react";
import AddTodo from "./components/AddTodo";
import AuthForm from "./components/AuthForm";
import Sidebar from "./components/Sidebar";
import TaskListSkeleton from "./components/TaskListSkeleton";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import Icon from "./components/ui/Icon";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemCompletedOnServer,
} from "./services/itemsService";
import { getUser, logout } from "./services/authService";

const EXIT_ANIMATION_MS = 180;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const VIEW_META = {
  all: { label: "All tasks", icon: "inbox" },
  active: { label: "Active", icon: "circle" },
  completed: { label: "Completed", icon: "circleCheck" },
};

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [user, setUser] = useState(getUser());
  const [view, setView] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [exitingIds, setExitingIds] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    let isCurrent = true;
    setIsLoading(true);

    getItemsFromServer()
      .then((initialItems) => {
        if (!isCurrent) return;
        setTodoItems(
          initialItems.map((item) => ({ ...item, completed: item.completed || false }))
        );
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [user]);

  const handleNewItem = async (itemName, itemDueDate) => {
    setError("");
    try {
      const item = await addItemToServer(itemName, itemDueDate);
      setTodoItems((items) => [...items, { ...item, completed: false }]);
    } catch (err) {
      setError(err.message || "Could not add that task. Please try again.");
      throw err;
    }
  };

  const handleDeleteItem = async (id) => {
    setError("");
    setExitingIds((ids) => [...ids, id]);
    try {
      const [deletedId] = await Promise.all([
        deleteItemFromServer(id),
        wait(EXIT_ANIMATION_MS),
      ]);
      setTodoItems((items) => items.filter((item) => item.id !== deletedId));
    } catch (err) {
      setError(err.message || "Could not delete that task. Please try again.");
    } finally {
      setExitingIds((ids) => ids.filter((exitingId) => exitingId !== id));
    }
  };

  const handleToggleComplete = async (id) => {
    const target = todoItems.find((item) => item.id === id);
    if (!target || target.completed) return;

    setError("");
    try {
      await markItemCompletedOnServer(id);
      setTodoItems((items) =>
        items.map((item) => (item.id === id ? { ...item, completed: true } : item))
      );
    } catch (err) {
      setError(err.message || "Could not update that task. Please try again.");
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setTodoItems([]);
    setView("all");
    setIsSidebarOpen(false);
  };

  const counts = useMemo(() => {
    const completed = todoItems.filter((item) => item.completed).length;
    return { all: todoItems.length, active: todoItems.length - completed, completed };
  }, [todoItems]);

  const views = useMemo(
    () =>
      Object.entries(VIEW_META).map(([id, meta]) => ({ id, ...meta, count: counts[id] })),
    [counts]
  );

  if (!user) {
    return <AuthForm onAuthenticated={setUser} />;
  }

  const summary =
    view === "completed"
      ? `${counts.completed} ${counts.completed === 1 ? "task" : "tasks"} completed`
      : `${counts.active} ${counts.active === 1 ? "task" : "tasks"} remaining`;

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar
        views={views}
        activeView={view}
        onViewChange={setView}
        user={user}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-3 px-4 sm:px-6 lg:h-16 lg:px-8">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation"
              className="-ml-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-control text-muted transition-colors hover:bg-subtle hover:text-ink lg:hidden"
            >
              <Icon name="menu" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
                {VIEW_META[view].label}
              </h1>
            </div>

            <span className="shrink-0 text-[13px] tabular-nums text-muted">{summary}</span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-5 sm:px-6 sm:pt-6 lg:px-8">
          <AddTodo onNewItem={handleNewItem} />

          {error && (
            <div
              role="alert"
              className="animate-rise-in mt-4 flex items-start gap-2 rounded-control border border-danger/15 bg-danger-soft px-3 py-2.5 text-[13px] text-danger"
            >
              <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Dismiss error"
                className="-mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded text-danger/70 transition-colors hover:text-danger"
              >
                <Icon name="close" size={12} />
              </button>
            </div>
          )}

          <div className="mt-7">
            {isLoading ? (
              <TaskListSkeleton />
            ) : todoItems.length === 0 ? (
              <WelcomeMessage />
            ) : (
              <TodoItems
                todoItems={todoItems}
                view={view}
                exitingIds={exitingIds}
                onDeleteClick={handleDeleteItem}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
