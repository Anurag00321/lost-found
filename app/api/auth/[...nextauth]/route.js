import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from '@auth/prisma-adapter'

import prisma from "@/app/lib/prismadb";

export const authOptions ={
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET

}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}