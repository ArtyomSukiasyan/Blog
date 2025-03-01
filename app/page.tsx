import styles from './page.module.css';
import PostCard from '@/components/PostCard';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Home() {
  const { posts } = await getPosts();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Blog</h1>
        <a href="/posts/new" className={styles.createButton}>
          Create New Post
        </a>
      </header>

      <main className={styles.main}>
        {posts.map((post: any) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </main>
    </div>
  );
}
