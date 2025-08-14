"use client";
import Link from "next/link";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  tags: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Ai Summarization Tool",
      tags: ["AWS", "React", "Cloud"],
    },
    {
      id: 2,
      title: "Newsletter App",
      tags: ["NextJS", "Cloudflare", "PayloadCMS"],
    },
    {
      id: 3,
      title: "Feedback Platform",
      tags: ["TS", "Postgres", "DrizzleORM"],
    },
    {
      id: 4,
      title: "AI Quiz Generator",
      tags: ["TS", "NextJS", "DrizzleORM"],
    },
    {
      id: 5,
      title: "Form Builder Tool",
      tags: ["NextJS", "React", "TailwindCSS", "Prisma"],
    },
    {
      id: 6,
      title: "Blog Website",
      tags: ["MDX", "NextJS", "TailwindCSS", "Framer Motion"],
    },
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <div id="projects" className="py-10 p-5 sm:p-0">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => handleProjectClick(project)}
            className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50 hover:border-green-500/50 transition-colors hover:shadow-sm text-left"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-white mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </div>
  );
}
