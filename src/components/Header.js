import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles['blog-header']} aria-label="Blog Header">
            <h1 className={styles['blog-title']}>
                Sesame Blog
                <span className={styles['visually-hidden']}>
                    Legal Blog on Administrative Law, Immigration, and Human Rights
                </span>
            </h1>

            <p className={styles['blog-label']}>Legal Blog</p>
            <p className={styles['blog-description']}>
                Insights and updates on administrative law, immigration, and human rights developments in Australia and around the world.
            </p>
        </header>
    );
}
