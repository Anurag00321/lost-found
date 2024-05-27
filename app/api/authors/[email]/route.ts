import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;
    const listings = await prisma.user.findUnique({
      where: { email },
      include: {
        listings: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch listing" });
  }
}