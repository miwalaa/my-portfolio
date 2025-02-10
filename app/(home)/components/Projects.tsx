import React from 'react'
import { SiCss3, SiHtml5, SiJavascript } from 'react-icons/si'
import Title from './Title'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover'

export default function Projects() {
    const projects = [
        {
            title: "Palindrome Checker",
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://miwalaa.github.io/freecodecamp-javascript-algorithms-and-data-structures/palindrome-checker/index.html",
            cover: "/project-1.png",
            background: "bg-indigo-500"
        },
        {
            title: "Roman Numeral Converter",
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://miwalaa.github.io/freecodecamp-javascript-algorithms-and-data-structures/roman-numeral-converter/index.html",
            cover: "/project-2.png",
            background: "bg-green-500"
        },
        {
            title: "Telephone Number Validator",
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://miwalaa.github.io/freecodecamp-javascript-algorithms-and-data-structures/telephone-number-validator/index.html",
            cover: "/project-3.png",
            background: "bg-blue-500"
        },
        {
            title: "Cash Register",
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://miwalaa.github.io/freecodecamp-javascript-algorithms-and-data-structures/cash-register/index.html",
            cover: "/project-4.png",
            background: "bg-pink-500"
        },
    ]
    
  return (
    <div className='py-10 p-5 sm:p-0'>
      <Title text='Projects 🎨' className='flex flex-col items-center -rotate-6'/>
      <div className='grid grid-cols-1 sm:grid-cols-2 pt-20 gap-5'>
        {projects.map((project, idx) => {
          return <Link href={project.link} key={idx}>
            <div className={cn(
              "p-5 rounded-md",
              project.background
              )}
              >
                <DirectionAwareHover
                  imageUrl={project.cover}
                  className='w-full space-y-5 cursor-pointer'
                >
                  <div className='space-y-5'>
                    <h1 className='text-2xl font-bold'>{project.title}</h1>
                    <div className='flex items-center gap-5'>
                      {project.tech.map((Icon,idx) => {
                        return <Icon className='w-8 h-8' key={idx} />
                      })}
                    </div>
                  </div>
                </DirectionAwareHover>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}
