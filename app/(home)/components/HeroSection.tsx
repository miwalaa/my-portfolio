"use client";
import React from "react";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import Spline from "@splinetool/react-spline";
import { MovingBorderBtn } from "@/components/ui/moving.border";

export default function HeroSection() {
  return (
    <div
      className="min-h-[60vh] flex flex-col-reverse gap-12 lg:gap-0 lg:flex-row items-center justify-between animate-move-up"
      id="about"
    >
      <div className="lg:space-y-5 space-y-2 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold cursor-default">
          <AnimatedLetters text="Miwa Laksmana" />
        </h1>
        <p className="max-w-3xl mx-auto text-xl lg:text-3xl font-bold text-white">
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
          containerClassName="w-full hidden md:block"
        >
          <a
            href="https://drive.google.com/file/d/1nlsZP4AClli1VIMrD3yONkvF8XpjNtik/view?usp=sharing"
            className="w-full justify-center"
          >
            🚀 Download CV
          </a>
        </MovingBorderBtn>
      </div>
      <div className="relative w-full max-w-3xl h-[50vh] min-h-[300px] md:h-[60vh] lg:h-[70vh]">
        <Spline
          scene="https://prod.spline.design/w2fPTp2mz7kCyOwD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
