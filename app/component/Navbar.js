import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-900">
          <Image src="/logo.png" width={90} height={90} alt="Logo" priority />
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-indigo-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        <div className="hidden md:flex space-x-8 items-center">
          {/* <Link
            href="/create-card"
            className="text-indigo-900 hover:text-purple-600 transition duration-300"
          >
            Create Card
          </Link> */}
          <Link
            href="/dashboard"
            className="text-indigo-900 hover:text-purple-600 transition duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div
        className={`md:hidden bg-white px-6 py-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 text-center">
          {/* <Link
            href="/create-card"
            className="text-indigo-900 hover:text-purple-600 transition duration-300"
            onClick={toggleMenu}
          >
            Create Card
          </Link> */}
          <Link
            href="/dashboard"
            className="text-indigo-900 hover:text-purple-600 transition duration-300"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
