"use cache"
import SectionHeader from "@/components/common/Section-header";
import ProductExplorer from "@/components/products/Product-explorer";
import { getAllPrducts } from "@/lib/products/product-select";
import { CompassIcon } from "lucide-react";

export  default async function ExplorePage() {
        const products = await getAllPrducts();
    
  return (
    <div className="py-20 ">
      <div className="wrapper ">
        <div className="mb-12">
          <SectionHeader
            title="Explore all the Products"
            icon={CompassIcon}
            description="Browser and explore amazing proudct from out community"
          />
        </div>

        <ProductExplorer products={products}  />
      </div>
    </div>
  );
}
