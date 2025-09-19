import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Link from 'next/link';

const Content = ({ category }) => {
    const apiUrl = category ? `/api/blogs?categories=${category}` : `/api/blogs`;
    const { data: blogPosts, loading, error } = useFetch(apiUrl, 'blogPosts');

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const getTextSnippet = (htmlString, wordLimit = 30) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        const text = div.textContent || div.innerText || "";
        return text.split(/\s+/).slice(0, wordLimit).join(" ") + '...';
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Array.isArray(blogPosts)
        ? blogPosts.slice(indexOfFirstPost, indexOfLastPost)
        : [];
    const totalPages = Math.ceil((blogPosts?.length || 0) / postsPerPage);

    return (
        <div className="bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((blog) => (
                        <div key={blog.id} className="bg-white rounded shadow overflow-hidden">
                            <Link href={`/blog/${blog.slug}`} className="inline-block text-sm text-blue-600">
                                <img
                                    src={blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.png'}
                                    alt={blog.title.rendered}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="px-4 py-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500">
                                        {blog.date.split("T")[0]}
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                                        {blog._embedded?.['wp:term']?.[0][0]?.name || '/placeholder.png'}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    <a href={`/blog/${blog.slug}`} className="inline-block text-sm text-blue-600">
                                        {blog.title.rendered}
                                    </a>
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {getTextSnippet(blog.content.rendered, 10)}
                                </p>
                                <Link href={`/blog/${blog.slug}`} className="inline-block text-sm text-blue-600">
                                    Read more →
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

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
    );
};

export default Content;
