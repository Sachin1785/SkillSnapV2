import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines.jsx";

const Home = () => {
  return (
    <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="bg-clip-text text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl sm:text-4xl md:text-5xl lg:text-7xl font-sans py-4 sm:py-6 md:py-8 lg:py-10 relative z-20 font-bold tracking-tight">
          SkillSnap Portfolio Website
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-base md:text-lg text-neutral-700 dark:text-neutral-400 text-center px-4 mt-8 sm:mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero corporis reprehenderit, explicabo nulla cum aperiam vel dolores vero harum pariatur esse consequatur obcaecati. Similique ipsa cum reiciendis ducimus accusantium ex.
        </p>
      </div>
    </BackgroundLines>
  );
};

export default Home;