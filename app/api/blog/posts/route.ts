import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const posts = await payload.find({
      collection: 'posts',
      limit: 10,
      sort: '-publishedAt',
      depth: 1,
    });

    return NextResponse.json(posts.docs);
  } catch (error) {
    console.error('Failed to fetch posts from Payload CMS:', error);
    return NextResponse.json([], { status: 500 });
  }
}
