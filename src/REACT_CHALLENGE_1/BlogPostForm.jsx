import React, { useState, useEffect } from "react";
import styles from "./BlogPostForm.module.css";

export default function BlogPostForm({ post, onSubmit }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [date, setDate] = useState(post?.date || "");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setAuthor(post.author || "");
      setDate(post.date || "");
    }
  }, [post]);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Required";
    if (!content.trim()) newErrors.content = "Required";
    if (!author.trim()) newErrors.author = "Required";
    if (!date) newErrors.date = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    onSubmit({ title, content, author, date });
    setIsSubmitting(false);
  }

  const isEditMode = Boolean(post);

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      {/* TITLE */}
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />

        {errors.title && (
          <p id="title-error" className={styles.error} role="alert">
            {errors.title}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : undefined}
        />
        {errors.content && (
          <p id="content-error" className={styles.error} role="alert">
            {errors.content}
          </p>
        )}
      </div>

      {/* AUTHOR */}
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? "author-error" : undefined}
        />
        {errors.author && (
          <p id="author-error" className={styles.error} role="alert">
            {errors.author}
          </p>
        )}
      </div>

      {/* DATE */}
      <div className={styles.formGroup}>
        <label htmlFor="date">Publication Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && (
          <p id="date-error" className={styles.error} role="alert">
            {errors.date}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? isEditMode
            ? "Updating..."
            : "Submitting..."
          : isEditMode
          ? "Update Post"
          : "Create Post"}
      </button>
    </form>
  );
}
