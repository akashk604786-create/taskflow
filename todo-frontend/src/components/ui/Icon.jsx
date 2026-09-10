/**
 * Minimal inline icon set — no icon dependency, one consistent stroke weight.
 */
const paths = {
  plus: <path d="M8 3.5v9M3.5 8h9" />,
  check: <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />,
  trash: (
    <>
      <path d="M2.75 4.25h10.5" />
      <path d="M6.25 4.25V3.1a.85.85 0 0 1 .85-.85h1.8a.85.85 0 0 1 .85.85v1.15" />
      <path d="M12 4.25 11.5 13a.85.85 0 0 1-.85.75h-5.3A.85.85 0 0 1 4.5 13L4 4.25" />
    </>
  ),
  calendar: (
    <>
      <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="2" />
      <path d="M2.25 6.5h11.5M5.5 1.75v2.5M10.5 1.75v2.5" />
    </>
  ),
  inbox: (
    <>
      <path d="M2 8.5h3l1 2h4l1-2h3" />
      <path d="M3.4 3h9.2l1.4 5.5V12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V8.5L3.4 3Z" />
    </>
  ),
  circle: <circle cx="8" cy="8" r="5.5" />,
  circleCheck: (
    <>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M5.6 8.2 7.2 9.8l3.2-3.6" />
    </>
  ),
  menu: <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />,
  close: <path d="M4 4l8 8M12 4l-8 8" />,
  logout: (
    <>
      <path d="M6 13.5H3.75a1.25 1.25 0 0 1-1.25-1.25V3.75A1.25 1.25 0 0 1 3.75 2.5H6" />
      <path d="M10.5 11 13.5 8l-3-3M13.5 8h-7" />
    </>
  ),
  alert: (
    <>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 5.25v3.25M8 10.6v.15" />
    </>
  ),
};

function Icon({ name, size = 16, className = "", strokeWidth = 1.5 }) {
  const shape = paths[name];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shape}
    </svg>
  );
}

export default Icon;
