import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Необхідно увійти в систему' },
        { status: 401 }
      );
    }

    if (session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Доступ заборонено' },
        { status: 403 }
      );
    }

    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Помилка при отриманні консультацій' },
      { status: 500 }
    );
  }
}