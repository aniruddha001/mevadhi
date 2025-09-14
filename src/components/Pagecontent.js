import React from 'react'
import { useEffect, useState } from 'react';

const Pagecontent = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/pages');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPages(data.pages);
            } catch (err) {
                console.error('Client error fetching menus:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    if (loading) return <p>Loading Pages...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <div className='bg-gray-100 py-8'>
                <div className="max-w-7xl mx-auto px-4">
                    <section className="md:col-span-3">
                        {
                            pages.map((page) => (
                                <div key={page.id}>
                                    <h2>{page.title.rendered}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default Pagecontent