'use client'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import './marquee.css'

const frontend = [
  { name: 'React', icon: '/icons/react.png' },
  { name: 'Next.js', icon: '/icons/nextjs.png' },
  { name: 'TypeScript', icon: '/icons/typescript.png' },
  { name: 'JavaScript', icon: '/icons/javascript.png' },
  { name: 'Tailwind CSS', icon: '/icons/tailwind-css.png' },
  { name: 'Framer Motion', icon: '/icons/framer.png' },
  { name: 'Vite', icon: '/icons/vite.png' },
  { name: 'shadcn/ui', icon: '/icons/shadcn.png' },
]

const backendAndTools = [
  { name: 'Node.js', icon: '/icons/node-js.png' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.png' },
  { name: 'Supabase', icon: '/icons/supabase.png' },
  { name: 'Payload CMS', icon: '/icons/payload.png' },
  { name: 'Neon', icon: '/icons/neon.png' },
  { name: 'Git', icon: '/icons/git.png' },
  { name: 'GitHub', icon: '/icons/github.png' },
  { name: 'Vercel', icon: '/icons/vercel.png' },
  { name: 'Ubuntu', icon: '/icons/ubuntu.png' },
  { name: 'npm', icon: '/icons/npm.png' },
  { name: 'Mint', icon: '/icons/mint.png' },
]

interface MarqueeRowProps {
  items: { name: string; icon: string }[]
  reverse?: boolean
}

function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  const TechCard = ({ tech }: { tech: { name: string; icon: string } }) => (
    <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-gray-800/50 transition-all duration-300 min-w-[70px] group/item">
      <div className="relative w-6 h-6 rounded-md bg-white/90 backdrop-blur-sm p-1 group-hover/item:bg-green-50 transition-colors duration-300">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-[9px] text-gray-400 font-medium text-center group-hover/item:text-green-400 transition-colors duration-300 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  )

  return (
    <div className="group flex overflow-hidden p-2 gap-2">
      {/* First set */}
      <div className={`flex shrink-0 gap-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
        {items.map((tech, index) => (
          <TechCard key={`tech-1-${index}`} tech={tech} />
        ))}
      </div>
      
      {/* Second set for seamless loop */}
      <div className={`flex shrink-0 gap-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
        {items.map((tech, index) => (
          <TechCard key={`tech-2-${index}`} tech={tech} />
        ))}
      </div>

      {/* Third set for extra smooth endless effect */}
      <div className={`flex shrink-0 gap-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
        {items.map((tech, index) => (
          <TechCard key={`tech-3-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const rowVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
}

export default function TechMarquee() {
  return (
    <div className="w-full py-8 overflow-hidden bg-black">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Frontend */}
        <motion.div className="overflow-hidden" variants={rowVariants}>
          <MarqueeRow items={frontend} />
        </motion.div>

        {/* Backend & Tools */}
        <motion.div className="overflow-hidden" variants={rowVariants}>
          <MarqueeRow items={backendAndTools} reverse />
        </motion.div>
      </motion.div>
    </div>
  )
}
