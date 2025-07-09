"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted post succesfully");
      router.push("/");
    } else {
      toast.error("Failed to delete post");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90"
    >
      Delete
    </button>
  );
}
