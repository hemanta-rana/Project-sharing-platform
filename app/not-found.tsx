import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-extrabold tracking-tighter text-primary">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Page not found
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or perhaps never existed.
        </p>
        <div className="pt-4 flex justify-center">
          <Button render={<Link href="/" />} className="rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <HomeIcon className="size-4" />
              <span>Back to Home</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
