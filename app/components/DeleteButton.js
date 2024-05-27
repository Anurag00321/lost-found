"use client"
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }) {
    const deleteImage = async (publicId) =>{
const res = await fetch('http://localhost:3000/api/removeImage', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({publicId}),
})
    }
    const router = useRouter()
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to remove the listing?"
        )

        if (confirmed) {
            try {
                const res = await fetch(`/api/listing/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                if (res.ok) {
                    console.log("Listing Deleted")
                    const listing = await res.json()
                    const {publicId} = listing
                    await deleteImage(publicId)
                    router.push('/myListings')
                    router.refresh()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <button className="text-red-600" onClick={handleDelete}>Delete</button>
    )
}