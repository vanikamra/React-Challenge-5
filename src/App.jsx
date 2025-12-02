import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import BlogPostList from "./REACT_CHALLENGE_1/BlogPostList.jsx";
import BlogPostDetail from "./REACT_CHALLENGE_1/BlogPostDetail.jsx";
import BlogPostForm from "./REACT_CHALLENGE_1/BlogPostForm.jsx";
import Layout from "./REACT_CHALLENGE_1/Layout.jsx";

const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React",
    summary: "Learn the basics of React and build your first application.",
    content: `
      <p>React makes it easy to build interactive UIs using components.</p>
      <p>In this post, we’ll explore how to break your UI into reusable pieces.</p>
      <p><strong>Key ideas:</strong> components, props, and state.</p>
    `,
    author: "Vani Kamra",
    date: "2023-01-01",
    url: "/posts/1",
  },
  {
    id: "2",
    title: "CSS Grid vs Flexbox",
    summary: "Compare two powerful layout systems in modern CSS.",
    content: `
      <p>CSS Grid is great for two-dimensional layouts (rows + columns).</p>
      <p>Flexbox is ideal for one-dimensional layouts (single row or column).</p>
      <p>In this post, we'll see when to use each one.</p>
    `,
    author: "Vani Kamra",
    date: "2023-02-15",
    url: "/posts/2",
  },
  {
    id: "3",
    title: "Accessibility in Web Development",
    summary: "Tips for making your web applications more accessible.",
    content: `
      <p>Accessible web apps work better for everyone, not just people
      with disabilities.</p>
      <p>We’ll talk about semantic HTML, ARIA labels, and keyboard navigation.</p>
    `,
    author: "Vani Kamra",
    date: "2023-03-10",
    url: "/posts/3",
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);

  // remove post from state
  function handleDeletePost(idToDelete) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== idToDelete));
  }

  function BlogPostDetailRoute() {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return <p>Blog post not found.</p>;
    }

    
    function handleDeleteAndNavigate(postId) {
      handleDeletePost(postId);   // remove from state
      navigate("/");              // redirect back to list
    }

    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <BlogPostDetail
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          onDelete={handleDeleteAndNavigate}
        />

        <p style={{ marginTop: "1rem" }}>
          <Link to={`/posts/${post.id}/edit`}>Edit this post</Link>
        </p>
      </div>
    );
  }

  function NewPostRoute() {
    const navigate = useNavigate();

    function handleCreate(formData) {
      const newId = Date.now().toString();

      
      const plainContent = formData.content.replace(/<[^>]+>/g, "");
      const summary =
        plainContent.length > 100
          ? plainContent.slice(0, 100) + "..."
          : plainContent;

      const newPost = {
        id: newId,
        title: formData.title,
        content: formData.content,
        author: formData.author,
        date: formData.date,
        summary,
        url: `/posts/${newId}`,
      };

      setPosts((prev) => [...prev, newPost]);
      navigate(`/posts/${newId}`);
    }

    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#333333",
            marginBottom: "30px",
          }}
        >
          Create New Post
        </h1>

        <BlogPostForm onSubmit={handleCreate} />
      </div>
    );
  }

  function EditPostRoute() {
    const { id } = useParams();
    const navigate = useNavigate();

    const postToEdit = posts.find((p) => p.id === id);
    if (!postToEdit) {
      return <p>Blog post not found.</p>;
    }

    function handleUpdate(formData) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                title: formData.title,
                content: formData.content,
                author: formData.author,
                date: formData.date,
              }
            : p
        )
      );

      navigate(`/posts/${id}`);
    }

    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#333333",
            marginBottom: "30px",
          }}
        >
          Edit Post
        </h1>

        <BlogPostForm post={postToEdit} onSubmit={handleUpdate} />
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} />} />
        <Route path="/posts/new" element={<NewPostRoute />} />
        <Route path="/posts/:id" element={<BlogPostDetailRoute />} />
        <Route path="/posts/:id/edit" element={<EditPostRoute />} />
      </Routes>
    </Layout>
  );
}

export default App;

