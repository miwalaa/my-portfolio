'use client'
import ProjectModal from './ProjectModal'
import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

export default function Projects() {
  // State declarations at the top
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut' as const,
      },
    },
  }

  // Move projects array before any effects or returns
  const projects: Project[] = [
    {
      id: 1,
      title: 'AI Resume Analyzer',
      tags: ['Vite', 'React', 'ReactRouter'],
      description:
        'A tool that analyzes resumes and returns a score based on the content.',
      fullDescription:
        'A web application that leverages AI to analyze resumes and provide actionable feedback for job seekers. Designed to deliver a fast, responsive, and scalable experience.',
      image: '/resumes.png',
      techStack: [
        'Vite',
        'React',
        'ReactRouter',
        'TailwindCSS',
        'TypeScript',
        'Puter',
      ],
    },
  ]

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  const handleNextProject = () => {
    if (!selectedProject) return null

    const currentIndex = projects.findIndex(
      (project) => project.id === selectedProject.id
    )

    if (currentIndex === -1) {
      return null
    }

    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
  }

  const handlePrevProject = () => {
    if (!selectedProject) return null

    const currentIndex = projects.findIndex(
      (project) => project.id === selectedProject.id
    )

    if (currentIndex === -1) {
      return null
    }

    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setSelectedProject(projects[prevIndex])
  }

  return (
    <motion.section
      id="projects"
      className="mx-auto max-w-7xl mt-6 md:mt-16 py-6 md:py-10 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <motion.div
        className="text-center mb-6 sm:mb-10 md:mb-12"
        variants={item}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Featured Projects
        </h2>
      </motion.div>
      <motion.div
        className={cn('grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4')}
        variants={container}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative group block p-1.5 sm:p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.15 }}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => handleProjectClick(project)}
              className="rounded-md w-full p-4 sm:p-5 md:p-6 overflow-hidden bg-[#090c11] backdrop-blur-sm group-hover:ring-1 sm:group-hover:ring-2 ring-green-500 relative transition-all duration-300 border border-gray-700/50 text-left h-full"
            >
              <div className="relative space-y-2 sm:space-y-3 md:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1 sm:pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </motion.section>
  )
}
