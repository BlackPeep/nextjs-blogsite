import Link from "next/link";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

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
        {posts.map((post: any) => (
          <li key={post._id} className="border rounded p-4 hover:shadow">
            <Link href={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {/* <p className="text-gray-600 mt-2">{post.content}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
