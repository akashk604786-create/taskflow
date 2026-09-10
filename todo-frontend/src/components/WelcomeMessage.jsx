import Icon from "./ui/Icon";

/**
 * Shared empty state. Defaults to the first-run welcome copy.
 */
const WelcomeMessage = ({
  icon = "inbox",
  title = "Enjoy your day",
  description = "Add a todo above to get started.",
}) => {
  return (
    <div className="animate-rise-in flex flex-col items-center rounded-card border border-dashed border-line bg-surface/60 px-6 py-14 text-center">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-faint">
        <Icon name={icon} size={18} />
      </span>
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mt-1 max-w-[36ch] text-[13px] leading-5 text-muted">{description}</p>
    </div>
  );
};

export default WelcomeMessage;
