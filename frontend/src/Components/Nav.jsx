import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/logo.png';
import logoPhone from '../assets/logoPhone.png';
import axios from 'axios';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const menuRef = useRef(null);
    const searchRef = useRef(null); // Ref for search component
    const { user } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only clear search if the click is outside both menu and search results
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                !event.target.closest('.search-result')
            ) {
                setSearchQuery('');
                setSearchResults([]);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    

    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`${import.meta.env.VITE_API_URL}?search=${searchQuery}`)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (user) {
            axios
                .post(import.meta.env.VITE_API_URL, {
                    clerkId: user.id,
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                })
                .then((response) => {
                    console.log('User profile checked/created:', response.data);
                })
                .catch((error) => {
                    console.error('Error creating user profile:', error);
                });
        }
    }, [user]);

    const handleUserClick = () => {
        setSearchQuery('');  // Clear search query when user is clicked
        setSearchResults([]); // Clear search results when user is clicked
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center sticky mt-[10px] z-50 bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 p-4 shadow-lg w-full">
            {/* Left: Logo, Mobile Search, and Mobile Menu Button */}
            <div className="w-full md:w-auto flex justify-between items-center gap-4 ">
                <Link to="/" className="logo flex-shrink-0">
                    <img src={logo} alt="logo" className="hidden md:block h-12 rounded-md" />
                    <img src={logoPhone} alt="logo" className="block md:hidden h-8 rounded-md	" />
                </Link>
                
                {/* Mobile Search Bar */}
                <div className="md:hidden relative flex-grow max-w-[200px]" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-1 text-sm rounded-full text-gray-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-0 top-0 mt-1 mr-2">
                        <svg className="h-4 w-4 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                        </svg>
                    </button>
                    {Array.isArray(searchResults) && searchResults.length > 0 && (
                        <ul
                            className="absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {searchResults.map((user, index) => (
                                <li key={`${user.clerkId}-${index}`} className="search-result">
                                <Link
                                    to={`/user/${user.clerkId}`}
                                    className="block p-2 hover:bg-gray-200 text-gray-800"
                                    onClick={() => handleUserClick(user.clerkId)}
                                >
                                    {user.name}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Modified mobile menu overlay with transitions */}
            <div 
                className={`fixed inset-0 bg-gray-800/95 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen 
                        ? 'opacity-100 pointer-events-auto' 
                        : 'opacity-0 pointer-events-none'
                }`} 
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <div 
                className={`fixed top-[95px] left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg transition-all duration-300 ease-in-out transform md:hidden ${
                    isMobileMenuOpen 
                        ? 'translate-y-0 opacity-100' 
                        : '-translate-y-full opacity-0'
                }`} 
                onClick={e => e.stopPropagation()}
            >
                {/* Close button in overlay */}
                <button 
                    className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Mobile Navigation Content - reduced spacing */}
                <nav className="flex flex-col items-center space-y-3 p-2 pt-4">
                    <ul className="nav-links flex flex-col items-center space-y-2 text-base w-full">
                        <li className="w-full text-center">
                            <Link to="/" className="text-white hover:text-blue-500 block py-1" onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        {/* <li className="w-full text-center">
                            <Link to="/user/default" className="text-white hover:text-blue-500 block py-1" onClick={() => setIsMobileMenuOpen(false)}>
                                User Profile Sample
                            </Link>
                        </li> */}
                        <li className="w-full text-center">
                            <Link to="/allUsers" className="text-white hover:text-blue-500 block py-1" onClick={() => setIsMobileMenuOpen(false)}>
                                Explore Users
                            </Link>
                        </li>
                    </ul>
                    
                    <div className="flex flex-col items-center space-y-2 w-full pt-2 border-t border-gray-700">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center justify-center gap-4 w-full">
                                <UserButton />
                                <Link to="/edit-profile" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button
                                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded text-sm"
                                        onClick={() => console.log('User Clerk ID:', user.id)}
                                    >
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>
                        </SignedIn>
                    </div>
                </nav>
            </div>

            {/* Center: Navbar Links and Desktop Search */}
            <nav className="hidden md:flex flex-grow justify-center">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <ul className="nav-links flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-lg">
                        <li><Link to="/" className="text-white hover:text-blue-500 block">Home</Link></li>
                        {/* <li><Link to="/user/default" className="text-white hover:text-blue-500 block">User Profile Sample</Link></li> */}
                        <li><Link to="/allUsers" className="text-white hover:text-blue-500 block">Explore Users</Link></li>
                    </ul>
                    
                    {/* Desktop Search Bar */}
                    <div className="hidden md:block relative w-64" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search by ID..."
                            className="w-full px-4 py-2 rounded-full text-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute right-0 top-0 mt-2 mr-4">
                            <svg className="h-4 w-4 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                            </svg>
                        </button>
                        {Array.isArray(searchResults) && searchResults.length > 0 && (
                            <ul
                                className="absolute bg-white border border-gray-300 mt-2 w-full rounded-lg shadow-lg z-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {searchResults.map((user, index) => (
                                    <li key={`${user.clerkId}-${index}`}>
                                        <Link
                                            to={`/user/${user.clerkId}`}
                                            className="block p-2 hover:bg-gray-200 text-gray-800"
                                            onClick={() => handleUserClick(user.clerkId)}
                                        >
                                            {user.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            {/* Right: User Button and Edit Profile */}
            <div className="hidden md:flex relative flex-shrink-0 items-center space-x-4" ref={menuRef}>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Link to="/edit-profile">
                        <button
                            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded whitespace-nowrap"
                            onClick={() => console.log('User Clerk ID:', user.id)}
                        >
                            Edit Profile
                        </button>
                    </Link>
                </SignedIn>
            </div>
        </div>
    );
}

export default Nav;
