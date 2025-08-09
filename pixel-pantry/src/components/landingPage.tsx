// LandingPage.tsx

import Image from 'next/image';


export default function LandingPage() {
    return (
        <section>
            <header
                className="flex flex-col relative mb-5 h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] xl:h-[20rem]">
                {/* Hero image */}
                <Image
                    src="/assets/hero-image.jpg"
                    alt="Beans in burlap"
                    width={1920}
                    height={230}
                    className="w-full h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] xl:h-[20rem] object-cover"
                    sizes="(min-width: 1024px) 1600px, (min-width: 500px) 860px, (max-width: 499px) 430px"
                />
                {/* Overlay heading */}
                <h1 className="absolute bg-white px-3 pt-1 rounded-t-lg flex bottom-0 left-1/2 transform -translate-x-1/2 mb-0 font-bold text-black
                   text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl">
                    Welcome to <span className="ml-2 text-yellow-600">Pixel Pantry</span>
                </h1>
            </header>
        </section>

    )
}