"use server";

import { ProductType } from "@/app/types";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const approvedProductAction = async (productId: ProductType["id"]) => {
  try {
    await db
      .update(products)
      .set({ status: "approved", approvedAt: new Date() })
      .where(eq(products.id, productId));

      revalidatePath("/admin");

    return {
      success: true,
      message: "product approved successfully",
    };
  } catch (error) {
    return{
        success: false,
        message: "Failed to approve product"
    };
  }
};
export const rejectProductAction = async (productId: ProductType["id"]) => {
  try {
    await db
      .update(products)
      .set({ status: "rejected" })
      .where(eq(products.id, productId));

    revalidatePath("/admin");

    return {
      success: true,
      message: "product rejected successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to reject product",
    };
  }
};

export const deleteProductAction = async (productId: ProductType["id"]) => {
  try {
    await db.delete(products).where(eq(products.id, productId));

    revalidatePath("/admin");

    return {
      success: true,
      message: "product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
};
