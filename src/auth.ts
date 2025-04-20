import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import serverEnv from "@/utils/serverEnv";
import loginSchema from "@/lib/schemas/loginSchema";
import bcrypt from "bcryptjs";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);
        if (!validatedCredentials.success) return null;
        const { data } = validatedCredentials;
        const user = await prisma.user.findUnique({
          where: {
            username: data.username,
          },
        });
        if (!user) return null;
        const isMatch = bcrypt.compare(data.password, user.password);
        if (!isMatch) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: serverEnv.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);
