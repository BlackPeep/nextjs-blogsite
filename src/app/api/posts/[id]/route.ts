import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const { title, content } = await req.json();

  const updated = await Post.findByIdAndUpdate(
    params.id,
    {
      title,
      content,
    },
    {
      new: true,
    }
  );

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const deleted = await Post.findByIdAndDelete(params.id);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "deleted" });
}
