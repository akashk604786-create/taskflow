const inputStyles =
  "w-full h-10 rounded-control border border-line bg-surface px-3 text-sm text-ink " +
  "placeholder:text-faint shadow-subtle transition-[border-color,box-shadow] duration-150 " +
  "hover:border-line-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 " +
  "focus:ring-offset-0 disabled:opacity-50";

function Input({ className = "", ...props }) {
  return <input className={`${inputStyles} ${className}`} {...props} />;
}

export default Input;
