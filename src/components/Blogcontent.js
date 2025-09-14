import React, { useEffect, useState } from 'react';

const Content = () => {
    const [blogPosts, setAllblogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Text snippet utility
    const getTextSnippet = (htmlString, wordLimit = 30) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        const text = div.textContent || div.innerText || "";
        const words = text.split(/\s+/).slice(0, wordLimit).join(" ");
        return words + '...';
    };

    // Fetch blog posts
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllblogs(data.blogPosts);
            } catch (err) {
                console.error('Client error fetching blogs:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    if (loading) return <p>Loading Blogs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Blog Posts */}
                    <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            currentPosts.map((blog) => (
                                <div key={blog.id} className="bg-white rounded shadow overflow-hidden">
                                    <img
                                        src={blog._embedded['wp:featuredmedia']?.[0]?.source_url}
                                        alt={blog.title.rendered}
                                        width={300}
                                        height={150}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{blog.title.rendered}</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {getTextSnippet(blog.content.rendered, 10)}
                                        </p>
                                        <a href={`/blog/${blog.slug}`} className="inline-block text-sm text-blue-600 hover:underline">
                                            Read more →
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </section>

                    {/* Sidebar */}
                    <aside className="md:col-span-1 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Categories</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><a href="#" className="hover:text-blue-600">Technology</a></li>
                            <li><a href="#" className="hover:text-blue-600">Health</a></li>
                            <li><a href="#" className="hover:text-blue-600">Design</a></li>
                            <li><a href="#" className="hover:text-blue-600">Travel</a></li>
                            <li><a href="#" className="hover:text-blue-600">Business</a></li>
                        </ul>
                    </aside>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-10 space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default Content;
