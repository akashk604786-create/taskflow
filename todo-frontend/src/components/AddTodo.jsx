import { useState } from "react";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedName = todoName.trim();
  const canSubmit = trimmedName.length > 0 && !isSubmitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      await onNewItem(todoName, dueDate);
      setTodoName("");
      setDueDate("");
    } catch {
      // The error is surfaced by the parent; keep what the user typed.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-surface shadow-card transition-shadow duration-200 focus-within:shadow-raised"
    >
      <input
        type="text"
        placeholder="Add a task…"
        aria-label="Task name"
        value={todoName}
        onChange={(event) => setTodoName(event.target.value)}
        className="h-12 w-full bg-transparent px-4 text-sm text-ink placeholder:text-faint focus:outline-none"
      />

      <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-2.5">
        <label className="group flex items-center gap-1.5 rounded-control border border-line px-2 py-1.5 text-[13px] text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink focus-within:border-accent">
          <Icon name="calendar" size={14} className="shrink-0 text-faint" />
          <span className="sr-only">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-[112px] bg-transparent text-[13px] text-inherit focus:outline-none sm:w-[124px]"
          />
        </label>

        <Button type="submit" size="sm" disabled={!canSubmit} className="px-3">
          <Icon name="plus" size={14} />
          {isSubmitting ? "Adding…" : "Add task"}
        </Button>
      </div>
    </form>
  );
}

export default AddTodo;
