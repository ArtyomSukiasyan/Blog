"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import PostForm from "@/components/postForm/PostForm";
import styles from "./page.module.css";

interface Post {
  _id: string;
  title: string;
  date: string;
  tags: string[];
}

const itemsPerPage = 10;

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchPosts = async (page: number, limit: number) => {
    try {
      const res = await fetch(`/api/posts?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      fetchPosts(currentPage, itemsPerPage);
    } catch (error) {
      console.error("Error deleting post:", error);
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
          <PostForm onSuccess={() => fetchPosts(currentPage, itemsPerPage)} />
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
                  <Link href={`/admin/posts/${post._id}/edit`}>Edit</Link>
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
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
