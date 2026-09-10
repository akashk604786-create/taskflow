const base =
  "inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap rounded-control " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45";

const variants = {
  primary: "bg-accent text-white shadow-subtle hover:bg-accent-hover",
  secondary:
    "bg-surface text-ink border border-line shadow-subtle hover:bg-subtle hover:border-line-strong",
  ghost: "text-muted hover:bg-subtle hover:text-ink",
  danger: "text-muted hover:bg-danger-soft hover:text-danger",
};

const sizes = {
  sm: "h-8 px-2.5 text-[13px]",
  md: "h-10 px-4 text-sm",
  icon: "h-8 w-8 p-0",
};

function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
