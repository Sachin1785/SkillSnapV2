import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
        Promise.all(usersWithImages).then(users => {
          setUsers(users);
          setIsLoading(false);
        });
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="fixed inset-0 overflow-y-auto min-h-screen">
      <BackgroundBeamsWithCollision className="fixed inset-0 min-h-screen" />
      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-white">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center mx-auto max-w-7xl">
            {users.map((user) => (
              <Link key={user.id} to={`/user/${user.id}`}>
                <CardContainer className="w-full">
                  <CardBody className="bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm relative group/card border border-gray-700/50 w-72 h-96 rounded-xl p-6 shadow-lg shadow-gray-900/20">
                    <CardItem
                      translateZ="100"
                      className="w-full flex justify-center items-center mb-4"
                    >
                      <div className="w-48 h-48 rounded-full overflow-hidden ring-2 ring-purple-500/50 ring-offset-2 ring-offset-gray-800">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-full w-full object-cover transform transition-transform group-hover/card:scale-110"
                        />
                      </div>
                    </CardItem>
                    
                    <CardItem
                      translateZ="50"
                      className="text-2xl font-bold text-center text-white mb-2"
                    >
                      {user.name}
                    </CardItem>
                    
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-gray-400 text-center text-sm"
                    >
                      {user.designation}
                    </CardItem>

                    <CardItem
                      translateZ="30"
                      className="mt-4 w-full"
                    >
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-full transition-all text-sm font-medium">
                        Unlock My World
                      </button>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUsers;