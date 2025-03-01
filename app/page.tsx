import styles from './page.module.css';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

async function getPosts(tag?: string) {
  const url = tag 
    ? `http://localhost:3000/api/posts?tag=${encodeURIComponent(tag)}`
    : 'http://localhost:3000/api/posts';
    
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const { posts } = await getPosts(searchParams.tag);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>My Blog</h1>
          {searchParams.tag && (
            <div className={styles.activeFilter}>
              Filtered by tag: <span className={styles.activeTag}>{searchParams.tag}</span>
              <Link href="/" className={styles.clearFilter}>✕</Link>
            </div>
          )}
        </div>
        <a href="/posts/new" className={styles.createButton}>
          Create New Post
        </a>
      </header>

      <main className={styles.main}>
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard
              key={post._id}
              id={post._id}
              title={post.title}
              date={post.date}
              tags={post.tags}
            />
          ))
        ) : (
          <p className={styles.noPosts}>
            {searchParams.tag 
              ? `No posts found with tag "${searchParams.tag}"`
              : 'No posts yet. Create your first post!'}
          </p>
        )}
      </main>
    </div>
  );
}
