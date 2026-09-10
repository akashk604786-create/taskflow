import { useEffect } from "react";
import AppName from "./AppName";
import Icon from "./ui/Icon";

function NavItem({ view, isActive, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(view.id)}
        aria-current={isActive ? "page" : undefined}
        className={`group flex w-full items-center gap-2.5 rounded-control px-2.5 py-2 text-[13px] font-medium
          transition-colors duration-150 ease-out ${
            isActive
              ? "bg-accent-soft text-accent"
              : "text-muted hover:bg-subtle hover:text-ink"
          }`}
      >
        <Icon
          name={view.icon}
          className={`shrink-0 transition-colors ${
            isActive ? "text-accent" : "text-faint group-hover:text-muted"
          }`}
        />
        <span className="flex-1 truncate text-left">{view.label}</span>
        <span
          className={`tabular-nums text-[12px] transition-colors ${
            isActive ? "text-accent" : "text-faint"
          }`}
        >
          {view.count}
        </span>
      </button>
    </li>
  );
}

function Sidebar({ views, activeView, onViewChange, user, onLogout, isOpen, onClose }) {
  // On small screens the sidebar is a drawer: Escape closes it.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (id) => {
    onViewChange(id);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="animate-fade-in fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] max-w-[82vw] shrink-0 flex-col border-r
          border-line bg-surface transition-transform duration-200 ease-out
          lg:sticky lg:inset-y-auto lg:top-0 lg:z-auto lg:h-screen lg:w-[248px] lg:max-w-none
          lg:translate-x-0 lg:bg-canvas ${
            isOpen ? "translate-x-0 shadow-raised lg:shadow-none" : "-translate-x-full"
          }`}
      >
        <div className="flex h-14 items-center justify-between px-4 lg:h-16 lg:px-5">
          <AppName />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-1 flex h-8 w-8 items-center justify-center rounded-control text-muted transition-colors hover:bg-subtle hover:text-ink lg:hidden"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="scrollbar-slim flex-1 overflow-y-auto px-3 pb-4 lg:px-3.5">
          <p className="px-2.5 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-faint">
            Tasks
          </p>
          <ul className="space-y-0.5">
            {views.map((view) => (
              <NavItem
                key={view.id}
                view={view}
                isActive={view.id === activeView}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-3 lg:p-3.5">
          <div className="flex items-center gap-2.5 rounded-control px-1.5 py-1.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle text-[12px] font-semibold uppercase text-muted">
              {user.name?.trim().charAt(0) || "?"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-ink">{user.name}</p>
              <p className="truncate text-[12px] text-faint">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              aria-label="Log out"
              title="Log out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-faint transition-colors hover:bg-subtle hover:text-ink"
            >
              <Icon name="logout" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
