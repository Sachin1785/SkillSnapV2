import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import StartupAnimation from './Components/StartupAnimation';

const HomePage = lazy(() => import('./Pages/HomePage'));
const UserPage = lazy(() => import('./Pages/UserPage'));
const AllUsers = lazy(() => import('./Components/AllUsers'));
const UserProfile = lazy(() => import('./Components/UserProfile'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/allUsers" element={<AllUsers />} />
      <Route path="/user/:id" element={<UserProfile />} /> {/* Add this route */}
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={Router} />
    </Suspense>
  );
}

export default App;