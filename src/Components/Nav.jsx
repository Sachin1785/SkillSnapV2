import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import logo from '../assets/logo.png';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

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
                    <li><Link to="/" className="text-white hover:text-blue-500">Home</Link></li>
                    <li><Link to="/user/default" className="text-white hover:text-blue-500">User Profile Sample</Link></li> 
                    <li><Link to="/allUsers" className="text-white hover:text-blue-500">See All Users</Link></li>
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

            {/* Right: User Button and Edit Profile */}
            <div className="relative flex-shrink-0 flex items-center space-x-4" ref={menuRef}>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Link to="/edit-profile">
                        <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                            Edit Profile
                        </button>
                    </Link>
                </SignedIn>
            </div>
        </div>
    );
}

export default Nav;