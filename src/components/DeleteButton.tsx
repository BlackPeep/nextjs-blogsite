"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    } else {
      alert("failed to delete post");
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
