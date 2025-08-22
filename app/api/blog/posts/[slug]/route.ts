import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(
  _req: Request,
  context: { params: Promise<Params['params']> }
) {
  try {
    const params = await context.params;
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: params.slug,
        },
      },
      limit: 1,
      depth: 2,
    });

    const post = result.docs[0];

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch post from Payload CMS:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
