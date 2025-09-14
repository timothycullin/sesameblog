// pages/_app.js
import Head from 'next/head';

// Global styles
import '../styles/style.css';

// Global components
import Navbar from '../components/Navbar';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Favicons */}
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />

                {/* Social preview */}
                <meta property="og:image" content="/social-preview-1200x630.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="/social-preview-1200x630.png" />

            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}
