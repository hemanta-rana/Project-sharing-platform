"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productShema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { FormState } from "@/app/types";


export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
      };
    }
    if(!orgId){
      return {
        success: false,
        message: "You must be a member of an organization ."
      }
    }

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    // validate the data
    const validatedData = productShema.safeParse(rawFormData);
    if (!validatedData.success) {
      const fieldErrors = validatedData.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(fieldErrors)) {
        if (value && value.length > 0) {
          formattedErrors[key] = value[0];
        }
      }
      return {
        success: false,
        errors: formattedErrors,
        message: "Invalid data. Please check the fields below.",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description: description || "",
      websiteUrl,
      tags,
      status: "pending",
      submittedBy: userEmail,
      userId: userId,
      organizationId: orgId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
    };
  } catch (error) {
    console.error("Error submitting product:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit product",
    };
  }
};

