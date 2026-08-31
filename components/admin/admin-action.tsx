"use client"
import { ProductType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { approvedProductAction, rejectProductAction, deleteProductAction } from "@/lib/admin/admin-action";
import { CheckCircleIcon, XCircleIcon, Trash2Icon } from "lucide-react";

export default function AdminAction({
  status,
  productId,
}: {
  status: string ;
  productId: ProductType["id"];
}) {
  const handleApprove = async() => {
    await approvedProductAction(productId);
  };
  const handleReject = async() => {
    await rejectProductAction(productId);
  };
  const handleDelete = async() => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProductAction(productId);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
        onClick={handleDelete}
      >
        <Trash2Icon className="size-3.5 mr-1.5" /> Delete
      </Button>

      {status === "pending" && (
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="default"
            size="sm"
            className="hover:cursor-pointer rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all duration-200 text-xs sm:text-sm"
            onClick={handleApprove}
          >
            <CheckCircleIcon className="size-4 mr-1.5" />
            Approve
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="hover:cursor-pointer rounded-lg shadow-sm transition-all duration-200 text-xs sm:text-sm"
            onClick={handleReject}
          >
            <XCircleIcon className="size-4 mr-1.5" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
