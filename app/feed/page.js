import React from 'react'
import ListedItemCard from '../components/ListedItemCard'
import { getServerSession } from 'next-auth/next' 
import { authOptions } from '../lib/authOptions'
import { redirect } from 'next/navigation'


export default async function Feed() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    return (
        <div className='flex gap-10 flex-row flex-wrap justify-center'>
            <ListedItemCard />
        </div>
    )
}
