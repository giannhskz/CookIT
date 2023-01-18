import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma/prismadb"
import { Prisma } from "@prisma/client";
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter : PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
