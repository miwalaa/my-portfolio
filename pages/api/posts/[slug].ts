import { NextApiRequest, NextApiResponse } from "next";
import { getPayloadClient } from '../../../lib/payload';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { slug } = req.query;
    
    if (!slug) {
      console.error('No slug provided in request');
      return res.status(400).json({ error: 'Post slug is required' });
    }
    
    console.log('Fetching post with slug:', slug);
    const payload = await getPayloadClient();

    const post = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: Array.isArray(slug) ? slug[0] : slug,
        },
      },
    });

    if (!post || !post.docs.length) {
      console.error('Post not found for slug:', slug);
      return res.status(404).json({ error: `Post not found with slug: ${slug}` });
    }

    console.log('Successfully found post:', post.docs[0].id);
    return res.status(200).json({ 
      post: {
        id: post.docs[0].id,
        title: post.docs[0].title,
        content: post.docs[0].content,
        publishedAt: post.docs[0].publishedAt || new Date().toISOString(),
        slug: post.docs[0].slug
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in posts/[slug] API:", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      url: req.url,
      method: req.method,
      query: req.query
    });
    return res.status(500).json({ 
      error: "Failed to fetch post",
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
}
