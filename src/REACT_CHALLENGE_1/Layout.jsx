import React from "react";
import NavBar from "./NavBar";
import styles from "./Layout.module.css";

export default function Layout({ children, onSearch }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavBar onSearch={onSearch} />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; 2025 BlogApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
