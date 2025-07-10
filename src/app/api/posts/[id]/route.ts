import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextResponse, NextRequest } from "next/server";

function getIdFromRequest(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
}

export async function GET(req: NextRequest) {
  await connectToDB();
  const id = getIdFromRequest(req);
  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest) {
  await connectToDB();
  const id = getIdFromRequest(req);

  const { title, content } = await req.json();

  const updated = await Post.findByIdAndUpdate(
    id,
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

export async function DELETE(req: NextRequest) {
  await connectToDB();
  const id = getIdFromRequest(req);

  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "deleted" });
}
