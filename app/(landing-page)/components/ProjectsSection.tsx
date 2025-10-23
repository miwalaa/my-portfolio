import ProjectsClient from './ProjectsClient'
import { Project } from '@/types'

async function getProjects(): Promise<Project[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/public-projects`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      console.error('Failed to fetch projects')
      return []
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Projects() {
  const projects = await getProjects()

  return <ProjectsClient projects={projects} />
}
