// pages/index.js
import SEO from '../components/SEO';
import Header from '../components/Header';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import { posts } from '../data/posts'; // ✅ points to posts.js

export default function Home() {
    return (
        <div className="page-container">
            <SEO
                title="Sesame Blog - Insights on Administrative Law, Immigration, and Human Rights"
                description="Stay updated with news and insights on administrative law, immigration, and human rights developments in Australia and around the world."
            />

            <main>
                <Header />
                <PostList posts={posts} />
            </main>

            <Footer />
        </div>
    );
}
