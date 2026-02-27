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

    if (!filename || !request.body) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // For local development, it will still try to use Vercel Blob if the token is present.
    // On Vercel, it will use the BLOB_READ_WRITE_TOKEN environment variable.
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
