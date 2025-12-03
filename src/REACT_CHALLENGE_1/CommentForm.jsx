import React, { useState } from "react";
import "./Comments.css";

export default function CommentForm({ onSubmit, isLoggedIn, userName }) {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage("");

    const newErrors = {};

    const finalName = isLoggedIn ? userName : name.trim();
    const finalText = text.trim();

    if (!finalName) {
      newErrors.name = "Name is required.";
    }
    if (!finalText) {
      newErrors.text = "Comment cannot be empty.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    onSubmit({
      name: finalName,
      text: finalText,
    });

    setIsSubmitting(false);
    setText(""); // always clear the comment text

    // If user is not logged in, also clear the name field
    if (!isLoggedIn) {
      setName("");
    }

    setStatusMessage("Your comment has been added.");
  }

  return (
    <section className="comment-form" aria-label="Add a comment">
      <div className="comments__sr-status" aria-live="polite">
        {statusMessage}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name field */}
        {!isLoggedIn && (
          <div className="comment-form__field">
            <label className="comment-form__label" htmlFor="commenter-name">
              Name
            </label>
            <input
              id="commenter-name"
              type="text"
              className="comment-form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="comment-form__error">{errors.name}</p>
            )}
          </div>
        )}

        {isLoggedIn && (
          <div className="comment-form__field">
            <label className="comment-form__label" htmlFor="commenter-name">
              Name
            </label>
            <input
              id="commenter-name"
              type="text"
              className="comment-form__input"
              value={userName}
              disabled
            />
          </div>
        )}

        {/* Comment text field */}
        <div className="comment-form__field">
          <label className="comment-form__label" htmlFor="comment-text">
            Comment
          </label>
          <textarea
            id="comment-text"
            className="comment-form__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {errors.text && (
            <p className="comment-form__error">{errors.text}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="comment-form__actions">
          <button
            type="submit"
            className="comment-form__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </section>
  );
}
