import EditListingForm from '../../components/EditListingForm'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import {authoption} from '../../lib/authOptions'

const getListing = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/listing/${id}`, {
            cache: 'no-store'
        })
        if (res.ok) {
            const listing = await res.json()
            return listing
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

export default async function EditListing({ params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }
    const id = params.id
    const listing = await getListing(id)

    return (
        <div>
            {listing ? <EditListingForm listing={listing} /> : <div>Invalid Listing</div>}
        </div>
    )

}