import React from 'react';

function AllUsers() {
    const users = [
        { id: 1, name: 'User Name', image: './assets/Screenshot 2024-08-13 190535.png' },
        { id: 2, name: 'User Name', image: './assets/Screenshot 2024-08-13 190535.png' },
        { id: 3, name: 'User Name', image: './assets/Screenshot 2024-08-13 190535.png' },
        { id: 4, name: 'User Name', image: './assets/Screenshot 2024-08-13 190535.png' }
    ];

    return (
        <section className="users flex flex-wrap justify-around mt-16">
            {users.map(user => (
                <a key={user.id} href="./userDetails.html" className="transform transition-transform duration-300 hover:scale-105">
                    <div className="user-card border border-blue-500 rounded-lg w-80 h-96 p-4 m-5 flex flex-col bg-gray-800">
                        <div className="user-image flex-2 bg-gray-700 flex justify-center items-center">
                            <img src={user.image} alt="User" className="h-48 w-48 rounded-full" />
                        </div>
                        <div className="user-footer bg-blue-500 flex-1 pl-3 flex items-center justify-center">
                            <h2 className="text-white">{user.name}</h2>
                        </div>
                    </div>
                </a>
            ))}
        </section>
    );
}

export default AllUsers;
