import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Projects from "./components/ProjectsSection";
import Footer from "./components/Footer";
import PostsSection from "./components/PostsSection";

export default function page() {
  return (
    <div className="min-h-screen bg-black">
      <div className="dark:bg-black bg-white dark:bg-grid-white/[0.08] bg-grid-black-[0.2] relative">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar />
          <HeroSection />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-5 mt-10">
        <Projects />
        <PostsSection />
        <Footer />
      </div>
    </div>
  );
}
