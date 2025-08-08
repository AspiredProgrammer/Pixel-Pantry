// LandingPage.tsx

import Image from 'next/image';


export default function LandingPage() {
    return (
        <section>
            <div className='flex justify-center items-center  wallpaper-bg overflow-hidden min-h-screen relative'>
                <div
                    className='w-full flex justify-center items-center px-8 bg-white/80 px-10 py-10 relative z-10 wallpaper-bg'
                >
                    {/* left side hero text */}
                    <div className='flex flex-col justify-center max-w-md mr-10 bg-amber-900 backdrop-blur-sm p-6 rounded-xl w-[1200px] h-[400px]' style={{ marginRight: '-100px', zIndex: 20 }}>
                        <h1 className='text-4xl font-bold mb-4 text-white'>Welcome to <span className='text-yellow-300'>Pixel Pantry</span></h1>
                        <p className='text-lg mr-4 mb-6 text-white'>Join us to find the <span className='text-yellow-300 font-bold'>best</span> recipes for your next meal</p>
                        <button className='bg-yellow-300 text-white px-6 py-3 rounded-md shadow-lg hover:bg-yellow-600 transition-all duration-300 w-fit'>Use our recpie finder</button>
                    </div>
                    {/* right side hero image */}
                    {/* image */}
                    <div style={{ position: 'relative', width: '40%', height: '400px', marginLeft: '50px', zIndex: 10 }} className='flex items-center justify-center'>
                            {/* blob background */}
                        <div className='absolute w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1'/>
                        <Image
                            src="/assets/hero-image.jpg"
                            alt="Homepage Icon"
                            width={600}
                            height={600}
                            className="z-2 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}