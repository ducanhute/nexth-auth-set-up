import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "./primaDb";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email here ..." },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        })
        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(credentials.password, existingUser.password)

        if (!passwordMatch) {
          return null
        }

        return {
          id: existingUser.id.toString(),
          username: existingUser.username,
          email: existingUser.email
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    },
  }
}