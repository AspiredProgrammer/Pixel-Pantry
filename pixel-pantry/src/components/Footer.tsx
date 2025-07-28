// components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-[#032f3c] py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div>
          {/* Logo */}
          <div className="inline-block rounded-md transition-colors duration-200 hover:bg-[#a0d6cb] p-1">
            <img
              src="/assets/plogo.png"
              alt="Pixel Pantry Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} Pixel Pantry
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/cuisine", label: "Cuisine" },
              { href: "/wishlist", label: "Wishlist" },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-gray-200 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact or Socials */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Connect</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-gray-200 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AspiredProgrammer/Pixel-Pantry"
                target="_blank"
                className="hover:text-gray-200 transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
