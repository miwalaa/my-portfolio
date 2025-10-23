export interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}
