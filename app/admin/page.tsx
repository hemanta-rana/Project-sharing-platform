import AdminProductCard from "@/components/admin/admin-product-card";
import StatsCard from "@/components/admin/stats-card";
import SectionHeader from "@/components/common/Section-header";
import ProductCard from "@/components/products/Product-card";
import { getAllPrducts } from "@/lib/products/product-select";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserIcon } from "lucide-react";
import { redirect } from "next/navigation";

export const instant = false;

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const response = await clerkClient();
  const user = await response.users.getUser(userId);

  const metadata = user.publicMetadata;
  const isAdmin = metadata?.isAdmin ?? false;

  if (!isAdmin) {
    redirect("/");
  }

  const allProducts = await getAllPrducts();
  const approvedProducts = allProducts.filter(
    (product) => product.status === "approved",
  );

  const pendingProducts = allProducts.filter(
    (product) => product.status === "pending",
  );
  const rejectedProducts = allProducts.filter(
    (product) => product.status === "rejected",
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-20">
      <div className="wrapper">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <SectionHeader
            title="Product Admin"
            icon={UserIcon}
            description="Review and Manage Submitted Products"
          />
        </div>

        {/* Stats Overview */}
        <StatsCard
          approved={approvedProducts.length}
          pending={pendingProducts.length}
          rejected={rejectedProducts.length}
          all={allProducts.length}
        />

        {/* Pending Products Section */}
        <section className="mt-8 sm:mt-12 lg:mt-16">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-yellow-500" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Pending Products
              </h2>
              <span className="inline-flex items-center justify-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                {pendingProducts.length}
              </span>
            </div>
            <p className="mt-1 ml-4 text-sm text-muted-foreground">
              These products are awaiting your review
            </p>
          </div>

          {pendingProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 py-12 sm:py-16">
              <div className="rounded-full bg-yellow-500/10 p-3 mb-3">
                <UserIcon className="size-6 text-yellow-500" />
              </div>
              <p className="text-muted-foreground text-sm">No pending products to review</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingProducts.map((product) => (
                <AdminProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="my-8 sm:my-12 border-t border-border/50" />

        {/* All Products Section */}
        <section>
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-primary" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                All Products
              </h2>
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                {allProducts.length}
              </span>
            </div>
            <p className="mt-1 ml-4 text-sm text-muted-foreground">
              Complete overview of all submitted products
            </p>
          </div>

          {allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 py-12 sm:py-16">
              <p className="text-muted-foreground text-sm">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {allProducts.map((product) => (
                <AdminProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
