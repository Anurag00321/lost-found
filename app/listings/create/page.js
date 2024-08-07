import CreateListingForm from '@/app/components/CreateListing'
import { getServerSession } from 'next-auth/next' 
import { authOptions } from '@/app/lib/authOptions'
import { redirect } from 'next/navigation'

export default async function CreateListing(){
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }
    return <CreateListingForm/>
}