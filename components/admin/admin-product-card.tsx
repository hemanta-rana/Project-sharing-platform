import { ProductType } from "@/app/types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ExternalLinkIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import AdminAction from "./admin-action";
import { cn } from "@/lib/utils";

export default function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  const statusConfig = {
    pending: {
      bg: "bg-amber-500/10 dark:bg-amber-400/10",
      text: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    approved: {
      bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
      text: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    rejected: {
      bg: "bg-rose-500/10 dark:bg-rose-400/10",
      text: "text-rose-600 dark:text-rose-400",
      dot: "bg-rose-500",
    },
  } as const;

  const status = (product.status as keyof typeof statusConfig) ?? "pending";
  const config = statusConfig[status] ?? statusConfig.pending;

  return (
    <Card className="group border rounded-xl p-0 bg-card hover:shadow-lg transition-all duration-300 ease-out overflow-hidden">

      <div
        className={cn(
          "h-1 w-full",
          status === "pending" && "bg-amber-500",
          status === "approved" && "bg-emerald-500",
          status === "rejected" && "bg-rose-500"
        )}
      />

      <div className="p-4 sm:p-6">
       
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
          <CardTitle className="text-base sm:text-lg font-semibold tracking-tight line-clamp-1 min-w-0">
            {product.name}
          </CardTitle>
          <Badge
            className={cn(
              "shrink-0 w-fit px-2.5 py-0.5 text-xs font-semibold capitalize",
              config.bg,
              config.text
            )}
          >
            <span
              className={cn("inline-block size-1.5 rounded-full mr-1", config.dot)}
            />
            {product.status}
          </Badge>
        </div>

        {/* Tagline */}
        {product.tagline && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.tagline}
          </p>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {product.tags.map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <UserIcon className="size-3.5 shrink-0 text-muted-foreground/70" />
            <span className="truncate max-w-50">{product.submittedBy}</span>
          </div>
          <div className="hidden sm:block text-muted-foreground/30">•</div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground/70" />
            <span>
              {product.createdAt
                ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(product.createdAt))
                : "N/A"}
            </span>
          </div>
          {product.websiteUrl && (
            <>
              <div className="hidden sm:block text-muted-foreground/30">•</div>
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ExternalLinkIcon className="size-3.5 shrink-0" />
                Visit Website
              </a>
            </>
          )}
        </div>

        <div className="w-full">
          <AdminAction status={product.status ?? ""} productId={product.id} />
        </div>
      </div>
    </Card>
  );
}
