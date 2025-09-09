import React from 'react'
import Desktopmenu from './Desktopmenu'
import Mobilemenu from './Mobilemenu'
import Mobilemenuicon from './Mobilemenuicon'
import Sitelogo from './Sitelogo'

const Header = () => {
    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Sitelogo />
                    {/* Desktop Menu */}
                    <Desktopmenu />
                    {/* Mobile Menu Button */}
                    <Mobilemenuicon />
                </div>
            </div>
            {/* Mobile Menu */}
            <Mobilemenu />
        </header>
    )
}

export default Header