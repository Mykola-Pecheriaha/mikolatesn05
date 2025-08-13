import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    const consultation = await prisma.consultation.create({
      data: {
        name,
        phone,
        email,
        service,
        message,
      },
    });

    return NextResponse.json(consultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { error: 'Помилка при створенні консультації' },
      { status: 500 }
    );
  }
}
