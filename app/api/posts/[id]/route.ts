import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const post = await Post.findById(params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const post = await Post.findByIdAndDelete(params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const body = await request.json();
    
    if (body.tags) {
      body.tags = [...new Set(body.tags.map((tag: string) => 
        tag.toLowerCase().trim()
      ))];
    }
    
    const post = await Post.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
} 