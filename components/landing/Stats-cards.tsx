import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCards({
  icon: Icon,
  value,
  label,
  hasBorder,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
}) {
  return (
    <div className={cn("space-y-2", hasBorder && "sm:border-l sm:pl-4 border-border/50")}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl font-bold sm:text-4xl">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
