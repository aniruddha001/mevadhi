import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Headers from "../../components/Header";
import Footer from "../../components/Footer";

const Slug = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/getblogs?slug=${slug}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setBlogPosts(data.blogPosts || []);
            } catch (err) {
                console.error('Client error fetching blogPosts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <p>Loading blog...</p>;
    if (error) return <p>Error: {error}</p>;
    if (blogPosts.length === 0) return <p>No blog found for this slug.</p>;

    const post = blogPosts[0];

    return (
        <>
            <Headers />
            <div className="bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
                    <section className="md:col-span-3">
                        <img
                            src={post._embedded['wp:featuredmedia']?.[0]?.source_url}
                            alt={post.title.rendered}
                            className="w-full object-cover"
                        />
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        <div className="text-gray-800 text-lg mt-6" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Slug;
