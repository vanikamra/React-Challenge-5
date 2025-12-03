import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar.jsx";

export default function NavBar({ onSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        setMobileSearchOpen(false); // if menu opens, close search
      }
      return next;
    });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function openMobileSearch() {
    setMobileSearchOpen(true);
    setIsMobileMenuOpen(false); // make sure menu is closed
  }

  function closeMobileSearch() {
    setMobileSearchOpen(false);
  }

  return (
    <div className={styles.navWrapper}>
      {/* TOP NAV BAR */}
      <nav className={styles.navBar}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          BlogApp
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Desktop search: one search bar and one small white icon button */}
        {onSearch && (
          <div className={styles.searchDesktop}>
            <SearchBar onSearch={onSearch} />
            <button
              className={styles.searchButton}
              aria-label="Search posts"
              type="button"
            >
              🔍
            </button>
          </div>
        )}

        {/* Mobile search icon (shown only on small screens) */}
        {onSearch && (
          <button
            className={styles.mobileSearchIcon}
            onClick={openMobileSearch}
            aria-label="Open search"
            type="button"
          >
            🔍
          </button>
        )}

        {/* Hamburger button for mobile menu */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/blog" onClick={closeMobileMenu}>
              Blog
            </Link>
            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </div>
        )}
      </nav>

      {/* Expanded mobile search bar BELOW the navbar */}
      {mobileSearchOpen && (
        <div className={styles.mobileSearchBar}>
          <SearchBar onSearch={onSearch} />
          <button
            className={styles.mobileSearchCancel}
            onClick={closeMobileSearch}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
