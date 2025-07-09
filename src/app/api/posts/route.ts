import { connectToDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
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
