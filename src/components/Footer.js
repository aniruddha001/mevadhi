import React from 'react';
import Sitelogo from './Sitelogo';
import useFetch from '@/hooks/useFetch';

const Footer = () => {
    const { data: menus, loading, error } = useFetch('/api/menus', 'menus');

    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                <Sitelogo />
                            </h3>
                            <p className="text-sm">Empowering your digital future.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                {menus.map((menu) => {
                                    if (menu.slug === 'footer-menu') {
                                        const topLevelItems = menu.items.filter(item => item.parent_id === "0");
                                        return topLevelItems.map((item) => (
                                            <li key={`${menu.slug}-${item.id}`}>
                                                <a
                                                    href={'/' + item.title.toLowerCase().replace(/\s+/g, '-')}
                                                    className="hover:text-gray-200"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ));
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                {menus.map((menu) => {
                                    if (menu.slug === 'footer-resources') {
                                        const topLevelItems = menu.items.filter(item => item.parent_id === "0");
                                        return topLevelItems.map((item) => (
                                            <li key={`${menu.slug}-${item.id}`}>
                                                <a
                                                    href={'/' + item.title.toLowerCase().replace(/\s+/g, '-')}
                                                    className="hover:text-gray-200"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ));
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                            <form className="flex flex-col space-y-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} MyCompany. All rights reserved.</p>
                        <div className="space-x-4 mt-2 md:mt-0">
                            {menus.map((menu) => {
                                if (menu.slug === 'bottom-footer') {
                                    const topLevelItems = menu.items.filter(item => item.parent_id === "0");
                                    return topLevelItems.map((item) => (
                                        <a
                                            key={`${menu.slug}-${item.id}`}
                                            href={'/' + item.title.toLowerCase().replace(/\s+/g, '-')}
                                            className="hover:text-gray-200"
                                        >
                                            {item.title}
                                        </a>
                                    ));
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
