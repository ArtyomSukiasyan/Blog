import { IPost } from "@/models/interfaces/post";

export default async function getPostById(
  id: string
): Promise<{ post: IPost | null }> {
  try {
    const res = await fetch(`${process.env.SERVER_HOST}/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    return { post: null };
  }
}
