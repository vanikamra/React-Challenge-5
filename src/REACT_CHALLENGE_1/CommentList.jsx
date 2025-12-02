import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments }) {

  if (!comments || comments.length === 0) {
    return (
      <section className="comments-section" aria-label="Comments">
        <h2 className="comments-section__title">Comments</h2>
        <p className="comments__empty">
          No comments yet. Be the first to comment.
        </p>
      </section>
    );
  }

  return (
    <section className="comments-section" aria-label="Comments">
      <h2 className="comments-section__title">Comments</h2>
      <div className="comments">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            name={comment.name}
            date={comment.date}
            text={comment.text}
            avatar={comment.avatar}
          />
        ))}
      </div>
    </section>
  );
}
