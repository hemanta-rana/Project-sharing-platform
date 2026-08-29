import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButton from "./Voting-button";
import { StarIcon } from "lucide-react";

type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  const hasVoted = false;
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className=" hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-45 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-100 hover:shadow-xl dark:bg-slate-800">
        <CardHeader className="flex-1 ">
          <div className="flex  items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <CardTitle className="text-lg hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount > 100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3 fill-current" /> Featured
                  </Badge>
                )}
              </div>

              <CardDescription>{product.description}</CardDescription>
              {/* voting  */}
            </div>
            <VotingButton
              hasVoted={hasVoted}
              voteCount={product.voteCount}
              productId={product.id}
            />
          </div>
        </CardHeader>

        <CardFooter className=" flex items-center gap-2">
          {product.tags?.map((tags) => (
            <Badge variant="secondary" key={tags}>
              {tags}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
