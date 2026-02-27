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
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({ message: 'No file found in form data' }, { status: 400 });
      }

      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      return NextResponse.json(blob);
    } else {
      // Fallback for direct binary uploads
      const { searchParams } = new URL(request.url);
      const filename = searchParams.get('filename') || 'upload.png';
      const blobData = await request.blob();
      
      const blob = await put(filename, blobData, {
        access: 'public',
        addRandomSuffix: true,
      });

      return NextResponse.json(blob);
    }
  } catch (error: any) {
    console.error('Vercel Blob Error:', error);
    return NextResponse.json({ 
      message: 'Server error during upload', 
      details: error.message || 'Unknown error',
      type: error.name
    }, { status: 500 });
  }
}
