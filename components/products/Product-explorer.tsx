"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "./Product-card";
import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";

import { ProductType } from "@/app/types";
import { useMemo, useState } from "react";

export default function ProductExplorer({
  products,
}: {
  products: ProductType[];
}) {
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "newest">(
    "trending",
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "trending":
        return result.sort((a, b) => b.voteCount - a.voteCount);

      case "recent":
        return result.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime(),
        );

      case "newest":
        return result.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime(),
        );
      default:
        return result;
    }
  }, [searchQuery, products, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            
            className="rounded-full px-4 "
            variant={sortBy === "trending" ? "default" : "outline"}
            onClick={() => setSortBy("trending")}
          >
            <TrendingUpIcon className="size-4" />
            Trending
          </Button>
          <Button
            variant={sortBy === "recent" ? "default": "outline"}
            className="rounded-full px-4"
            onClick={() => setSortBy("recent")}
          >
            <ClockIcon className="size-4" /> Recent
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} Products
        </p>
      </div>
      <div className="grid-wrapper ">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
