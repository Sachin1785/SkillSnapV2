import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import userProfilePic from '../assets/Screenshot 2024-08-13 190535.png'; // Add your profile picture here

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // To reference the dropdown menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Add event listener when menu is open
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="flex justify-between items-center sticky top-5 z-50 bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 p-4 shadow-lg">
            {/* Left: Logo */}
            <div className="logo flex-shrink-0">
                <img src={logo} alt="logo" className="h-12" />
            </div>

            {/* Center: Navbar Links and Search */}
            <nav className="flex-grow flex justify-center">
                <ul className="nav-links flex space-x-8 text-lg items-center">
                    <li><a href="./" className="text-white hover:text-blue-500">Home</a></li>
                    <li><a href="./user" className="text-white hover:text-blue-500">User Profile Sample</a></li> 
                    <li><a href="./allUsers" className="text-white hover:text-blue-500">See All Users</a></li>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="px-4 py-2 rounded-full text-gray-800"
                        />
                        <button className="absolute right-0 top-0 mt-2 mr-4">
                            <svg
                                className="h-4 w-4 fill-current text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                            </svg>
                        </button>
                    </div>
                </ul>
            </nav>

            {/* Right: Profile Picture and Dropdown Menu */}
            <div className="relative flex-shrink-0" ref={menuRef}>
                <img
                    src={userProfilePic}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-500"
                    onClick={toggleMenu}
                />
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                        <ul className="text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Edit Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;