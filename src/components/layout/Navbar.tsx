"use client";
import Image from "next/image";

import React, { useState } from "react";
import { MenuIcon, XIcon, ChevronDownIcon } from "../common/SocialIcons";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://partnerrentals.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fff86wg9s%2Fproduction%2Fddc259aea14c50240259ae0c9d170c30989417f0-1086x180.png&w=640&q=75"
              alt="Partner Rentals"
              width={100}
              height={100}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Equipment Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-blue-900 font-medium transition-colors"
                onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
              >
                Equipment
                <ChevronDownIcon cls="ml-1 w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                  <a
                    href="/aerial-equipment"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Aerial Equipment
                  </a>
                  <a
                    href="/earthmoving"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Earthmoving
                  </a>
                  <a
                    href="/concrete-tools"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Concrete Tools
                  </a>
                  <a
                    href="/power-tools"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Power Tools
                  </a>
                  <a
                    href="/generators"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Generators
                  </a>
                  <a
                    href="/compressors"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Compressors
                  </a>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-blue-900 font-medium transition-colors"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDownIcon cls="ml-1 w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                  <a
                    href="/delivery"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Delivery Service
                  </a>
                  <a
                    href="/maintenance"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Maintenance
                  </a>
                  <a
                    href="/training"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Equipment Training
                  </a>
                  <a
                    href="/consulting"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    Project Consulting
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/about"
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="/locations"
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
            >
              Locations
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/quote"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <XIcon cls="w-6 h-6" />
            ) : (
              <MenuIcon cls="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-900 font-medium"
              >
                Home
              </Link>
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-900 font-medium"
                  onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
                >
                  Equipment
                  <ChevronDownIcon
                    cls={`w-4 h-4 transition-transform ${
                      isEquipmentOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isEquipmentOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      href="/aerial-equipment"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Aerial Equipment
                    </Link>
                    <Link
                      href="/earthmoving"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Earthmoving
                    </Link>
                    <Link
                      href="/concrete-tools"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Concrete Tools
                    </Link>
                    <Link
                      href="/power-tools"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Power Tools
                    </Link>
                    <Link
                      href="/generators"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Generators
                    </Link>
                    <Link
                      href="/compressors"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Compressors
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-900 font-medium"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <ChevronDownIcon
                    cls={`w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      href="/delivery"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Delivery Service
                    </Link>
                    <Link
                      href="/maintenance"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Maintenance
                    </Link>
                    <Link
                      href="/training"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Equipment Training
                    </Link>
                    <Link
                      href="/consulting"
                      className="block text-gray-600 hover:text-blue-900"
                    >
                      Project Consulting
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-blue-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/locations"
                className="block text-gray-700 hover:text-blue-900 font-medium"
              >
                Locations
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-blue-900 font-medium"
              >
                Contact
              </Link>
              <Link
                href="/quote"
                className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
