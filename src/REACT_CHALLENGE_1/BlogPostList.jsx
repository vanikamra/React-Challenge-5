import { Link } from "react-router-dom";
import BlogPostItem from "./BlogPostItem.jsx";
import styles from "./BlogPostList.module.css";

export default function BlogPostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>No blog posts available.</p>;
  }

  return (
    <>
      {/* ⭐ ADD THIS OUTSIDE THE BLOGPOSTLIST CONTAINER */}
      <p style={{ margin: "20px" }}>
        <Link to="/posts/new">Create New Post</Link>
      </p>

      {/* ⭐ Your original container */}
      <div className={styles.blogPostList}>
        {posts.map((post) => (
          <BlogPostItem
            key={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            url={post.url}
          />
        ))}
      </div>
    </>
  );
}
