import { Link } from "react-router-dom";
import styles from "./BlogPostItem.module.css";

export default function BlogPostItem({ title, summary, date, url }) { // Destructure props
  const [year, month, day] = date.split("-").map(Number); // Split date string into components
  const jsDate = new Date(year, month - 1, day); // Create JS Date object

  const formattedDate = jsDate.toLocaleDateString("en-US", { // Format date
    year: "numeric", // Options for formatting //numberic year
    month: "long", // Full month name // like January
    day: "numeric", // Day of the month // 1-31
  });

  return (
    <div className={styles.blogPostItem}> {/* Container div with CSS class */}
      <Link to={url} className={styles.titleLink}> {/* Link to blog post URL */}
        <h2 className={styles.title}>{title}</h2> {/* Blog post title */}
      </Link>
      <p className={styles.summary}>{summary}</p> {/* Blog post summary */}
      <p className={styles.date}>Published on {formattedDate}</p> {/* Formatted publication date */}
    </div>
  );
}

