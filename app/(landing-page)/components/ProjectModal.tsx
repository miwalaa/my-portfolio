import Image from "next/image";
import { useRef } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";
import { Project } from "@/types";

export default function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
  totalProjects,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalProjects: number;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
      ref={modalRef}
    >
      <div
        className="bg-gray-900 rounded-lg max-w-4xl w-11/12 max-h-[90vh] overflow-y-auto p-12 h-10/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-green-500 transition-colors"
        >
          <FiX className="h-6 w-6 cursor-pointer" />
        </button>

        <div className="mb-3">
          <h2 className="text-2xl font-bold text-green-50">{project.title}</h2>
        </div>

        {/* Corrected the flex layout here */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Changed md:w-1f/2 to md:w-1/2 */}
          <div className="space-y-4 md:w-1/2">
            <p className="text-gray-300">{project.description}</p>
            <p className="text-gray-300">{project.fullDescription}</p>
            <div>
              <h3 className="font-semibold mb-2 text-green-500">Tech Stack:</h3>
              <ul className="list-disc list-inside">
                {project.techStack.map((tech, index) => (
                  <li key={index} className="text-gray-300">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 border border-gray-700 hover:border-green-500"
                >
                  <FiGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  <FiExternalLink className="w-5 h-5" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>
          {/* Ensure the image container also takes up md:w-1/2 */}
          <div className="relative h-64 w-full md:w-1/2">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          {totalProjects > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={onPrev}
                className="bg-gray-800/50 rounded-full p-2 hover:bg-gray-800/70 transition-colors pointer-events-auto"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={onNext}
                className="bg-gray-800/50 rounded-full p-2 hover:bg-gray-800/70 transition-colors pointer-events-auto"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}