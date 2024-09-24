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
    // Check if the animation has already played (stored in sessionStorage)
    const hasPlayedAnimation = sessionStorage.getItem('hasPlayedAnimation');

    if (!hasPlayedAnimation) {
      // If it hasn't played, set a timer to hide the animation after 5 seconds
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasPlayedAnimation', 'true'); // Mark the animation as played
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer
    } else {
      // If the animation has already played, skip directly to the main content
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <StartupAnimation />; // Show the animation while loading
  }

  return <RouterProvider router={Router} />;
}

export default App;
