import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function GET(req: Request, {params}: {params: {id: string}}){

    try {
        const id = params.id
        const listing = await prisma.listing.findUnique({
            where: {id}
        })
        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.json(
            {message: "Could not fetch listing"}
        )
    }
   
}

export async function PUT(req: Request, {params}: {params: {id: string}}){
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }
    const {title, description, question, itemType, imageUrl, publicId, contactNumber} = await req.json()
    const id = params.id

    try {
        const listing = await prisma.listing.update({
            where: {id},
            data: {
                title, description, question, itemType, imageUrl, publicId, contactNumber
            }
        })
        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.json({message: "error editing listing"})
    }

}

export async function DELETE(req: Request, {params}: {params: {id: string}}){
    const id = params.id
    try {
        const listing = await prisma.listing.delete({where: {id}})
        return NextResponse.json(listing)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error deletinh the listing"})
    }

}