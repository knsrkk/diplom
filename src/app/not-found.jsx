import React from "react";
import { CustomLink } from "./shared/ui/custom-link";

const NotFound = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5 h-screen flex items-center justify-center">
      <section className="flex flex-col items-center space-y-5">
        <h1 className="text-5xl md:text-8xl font-black text-primary">404</h1>
        <p className="text-white text-2xl md:text-4xl">Упс...</p>
        <p className="text-white text-2xl md:text-4xl">Страница не найдена :(</p>
        <CustomLink href={"/"}>На главную</CustomLink>
      </section>
    </main>
  );
};

export default NotFound;
