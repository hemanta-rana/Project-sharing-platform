import SectionHeader from "@/components/common/Section-header";
import { SparklesIcon } from "lucide-react";
import ProductSubmitForm from "@/components/products/Product-submit-form";

export default function SubmitPage() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="mb-12 flex items-center justify-center">
          <SectionHeader
            title="Submit your Project"
            icon={SparklesIcon}
            description="Share your creation in  community."
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <ProductSubmitForm />
        </div>
      </div>
    </section>
  );
}
