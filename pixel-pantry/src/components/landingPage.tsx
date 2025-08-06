// LandingPage.tsx
import Image from 'next/image';

export default function LandingPage() {

    return (
        <section>
            <div className='flex justify-center items-center bg-gradient-to-br from-green-500 via-white to-green-700 overflow-hidden min-h-screen relative'>
                <div className='w-full flex justify-center items-center px-8 bg-white/50 px-10 py-10 relative z-10'>
                    {/* left side hero text */}
                    <div className='flex flex-col justify-center max-w-md mr-10 bg-green-800 backdrop-blur-sm p-6 rounded-xl w-[1200px] h-[400px]' style={{ marginRight: '-100px', zIndex: 20 }}>

                        <h1 className='text-4xl font-bold mb-4 text-white'>Welcome to <span className='text-yellow-300'>Pixel Pantry</span></h1>
                        <p className='text-lg mr-4 mb-6 text-white'>Join us to find the <span className='text-yellow-300 font-bold'>best</span> recipes for your next meal</p>
                        <button className='bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600 transition-all duration-300 w-fit'>Get Started</button>
                    </div>
                    {/* right side hero image */}

                    <div style={{ position: 'relative', width: '40%', height: '400px', marginLeft: '-50px', zIndex: 10 }} className='rounded-lg shadow-lg'>
                        <Image
                            src="/assets/hero-image.jpg"
                            alt="Hero Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}