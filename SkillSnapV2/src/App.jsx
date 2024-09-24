import React, { useState, useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';
import AllUsers from './Components/AllUsers';
import StartupAnimation from './Components/StartupAnimation'; // Import your animation component

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/allUsers" element={<AllUsers />} />
    </Route>
  )
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the loading state to false after 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  if (loading) {
    return <StartupAnimation />; // Show the animation while loading
  }

  return <RouterProvider router={Router} />;
}

export default App;
