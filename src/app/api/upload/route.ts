import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Check Auth
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Check Token (Helpful for debugging)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ 
      message: 'Vercel Blob token is missing. Did you connect the storage and redeploy?' 
    }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file found in request' }, { status: 400 });
    }

    // 3. Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Vercel Blob Error:', error);
    return NextResponse.json({ 
      message: 'Upload process failed', 
      error: error.message || 'Unknown server error' 
    }, { status: 500 });
  }
}
