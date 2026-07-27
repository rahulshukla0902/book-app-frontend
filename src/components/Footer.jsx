import React from "react";
import footerLogo from "../assets/footer-logo.png";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4 text-gray-300 leading-7">
            Subscribe to our newsletter to receive the latest updates, news, and
            offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-lg border border-white/10 bg-white/10 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button className="btn-primary rounded-r-lg px-6">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
