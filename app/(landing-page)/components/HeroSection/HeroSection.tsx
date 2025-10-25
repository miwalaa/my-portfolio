'use client'
import React, { useState } from 'react'
import AnimatedLetters from '@/components/ui/AnimatedLetters'
import Spline from '@splinetool/react-spline'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { cn } from '@/lib/utils'
import { SiGithub, SiLinkedin, SiTiktok } from 'react-icons/si'
import Link from 'next/link'

export const socials = [
  {
    link: 'https://www.linkedin.com/in/miwa-laksmana-anthony-851a17344/',
    label: 'Linkedin',
    Icon: SiLinkedin,
  },
  {
    link: 'https://www.github.com/miwalaa',
    label: 'Github',
    Icon: SiGithub,
  },
  {
    link: 'https://www.tiktok.com/@shinjurosan',
    label: 'Tiktok',
    Icon: SiTiktok,
  },
]

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)
  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <section className="min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex flex-col-reverse gap-6 sm:gap-8 md:gap-10 lg:gap-0 lg:flex-row items-center justify-between animate-move-up">
      <div className="w-full text-center md:text-left space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold cursor-default md:text-center lg:text-left">
          <AnimatedLetters text="Miwa Laksmana" />
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white md:text-center lg:text-left">
          Full Stack Web Developer
        </p>
        <p className="w-full mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed md:text-center lg:text-left">
          Building modern web applications that not only solve problems but also
          create delightful user experiences.
        </p>
        <div className="pt-1 sm:pt-2 md:pt-0 hidden md:block">
          <div className="flex flex-row lg:gap-4 mt-4 ml-1 justify-center md:gap-8 lg:justify-start">
            {socials.map((social, index) => {
              const Icon = social.Icon

              return (
                <Link href={social.link} key={index} aria-label={social.label}>
                  <Icon className="w-6 h-6 hover:scale-125 transition-all" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-2xl lg:max-w-3xl h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-12 w-12 text-white" variant="bars" />
          </div>
        )}
        <Spline
          scene="https://prod.spline.design/w2fPTp2mz7kCyOwD/scene.splinecode"
          className={cn(
            'w-full h-full transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleLoad}
        />
      </div>
    </section>
  )
}
