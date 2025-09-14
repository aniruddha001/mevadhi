import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Headers from '@/components/Header';
import Footer from '@/components/Footer';

// Constants
const WORDPRESS_API_BASE = 'https://www.mahitiinmarathi.in/staging/wp-json/wp/v2';

/**
 * Utility function to format date strings
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Fetches a single blog post by slug from WordPress API
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object>} Blog post data
 */
const fetchBlogPost = async (slug) => {
    const response = await fetch(`${WORDPRESS_API_BASE}/posts?slug=${slug}&_embed`);

    if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error('Blog post not found');
    }

    return data[0];
};

const BlogPost = () => {
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (!slug) return;

        const loadBlogPost = async () => {
            try {
                setLoading(true);
                setError(null);
                const post = await fetchBlogPost(slug);
                setBlogPost(post);
            } catch (err) {
                console.error('Error loading blog post:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogPost();
    }, [slug]);

    // Loading state component
    const LoadingState = () => (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blog post...</p>
            </div>
        </div>
    );

    // Error state component
    const ErrorState = ({ error }) => (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );

    // Not found state component
    const NotFoundState = () => (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );

    // Early returns for different states
    if (loading) {
        return (
            <>
                <Headers />
                <LoadingState />
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Headers />
                <ErrorState error={error} />
                <Footer />
            </>
        );
    }

    if (!blogPost) {
        return (
            <>
                <Headers />
                <NotFoundState />
                <Footer />
            </>
        );
    }

    // Breadcrumb component
    const Breadcrumb = () => (
        <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <button
                        onClick={() => router.push('/')}
                        className="hover:text-blue-600 transition-colors"
                    >
                        Home
                    </button>
                </li>
                <li>/</li>
                <li>
                    <button
                        onClick={() => router.push('/')}
                        className="hover:text-blue-600 transition-colors"
                    >
                        Blog
                    </button>
                </li>
                <li>/</li>
                <li className="text-gray-900 truncate max-w-xs">
                    {blogPost.title.rendered}
                </li>
            </ol>
        </nav>
    );

    // Featured image component
    const FeaturedImage = () => {
        const featuredMedia = blogPost._embedded?.['wp:featuredmedia']?.[0];

        if (!featuredMedia?.source_url) return null;

        return (
            <div className="mb-8">
                <Image
                    src={featuredMedia.source_url}
                    alt={blogPost.title.rendered}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    priority
                />
            </div>
        );
    };

    // Post meta component
    const PostMeta = () => {
        const categories = blogPost._embedded?.['wp:term']?.[0];

        return (
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <span>Published on {formatDate(blogPost.date)}</span>
                {categories && categories.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span>Categories:</span>
                        {categories.map((category) => (
                            <span
                                key={category.id}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Author info component
    const AuthorInfo = () => {
        const author = blogPost._embedded?.['wp:author']?.[0];

        if (!author) return null;

        return (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                    {author.avatar_urls?.['96'] && (
                        <Image
                            src={author.avatar_urls['96']}
                            alt={author.name}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    )}
                    <div>
                        <h4 className="font-semibold text-gray-900">
                            {author.name}
                        </h4>
                        {author.description && (
                            <p className="text-gray-600 text-sm mt-1">
                                {author.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Navigation component
    const PostNavigation = () => (
        <div className="mt-8 flex justify-between">
            <button
                onClick={() => router.push('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
            >
                ← Back to Blog
            </button>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
                ↑ Back to Top
            </button>
        </div>
    );

    return (
        <>
            <Headers />
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Breadcrumb />
                        <FeaturedImage />

                        {/* Post Header */}
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {blogPost.title.rendered}
                            </h1>
                            <PostMeta />
                        </header>
                    </div>
                </div>

                {/* Post Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <article className="bg-white rounded-lg shadow-sm p-8">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: blogPost.content.rendered }}
                        />
                    </article>

                    <AuthorInfo />
                    <PostNavigation />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPost;