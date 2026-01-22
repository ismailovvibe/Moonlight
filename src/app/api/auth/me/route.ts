import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import User from '@/backend/models/User';
import { verifyTokenFromRequest } from '@/backend/middleware/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  
  try {
    const decoded: any = verifyTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
