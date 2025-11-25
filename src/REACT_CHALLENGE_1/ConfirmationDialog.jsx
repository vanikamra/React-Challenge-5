import React, { useEffect, useRef } from "react";
import styles from "./ConfirmationDialog.module.css";

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) {
  const dialogRef = useRef(null);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  // Allow Escape key to close the dialog
    function handleKeyDown(e) {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key === "Tab" && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      // If there are no focusable elements, do nothing special
      if (!first || !last) return;

      if (!e.shiftKey && document.activeElement === last) {
        // Tab from last; loop back to first
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        // Shift and Tab from first; loop to last
        e.preventDefault();
        last.focus();
      }
    }
  }


  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()} 
        onKeyDown={handleKeyDown}
      >
        <h2 id="dialog-title">Confirm Deletion</h2>
        <p id="dialog-description">
          Are you sure you want to delete this post?
        </p>

        <div className={styles.buttons}>
          <button type="button" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
