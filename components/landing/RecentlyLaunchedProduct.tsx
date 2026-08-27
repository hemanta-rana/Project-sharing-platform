import { Calendar, RocketIcon, LoaderIcon } from "lucide-react";
import SectionHeader from "@/components/common/Section-header";
import ProductCard from "@/components/products/Product-card";
import EmptyState from "../common/Empty-state";
import { getRecentlyLauncedProduct } from "@/lib/products/product-select";
import { Suspense } from "react";
import ProductSkeleton from "../products/Product-skeleton";

async function RecentlyLaunchedProductList() {
  const recentlyLaunchedProducts = await getRecentlyLauncedProduct();

  if (recentlyLaunchedProducts.length === 0) {
    return (
      <EmptyState
        message="No newly product launched found. Try again soon!"
        icon={Calendar}
      />
    );
  }

  return (
    <div className="grid-wrapper">
      {recentlyLaunchedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function RecentlyLaunchedProduct() {
  return (
    <section className="py-20">
      <div className="wrapper space-y-12">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Latest work from our community"
        />

        <Suspense
          fallback={
            <ProductSkeleton />
          }
        >
          <RecentlyLaunchedProductList />
        </Suspense>
      </div>
    </section>
  );
}
