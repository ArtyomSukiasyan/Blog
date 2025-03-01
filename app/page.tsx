import styles from "./page.module.css";
import PostCard from "@/components/postCard/PostCard";
import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | devchessplayer",
  description: "Personal blog of JS Engineer Artyom Sukiasyan | devchessplayer",
};

async function getPosts(tag?: string, page: number = 1) {
  const params = new URLSearchParams();
  if (tag) {
    params.set("tag", tag);
  }
  params.set("page", page.toString());

  const url = `http://localhost:3000/api/posts?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  const { tag, page = "1" } = await searchParams;
  const currentPage = parseInt(page);

  const { posts, pagination } = await getPosts(tag, currentPage);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>My Blog</h1>
          {tag && (
            <div className={styles.activeFilter}>
              Filtered by tag: <span className={styles.activeTag}>{tag}</span>
              <Link href="/" className={styles.clearFilter}>
                ✕
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {posts.length > 0 ? (
          <>
            <div className={styles.posts}>
              {posts.map((post: any) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  date={post.date}
                  tags={post.tags}
                />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              tag={tag}
            />
          </>
        ) : (
          <p className={styles.noPosts}>
            {tag ? `No posts found with tag "${tag}"` : "No posts yet."}
          </p>
        )}
      </main>
    </div>
  );
}
