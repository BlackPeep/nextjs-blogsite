import Link from "next/link";
import { Post } from "@/types/Post";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getPosts(page: number = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home({ searchParams }: Props) {
  const page = parseInt(
    typeof searchParams?.page === "string" ? searchParams.page : "1"
  );

  const { posts = [], totalPages = 1 } = await getPosts(page);

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b mb-6">
        <h1 className="text-3xl font-bold">Next Js Blog</h1>

        <Link href={"/new"}>
          <button className="bg-foreground text-background  px-4 py-2 rounded hover:opacity-90 ">
            New Post
          </button>
        </Link>
      </header>

      {/* Blog posts lists */}
      <ul className="space-y-6">
        {posts.map((post: Post) => (
          <li key={post._id} className="border rounded p-3 hover:shadow">
            <h2 className="text-xl font-semibold line-clamp-1">{post.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
            <Link
              href={`/posts/${post._id}`}
              className="text-blue-500 mt-2 inline-block me-5"
            >
              Read More
            </Link>
            <span className="text-sm text-gray-600 mt-2 ">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between mt-5 items-center">
        <Link
          href={`/?page=${page - 1}`}
          className={`px-4 py-2 rounded ${
            page <= 1
              ? "opacity-50 pointer-events-none"
              : "bg-foreground text-background"
          }`}
        >
          Previous
        </Link>
        <span className="text-sm ">
          Page {page} of {totalPages}
        </span>
        <Link
          href={`/?page=${page + 1}`}
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? "opacity-50 pointer-events-none"
              : "bg-foreground text-background"
          }`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
