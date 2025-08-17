"use client";
import React, { useState } from "react";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import Spline from "@splinetool/react-spline";
import { MovingBorderBtn } from "@/components/ui/moving.border";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex flex-col-reverse gap-12 lg:gap-0 lg:flex-row items-center justify-between animate-move-up">
      <div className="lg:space-y-5 space-y-2 text-center md:text-left">
        <h1 className="text-4xl md:text-7xl lg:text-6xl font-bold cursor-default">
          <AnimatedLetters text="Miwa Laksmana" />
        </h1>
        <p className="max-w-3xl text-xl md:text-3xl md:text-left font-bold text-white">
          {"Full Stack Web Developer"}
        </p>
        <p className="max-w-4xl mx-auto text-lg text-gray-300">
          {
            "Building modern web applications that not only solve problems but also create delightful user experiences."
          }
        </p>
        <MovingBorderBtn
          borderRadius="0.5rem"
          className="w-full p-3 font-semibold transition-all duration-200 hover:bg-sky-400/20 hover:shadow-lg"
          containerClassName="hidden md:block w-full"
        >
          <a
            href="https://drive.google.com/file/d/1nlsZP4AClli1VIMrD3yONkvF8XpjNtik/view?usp=sharing"
            className="w-full flex justify-center"
          >
            🚀 Download CV
          </a>
        </MovingBorderBtn>
      </div>
      <div className="relative w-full max-w-3xl h-[50vh] min-h-[300px] md:h-[60vh] lg:h-[70vh]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-12 w-12 text-white" variant="bars" />
          </div>
        )}
        <Spline
          scene="https://prod.spline.design/w2fPTp2mz7kCyOwD/scene.splinecode"
          className={cn(
            "w-full h-full transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
