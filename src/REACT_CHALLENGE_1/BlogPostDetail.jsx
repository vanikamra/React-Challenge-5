import React, { useState, useRef } from "react"; 
import styles from "./BlogPostDetail.module.css";
import DeleteButton from "./DeleteButton.jsx"; 
import ConfirmationDialog from "./ConfirmationDialog.jsx"; 
import CommentList from "./CommentList.jsx";   // 
import CommentForm from "./CommentForm.jsx";   //


// BlogPostDetail receives id and onDelete from the parent
export default function BlogPostDetail({ id, title, content, author, date, onDelete }) {

  // State for dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for loading indicator while deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // Ref to restore focus to the Delete button after closing dialog
  const deleteButtonRef = useRef(null);

  //  State for comments on this blog post
  const [comments, setComments] = useState([]);

  const isLoggedIn = true;
  const userName = "Vani Kamra";


  //  Handler to add a new comment
  function handleAddComment({ name, text }) {
    const newComment = {
      id: Date.now().toString(),  // simple unique id
      name,
      text,
      date: new Date(),           // will be formatted in Comment component
      avatar: null,
    };

    // Append to keep most recent at the bottom 
    setComments((prevComments) => [...prevComments, newComment]);
  }


  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Open dialog
  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  // Close dialog
  function handleCloseDialog() {
    if (!isDeleting) {
      setIsDialogOpen(false);

      // Restore focus to the Delete button
      if (deleteButtonRef.current) {
        deleteButtonRef.current.focus();
      }
    }
  }

  // Confirm deletion
  async function handleConfirmDelete() {
    setIsDeleting(true);
    await Promise.resolve(onDelete(id)); // Call parent handler
    setIsDeleting(false);
    setIsDialogOpen(false);
  }

  return (
    <div className={styles.blogPostDetail}>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>

      {/* Blog Content */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Comments Section */}
      <CommentList comments={comments} />
      <CommentForm
        onSubmit={handleAddComment}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />


      {/* Delete Button */}
      <div className={styles.actions}>
        <DeleteButton
          onClick={handleOpenDialog}
          disabled={isDeleting}
          ref={deleteButtonRef}
        />
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  );
}
