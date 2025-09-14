import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Sesame. All rights reserved.</p>

            <p className={styles['footer-links']}>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </p>

            <p className={styles['footer-acknowledgment']}>
                Sesame acknowledges the Aboriginal and Torres Strait Islander peoples as the First Peoples and Traditional
                Custodians of the lands where we live, learn, work and play.
            </p>
        </footer>

    );
}
