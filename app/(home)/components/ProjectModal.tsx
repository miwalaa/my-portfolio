import Image from "next/image";
import { FiX } from "react-icons/fi";

interface Project {
  title: string;
  tags: string[];
}

export default function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-11/12 max-h-[90vh] overflow-y-auto p-8 h-full">
        <div className="flex justify-between">
          <h2 className="tex-2xl font-bold text-green-50">{project.title}</h2>{" "}
          <button onClick={onClose}>
            <FiX className="h-6 w-6 hover:text-green-500 transition-colors cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
