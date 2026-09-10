import TodoItem from "./TodoItem";
import WelcomeMessage from "./WelcomeMessage";

function TaskSection({ title, items, exitingIds, onDeleteClick, onToggleComplete, muted }) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-2.5 flex items-center gap-2 px-0.5">
        <h2
          className={`text-[11px] font-semibold uppercase tracking-[0.06em] ${
            muted ? "text-faint" : "text-muted"
          }`}
        >
          {title}
        </h2>
        <span className="rounded-full bg-subtle px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-faint">
          {items.length}
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            todoDate={item.dueDate}
            todoName={item.name}
            completed={item.completed}
            isExiting={exitingIds.includes(item.id)}
            onDeleteClick={onDeleteClick}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </section>
  );
}

const emptyViewCopy = {
  active: {
    icon: "circleCheck",
    title: "All caught up",
    description: "Every task is done. Add another one when you are ready.",
  },
  completed: {
    icon: "circle",
    title: "Nothing completed yet",
    description: "Tick off a task and it will show up here.",
  },
};

const TodoItems = ({
  todoItems,
  view = "all",
  exitingIds = [],
  onDeleteClick,
  onToggleComplete,
}) => {
  const pendingItems = todoItems.filter((item) => !item.completed);
  const completedItems = todoItems.filter((item) => item.completed);

  const showPending = view !== "completed";
  const showCompleted = view !== "active";
  const visibleCount =
    (showPending ? pendingItems.length : 0) + (showCompleted ? completedItems.length : 0);

  if (visibleCount === 0) {
    return <WelcomeMessage {...(emptyViewCopy[view] ?? emptyViewCopy.active)} />;
  }

  return (
    <div className="space-y-7">
      {showPending && (
        <TaskSection
          title="Tasks to do"
          items={pendingItems}
          exitingIds={exitingIds}
          onDeleteClick={onDeleteClick}
          onToggleComplete={onToggleComplete}
        />
      )}

      {showCompleted && (
        <TaskSection
          title="Completed"
          items={completedItems}
          exitingIds={exitingIds}
          onDeleteClick={onDeleteClick}
          onToggleComplete={onToggleComplete}
          muted
        />
      )}
    </div>
  );
};

export default TodoItems;
