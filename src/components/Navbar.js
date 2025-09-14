import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SvgLogoComponent from "./SvgLogoComponent";
import styles from './Navbar.module.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const isActive = (path) => router.pathname === path;

    // Close mobile menu on window resize > 768px
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [menuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        const handleRouteChange = () => setMenuOpen(false);
        router.events.on("routeChangeStart", handleRouteChange);
        return () => router.events.off("routeChangeStart", handleRouteChange);
    }, [router.events]);

    return (
        <>
            <header className={styles['top-nav']}>
                <div className={styles['nav-container']}>
                    <div className={styles['nav-left']}>
                        <Link
                            href="/"
                            aria-label="Sesame Logo"
                            className={styles['logo-link']}
                            onClick={() => setMenuOpen(false)}
                        >
                            <SvgLogoComponent className={styles.logo} />
                        </Link>
                    </div>

                    <nav className={`${styles['nav-right']} ${styles['desktop-menu']}`}>
                        <Link
                            href="/about"
                            className={styles['nav-link']}
                            aria-current={isActive("/about") ? "page" : undefined}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={styles['nav-link']}
                            aria-current={isActive("/contact") ? "page" : undefined}
                        >
                            Contact
                        </Link>
                    </nav>

                    <button
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={toggleMenu}
                        className={`${styles['menu-toggle-btn']} ${menuOpen ? styles.open : ""}`}
                        type="button"
                    >
                        {menuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M6 18L18 6" />
                                <path d="M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className={styles.hamburger}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M3 6h18" />
                                <path d="M3 12h18" />
                                <path d="M3 18h18" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile dropdown menu below navbar */}
            <nav className={`${styles['mobile-menu']} ${menuOpen ? styles.open : ""}`}>
                <Link
                    href="/about"
                    className={styles['nav-link']}
                    aria-current={isActive("/about") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                >
                    About
                </Link>
                <Link
                    href="/contact"
                    className={styles['nav-link']}
                    aria-current={isActive("/contact") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                >
                    Contact
                </Link>
            </nav>
        </>
    );
}
