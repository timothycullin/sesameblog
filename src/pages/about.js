import SEO from '../components/SEO';
import Footer from '../components/Footer';
import styles from './about.module.css';

export default function About() {
    return (
        <div className="page-container">
            {/* SEO meta tags */}
            <SEO
                title="About Sesame Blog - Administrative Law, Immigration & Human Rights"
                description="Learn more about Sesame Blog, providing insights, updates, and analysis on administrative law, immigration, and human rights."
            />

            <main className={styles.main}>
                <h1>About Sesame Blog</h1>
                <div className={styles['paragraphs-highlight']}>
                    <p>
                        This is a legal blog dedicated to providing insights, updates, and analysis
                        on administrative, immigration, and human rights matters.
                    </p>
                    <p>
                        Our goal is to help practitioners, students, and interested readers
                        stay informed and engaged with developments in these areas of law.
                    </p>
                    <p>
                        We strive to present content that is clear, accurate, and accessible,
                        offering value to anyone seeking to understand complex legal issues.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
