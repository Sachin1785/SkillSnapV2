import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/Screenshot 2024-08-13 190535.png';
import image2 from '../assets/Screenshot 2024-08-13 190535.png';
import image3 from '../assets/Screenshot 2024-08-13 190535.png';
import image4 from '../assets/Screenshot 2024-08-13 190535.png';

function AllUsers() {
    const users = [
        { id: 1, name: 'User Name 1', image: image1 },
        { id: 2, name: 'User Name 2', image: image2 },
        { id: 3, name: 'User Name 3', image: image3 },
        { id: 4, name: 'User Name 4', image: image4 }
    ];

    return (
        <section className="users flex flex-wrap justify-around mt-16">
            {users.map(user => (
                <Link key={user.id} to={`/user/${user.id}`} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="user-card border border-blue-500 rounded-xl w-80 h-96 p-4 m-5 flex flex-col bg-gray-800 hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl">
                        <div className="user-image flex-2 bg-gray-700 flex justify-center items-center rounded-t-lg overflow-hidden">
                            <img src={user.image} alt={user.name} className="h-48 w-48 object-cover rounded-full transition-transform duration-500 hover:scale-110" />
                        </div>
                        <div className="user-details flex-1 p-4 flex flex-col justify-center items-center text-center">
                            <h2 className="text-2xl font-semibold mb-2 text-white">{user.name}</h2>
                            <p className="text-sm text-gray-400">Some role or tagline here</p>
                        </div>
                        <div className="user-footer flex items-center justify-center mt-4">
                            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-2 px-4 rounded-full transition-all">
                                Unlock My World
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}

export default AllUsers;