import Image from 'next/image';
import nextImg from '@/public/next.svg'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link'
import DeleteButton from '@/app/components/DeleteButton'


const getMyListings = async (email) => {
    try {
        const res = await fetch(`http://localhost:3000/api/authors/${email}`, {
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


async function MyListings() {

    const session = await getServerSession(authOptions)
    const email = session?.user.email
    let listings = []
    if (!session) {
        redirect('/')
    }

    if (email) {
        listings = await getMyListings(email);
    }




    return (
        <>
            <div className='flex gap-10 flex-row flex-wrap justify-center'>
                {listings.map((l) => {
                    const dateObject = new Date(l.createdAt);
                    const formattedDate = dateObject.toLocaleDateString();

                    return (

                        <div className='border border-black h-96 w-1/4 flex flex-col rounded-lg mt-12 p-2 gap-2 mb-4' key={l.id}>
                            <div className='border-b border-black items-center justify-center flex h-3/5'>
                                <div className="h-48 w-full relative" > {l.imageUrl ?

                                    (<Image src={l.imageUrl} fill alt={session?.user?.name} className="object-cover object-center" />) : (
                                        <Image src={nextImg} width={120} height={120} alt={session?.user?.name} className="object-center" />
                                    )}</div>
                            </div>
                            <div className='text-md font-serif font-bold  capitalize h-2/5'>
                                <p>{l.title}</p>
                                <p>{l.description}</p>
                                <p>{l.question}</p>
                                <p>{l.itemType}</p>
                                <p>{formattedDate}</p>
                            </div>
                            <div className='font-bold flex gap-3 justify-center'>
                                <Link href={`/edit-listing/${l.id}`} className='bg-green-400 py-1 px-4 rounded-lg hover:bg-green-300'>Edit</Link>
                                <DeleteButton id={l.id} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default MyListings


