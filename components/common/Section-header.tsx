import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="mb-4 sm:mb-8">
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <Icon className="size-5 sm:size-6 text-primary shrink-0" />
        <h2 className="text-2xl sm:text-3xl font-bold wrap-break-word">{title}</h2>
      </div>
      {description && (
        <p className="text-muted-foreground text-sm sm:text-lg wrap-break-word">{description}</p>
      )}
    </div>
  );
}
