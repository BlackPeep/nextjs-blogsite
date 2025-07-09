"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditPostPage({
  params,
}: {
  params: { id: string };
  //   params: { id: string };
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${params.id}`);
      const post = await res.json();
      setTitle(post.title);
      setContent(post.content);
    };
    fetchPost();
    console.log(title);
    console.log(content);
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newError = { title: "", content: "" };

    if (!title.trim()) {
      newError.title = "Title is required";
      hasError = true;
    }
    if (!content.trim()) {
      newError.content = "Content is required";
      hasError = true;
    }
    setError(newError);
    if (hasError) return;

    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      toast.success("Post updated succesfully");
      router.push(`/posts/${params.id}`);
    } else {
      toast.error("Failed to update Post");
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4 space-x-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded ${
              error.title ? "border-red-500" : ""
            }`}
            autoFocus
          />
          {error.title && (
            <p className="text-red-500 text-sm mt-1">{error.title}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full p-2 border rounded ${
              error.content ? "border-red-500" : ""
            }`}
          />
          {error.content && (
            <p className="text-red-500 text-sm mt-1">{error.content}</p>
          )}
        </div>
        <Link href={`/posts/${params.id}`}>
          <button
            type="button"
            className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90"
          >
            go back
          </button>
        </Link>
        <button
          type="submit"
          className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90"
        >
          Update Post
        </button>
      </form>
    </main>
  );
}
