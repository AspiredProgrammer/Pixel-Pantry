"use client"

import Link from 'next/link';
import {useEffect, useState} from "react";

const Navbar = () => {

    const [isScrolled, setIsScrolled ] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
      <nav
          className={`sticky top-0 z-50 shadow-md bg-white
            transition-opacity duration-500
            ${isScrolled ? "opacity-0" : "opacity-100"}
          `}
      >


          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/">
                  <div className="inline-block rounded-md transition-colors duration-200 hover:bg-[#a0d6cb] p-1">
                      <img
                          src="/assets/plogo.png"
                          alt="Pixel Pantry Logo"
                          className="h-16 w-auto object-contain"
                      />
                  </div>
              </Link>
              <ul className="flex space-x-6">
                  {[
                      {href: '/', label: 'Home'},
                      {href: '/about', label: 'About'},
                      {href: '/cuisine', label: 'Cuisine'},
                      {href: '/wishlist', label: 'Wishlist'},
                  ].map(({href, label}) => (
                      <li key={label}>
                          <Link
                              href={href}
                              className="relative font-semibold text-[#032f3c] hover:text-[#a0d6cb] transition-all duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[3px] after:bg-[#a0d6cb] after:transition-all after:duration-200"
                          >
                              {label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
      </nav>
  );
};

export default Navbar;
