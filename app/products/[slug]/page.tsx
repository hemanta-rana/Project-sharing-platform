"use cache";

import SectionHeader from "@/components/common/Section-header";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/product-select";
import { ArrowLeftIcon, CalendarIcon, ExternalLinkIcon, StarIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import VotingButton from "@/components/products/Voting-button";

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    slug: product.slug.toString(),
  }));
};

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { name, description, websiteUrl, tags, tagline, voteCount } = product;

  // Format date on the server to avoid hydration mismatches
  const formattedDate = product.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(product.createdAt))
    : "";

  return (
    <div className="py-6 sm:py-12 lg:py-16">
      <div className="wrapper">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1 min-w-0 w-full">
                <div className="mb-4 sm:mb-6">
                  <SectionHeader
                    title={name}
                    icon={StarIcon}
                    description={tagline ?? ""}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs sm:text-sm px-2.5 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed wrap-break-word">
                {description}
              </p>
            </div>

            <div className="border rounded-xl p-4 sm:p-6 bg-primary/5 dark:bg-primary/10">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    label: "Launched:",
                    value: formattedDate,
                    icon: CalendarIcon,
                  },
                  {
                    label: "Submitted by:",
                    value: product.submittedBy,
                    icon: UserIcon,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 text-xs sm:text-sm p-2 rounded-md bg-background/50 border border-border/40 sm:border-none sm:bg-transparent">
                    {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
                    <span className="text-muted-foreground shrink-0">{label}</span>
                    <span className="font-medium truncate">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 min-w-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="border rounded-xl p-5 sm:p-6 bg-background shadow-xs">
                <div className="text-center mb-5 sm:mb-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Support this product
                  </p>
                  <VotingButton productId={product.id} voteCount={voteCount} />
                </div>
                {voteCount > 100 && (
                  <div className="pt-4 border-t">
                    <Badge className="w-full justify-center py-4 text-xs sm:text-sm">
                      Featured product
                    </Badge>
                  </div>
                )}
              </div>

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 sm:h-10 rounded-xl text-sm font-medium border border-border bg-background hover:bg-muted hover:text-foreground transition-all dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                >
                  Visit website
                  <ExternalLinkIcon className="size-4 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
