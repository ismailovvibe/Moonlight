import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import User from '@/backend/models/User';
import { hashPassword, verifyPassword } from '@/backend/middleware/password';
import { generateToken } from '@/backend/middleware/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, username, password } = await req.json();

  try {
    // Allow login with either email OR username
    const user = await User.findOne({
      $or: [
        { email: email || undefined },
        { username: username || undefined }
      ]
    }).select('+password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
