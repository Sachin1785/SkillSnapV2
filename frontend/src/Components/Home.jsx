import React from "react";
import { BackgroundLines } from "@/Components/ui/background-lines.jsx";

const Home = () => {
  return (
    <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="bg-clip-text text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-6xl sm:text-5xl md:text-6xl lg:text-8xl font-sans py-4 sm:py-6 md:py-8 lg:py-10 relative z-20 font-bold tracking-tight">
          SkillSnap Portfolio Website
        </h2>
        <p className="max-w-xl mx-auto text-lg sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-400 text-center px-4 mt-8 sm:mt-4">
        SkillSnap is your go-to platform for engineering students to connect and collaborate. Share your skills, portfolios, websites, and resumes. Discover peers, build your network, and explore opportunities. 
        </p>
        <hr className="border-transparent my-4" />
        <h1 className="text-center text-neutral-700 dark:text-neutral-400 text-xl sm:text-2xl md:text-3xl">
        SkillSnap - where engineering connections begin. 
        </h1>       
      </div>
    </BackgroundLines>
  );
};

export default Home;