import React from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const socials = [
      {
          link: "https://www.linkedin.com/in/miwa-laksmana-anthony-851a17344/",
          label: "Linkedin",
          Icon: SiLinkedin,
      },
      {
          link: "https://www.github.com/miwalaa",
          label: "Github",
          Icon: SiGithub,
      },
      {
          link: "https://www.x.com/miwamiwamiwa79",
          label: "X",
          Icon: SiX,
      }
  ]

  return (
    <nav className={cn(
      'flex flex-col items-center py-10 border-t mt-10 animate-move-down'
  )}>
      <img src="../../favicon.ico" alt="M" className='h-10 mb-4' />
      <div className='flex gap-5'>
          {socials.map((social,index)=>{
              const Icon = social.Icon

              return <Link href={social.link} key={index} aria-label={social.label}>
                  <Icon className='w-5 h-5 hover:scale-125 transition-all' />
              </Link>
          })}
      </div>
  </nav>
  )
}
