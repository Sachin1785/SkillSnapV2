import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/logo.png';
import axios from 'axios';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const menuRef = useRef(null);
    const searchRef = useRef(null); // Ref for search component
    const { user } = useUser();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }

            // Collapse search results if clicked outside
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]); // Clear search results
                setSearchQuery(''); // Clear search query
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
                .get(`http://localhost:5000/api/users?search=${searchQuery}`)
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
                .post('http://localhost:5000/api/users', {
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

    const handleUserClick = (clerkId) => {
        setSearchQuery('');  // Clear search query when user is clicked
        setSearchResults([]); // Clear search results when user is clicked
    };

    return (
        <div className="flex justify-between items-center sticky top-5 z-50 bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 p-4 shadow-lg">
            {/* Left: Logo */}
            <div className="logo flex-shrink-0">
                <img src={logo} alt="logo" className="h-12" />
            </div>

            {/* Center: Navbar Links and Search */}
            <nav className="flex-grow flex justify-center">
                <ul className="nav-links flex space-x-8 text-lg items-center">
                    <li key="home">
                        <Link to="/" className="text-white hover:text-blue-500">
                            Home
                        </Link>
                    </li>
                    <li key="user-profile">
                        <Link to="/user/default" className="text-white hover:text-blue-500">
                            User Profile Sample
                        </Link>
                    </li>
                    <li key="all-users">
                        <Link to="/allUsers" className="text-white hover:text-blue-500">
                            See All Users
                        </Link>
                    </li>
                    <div className="relative" key="search" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search by ID..."
                            className="px-4 py-2 rounded-full text-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                        {Array.isArray(searchResults) && searchResults.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 mt-2 w-full rounded-lg shadow-lg">
                                {searchResults.map((user) => (
                                    <li
                                        key={user.clerkId}
                                        className="p-2 hover:bg-gray-200"
                                        onClick={() => handleUserClick(user.clerkId)} 
                                    >
                                        <Link to={`/user/${user.clerkId}`} className="text-gray-800"> 
                                            {user.name} 
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
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
                        <button
                            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
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
