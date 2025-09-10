'use client';
import React from 'react'
import { useState } from 'react';

const blogPosts = [
    { id: 1, title: 'Blog 1', image: 'https://www.gstatic.com/webp/gallery3/1.png' },
    { id: 2, title: 'Blog 2', image: 'https://www.gstatic.com/webp/gallery3/2_webp_ll.png' },
    { id: 3, title: 'Blog 3', image: 'https://www.gstatic.com/webp/gallery3/3_webp_ll.png' },
    { id: 4, title: 'Blog 4', image: 'https://www.gstatic.com/webp/gallery3/1.png' },
    { id: 5, title: 'Blog 5', image: 'https://www.gstatic.com/webp/gallery3/1.png' },
    { id: 6, title: 'Blog 6', image: 'https://www.gstatic.com/webp/gallery3/1.png' },
];

const ITEMS_PER_PAGE = 3;


const Content = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(blogPosts.length / ITEMS_PER_PAGE);

    const paginatedPosts = blogPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Blog Cards */}
                <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded shadow overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <a href="#" className="inline-block text-sm text-blue-600 hover:underline">
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))}
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

            {/* Pagination */}
            <div className="mt-8 flex justify-center space-x-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : ''
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Content