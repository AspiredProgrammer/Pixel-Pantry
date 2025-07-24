// LandingPage.tsx

import Image from 'next/image';


export default function LandingPage() {

    return (
        <section>
            <div className='flex flex-col justify-center items-center bg-gradient-to-br from-green-500 via-white to-green-700 overflow-hidden '>
                <div className='w-full'>
                    {/* right side hero image */}
                    <div style={{ position: 'relative', width: '40%', height: '500px', marginLeft: 'auto', marginTop: '40px', marginRight: '100px' }}>
                        <Image 
                            src="/assets/hero-image.jpg"
                            alt="Hero Image"
                            layout="fill"
                            objectFit="cover"
                            className="object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}