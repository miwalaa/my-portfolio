import { NextApiRequest, NextApiResponse } from 'next';
import { getPayloadClient } from '../../../lib/payload';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const payload = await getPayloadClient();
    
    const posts = await payload.find({
      collection: 'posts',
      limit: 4, // Limit to 4 most recent posts for the blog section
      sort: '-publishedAt',
      depth: 1
    });

    // Transform the posts to match the expected format
    const formattedPosts = posts.docs.map(post => ({
      id: post.id,
      title: post.title,
      publishedAt: post.publishedAt || new Date().toISOString(),
      slug: post.slug // Include slug for the post URL
    }));

    return res.status(200).json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
