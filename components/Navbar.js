import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component from Next.js
import { redirect } from 'next/dist/server/api-utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center p-6 mx-auto">
          <span className="text-xl font-bold tracking-wide text-black uppercase">
           <h1> A-cube </h1>
          </span>

          <div className="flex items-center justify-center mt-6 text-gray-600 capitalize dark:text-gray-300">
            {/* Use Link component for navigation */}
            <Link href="/">
              <div className="mx-2 text-gray-800 border-b-2 border-blue-500 dark:text-gray-200 sm:mx-6">home</div>
            </Link>

            {/* Use Link component for navigation */}
            <Link href="/addfood">
              <div className="mx-2 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 sm:mx-6">Add Food Data</div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
