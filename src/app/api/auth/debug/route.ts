import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Debug login attempt:', { email });

    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log('Found user:', user ? {
      id: user.id,
      email: user.email,
      role: user.role,
      passwordLength: user.password.length
    } : 'null');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation:', { isValid: isPasswordValid });

    return NextResponse.json({
      success: isPasswordValid,
      user: isPasswordValid ? {
        id: user.id,
        email: user.email,
        role: user.role
      } : null
    });
  } catch (error) {
    console.error('Debug login error:', error);
    return NextResponse.json({ error: 'Debug login failed' }, { status: 500 });
  }
}
