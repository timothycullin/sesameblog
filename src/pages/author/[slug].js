import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { posts } from '../../data/posts';
import PostList from '../../components/PostList';
import AppImage from '../../components/AppImage';
import SEO from '../../components/SEO';
import styles from './[slug].module.css';

export default function AuthorPage({ authorPosts, authorName, authorBio, authorImage, authorSlug }) {
    const router = useRouter();

    if (router.isFallback) return <div>Loading author...</div>;

    return (
        <div className="page-container">
            <SEO
                title={`${authorName} | Sesame Blog`}
                description={`Read articles by ${authorName} on administrative law, immigration and human rights.`}
                image={authorImage ? `https://sesameblog.vercel.app${authorImage}` : null}
                url={`https://sesameblog.vercel.app/author/${authorSlug}`}
            />

            <Navbar />

            <main>
                {/* Author Bio with Image */}
                <section className={styles['author-header']}>
                    {authorImage && (
                        <figure className={styles['author-image']}>
                            <AppImage
                                src={authorImage}
                                alt={`Photo of ${authorName}`}
                                width={120}
                                height={120}
                                fill={false} // fixed size
                                blurDataURL="/placeholder-avatar.png"
                            />
                            <figcaption className="sr-only">{authorName}</figcaption>
                        </figure>
                    )}

                    <div className={styles['author-info']}>
                        <h1 className={styles['author-page-title']}>{authorName}</h1>
                        {authorBio && (
                            <div className={styles['author-bio-text']}>
                                {authorBio.split('\n').map((line, idx) =>
                                    line.toLowerCase().startsWith('contact:') ? (
                                        <p key={idx} className={styles['author-contact']}>
                                            Contact at{' '}
                                            <a href={`mailto:${line.split(':')[1].trim()}`}>
                                                {line.split(':')[1].trim()}
                                            </a>
                                        </p>
                                    ) : (
                                        <p key={idx}>{line}</p>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Posts by Author */}
                <PostList posts={authorPosts} centered />
            </main>

            <Footer />
        </div>
    );
}

// Static paths
export async function getStaticPaths() {
    const slugs = Array.from(new Set(posts.map(post => post.authorSlug)));
    const paths = slugs.map(slug => ({ params: { slug } }));
    return { paths, fallback: true };
}

// Static props
export async function getStaticProps({ params }) {
    const authorSlug = params.slug;

    const authorPosts = posts.filter(post => post.authorSlug === authorSlug);

    if (!authorPosts.length) {
        return { notFound: true };
    }

    const authorName = authorPosts[0].author;

    const authorBioData = {
        'tim-cullin':
            "Tim Cullin is a lawyer focusing on administrative law, refugee policy and human rights.\nContact: cullintimothy@gmail.com",

    };

    const authorBio = authorBioData[authorSlug] || '';

    const authorImageData = {
        'tim-cullin': '/tim-cullin.jpg',

    };
    const authorImage = authorImageData[authorSlug] || '';

    return {
        props: { authorPosts, authorName, authorBio, authorImage, authorSlug },
        revalidate: 10,
    };

}
