import Image from 'next/image';
import nextImg from '@/public/next.svg'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { redirect } from 'next/navigation';
import Link from 'next/link'

const getListingById = async (id) => {
    try {
        const res = await fetch(`https://lost-found-gray.vercel.app/api/listings/${id}`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const { listings } = await res.json()
            return listings
        }
    } catch (error) {
        console.log(error)
    }
}

async function ListingCard() {

    const session = await getServerSession(authOptions)
    const id = params.id
    if (!session) {
        redirect('/')
    }

    if(id){
        listing = await getListingById(id)
    }

    return(
        <div>
            <h1>{listing.title}</h1>
        </div>
    )
}

export default ListingCard