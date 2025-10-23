import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

// Enable caching with revalidation
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const projects = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: 'order',
      depth: 1,
    });

    // Transform the data to match the Project interface
    const transformedProjects = projects.docs.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      image: typeof project.image === 'object' ? project.image.url : project.image,
      tags: project.tags?.map((t: any) => t.tag) || [],
      techStack: project.techStack?.map((t: any) => t.technology) || [],
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    }));

    return NextResponse.json(transformedProjects, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch projects from Payload CMS:', error);
    return NextResponse.json([], { status: 500 });
  }
}
