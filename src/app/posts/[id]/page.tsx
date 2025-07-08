import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

async function getPost(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 border-b pb-4">{post.title}</h1>
      <p className="text-lg  mb-4 ">{post.content}</p>
      <div className="space-x-4">
        <Link href={"/"}>
          <button className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90">
            go back
          </button>
        </Link>
        <Link href={`/posts/${params.id}/edit`}>
          <button className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90">
            Edit
          </button>
        </Link>
        <DeleteButton id={params.id} />
      </div>
    </div>
  );
}
