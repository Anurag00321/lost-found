import Image from 'next/image';
import LostAndFoundBanner from '../public/assets/lost&Foundbanner.jpg'
import ReportLost from '../public/assets/report_lost.png'
import ReportFound from '../public/assets/report_found.png'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="min-h-screen bg-gray-100">



      <main className="container mx-auto py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Lost and Found</h2>
          <p className="text-xl text-gray-700">Your one-stop solution for reuniting lost items with their owners.</p>
          <div className="mt-8">
            <Image src={LostAndFoundBanner} alt='Lost and found' width={400} height={400} className='mx-auto rounded-lg shadow-lg' />
          </div>
          {session ?(
          <Link href='/listings/create'>
          <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">List an Item</button>
          </Link>): null}
        </section>

        <section id="how-it-works" className="py-12">
          <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/2 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Image src={ReportLost} alt='Report lost item' className='mx-auto mb-4 rounded-lg' />
                <h4 className="text-xl font-bold mb-2">Report a Lost Item</h4>
                <p className="text-gray-700">Describe your lost item in detail and submit it to our database.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Image src={ReportFound} alt='Search found items' className='mx-auto mb-4 rounded-lg'/>
                <h4 className="text-xl font-bold mb-2">Search Found Items</h4>
                <p className="text-gray-700">Browse through the list of found items to see if your lost item is there.</p>
              </div>
            </div>
          
          </div>
        </section>

        <section id="about" className="py-12">
          <h3 className="text-3xl font-bold text-center mb-8">About Us</h3>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-4">We are dedicated to helping people find their lost belongings quickly and efficiently. Our team works around the clock to ensure that lost items are reunited with their owners as soon as possible.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

