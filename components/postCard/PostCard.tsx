import Link from "next/link";
import styles from "./PostCard.module.css";

interface PostCardProps {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

export default function PostCard({ id, title, date, tags }: PostCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${id}`} className={styles.titleLink}>
        <h2>{title}</h2>
      </Link>
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
