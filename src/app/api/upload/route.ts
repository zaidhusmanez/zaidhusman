import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ message: 'Missing filename parameter' }, { status: 400 });
    }

    // Read the body as a blob for more reliable handling across environments
    const blobData = await request.blob();
    
    if (!blobData || blobData.size === 0) {
      return NextResponse.json({ message: 'Empty file data received' }, { status: 400 });
    }

    console.log(`Uploading file: ${filename}, Size: ${blobData.size} bytes`);

    // The 'put' function from @vercel/blob will automatically use the 
    // BLOB_READ_WRITE_TOKEN from environment variables.
    const blob = await put(filename, blobData, {
      access: 'public',
      // We can add a unique timestamp to prevent filename collisions
      addRandomSuffix: true, 
    });

    console.log('Upload successful:', blob.url);
    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Vercel Blob Upload Error:', error);
    
    // Check for common errors like missing token
    if (error.message?.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json({ 
        message: 'Storage not configured. Please enable Vercel Blob in your project dashboard.',
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Upload failed', 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
