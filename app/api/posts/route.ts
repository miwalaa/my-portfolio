import { getPayloadClient } from "@/lib/payload";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payload = await getPayloadClient();

    const posts = await payload.find({
      collection: "posts",
      limit: 2,
      sort: "-createdAt",
    });

    // Convert dates to strings for JSON serialization
    const serializedPosts = posts.docs.map(post => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
    }));

    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
