import Skeleton from "./ui/Skeleton";

const widths = ["w-1/2", "w-2/3", "w-5/12"];

function TaskListSkeleton() {
  return (
    <div className="animate-fade-in space-y-2" aria-hidden="true">
      {widths.map((width, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-card border border-line bg-surface px-3.5 py-3"
        >
          <Skeleton className="mt-0.5 h-[18px] w-[18px] !rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className={`h-3.5 ${width}`} />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskListSkeleton;
