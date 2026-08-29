import { db } from "@/db";
import { products } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { connection } from "next/server";
import { resolve } from "path";

export async function getFeaturedProducts() {
  "use cache"
  const productData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"));
  return productData;
}
export async function getAllPrducts() {

  const productData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"));
  return productData;
}

export async function getRecentlyLauncedProduct() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const productsData = await getAllPrducts();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return productsData.filter(
    (product) => 
        product.createdAt &&
        new Date(product.createdAt.toISOString()) >= oneWeekAgo,
  );
}
export async function getProductBySlug(slug: string) {
  const [productData] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return productData; // Returns a single Product object, or undefined if not found
}

