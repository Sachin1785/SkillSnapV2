import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())  
      .then(data => {
        // Filter out the default user
        const filteredUsers = data.filter(user => user.id !== 'default');
        // Dynamically import images
        const usersWithImages = filteredUsers.map(user => {
          return import(/* @vite-ignore */ `../assets/${user.image}`).then(image => {
            return { ...user, image: image.default };
          });
        });
        Promise.all(usersWithImages).then(setUsers);
      })
      .catch(error => console.error('Error fetching users data:', error));
  }, []);

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <section className="users grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16 ">
        {users.map((user, index) => (
          <Link key={user.id} to={`/user/${user.id}`} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ml-8 mr-8">
            <div className="user-card border border-blue-500 rounded-xl w-80 h-96 p-4 m-5 flex flex-col bg-gray-800 hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl">
              <div className="user-image flex-2 bg-gray-700 flex justify-center items-center rounded-t-lg overflow-hidden">
                <img src={user.image} alt={user.name} className="h-48 w-48 object-cover rounded-full transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="user-details flex-1 p-4 flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl font-semibold mb-2 text-white">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.designation}</p>
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
    </div>
  );
}

export default AllUsers;