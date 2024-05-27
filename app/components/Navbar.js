"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Logo from '../../public/assets/L&Flogo.jpg'

export function Navbar() {
const {status} = useSession()
const {data: session} = useSession()

    return (
    status === 'authenticated'?
    (
        <div className='flex items-center justify-between bg-gray-900 h-20 px-12' >
            
             <Image src={Logo} alt='lost and found' width={100} height={40} className=''/>
        
             <div className='flex gap-10 text-2xl items-center text-gray-200  font-bold'>
                <Link href='listings/create' className='hover:text-white'>List an Item</Link>
                <Link href='/feed' className='hover:text-white'>Feed</Link>
                <Link href='/myListings' className='hover:text-white'>My Listings</Link>
                <Link href='/messages' className='hover:text-white'>Messages</Link>
                
                <button className='bg-blue-500 hover:bg-blue-400 p-2 rounded-lg border border-black hover:scale-110' onClick={signOut}>Sign Out</button>
                <Image alt={session.user.name} src={session.user.image} width={50} height={40} className='rounded-full'/>
             </div>
        </div>
    )  :
    (
        <div className='flex justify-between items-center bg-gray-900 h-16'>
             <Image src={Logo} alt='lost and found' width={125} height={60} className=''/>
            <div className='flex mr-12 gap-10'>
            <button className='bg-yellow-300 p-2 rounded-lg border border-black hover:scale-110' onClick={signIn}>Sign Up</button>
            </div>

        </div>
    )    
    )
}
