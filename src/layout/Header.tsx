"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TopBanner as TopBannerType,
  Header as HeaderType,
} from "@/types/siteSettings";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
} from "@/components/common/SocialIcons";
import TopBanner from "./Topbar";
import Button from "@/components/common/Button";

interface Props {
  topBanner: TopBannerType | null;
  header: HeaderType | null;
}

export default function Header({ topBanner, header }: Props) {
  const isSticky = useStickyHeader(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown(
      activeDropdown === index.toString() ? null : index.toString()
    );
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element;
        if (!target.closest(".mobile-menu-container")) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
            <div className="">
              <Link href="/">
                {header?.logo?.asset?.url && (
                  <Image
                    src={header?.logo?.asset?.url}
                    alt={header.logo.alt || "Partner Rentals"}
                    width={150}
                    height={60}
                    className="h-auto w-[200px] object-contain"
                    priority
                  />
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {header?.menu?.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredDropdown(index.toString())}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  {item.childMenu?.length > 0 ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 transition-colors font-medium ${
                          hoveredDropdown === index.toString() ||
                          activeDropdown === index.toString()
                            ? "text-red-600"
                            : "text-gray-700 hover:text-red-600"
                        }`}
                        onClick={() => toggleDropdown(index)}
                      >
                        <span>{item.parent.label}</span>
                        <ChevronDownIcon
                          cls={`w-4 h-4 transition-transform ${
                            hoveredDropdown === index.toString() ||
                            activeDropdown === index.toString()
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transition-all duration-300 ease-in-out ${
                          hoveredDropdown === index.toString() ||
                          activeDropdown === index.toString()
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }`}
                      >
                        {item.childMenu.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.link}
                            className="block px-4 py-3 text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-200 font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.parent.link}
                      className="text-gray-700 hover:text-red-600 transition-colors font-medium"
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
                <Button
                  title={header.button.title}
                  btnType={header.button?.btnType || "primary"}
                  link={header.button.link || ""}
                  linkType={header.button.linkType || "internal"}
                  disabled={false}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-red-600 transition-colors relative z-50"
              onClick={toggleMobileMenu}
            >
              <div className="relative w-6 h-6">
                <MenuIcon
                  cls={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-180"
                      : "opacity-100 rotate-0"
                  }`}
                />
                <XIcon
                  cls={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-180"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden mobile-menu-container transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {header?.logo?.asset?.url && (
                  <Image
                    src={header.logo.asset.url}
                    alt={header.logo.alt || "Partner Rentals"}
                    width={200}
                    height={50}
                    className="h-auto w-[200px] object-contain"
                  />
                )}
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-6">
                {header?.menu?.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    {item.childMenu?.length > 0 ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full py-3 text-left text-gray-800 hover:text-red-600 transition-colors font-medium"
                          onClick={() => toggleDropdown(index)}
                        >
                          <span className="text-lg">{item.parent.label}</span>
                          <ChevronDownIcon
                            cls={`w-5 h-5 transition-transform duration-200 ${
                              activeDropdown === index.toString()
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            activeDropdown === index.toString()
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-4 space-y-1 pt-2">
                            {item.childMenu.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.link}
                                className="flex items-center justify-between py-2 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-all duration-200 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span>{child.label}</span>
                                <ArrowRightIcon cls="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.parent.link}
                        className="flex items-center justify-between py-3 text-gray-800 hover:text-red-600 transition-colors font-medium group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">{item.parent.label}</span>
                        <ArrowRightIcon cls="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Sidebar Footer */}
            {header?.button && (
              <div className="p-6 border-t border-gray-200">
                <Button
                  title={header.button.title}
                  btnType={header.button?.btnType || "primary"}
                  link={header.button.link || ""}
                  linkType={header.button.linkType || "internal"}
                  disabled={false}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
