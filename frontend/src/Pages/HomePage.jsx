import React from "react";
import Home from "@/Components/Home.jsx";

const HomePage = () => {
  return (
    <div className="fixed inset-0 overflow-y-auto ">
      {/* <BackgroundBeamsWithCollision className="fixed inset-0 min-h-screen" /> */}
      <div className="container mx-auto px-4 py-8 relative z-10 ">
      <Home />
      </div>
    </div>
  );
};

export default HomePage;