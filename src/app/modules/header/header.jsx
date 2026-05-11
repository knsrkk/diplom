"use client";
import { CustomLink } from "@/app/shared/ui/custom-link";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MenuBar from "../menu/menu";

const Header = () => {
  return (
    <header className="w-full p-3 md:p-5 sticky top-0 z-50">
      <div className="header-wrapper text-white px-4 py-3 md:px-6 md:py-4 mx-auto max-w-[1440px] flex items-center justify-between">
        <Link
          href={"/"}
          className="header-logo logo cursor-pointer text-xl font-bold md:text-2xl flex items-center gap-2 transition-transform duration-300 hover:scale-[1.01]"
        >
          <Image src={"/logo.svg"} alt="logo" width={150} height={50} />
          Перевоз.OFF
        </Link>
        <nav className="hidden  md:block">
          <ul className="flex items-center text-white gap-7">
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-primary transition-all duration-300 after:transition-all after:bottom-[-6px] text-lg text-white/80 hover:text-white"
                }
                href={"/"}
              >
                Главная
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-primary transition-all duration-300 after:transition-all after:bottom-[-6px] text-lg text-white/80 hover:text-white"
                }
                href={"/price"}
              >
                Цены
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-primary transition-all duration-300 after:transition-all after:bottom-[-6px] text-lg text-white/80 hover:text-white"
                }
                href={"/autopark"}
              >
                Автопарк
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-primary transition-all duration-300 after:transition-all after:bottom-[-6px] text-lg text-white/80 hover:text-white"
                }
                href={"/contact"}
              >
                Контакты
              </CustomLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Link href={"/profile"}>
            <FaUser className="transition-all duration-300 hover:scale-110 cursor-pointer size-5 text-white/80 hover:text-white" />
          </Link>
          <div className="block md:hidden mr-4">
            <MenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
