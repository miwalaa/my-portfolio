import ProjectsClient from './ProjectsClient'
import { Project } from '@/types'
import { getPayloadClient } from '@/lib/payload'

async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient()
    const projects = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: 'order',
      depth: 1,
    })

    // Transform the data to match the Project interface
    const transformedProjects: Project[] = projects.docs.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      image: typeof project.image === 'object' ? project.image.url : project.image,
      tags: project.tags?.map((t: any) => t.tag) || [],
      techStack: project.techStack?.map((t: any) => t.technology) || [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    }))

    return transformedProjects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Projects() {
  const projects = await getProjects()

  return <ProjectsClient projects={projects} />
}
