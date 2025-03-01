'use client';

import styles from './page.module.css';
import PostForm from '@/components/PostForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Post {
  _id: string;
  title: string;
  date: string;
  tags: string[];
}

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete post');

      // Refresh the posts list
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Admin Panel</h1>
          <Link href="/" className={styles.viewBlog}>
            View Blog
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.createPost}>
          <h2>Create New Post</h2>
          <PostForm onSuccess={fetchPosts} />
        </section>

        <section className={styles.posts}>
          <h2>All Posts</h2>
          <div className={styles.postsList}>
            {posts.map((post) => (
              <div key={post._id} className={styles.postItem}>
                <h3>{post.title}</h3>
                <div className={styles.postMeta}>
                  <time>{post.date}</time>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.actions}>
                  <Link href={`/admin/posts/${post._id}/edit`}>
                    Edit
                  </Link>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 