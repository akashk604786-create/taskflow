/**
 * The TaskFlow brand lockup — used in the sidebar and on the sign-in screen.
 */
function AppName({ size = "md", className = "" }) {
  const isLarge = size === "lg";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex items-center justify-center rounded-[9px] bg-accent text-white shadow-subtle ${
          isLarge ? "h-9 w-9" : "h-7 w-7"
        }`}
      >
        <svg
          viewBox="0 0 16 16"
          width={isLarge ? 18 : 15}
          height={isLarge ? 18 : 15}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 8.5 6.4 11.4 12.5 4.8" />
        </svg>
      </span>
      <span
        className={`font-semibold tracking-[-0.01em] text-ink ${
          isLarge ? "text-lg" : "text-[15px]"
        }`}
      >
        TaskFlow
      </span>
    </div>
  );
}

export default AppName;
