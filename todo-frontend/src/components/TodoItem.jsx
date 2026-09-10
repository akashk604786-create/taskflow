import { useState } from "react";
import Icon from "./ui/Icon";
import { describeDueDate } from "../utils/date";

const dueTones = {
  overdue: "border-danger/20 bg-danger-soft text-danger",
  today: "border-warn/20 bg-warn-soft text-warn",
  upcoming: "border-line bg-subtle text-muted",
};

function TodoItem({
  id,
  todoName,
  todoDate,
  completed,
  isExiting = false,
  onDeleteClick,
  onToggleComplete,
}) {
  // Reflects the tick instantly while the server round-trip is in flight.
  const [isCompleting, setIsCompleting] = useState(false);
  const isChecked = completed || isCompleting;
  const due = describeDueDate(todoDate);

  const handleToggle = async () => {
    if (isChecked) return;
    setIsCompleting(true);
    try {
      await onToggleComplete(id);
    } catch {
      setIsCompleting(false);
    }
  };

  return (
    <li
      className={`group flex items-start gap-3 rounded-card border border-line bg-surface px-3.5 py-3
        shadow-subtle transition-[box-shadow,border-color,opacity] duration-150 ease-out
        hover:border-line-strong hover:shadow-card ${isExiting ? "task-row-exit" : "animate-rise-in"} ${
          completed ? "bg-canvas" : ""
        }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        aria-label={isChecked ? `${todoName} completed` : `Mark ${todoName} as complete`}
        onClick={handleToggle}
        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border
          transition-[background-color,border-color,transform] duration-150 ease-out active:scale-90 ${
            isChecked
              ? "border-accent bg-accent text-white"
              : "border-line-strong text-transparent hover:border-accent hover:bg-accent-soft"
          }`}
      >
        <Icon name="check" size={11} strokeWidth={2.25} className={isChecked ? "animate-fade-in" : ""} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm leading-6 transition-colors duration-200 ${
            isChecked ? "text-faint line-through" : "text-ink"
          }`}
        >
          {todoName}
        </p>

        {due && (
          <span
            className={`mt-1.5 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[12px] font-medium ${
              isChecked ? "border-line bg-subtle text-faint" : dueTones[due.tone]
            }`}
          >
            <Icon name="calendar" size={12} />
            {due.label}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDeleteClick(id)}
        aria-label={`Delete ${todoName}`}
        title="Delete task"
        className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-faint
          opacity-100 transition-[opacity,background-color,color] duration-150 hover:bg-danger-soft
          hover:text-danger focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
      >
        <Icon name="trash" />
      </button>
    </li>
  );
}

export default TodoItem;
