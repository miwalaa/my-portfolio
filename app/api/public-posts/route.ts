import { getPayload } from "payload";
import configPromise from "@payload-config";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    const payload = await getPayload({ config: configPromise });

    const where: any = {
      status: { equals: "published" },
    };

    // Filter by tag if provided
    if (tag) {
      where["tags.tag"] = { equals: tag };
    }

    const posts = await payload.find({
      collection: "posts",
      where,
      sort: "-createdAt",
      depth: 2, // Include related media
    });

    console.log(`Found ${posts.docs.length} posts`);

    // Format the response to ensure coverImage has proper URL
    const formattedPosts = posts.docs.map((post: any) => {
      let coverImage = null;

      // Handle coverImage - it should be populated with depth: 2
      if (post.coverImage && typeof post.coverImage === 'object') {
        coverImage = {
          url: post.coverImage.url || '',
          alt: post.coverImage.alt || post.title,
        };
        console.log(`Post "${post.title}" - Cover Image URL:`, coverImage.url);
      } else {
        console.log(`Post "${post.title}" - No cover image found`);
      }

      // Log tags for debugging
      if (post.tags && post.tags.length > 0) {
        console.log(`Post "${post.title}" - Tags:`, post.tags.map((t: any) => t.tag).join(', '));
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage,
        tags: post.tags || [],
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    return NextResponse.json(formattedPosts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
