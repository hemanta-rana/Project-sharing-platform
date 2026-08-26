"use client";

import { FormField } from "@/components/form-field/form-field";
import { Button } from "@/components/ui/button";
import { addProductAction, FormState } from "@/lib/products/product-action";
import { useActionState } from "react";
import { Loader2Icon, SparkleIcon } from "lucide-react";

const initialState: FormState = {
  success: false,
  errors: {},
  message: "",
};

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );
  const { errors, message, success } = state;

  return (
    <form className="space-y-6" action={formAction}>
      {message && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            success
              ? "bg-green-500/10 text-green-600 border border-green-500/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {message}
        </div>
      )}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="eg. Project sharing platform"
        required
        onChange={() => {}}
        error={errors?.name}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="eg. my-project-sharing-platform"
        required
        onChange={() => {}}
        error={errors?.slug}
        healperText="The slug is the URL-friendly version of the product name."
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="A brief explanation"
        required
        onChange={() => {}}
        error={errors?.description}
        healperText="Provide a brief explanation of your product."
        textarea
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief catchy description"
        required
        onChange={() => {}}
        error={errors?.tagline}
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        error={errors?.websiteUrl}
        healperText="Enter your project website link"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, productivity"
        required
        onChange={() => {}}
        error={errors?.tags}
        healperText="Comma-separated tags (e.g. AI, ML, SaaS)"
      />

      <Button type="submit" disabled={isPending} className="w-full rounded-full text-lg py-5">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <>
            <SparkleIcon className="size-4" />
            Submit
          </>
        )}
      </Button>
    </form>
  );
}

