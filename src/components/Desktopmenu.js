import React from 'react'

const Desktopmenu = () => {
    return (
        <>
            <nav className="hidden md:flex space-x-6 items-center">
                <a href="#" className="hover:text-gray-200">Home</a>
                <a href="#" className="hover:text-gray-200">About</a>

                {/* Dropdown */}
                <div className="relative group">
                    <button className="hover:text-gray-200 flex items-center gap-1">
                        Services
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
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-blue-800"
                        >
                            Web Development
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-blue-800"
                        >
                            Mobile Apps
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-blue-800"
                        >
                            UI/UX Design
                        </a>
                    </div>
                </div>

                <a href="#" className="hover:text-gray-200">Contact</a>
            </nav>
        </>
    )
}

export default Desktopmenu