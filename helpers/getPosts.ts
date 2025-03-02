import { IPagination } from "@/models/interfaces/pagination";
import { IPost } from "@/models/interfaces/post";

interface IPosts {
  posts: IPost[];
  pagination: IPagination;
}

export default async function getPosts(
  tag?: string,
  page: number = 1
): Promise<IPosts> {
  const params = new URLSearchParams();
  if (tag) {
    params.set("tag", tag);
  }

  params.set("page", page.toString());

  const url = `http://localhost:3000/api/posts?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
