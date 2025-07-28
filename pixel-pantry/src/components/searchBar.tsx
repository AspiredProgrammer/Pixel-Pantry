// SearchBar.tsx
import Image from 'next/image';

export default function SearchBar() {

    return (
        <section>
          
                <div className='w-full'>
                    <div className='outer-box'>
                        <Image 
                            src="/assets/loupe.png"
                            alt="Search icon"
                            width={35}
                            height={35}
                            // layout="fill"
                            // objectFit="cover"
                        />
                    <div className="box">
                        <input
                            placeholder="Search recipes by ingredient"
                        />
                    </div>
                   </div>
                </div>
            
        </section>
    )
}