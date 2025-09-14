// components/SEO.jsx
import Head from 'next/head';

export default function SEO({ title, description, image }) {
    return (
        <Head>
            {/* Page title */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter / X card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
        </Head>
    );
}
