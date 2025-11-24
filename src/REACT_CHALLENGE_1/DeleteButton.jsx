import React from "react";
import styles from "./DeleteButton.module.css";

// Use forwardRef so the parent can attach a ref to the <button>
const DeleteButton = React.forwardRef(function DeleteButton(
  { onClick, disabled },
  ref
) {
  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      Delete
    </button>
  );
});

export default DeleteButton;
