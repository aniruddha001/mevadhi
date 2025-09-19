import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Mobilemenu({ isOpen, setIsOpen }) {
    const [openSubmenus, setOpenSubmenus] = useState({});
    const { data: menus, loading, error } = useFetch('/api/menus', 'menus');

    const toggleSubmenu = (id) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <>
            {isOpen && (
                <nav className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2">
                    {menus.map((menu) => {
                        if (menu.slug === 'header-menu') {
                            const topLevelItems = menu.items.filter(item => item.parent_id === "0");

                            return topLevelItems.map((item) => {
                                const childItems = menu.items.filter(child => child.parent_id === String(item.id));

                                if (childItems.length > 0) {
                                    return (
                                        <div key={item.id}>
                                            <button
                                                className="w-full text-left hover:text-gray-200 flex justify-between items-center"
                                                onClick={() => toggleSubmenu(item.id)}
                                            >
                                                {item.title}
                                                <svg
                                                    className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${openSubmenus[item.id] ? 'rotate-180' : ''}`}
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

                                            {openSubmenus[item.id] && (
                                                <div className="pl-4 mt-1">
                                                    {childItems.map(child => (
                                                        <a
                                                            key={child.id}
                                                            href={child.url}
                                                            className="block py-1 hover:text-gray-200"
                                                        >
                                                            {child.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        className="block hover:text-gray-200"
                                    >
                                        {item.title}
                                    </a>
                                );
                            });
                        }
                    })}
                </nav>
            )}
        </>
    );
}

export default Mobilemenu;
