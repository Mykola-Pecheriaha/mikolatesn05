import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const consultation = await prisma.consultation.create({
      data: {
        name: 'Тестовий Пацієнт',
        phone: '+380501234567',
        email: 'test@example.com',
        service: 'Консультація хірурга',
        message: 'Потрібна консультація щодо операції',
        status: 'NEW'
      }
    });

    return NextResponse.json({
      message: 'Тестову консультацію створено',
      consultation
    });
  } catch (error) {
    console.error('Error creating test consultation:', error);
    return NextResponse.json(
      { error: 'Failed to create test consultation' },
      { status: 500 }
    );
  }
}
