import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Video from '@/backend/models/Video';
import User from '@/backend/models/User';
import { verifyToken } from '@/backend/middleware/auth';

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

    return NextResponse.json(videos);
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
    // Verify admin token
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = verifyToken(token);
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Only admins can add videos' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const video = await Video.create({
      ...body,
      added_by: userId
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
