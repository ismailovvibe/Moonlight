import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function verifyToken(token: string): string {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function verifyTokenFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
}
