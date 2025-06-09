import React, { useState, useEffect } from "react";
import { BackgroundLines } from "@/Components/ui/background-lines.jsx";


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const FeatureCard = ({ icon, title, description, delay }) => (
    <div
      className={`group relative p-6 rounded-2xl bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-neutral-600/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `perspective(1000px) rotateX(${
          mousePosition.y * 0.1
        }deg) rotateY(${mousePosition.x * 0.1}deg) translateZ(0)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );

  const GlowButton = ({ children, primary }) => (
    <button
      className={`relative group px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
        primary
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/25"
          : "bg-transparent border-2 border-neutral-600 text-neutral-300 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
      }`}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
      )}
    </button>
  );

  return (
    <BackgroundLines className="min-h-screen w-full bg-black relative">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm">
                🚀 Connect • Collaborate • Create
              </span>

              <h1 className="mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                <span className="inline-block hover:scale-105 transition-transform duration-300">
                  Skill
                </span>
                <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  Snap
                </span>
              </h1>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-neutral-300 leading-relaxed px-4 mb-8 mt-8">
                Your ultimate platform for engineering students to{" "}
                <span className="text-blue-400 font-semibold">connect</span>,{" "}
                <span className="text-purple-400 font-semibold">
                  collaborate
                </span>
                , and{" "}
                <span className="text-green-400 font-semibold">create</span>{" "}
                together.
              </p>

             
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon="🎯"
              title="Showcase Skills"
              description="Display your projects, portfolios, and technical expertise with stunning presentations."
              delay={400}
            />
            <FeatureCard
              icon="🤝"
              title="Network & Connect"
              description="Find like-minded engineering peers and build meaningful professional relationships."
              delay={600}
            />
            <FeatureCard
              icon="🚀"
              title="Discover Opportunities"
              description="Explore internships, projects, and career opportunities tailored for engineers."
              delay={800}
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      {/* Add this to your existing styles or create new ones */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </BackgroundLines>
  );
};

export default Home;
