"use client";
import { MovingBorderBtn } from '@/components/ui/moving.border';
import React from 'react'
import AnimatedLetters from './AnimatedLetters';

export default function HeroSection() {

  return (
    <div className='min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-between animate-move-up'>
      <div className='space-y-10 text-center lg:text-left'>
        <h1 
        className='text-4xl lg:text-7xl font-bold cursor-pointer'>
                <AnimatedLetters text="Nice to meet you! 👋" />
                <br />
                <AnimatedLetters text="I'm Miwa" delay={0.5} />
        </h1>
        <p className='md:w-96 text-lg text-gray-300'>
            {

            "I’m a Front-End Developer from Indonesia, driven by a passion for building modern web applications that not only solve problems but also create delightful user experiences. With a strong focus on clean code, intuitive design, and responsive interfaces, I strive to build applications that are both functional and beautiful. I enjoy transforming ideas into interactive, user-friendly digital products that engage and resonate with users. Continuously learning and evolving, I’m committed to honing my skills and staying on top of industry trends to deliver the best possible experience."

            }
        </p>
      </div>
      <div className='relative'>
        <div className='w-72 h-72 space-y-3 -rotate-[30deg] relative'>
            <div className='flex gap-3 translate-x-8'>
                <div className='w-32 h-32 rounded-2xl bg-green-500'></div>
                <div className='w-32 h-32 rounded-full bg-indigo-500'></div>
            </div>
            <div className='flex gap-3 -translate-x-8'>
                <div className='w-32 h-32 rounded-2xl bg-indigo-500'></div>
                <div className='w-32 h-32 rounded-full bg-green-500'></div>
            </div>
            <div className='glow absolute top-[40%] right-1/2 -z-10'></div>
        </div>
        <div className="absolute bottom-5 sm:bottom-14 left-0 sm:left-10">
          <MovingBorderBtn 
            borderRadius="0.5rem" 
            className="p-3 font-semibold transition-all duration-200 hover:bg-sky-400/20 hover:shadow-lg"
          >
            <a href="https://drive.google.com/file/d/1FCxKHab1zFqsG_VO1MZAypOLO7TqPv1N/view?usp=sharing">🚀 Download CV</a>
          </MovingBorderBtn>
        </div>
      </div>
    </div>
  )
}
