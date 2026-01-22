import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import User from '@/backend/models/User';
import { hashPassword } from '@/backend/middleware/password';
import { generateToken } from '@/backend/middleware/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, username, firstName, lastName, password, confirmPassword } = await req.json();

  try {
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email or username already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword
    });

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
