import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from '@auth/prisma-adapter'
import { authOptions } from "@/app/lib/authOptions";

import prisma from "@/app/lib/prismadb";


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}