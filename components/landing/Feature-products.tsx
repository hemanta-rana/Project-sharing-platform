"use cache";
import SectionHeader from "@/components/common/Section-header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Feather } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/products/Product-card";
import { getFeaturedProducts } from "@/lib/products/product-select";

export default async function FeatureProducts() {
  const featureProduct = await getFeaturedProducts();
  return (
    <section className="py-20 bg-[#f2f1ed] ">
      <div className="wrapper ">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Feature Today"
            icon={Feather}
            description={"Top picks from our community"}
          />
          <Button
            render={<Link href="/explore" />}
            size="lg"
            className="text-base rounded-full px-5 py-5 shadow-lg"
            variant="outline"
          >
            View All
            <ArrowRightIcon className=" size-4" />
          </Button>
        </div>

        <div className="grid-wrapper ">
          {featureProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
