import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900  text-white  w-full ">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* Center Text */}
        <div className="text-sm text-gray-300 flex items-center gap-2">
          Securing passwords with
          <FaHeart className="text-purple-500" />
          by Aakash
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;