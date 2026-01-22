import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Video from '@/backend/models/Video';
import User from '@/backend/models/User';
import { verifyToken } from '@/backend/middleware/auth';

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

    return NextResponse.json(video);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { message: 'Only admins can update videos' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    
    const video = await Video.findByIdAndUpdate(id, body, { new: true });
    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { message: 'Only admins can delete videos' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
