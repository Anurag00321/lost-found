import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/authOptions";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }
    const {title, description, question, itemType, imageUrl, publicId, contactNumber} = await req.json()

    const authorEmail = session.user?.email as string
    if(!title || !description || !question || !itemType){
        return NextResponse.json(
        {mesaage: 'Title. description, question and item type are required'},
        {status: 500}
        )
    }

    try {
        const newListing = await prisma.listing.create({
            data:{
                title,
                description,
                question,
                itemType,
                imageUrl,
                publicId,
                contactNumber,
                authorEmail
            }
        })
        console.log("Listing created")
        return NextResponse.json(newListing)
    } catch (error) {
        return NextResponse.json(
            {message: "Failed to create listing"}
        )
    }
}

export async function GET(){
    try {
        const listings = await prisma.listing.findMany({
            include: {author: {select: {name: true}}},
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(listings)
    } catch (error) {
        return NextResponse.json(
            {message: "Some error occured."},
            {status: 500}           
        )
    }
}