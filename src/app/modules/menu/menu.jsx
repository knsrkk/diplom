"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/app/shared/ui/sheet";
import Image from "next/image";

const MenuBar = () => {
  return (
    <Sheet className="dark">
      <SheetTrigger asChild className="cursor-pointer">
        <Menu className="size-6 text-white/85 hover:text-white transition-colors duration-300" />
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto border-white/20 bg-slate-950/95 backdrop-blur-xl">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href={"/"}
                className="header-logo text-white cursor-pointer text-xl w-fit font-black flex items-center gap-2"
              >
                <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
                Перевоз.OFF
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start px-4">
          <ul className="font-semibold text-white text-lg flex flex-col gap-5">
            <li>
              <SheetClose asChild>
                <Link className="text-white/80 hover:text-white transition-colors duration-300" href={"/"}>Главная</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link className="text-white/80 hover:text-white transition-colors duration-300" href={"/price"}>Цены</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link className="text-white/80 hover:text-white transition-colors duration-300" href={"/autopark"}>Автопарк</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link className="text-white/80 hover:text-white transition-colors duration-300" href={"/contact"}>Контакты</Link>
              </SheetClose>
            </li>
          </ul>
        </div>
        <SheetFooter className="text-end">
          <a className="font-bold text-lg text-white" href="tel:+79145843423">
            + 7 (914) 584-34-23
          </a>
          <span className="text-xs text-primary font-bold">Круглосуточно</span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuBar;
