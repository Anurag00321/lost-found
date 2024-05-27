
import Image from 'next/image'
import React from 'react'
import nextImg from '@/public/next.svg'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/authOptions'



const getListings = async () => {
    try {
        const res = await fetch('http:localhost:3000/api/listing', {
            cache: 'no-store'
        })
        if (res.ok) {
            const listings = await res.json()
            return listings
        }
    } catch (error) {
        console.log(error)
    }
}
export default async function ListedItemCard() {
    const session = await getServerSession(authOptions)

    const listings = await getListings();


    return (
        <>
            {listings?.map((l) => {
                const dateObject = new Date(l.createdAt);
                const formattedDate = dateObject.toLocaleDateString();

                return (
                    <div className='border border-black h-96 w-1/4 flex flex-col rounded-lg mt-12 p-2 gap-2 mb-4' key={l.id}>
                        <div className='border-b border-black items-center justify-center flex h-1/2'>
                            <div className="h-40 w-full relative" > {l.imageUrl ?

                                (<Image src={l.imageUrl} fill alt={session?.user?.name} className="object-cover object-center" />) : (
                                    <Image src={nextImg} width={120} height={120} alt={session?.user?.name} className="object-center" />
                                )}</div>
                        </div>
                        <div className='text-md font-serif font-bold  capitalize h-1/2'>
                            <p>{l.title}</p>
                            <p>{l.description}</p>
                            <p>{l.question}</p>
                            <p>{l.itemType}</p>
                            <p>{l.author.name}</p>
                            <p>{l.contactNumber}</p>
                            <p>{formattedDate}</p>
                        </div>

                    </div>)
            })}

        </>

    )
}
