"use client";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

export default function Projects() {
  // State declarations at the top
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  // Move projects array before any effects or returns
  const projects: Project[] = [
    {
      id: 1,
      title: "Ai Summarization Tool",
      tags: ["AWS", "React", "Cloud"],
      description:
        "A tool that summarizes long articles into short paragraphs using AI.",
      fullDescription:
        "This project uses AWS Lambda functions to process text data and return summarized version of the content. The front-end is built with React and hosted Cloudflare Pages.",
      image: "/summarization.png",
      techStack: ["React", "AWS", "Cloudflare", "TailwindCSS", "NodeJS"],
    },
    {
      id: 2,
      title: "Newsletter App",
      tags: ["NextJS", "Cloudflare", "PayloadCMS"],
      description: "A newsletter app that sends daily updates to subscribers.",
      fullDescription:
        "A full-stack newsletter application built with NextJS and PayloadCMS, featuring automated email delivery, subscriber management, and analytics. The app leverages Cloudflare Workers for edge computing and uses TypeScript for type safety.",
      image: "/proj.png",
      techStack: [
        "NextJS",
        "Cloudflare",
        "PayloadCMS",
        "TailwindCSS",
        "NodeJS",
        "TypeScript",
      ],
    },
    {
      id: 3,
      title: "Feedback Platform",
      tags: ["TS", "Postgres", "DrizzleORM"],
      description: "A platform for collecting feedback from users.",
      fullDescription:
        "An interactive feedback collection system that allows users to submit, track, and manage feedback. Built with TypeScript for type safety, PostgreSQL for data persistence, and DrizzleORM for database interactions. Features include user authentication, feedback categorization, and admin dashboard.",
      image: "/feedback.png",
      techStack: [
        "TypeScript",
        "Postgres",
        "DrizzleORM",
        "TailwindCSS",
        "NodeJS",
        "Stripe API",
      ],
    },
    {
      id: 4,
      title: "AI Quiz Generator",
      tags: ["TS", "NextJS", "DrizzleORM"],
      description: "A quiz generator that uses AI to generate questions.",
      fullDescription:
        "This project uses TypeScript and NextJS to build the front-end. Langchain is used to manage AI requests and responses.",
      image: "/quiz.png",
      techStack: [
        "TypeScript",
        "NextJS",
        "OpenAI",
        "TailwindCSS",
        "NodeJS",
        "Stripe API",
      ],
    },
    {
      id: 5,
      title: "Form Builder Tool",
      tags: ["NextJS", "React", "TailwindCSS", "Prisma"],
      description: "A tool that allows users to create custom forms.",
      fullDescription:
        "This project uses NextJS and React to build the front-end. Prisma is used to manage the database schema.",
      image: "/form.png",
      techStack: [
        "NextJS",
        "React",
        "Prisma",
        "TailwindCSS",
        "NodeJS",
        "Stripe API",
      ],
    },
    {
      id: 6,
      title: "Blog Website",
      tags: ["MDX", "NextJS", "TailwindCSS", "Framer Motion"],
      description: "A blog website with animated page transitions.",
      fullDescription:
        "This project uses MDX and NextJS to build the front-end. Framer Motion is used to create page transitions.",
      image: "/blog.png",
      techStack: [
        "MDX",
        "NextJS",
        "Framer Motion",
        "TailwindCSS",
        "NodeJS",
        "Stripe API",
      ],
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return null;

    const currentIndex = projects.findIndex(
      (project) => project.id === selectedProject.id
    );

    if (currentIndex === -1) {
      return null;
    }

    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return null;

    const currentIndex = projects.findIndex(
      (project) => project.id === selectedProject.id
    );

    if (currentIndex === -1) {
      return null;
    }

    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <motion.section
      id="projects"
      className="mx-auto max-w-7xl mt-6 md:mt-16 py-6 md:py-10 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <motion.div className="text-center mb-6 sm:mb-10 md:mb-12" variants={item}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Featured Projects
        </h2>
      </motion.div>
      <motion.div
        className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4")}
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
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{project.description}</p>
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
  );
}
