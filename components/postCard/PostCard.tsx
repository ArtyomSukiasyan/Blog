import Link from "next/link";
import styles from "./PostCard.module.css";
import { IPost } from "@/models/interfaces/post";

interface PostCardProps extends IPost {
  id: string;
}

export default function PostCard({
  id,
  title,
  date,
  tags,
  content,
}: PostCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${id}`} className={styles.titleLink}>
        <h2>{title}</h2>
      </Link>
      <div>{content.slice(0, 144)}...</div>
      <div className={styles.metadata}>
        <time>{date}</time>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link key={tag} href={`/?tag=${tag}`} className={styles.tag}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
