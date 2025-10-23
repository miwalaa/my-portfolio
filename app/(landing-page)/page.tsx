import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TechMarquee from "./components/TechMarquee";
import Projects from "./components/ProjectsSection";
import Footer from "./components/FooterSection";
import PostsSection from "./components/PostsSection";
import ContactSection from "./components/ContactSection";

export default async function page() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background with fade effect */}
      <div className="relative">
        <div className="absolute inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <Navbar />
            <HeroSection />
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <TechMarquee />

      {/* Content below the faded background */}
      <div className="relative">
        <div className="max-w-7xl mx-auto mt-10">
          <Projects />
          <PostsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
