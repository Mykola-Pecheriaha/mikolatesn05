import { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      name: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    role: Role
    name: string
  }
}