"use client";

import React from "react";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../common/SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Partner<span className="text-orange-500">Rentals</span>
            </div>
            <p className="text-gray-300 mb-4">
              Reliable equipment rentals and responsive local service since
              2016. We keep your projects moving safely, quickly, and on budget.
            </p>
            <div className="flex space-x-4">
              <FacebookIcon cls="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <InstagramIcon cls="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <TwitterIcon cls="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Equipment Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Equipment</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/aerial-equipment"
                  className="hover:text-white transition-colors"
                >
                  Aerial Equipment
                </a>
              </li>
              <li>
                <a
                  href="/earthmoving"
                  className="hover:text-white transition-colors"
                >
                  Earthmoving
                </a>
              </li>
              <li>
                <a
                  href="/concrete-tools"
                  className="hover:text-white transition-colors"
                >
                  Concrete Tools
                </a>
              </li>
              <li>
                <a
                  href="/power-tools"
                  className="hover:text-white transition-colors"
                >
                  Power Tools
                </a>
              </li>
              <li>
                <a
                  href="/generators"
                  className="hover:text-white transition-colors"
                >
                  Generators
                </a>
              </li>
              <li>
                <a
                  href="/compressors"
                  className="hover:text-white transition-colors"
                >
                  Compressors
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/delivery"
                  className="hover:text-white transition-colors"
                >
                  Delivery Service
                </a>
              </li>
              <li>
                <a
                  href="/maintenance"
                  className="hover:text-white transition-colors"
                >
                  Equipment Maintenance
                </a>
              </li>
              <li>
                <a
                  href="/training"
                  className="hover:text-white transition-colors"
                >
                  Operator Training
                </a>
              </li>
              <li>
                <a
                  href="/consulting"
                  className="hover:text-white transition-colors"
                >
                  Project Consulting
                </a>
              </li>
              <li>
                <a href="/quote" className="hover:text-white transition-colors">
                  Get Quote
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <PhoneIcon cls="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>(845) 555-0123</p>
                  <p className="text-sm text-gray-400">Mon-Fri 7AM-6PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MailIcon cls="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>info@partnerrentals.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon cls="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Serving NY Hudson Valley</p>
                  <p>& Northeast Pennsylvania</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Partner Rentals. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/sitemap"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
