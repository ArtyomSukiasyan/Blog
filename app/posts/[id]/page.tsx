import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import { Metadata } from "next";
import getPostById from "@/helpers/getPostById";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { id } = await params;
  const { post } = (await getPostById(id)) || { post: null };
  if (!post) {
    return {
      title: "",
    };
  }
  return {
    title: `${post.title} | devchessplayer`,
    description: post.content.slice(0, 100),
  };
}

export default async function PostPage({ params }: IParams) {
  const { id } = await params;
  const { post } = (await getPostById(id)) || { post: null };

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Posts
        </Link>
        <h1>{post.title}</h1>
        <div className={styles.metadata}>
          <time>{post.date}</time>
          <div className={styles.tags}>
            {post.tags.map((tag: string) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
