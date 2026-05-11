"use client";
import { Separator } from "@/app/shared/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white px-3 md:px-5 pb-6">
      <div className="footer-wrapper max-w-[1440px] p-5 md:p-6 mx-auto">
        <div className="footer-top-section flex flex-wrap gap-4 items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="header-logo logo cursor-pointer text-xl font-bold md:text-2xl flex items-center gap-2 transition-transform duration-300 hover:scale-[1.01]"
          >
            <Image src={"/logo.svg"} alt="logo" width={150} height={50} />
            Перевоз.OFF
          </div>
          <p className="text-sm text-white/70">perevoz.off@2025. Все права защищены</p>
          <nav className="flex items-center gap-3">
            <Link
              className="transition-all duration-300 hover:scale-110 text-white/75 hover:text-white"
              href={"https://youtube.com"}
            >
              <FaYoutube />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110 text-white/75 hover:text-white"
              href={"https://facebook.com"}
            >
              <FaFacebook />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110 text-white/75 hover:text-white"
              href={"https://x.com"}
            >
              <FaTwitter />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110 text-white/75 hover:text-white"
              href={"https://instagram.com"}
            >
              <FaInstagram />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110 text-white/75 hover:text-white"
              href={"https://linkedin.com"}
            >
              <FaLinkedin />
            </Link>
          </nav>
        </div>
        <Separator className="opacity-20 my-5" />
        <div className="footer-bottom-section">
          <p className="text-xs text-right text-white/65">
            Информация на сайте не является публичной офертой
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
