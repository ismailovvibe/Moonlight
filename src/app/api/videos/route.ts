import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Video from '@/backend/models/Video';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query = category ? { category } : {};
    const videos = await Video.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ upload_date: -1 });

    const total = await Video.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: videos,
      total
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const video = await Video.create(body);
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
