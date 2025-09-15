import React, { useRef, useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';

const Categories = ({ onCategorySelect }) => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const { data: categories, loading, error } = useFetch('/api/getcategory', 'categories');

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            const scrollLeft = el.scrollLeft;
            const scrollRight = el.scrollWidth - el.clientWidth - scrollLeft;
            const canScroll = el.scrollWidth > el.clientWidth;

            setShowLeftArrow(canScroll && scrollLeft > 10);
            setShowRightArrow(canScroll && scrollRight > 10);
        }
    };

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = 200;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });

            setTimeout(checkScroll, 300);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            checkScroll(); // Initial check
            el.addEventListener('scroll', checkScroll);
            return () => el.removeEventListener('scroll', checkScroll);
        }
    }, []);

    useEffect(() => {
        if (categories && categories.length > 0) {
            checkScroll(); // Run after categories are loaded
        }
    }, [categories]);

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
            <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {!loading && !error && categories && (
                    <>
                        {showLeftArrow && (
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden md:block"
                                onClick={() => scroll('left')}
                            >
                                ◀
                            </button>
                        )}

                        <div
                            ref={scrollRef}
                            className="flex space-x-3 overflow-x-auto no-scrollbar px-4 py-3 scroll-smooth"
                        >
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => onCategorySelect(category.id)}
                                    className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black text-sm"
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {showRightArrow && (
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden md:block"
                                onClick={() => scroll('right')}
                            >
                                ▶
                            </button>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Categories;
