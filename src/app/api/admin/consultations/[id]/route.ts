import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ConsultationStatus } from '@/types/consultation';

export async function PATCH(request: Request) {
  try {
    // Перевіряємо сесію
    const session = await getServerSession(authOptions);
    console.log('Session in API:', session);

    if (!session) {
      console.log('No session found');
      return NextResponse.json(
        { error: 'Необхідно увійти в систему' },
        { status: 401 }
      );
    }

    if (session.user?.role !== 'ADMIN') {
      console.log('User is not admin:', session.user?.role);
      return NextResponse.json(
        { error: 'Доступ заборонено. Потрібні права адміністратора.' },
        { status: 403 }
      );
    }


    // Отримуємо id з url
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log('Consultation ID:', id);

    if (!id) {
      return NextResponse.json(
        { error: 'ID консультації не вказано' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);

    const { status, response } = body;

    // Перевіряємо консультацію
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id }
    });

    console.log('Found consultation:', existingConsultation);

    if (!existingConsultation) {
      return NextResponse.json(
        { error: 'Консультацію не знайдено' },
        { status: 404 }
      );
    }

    // Перевіряємо статус
    if (status && !Object.values(ConsultationStatus).includes(status)) {
      console.log('Invalid status:', status);
      return NextResponse.json(
        { error: 'Невірний статус консультації' },
        { status: 400 }
      );
    }

    // Оновлюємо консультацію
    const updateData: Record<string, unknown> = {
      updatedAt: new Date()
    };

    if (status) {
      updateData.status = status;
    }

    if (response !== undefined) {
      updateData.response = response;
    }

    console.log('Updating with data:', updateData);

    const updatedConsultation = await prisma.consultation.update({
      where: { id },
      data: updateData
    });

    console.log('Updated consultation:', updatedConsultation);

    return NextResponse.json(updatedConsultation);
  } catch (error) {
    console.error('Error in consultation update:', error);
    return NextResponse.json(
      { 
        error: 'Помилка при оновленні консультації',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}