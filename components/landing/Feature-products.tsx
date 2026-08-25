
"use cache"
import SectionHeader from "@/components/common/Section-header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Feather } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/products/Product-card";
import { getFeaturedProducts } from "@/lib/products/product-select";

export default async function FeatureProducts() {
  // const featureProduct = [
  //   {
  //     id: 1,
  //     name: "ScholarShare",
  //     description: "A tool to share academic notes",
  //     tags: ["academic", "sharing", "tool"],
  //     votes: 600,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 2,
  //     name: "CodePulse",
  //     description: "Real-time collaborative code editor for remote teams",
  //     tags: ["developer", "collaboration", "editor"],
  //     votes: 845,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 3,
  //     name: "TaskFlow",
  //     description: "Minimalist Kanban board for daily task tracking",
  //     tags: ["productivity", "management", "tool"],
  //     votes: 310,
  //     isFeatured: false,
  //   },
  //   {
  //     id: 4,
  //     name: "DevHub",
  //     description: "Aggregator for tech blogs and open-source updates",
  //     tags: ["news", "open-source", "community"],
  //     votes: 520,
  //     isFeatured: true,
  //   },
  // ];

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
          {
                featureProduct.map((product)=>
                    <ProductCard key={product.id} product={product} />
                )
            }
        </div>
      </div>
    </section>
  );
}
