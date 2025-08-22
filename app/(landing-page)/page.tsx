"use client";

import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Projects from "./components/ProjectsSection";
import Footer from "./components/FooterSection";
import PostsSection from "./components/PostsSection";
import ContactSection from "./components/ContactSection";

export default function page() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background with fade effect */}
      <div className="relative">
        <div className="absolute inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto p-5">
            <Navbar />
            <HeroSection />
          </div>
        </div>
      </div>

      {/* Content below the faded background */}
      <div className="relative">
        <div className="max-w-7xl mx-auto p-5 mt-10">
          <Projects />
          <PostsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
