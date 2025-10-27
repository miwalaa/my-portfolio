import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token to prevent unauthorized revalidation
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse the request body to get the path to revalidate
    const body = await request.json();
    const { path = '/', type = 'page' } = body;

    // Revalidate the specified path
    revalidatePath(path, type as 'page' | 'layout');

    return NextResponse.json(
      { 
        revalidated: true, 
        path,
        now: Date.now() 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
