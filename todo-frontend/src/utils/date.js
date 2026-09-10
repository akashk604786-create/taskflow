const MS_PER_DAY = 86_400_000;

const startOfDay = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Turns a stored due date into the label and urgency used by the task list.
 * Returns null when there is no usable date, so callers can simply skip it.
 */
export const describeDueDate = (value) => {
  if (!value) return null;

  const due = new Date(value);
  if (Number.isNaN(due.getTime())) return null;

  const today = startOfDay(new Date());
  const dueDay = startOfDay(due);
  const daysAway = Math.round((dueDay - today) / MS_PER_DAY);

  let label;
  if (daysAway === 0) label = "Today";
  else if (daysAway === 1) label = "Tomorrow";
  else if (daysAway === -1) label = "Yesterday";
  else {
    label = due.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(dueDay.getFullYear() !== today.getFullYear() && { year: "numeric" }),
    });
  }

  let tone = "upcoming";
  if (daysAway < 0) tone = "overdue";
  else if (daysAway === 0) tone = "today";

  return { label, tone };
};
