import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorizing with credentials:', { email: credentials?.email });

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Необхідно ввести email та пароль');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        console.log('Found user:', user ? { id: user.id, email: user.email, role: user.role } : 'null');

        if (!user) {
          console.log('User not found');
          throw new Error('Користувача не знайдено');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log('Password validation:', { isValid: isPasswordValid });

        if (!isPasswordValid) {
          console.log('Invalid password');
          throw new Error('Невірний пароль');
        }

        const userData = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.firstName} ${user.lastName}`
        };

        console.log('Returning user data:', userData);
        return userData;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role as Role
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as Role
        session.user.name = token.name as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}