import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, phoneNumber } = await req.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'Не всі обов\'язкові поля заповнені' },
        { status: 400 }
      )
    }

    // Перевіряємо, чи існує користувач з таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Користувач з таким email вже існує' },
        { status: 400 }
      )
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10)

    // Створюємо нового користувача
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: 'PATIENT',
      },
    })

    // Створюємо запис пацієнта
    await prisma.patient.create({
      data: {
        userId: user.id,
      },
    })

    return NextResponse.json(
      { message: 'Користувач успішно зареєстрований' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Помилка реєстрації:', error)
    return NextResponse.json(
      { message: 'Помилка при реєстрації користувача' },
      { status: 500 }
    )
  }
}