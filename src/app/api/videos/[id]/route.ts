import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Video from '@/backend/models/Video';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
