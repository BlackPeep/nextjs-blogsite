import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectToDB();
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newPost = await Post.create({ title, content });
  return NextResponse.json(newPost, { status: 201 });
}
