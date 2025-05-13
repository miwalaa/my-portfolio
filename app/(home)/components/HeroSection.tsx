"use client";
import { MovingBorderBtn } from '@/components/ui/moving.border';
import Link from 'next/link'
import React from 'react'
import Title from './Title'
import AnimatedLetters from '../../../components/ui/AnimatedLetters';

export default function HeroSection() {

  return (
    <div className='min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-between animate-move-up'>
      <div className='space-y-10 text-center lg:text-left'>
        <h1 
        className='text-4xl lg:text-7xl font-bold cursor-default'>
                <AnimatedLetters text="Nice to meet you! 👋" />
                <br />
                <AnimatedLetters text="I'm Miwa" delay={0.5} />
        </h1>
        <p className='max-w-4xl mx-auto text-lg text-gray-300'>
            {

            "I'm a Front-End Developer from Indonesia, driven by a passion for building modern web applications that not only solve problems but also create delightful user experiences."

            }
        </p>
        <Link href={"mailto:anonimdante79@gmail.com"} className='inline-block group'>
            <Title text='Contact Me 📭'/>
        </Link>
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
            <a href="https://drive.google.com/file/d/1nlsZP4AClli1VIMrD3yONkvF8XpjNtik/view?usp=sharing">🚀 Download CV</a>
          </MovingBorderBtn>
        </div>
      </div>
    </div>
  )
}
