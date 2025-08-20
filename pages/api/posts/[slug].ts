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
    const payload = await getPayloadClient();

    const post = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (!post || !post.docs.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post: post.docs[0] });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
