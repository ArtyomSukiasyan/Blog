import styles from "./page.module.css";
import PostCard from "@/components/postCard/PostCard";
import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { Metadata } from "next";
import getPosts from "@/helpers/getPosts";
import GoodReads from "@/components/goodreads/Goodreads";
import LichessFeed from "@/components/lichess/Lichess";

export const metadata: Metadata = {
  title: "Blog | devchessplayer",
  description: "Personal blog of JS Engineer Artyom Sukiasyan | devchessplayer",
};

interface IParams {
  tag?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: IParams;
}) {
  const { tag, page = "1" } = await searchParams;
  const currentPage = parseInt(page);

  const { posts, pagination } = await getPosts(tag, currentPage);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.page_title}>Blog | Devchessplayer</h1>
        {tag && (
          <div className={styles.activeFilter}>
            Filtered by tag: <span className={styles.activeTag}>{tag}</span>
            <Link href="/" className={styles.clearFilter}>
              ✕
            </Link>
          </div>
        )}
      </header>
      <div className={styles.page_content}>
        <aside>
          <ul>
            <li>
              <a href="">Github</a>
              <a href="">Linkedin</a>
              <a href="">Twitter</a>
              <a href="">Facebook</a>
            </li>
          </ul>
        </aside>
        <main className={styles.main}>
          {posts.length > 0 ? (
            <>
              <div className={styles.posts}>
                {posts.map((post: any) => (
                  <PostCard key={post._id} id={post._id} {...post} />
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
        <aside className={styles.widgets}>
          <GoodReads />
          <LichessFeed />
        </aside>
      </div>
    </div>
  );
}
