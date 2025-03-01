import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const date = searchParams.get("date");

    const query: any = {};
    if (tag) {
      query.tags = tag;
    }

    if (date) {
      query.date = date;
    }

    const posts = await Post.find(query)
      .sort({ date: -1, createdAt: -1 })
      .select("title content tags date");

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();

    if (!body.date) {
      body.date = new Date().toISOString().split("T")[0];
    }

    if (body.tags) {
      body.tags = [
        ...new Set(body.tags.map((tag: string) => tag.toLowerCase().trim())),
      ];
    }

    const post = await Post.create(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      {
        error: "Failed to create post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.tags) {
      body.tags = [
        ...new Set(body.tags.map((tag: string) => tag.toLowerCase().trim())),
      ];
    }

    const post = await Post.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      {
        error: "Failed to update post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
