'use client'
import ProjectModal from './ProjectModal'
import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectsClientProps {
  projects: Project[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // --- ADDED CHECK ---
  // If there are no projects or the projects array is empty, render nothing.
  if (!projects || projects.length === 0) {
    return null
  }
  // --- END ADDED CHECK ---

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
      className="mx-auto max-w-7xl pb-8 sm:pb-10 md:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <motion.div
        className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        variants={item}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Featured Projects
        </h2>
      </motion.div>
      <motion.div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2',
          'gap-4 sm:gap-5 md:gap-6 lg:gap-8'
        )}
        variants={container}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative group block p-2 sm:p-2.5 md:p-3 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-xl"
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
              className="rounded-lg sm:rounded-xl w-full p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden bg-[#090c11] backdrop-blur-sm group-hover:ring-2 sm:group-hover:ring-2 md:group-hover:ring-[3px] ring-green-500 relative transition-all duration-300 border border-gray-700/50 text-left h-full"
            >
              <div className="relative space-y-3 sm:space-y-4 md:space-y-5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base md:text-base text-gray-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full bg-green-500/20 text-green-300 border border-green-500/30 transition-colors group-hover:bg-green-500/30"
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
          totalProjects={projects.length}
        />
      )}
    </motion.section>
  )
}