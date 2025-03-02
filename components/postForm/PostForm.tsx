"use client";

import { useState } from "react";
import styles from "./PostForm.module.css";
import Markdown from "react-markdown";

interface PostFormProps {
  onSuccess: () => void;
}

export default function PostForm({ onSuccess }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      setFormData({ title: "", content: "", tags: "" });
      onSuccess();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content (Markdown)</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          required
        />
        <div className={styles.preview}>
          <h4>Preview:</h4>
          <Markdown>{formData.content}</Markdown>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="nextjs, markdown, blog"
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.primaryButton}>
          Create Post
        </button>
      </div>
    </form>
  );
}
