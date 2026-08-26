import FeatureProducts from "@/components/landing/Feature-products";
import HeroSection from "@/components/landing/Hero-section";
import RecentlyLaunchedProduct from "@/components/landing/RecentlyLaunchedProduct";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureProducts />

      <RecentlyLaunchedProduct />
    </div>
  );
}
