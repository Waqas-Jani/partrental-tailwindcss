/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import MyLink from "@/components/common/Link";
import { Footer as FooterType } from "@/types/siteSettings";
import {
  MailIcon,
  MapPinIcon,
  ChevronRightIcon,
  CalendarIcon,
  CircleArrowRightIcon,
} from "@/components/common/SocialIcons";
import RenderSocial from "@/components/common/RenderSocial";
import Newsletter from "@/components/forms/Newsletter";
import Link from "next/link";

interface FooterProps {
  footer?: FooterType;
  posts?: any[];
}

export default function Footer({ footer, posts }: FooterProps) {
  return (
    <footer className="bg-black text-primary-gray pb-8">
      <div className="tp-container">
        {/* Logo & Location */}
        <div className="flex lg:flex-row flex-col justify-between border-b border-gray-800 border-l border-r">
          {/* Logo */}
          <div className="w-full p-16">
            {footer?.logo?.asset?.url && (
              <Image
                src={footer?.logo?.asset?.url}
                alt={footer.logo.alt || "Partner Rentals"}
                width={200}
                height={60}
                className="h-12 w-auto mb-4"
              />
            )}
          </div>
          {/* Location */}
          <div className="flex gap-3 p-16 lg:p-0 items-center lg:border-r border-gray-800 pr-10 border-b lg:border-b-0 border-t lg:border-t-0 lg:border-l w-full justify-start lg:justify-center">
            <div className=" rounded-full flex justify-center items-center h-14 w-14 bg-primary p-2 text-white">
              <MapPinIcon cls="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-black mb-1">Locations</h3>
              {footer?.location && footer.location.length > 0 && (
                <div>
                  {footer.location.map((location, index) => (
                    <p className="font-semibold text-base mb-1" key={index}>
                      {location.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="flex gap-3 items-center w-full justify-start lg:justify-center p-16 lg:p-0">
            <div className="rounded-full flex justify-center items-center h-14 w-14 bg-primary p-2 text-white">
              <MailIcon cls="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-black mb-1">Email Us</h3>
              {footer?.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="font-semibold text-base mb-1"
                >
                  {footer.email}
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Company Info & Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Contact Info & Recent Posts */}
          <div>
            <h3 className="h4-type mb-5">About Us</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-base">
              {footer?.about}
            </p>

            {/* Address */}
            {footer?.businessAddress && (
              <div className="mb-4">
                <h4 className="h4-type mb-3">Address</h4>
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre">
                  {footer.businessAddress}
                </p>
              </div>
            )}

            {/* Business Hours */}
            {footer?.businessHours && (
              <div className="mb-4">
                <h4 className="h4-type mb-3">Business Hours</h4>
                <p className="text-gray-300 text-base whitespace-pre">
                  {footer.businessHours}
                </p>
              </div>
            )}

            {/* Follow On */}
            {footer?.social && footer.social.length > 0 && (
              <div>
                <h4 className="h4-type mb-3">Follow On</h4>
                <div className="flex space-x-3">
                  {footer.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="text-gray-400 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={"social media"}
                    >
                      <span className="text-lg">
                        <RenderSocial icon={social.icon} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="h4-type mb-5">Services</h3>
            <div className="flex flex-row gap-5">
              <ul className="space-y-3 text-gray-300 mb-3">
                {footer?.menu &&
                  footer.menu.length > 0 &&
                  footer.menu.slice(0, 7).map((service: any, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRightIcon cls="h-4 w-4" />
                      <MyLink
                        text={service.label}
                        linkType={service?.linkType || "internal"}
                        link={service?.link}
                        cls="hover:text-primary transition-colors block text-base"
                      />
                    </li>
                  ))}
              </ul>
              <ul className="space-y-3 text-gray-300">
                {footer?.menu &&
                  footer.menu.length > 7 &&
                  footer.menu.slice(7).map((service: any, index: number) => (
                    <li key={index} className="flex items-center gap-x-2">
                      <ChevronRightIcon cls="h-4 w-4" />
                      <MyLink
                        text={service.label}
                        linkType={service?.linkType || "internal"}
                        link={service?.link}
                        cls="hover:text-primary transition-colors block text-base"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Posts */}
          <div>
            <h3 className="h4-type mb-5">Recent News</h3>
            <div className="flex flex-row gap-5 mb-8">
              <ul className="space-y-3 text-gray-300 mb-3">
                {posts &&
                  posts.length > 0 &&
                  posts.map((blog: any, index: number) => (
                    <li className="flex flex-row gap-x-2" key={index}>
                      <Image
                        width={100}
                        height={100}
                        src={blog.featuredImage?.asset?.url || ""}
                        alt="Post Image"
                        className="object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="font-bold text-sm sm:text-lg mb-2 text-primary-gray">
                          <MyLink
                            text={blog.title || ""}
                            linkType={blog?.linkType || "internal"}
                            link={blog?.link || ""}
                            cls="hover:text-primary transition-colors block text-base"
                          />
                        </h3>
                        <span className="flex items-center gap-x-2 text-white">
                          <CalendarIcon cls="h-4 w-4" />
                          <a className="font-bold text-sm sm:text-base">
                            {" "}
                            {dayjs(blog?.publishedAt || "").format(
                              "DD MMMM YYYY"
                            )}{" "}
                          </a>
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <Link
              href="/blog"
              className="text-primary text-lg mt-5 md:mt-8 flex items-center gap-2 underline underline-offset-4 ml-1"
            >
              <span>View More News</span> <CircleArrowRightIcon cls="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        {footer?.newsletter && footer?.newsletter.enable && (
          <Newsletter data={footer.newsletter} />
        )}

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center items-center text-primary-gray">
            <a href="https://www.civsav.com" target={"_blank"}>
              <p>© 2025 Civilized Savage. All Rights Reserved</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
