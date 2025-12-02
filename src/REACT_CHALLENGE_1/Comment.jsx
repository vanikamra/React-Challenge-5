import React from "react";
import "./Comments.css";

export default function Comment({ name, date, text, avatar }) {
  // Ensure date is a Date object
  const dateObj = date instanceof Date ? date : new Date(date);

  // Format date
  const displayDate = dateObj.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="comment">

      {/* Avatar block */}
      {avatar && (
        <div className="comment__avatar-wrapper">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="comment__avatar"
          />
        </div>
      )}

      {/* Body */}
      <div className="comment__body">
        <header className="comment__header">
          <span className="comment__author">{name}</span>

          <time
            className="comment__date"
            dateTime={dateObj.toISOString()}
          >
            {displayDate}
          </time>
        </header>

        <p className="comment__text">{text}</p>
      </div>

    </article>
  );
}

