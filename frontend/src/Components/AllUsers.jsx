import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Filter out the default user and directly set the images
        const filteredUsers = data
          .filter((user) => user.id !== "default")
          .map((user) => ({
            ...user,
            image: 
            // add image here
              "https://klkns551ea.ufs.sh/f/w6H1QXfdaik7Qi5IrYSxeZihA7qjYXJcdTkuGUDW4om38yrp",
          }));
        setUsers(filteredUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
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
                      translateZ="150"
                      rotateX={10}
                      rotateY={-10}
                      // rotateZ={5}
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
                      translateZ="100"
                      className="text-2xl font-bold text-center text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 transform transition-all duration-300 group-hover/card:scale-110 group-hover/card:from-blue-300 group-hover/card:to-purple-300"
                    >
                      {user.name}
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ="80"
                      className="text-gray-300 text-center text-sm font-medium tracking-wide transform transition-all duration-300 group-hover/card:scale-105 group-hover/card:text-gray-100"
                    >
                      {user.designation}
                    </CardItem>

                    <CardItem translateZ="100" className="mt-4 w-full">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-purple-500/25 transform group-hover/card:scale-105 hover:scale-[1.02] active:scale-[0.98]">
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
