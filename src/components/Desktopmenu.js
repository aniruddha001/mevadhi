import React from 'react'
import { useEffect, useState } from 'react';

const Desktopmenu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/menus');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMenus(data.menus);
            } catch (err) {
                console.error('Client error fetching menus:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    if (loading) return <p>Loading menus...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <nav className="hidden md:flex space-x-6 items-center">
                {menus.map((menu) => {
                    // Get top-level items
                    const topLevelItems = menu.items.filter(item => item.parent_id === "0");

                    return topLevelItems.map((item) => {
                        // Check for children
                        const childItems = menu.items.filter(child => child.parent_id === String(item.id));

                        if (childItems.length > 0) {
                            // Dropdown
                            return (
                                <div key={item.id} className="relative group">
                                    <button className="hover:text-gray-200 flex items-center gap-1">
                                        {item.title}
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-10">
                                        {childItems.map(child => (
                                            <a
                                                key={child.id}
                                                href={child.url}
                                                className="block px-4 py-2 hover:bg-blue-800"
                                            >
                                                {child.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // Normal menu link
                        return (
                            <a key={item.id} href={'/' + item.title.toLowerCase().replace(/\s+/g, '-')} className="hover:text-gray-200">
                                {item.title}
                            </a>
                        );
                    });
                })}
            </nav>
        </>
    )
}

export default Desktopmenu