import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
  <img
    src="/assets/plogo.png"
    alt="Pixel Pantry Logo"
    className="h-16 w-auto object-contain"
  />
</Link>
        <ul className="flex space-x-6">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/cuisine', label: 'Cuisine' },
            { href: '/wishlist', label: 'Wishlist' },
          ].map(({ href, label }) => (
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
