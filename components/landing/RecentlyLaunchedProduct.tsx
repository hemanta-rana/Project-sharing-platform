import { Calendar, RocketIcon } from "lucide-react";
import SectionHeader from "@/components/common/Section-header";
import ProductCard from "@/components/products/Product-card";
import EmptyState from "../common/Empty-state";

export default function RecentlyLaunchedProduct() {
  const recentlyLaunchedProducts = [
   
  ];
  return (
    <section className="py-20">
      <div className="wrapper space-y-12">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Latest work from our community"
        />
        {
            recentlyLaunchedProducts.length > 0?(
                <div className="grid-wrapper ">
          {recentlyLaunchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

            ):(
                <EmptyState message="No newly product lauched found. Try again soon!" icon={Calendar} />
            )
        }

        
      </div>
    </section>
  );
}
