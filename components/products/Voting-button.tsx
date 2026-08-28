"use client"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { downvoteProductAction, upvoteProductAction } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

export default function VotingButton(
    {hasVoted, 
     voteCount,   
     productId,
    }:{
        hasVoted: boolean;
        voteCount: number;
        productId:number;
    }
) {
  const [isPending, startTransition] = useTransition();

  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    voteCount,
    (current, delta: number) => Math.max(0, current + delta)
  );

  const handleUpvote = () =>{
    startTransition(async () => {
      setOptimisticVoteCount(1);
      await upvoteProductAction(productId);
    });
  }

  const handleDownvote = () =>{
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      await downvoteProductAction(productId);
    });
  }

  return (
     <div className="flex flex-col  items-center gap-1 shrink-0" 
     onClick={(e)=>{
      e.preventDefault();
      e.stopPropagation();     }}>
              <Button
                onClick={handleUpvote}
                disabled={isPending}
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "h-8 w-8 text-primary",
                  hasVoted
                    ? "bg-primary/10  text-primary hover:bg-primary/20"
                    : "hover:bg-primary/10 hover:text-primary",
                )}
              >
                <ChevronUpIcon className="size-5" />
              </Button>

              <span className="text-sm font-semibold  transition-colors text-foreground">
                {optimisticVoteCount}
              </span>

              <Button
                onClick={handleDownvote}
                disabled={isPending}
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "h-8 w-8 text-primary",
                  hasVoted
                     ? "bg-primary/10  text-primary hover:bg-primary/20"
                    : "hover:bg-primary/10 hover:text-primary",
                )}
              >
                <ChevronDownIcon className="size-5 " />
              </Button>
            </div>
    
  );
}