"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TopBanner as TopBannerType,
  Header as HeaderType,
} from "@/types/siteSettings";
import { urlFor } from "@/lib/sanity";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import TopBanner from "./Topbar";

interface Props {
  topBanner: TopBannerType | null;
  header: HeaderType | null;
}

export default function Header({ topBanner, header }: Props) {
  const isSticky = useStickyHeader(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown(
      activeDropdown === index.toString() ? null : index.toString()
    );
  };

  return (
    <>
      {/* Top Banner */}
      {topBanner?.enable && <TopBanner data={topBanner} />}

      {/* Main Header */}
      <header
        className={`bg-white shadow-md transition-all duration-300 ${
          isSticky ? "sticky top-0 z-50 shadow-lg" : "relative"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                {header?.logo?.asset?.url && (
                  <Image
                    src={header?.logo?.asset?.url}
                    alt={header.logo.alt || "Partner Rentals"}
                    width={150}
                    height={60}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {header?.menu?.map((item, index) => (
                <div key={index} className="relative group">
                  {item.childMenu?.length > 0 ? (
                    <>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors font-medium"
                        onClick={() => toggleDropdown(index)}
                      >
                        <span>{item.parent.label}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${
                          activeDropdown === index.toString()
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        {item.childMenu.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.link}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.parent.link}
                      className="text-gray-700 hover:text-primary transition-colors font-medium"
                    >
                      {item.parent.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              {header?.button && (
                <Link
                  href={header.button.link}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  {header.button.text}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                {header?.menu?.map((item, index) => (
                  <div key={index}>
                    {item.childMenu?.length > 0 ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => toggleDropdown(index)}
                        >
                          <span>{item.parent.label}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === index.toString()
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {activeDropdown === index.toString() && (
                          <div className="ml-4 space-y-1">
                            {item.childMenu.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.link}
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.parent.link}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.parent.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                {header?.button && (
                  <div className="px-4 pt-4">
                    <Link
                      href={header.button.link}
                      className="block w-full bg-primary text-white px-6 py-3 rounded-md text-center hover:bg-primary/90 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {header.button.text}
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
