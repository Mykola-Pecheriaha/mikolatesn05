import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('Starting admin setup...');

    // Перевіряємо, чи існує адмін
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    console.log('Existing admin check:', existingAdmin ? 'Found' : 'Not found');

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Адміністратор вже існує',
        admin: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          role: existingAdmin.role
        }
      });
    }

    // Створюємо адміністратора
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Creating new admin...');
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@clinic.com',
        password: hashedPassword,
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '+380501234567'
      }
    });

    console.log('Admin created:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    // Перевіряємо, чи можемо знайти створеного адміна
    const verifyAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin@clinic.com'
      }
    });

    console.log('Verify admin exists:', verifyAdmin ? 'Success' : 'Failed');

    // Перевіряємо пароль
    if (verifyAdmin) {
      const passwordCheck = await bcrypt.compare(password, verifyAdmin.password);
      console.log('Password verification:', passwordCheck ? 'Success' : 'Failed');
    }

    return NextResponse.json({ 
      message: 'Адміністратора створено',
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      credentials: {
        email: 'admin@clinic.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Error in setup-admin:', error);
    return NextResponse.json(
      { error: 'Помилка при створенні адміністратора', details: error },
      { status: 500 }
    );
  }
}