import { cn } from "@/lib/utils";

export default function StatsCard({
  all,
  approved,
  pending,
  rejected,
}: {
  all: number;
  approved: number;
  pending: number;
  rejected: number;
}) {
  const stats = [
    {
      label: "Total Products",
      count: all,
      color: "bg-slate-500/10 dark:bg-slate-400/10",
      textColor: "text-slate-700 dark:text-slate-300",
      borderAccent: "border-l-slate-500",
    },
    {
      label: "Pending Review",
      count: pending,
      color: "bg-amber-500/10 dark:bg-amber-400/10",
      textColor: "text-amber-700 dark:text-amber-300",
      borderAccent: "border-l-amber-500",
    },
    {
      label: "Approved",
      count: approved,
      color: "bg-emerald-500/10 dark:bg-emerald-400/10",
      textColor: "text-emerald-700 dark:text-emerald-300",
      borderAccent: "border-l-emerald-500",
    },
    {
      label: "Rejected",
      count: rejected,
      color: "bg-rose-500/10 dark:bg-rose-400/10",
      textColor: "text-rose-700 dark:text-rose-300",
      borderAccent: "border-l-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map(({ label, count, color, textColor, borderAccent }) => (
        <div
          className={cn(
            "relative flex flex-col rounded-xl border-l-4 p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
            color,
            borderAccent
          )}
          key={label}
        >
          <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
            {label}
          </p>
          <p className={cn("text-2xl sm:text-3xl font-bold tracking-tight mt-1", textColor)}>
            {count}
          </p>
        </div>
      ))}
    </div>
  );
}