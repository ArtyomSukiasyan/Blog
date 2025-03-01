import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";

async function getPost(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { post } = (await getPost(id)) || { post: null };

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
