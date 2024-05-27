'use client'
import React, { useState } from 'react'
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function CreateListingForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [itemType, setItemType] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [publicId, setPublicId] = useState('')


    const router = useRouter()

    const handleImageUpload = (result) => {
        console.log("result: ", result)
        const info = result.info

        if ('secure_url' in info && "public_id" in info) {
            const url = info.secure_url
            const publicId = info.public_id
            setImageUrl(url)
            setPublicId(publicId)
            console.log("info: ", info)
            console.log("url: ", url)
            console.log("publicId: ", publicId)
        }
    }
    const removeImage = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://lost-found-gray.vercel.app/api/removeImage', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ publicId })
            })
            if (res.ok) {
                setImageUrl('')
                setPublicId('')
            }
        } catch (error) {
            console.log(error)
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !question || !itemType) {
            alert("Title, description, question and item type are required.")
            return
        }

        try {
            const res = await fetch('/api/listing/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    question,
                    itemType,
                    imageUrl,
                    publicId,
                    contactNumber
                })
            });
            if (res.ok) {
                router.push('/feed')
                router.refresh()
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='pb-16'>
            <h1 className='text-center text-3xl font-bold my-8'>List an item</h1>
            <form onSubmit={handleSubmit} className='flex flex-col m-auto font-serif w-1/3 gap-4 border border-black py-5 px-12 rounded-lg'>
                <label>Title</label>
                <input className='rounded-lg border border-black p-2 outline-none' onChange={(e) => setTitle(e.target.value)} value={title} />
                <label>Description</label>
                <input className='rounded-lg border border-black p-2 outline-none' onChange={(e) => setDescription(e.target.value)} value={description} />
                <label>Question</label>
                <input className='rounded-lg border border-black p-2 outline-none' onChange={(e) => setQuestion(e.target.value)} value={question}/>
                <label>Contact Number</label>
                <input className='rounded-lg border border-black p-2 outline-none' onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} type='number' min='1000000000' max='9999999999' />
                <div className='mt-4 border border-black rounded-lg px-4 py-1 w-fit'>
                    <select className='outline-none mx-4' onChange={(e) => setItemType(e.target.value)} value={itemType}>
                        <option>Select Type</option>
                        <option value="found">FOUND</option>
                        <option value="lost">LOST</option>

                    </select>
                </div>

                <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={handleImageUpload} className={`h-48 border-2 mt-4 border-dotted grid place-items-center rounded-lg bg-slate-300 relative ${imageUrl && 'pointer-events-none'} `}>
                    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    </div>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            className="absolute object-cover inset-0"
                            fill
                            alt={title}
                        />
                    )}
                </CldUploadButton>
                {imageUrl && <button onClick={removeImage} className='bg-red-500 py-2 px-4 rounded-lg font-bold text-white'>Remove Image</button>}
                <button type="submit" className='bg-blue-400 rounded-lg border border-blue-200 text-white text-xl font-bold font-mono p-1'>Submit</button>
            </form>
        </div >
    )
}
