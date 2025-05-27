import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons; install with `npm install lucide-react`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold text-blue-600">PatientApp</div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="/patients"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Patients
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </a>
            <a
              href="/login"
              className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium"
            >
              Login
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="/patients"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Patients
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </a>
            <a
              href="/login"
              className="text-blue-600 font-medium border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
