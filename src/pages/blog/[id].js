import { useRouter } from 'next/router';
import Link from 'next/link';
import Footer from '../../components/Footer';
import AppImage from '../../components/AppImage';
import { posts } from '../../data/posts.js';
import SEO from '../../components/SEO';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import styles from './BlogPost.module.css';

export default function BlogPost({ post }) {
    const router = useRouter();

    if (router.isFallback) return <div>Loading post...</div>;
    if (!post) return <div>Post not found</div>;

    // Format date for display
    const formattedDate = new Date(post.date).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const authorSlug = post.author.toLowerCase().replace(/\s+/g, '-');

    // Helper function to encode URLs for sharing
    const getShareUrl = (platform) => {
        const postUrl = `https://sesameblog.vercel.app/blog/${post.slug}`;
        switch (platform) {
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`;
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            case 'linkedin':
                return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
            default:
                return '#';
        }
    };

    return (
        <div className="page-container">
            {/* SEO meta tags */}
            <SEO
                title={`${post.title} | Sesame Blog`}
                description={post.excerpt || "Read this blog post on Sesame Blog"}
                image={post.imageUrl ? `https://sesameblog.vercel.app${post.imageUrl}` : null}
                url={`https://sesameblog.vercel.app/blog/${post.slug}`}
            />

            <main className={styles['blog-post-container']}>
                <div className={styles['blog-post-header']}>
                    {post.imageUrl && (
                        <div className={styles['post-thumbnail-single']}>
                            <AppImage src={post.imageUrl} alt={`Thumbnail for ${post.title}`} />
                        </div>
                    )}

                    <div className={styles['post-info']}>
                        <h1>{post.title}</h1>
                        <p className={styles['post-date']}>{formattedDate}</p>
                        <p className={styles['post-author']}>
                            By <Link href={`/author/${authorSlug}`}>{post.author}</Link>
                        </p>
                    </div>
                </div>

                <article className={styles['post-content']}>
                    {post.excerpt && (
                        <div className={styles['post-excerpt-highlight']}>{post.excerpt}</div>
                    )}
                    {post.content
                        .split('\n')
                        .filter((para) => para.trim() !== '') // ignore empty lines
                        .map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                </article>

                <div className={styles['share-buttons']}>
                    <a
                        href={getShareUrl('twitter')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['share-button']}
                        aria-label={`Share "${post.title}" on Twitter`}
                    >
                        <FaTwitter className={styles['share-icon']} />
                    </a>

                    <a
                        href={getShareUrl('facebook')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['share-button']}
                        aria-label={`Share "${post.title}" on Facebook`}
                    >
                        <FaFacebookF className={styles['share-icon']} />
                    </a>

                    <a
                        href={getShareUrl('linkedin')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['share-button']}
                        aria-label={`Share "${post.title}" on LinkedIn`}
                    >
                        <FaLinkedinIn className={styles['share-icon']} />
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Generate paths for all posts
export async function getStaticPaths() {
    const paths = posts.map((post) => ({
        params: { id: post.slug },
    }));
    return { paths, fallback: true };
}

// Fetch post data
export async function getStaticProps({ params }) {
    const post = posts.find((p) => p.slug === params.id) || null;

    return {
        props: { post },
        revalidate: 10,
    };
}
