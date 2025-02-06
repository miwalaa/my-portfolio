"use client";
import React from 'react'
import Title from './Title'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { SiCss3, SiGit, SiHtml5, SiJavascript, SiNextdotjs, SiReact, SiSass, SiTailwindcss, SiTypescript } from 'react-icons/si'

export default function Skills() {
  const skills = [
    {
      text: "React",
      Icon: SiReact,
    },
    {
      text: "Next.js",
      Icon: SiNextdotjs,
    },
    {
      text: "Tailwind",
      Icon: SiTailwindcss,
    },
    {
      text: "Git",
      Icon: SiGit,
    },
    {
      text: "HTML",
      Icon: SiHtml5,
    },
    {
      text: "CSS",
      Icon: SiCss3,
    },
    {
      text: "JavaScript",
      Icon: SiJavascript,
    },
    {
      text: "SCSS",
      Icon: SiSass,
    },
    {
      text: "TypeScript",
      Icon: SiTypescript,
    }
  ]
  
  return (
    <div className='max-w-5xl mx-auto px-8'>
      <Title text='Skills 🔪' className='flex flex-col items-center -rotate-6'/>
      <HoverEffect items={skills} />
    </div>
  )
}
