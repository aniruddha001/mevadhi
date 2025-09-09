import React from 'react'
import { useState } from "react";

function Mobilemenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* Mobile menu */}
            {isOpen && (
                <nav className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2">
                    <a href="#" className="block hover:text-gray-200">Home</a>
                    <a href="#" className="block hover:text-gray-200">About</a>
                    <div>
                        <button
                            className="w-full text-left hover:text-gray-200 flex justify-between items-center"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Services
                            <svg
                                className="ml-1 w-4 h-4"
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
                        <div className="pl-4 mt-1">
                            <a href="#" className="block py-1 hover:text-gray-200">Web Development</a>
                            <a href="#" className="block py-1 hover:text-gray-200">Mobile Apps</a>
                            <a href="#" className="block py-1 hover:text-gray-200">UI/UX Design</a>
                        </div>
                    </div>
                    <a href="#" className="block hover:text-gray-200">Contact</a>
                </nav>
            )}
            {/*Mobile Menu end*/}
        </>
    )
}

export default Mobilemenu