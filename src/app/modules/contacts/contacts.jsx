"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import dynamic from "next/dynamic";
import React from "react";
const ContactsMap = dynamic(() => import("./contacts-map"), {
  ssr: false,
});

const Contacts = () => {
  return (
    <section>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white">
        Контакты
      </h1>
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex flex-col space-y-6 max-w-xl w-full">
          <Card className="bg-[#282A2D] max-w-xl w-full text-white border-none">
            <CardHeader>
              <CardTitle className="font-bold text-lg md:text-2xl">
                Корпоративным клиентам
              </CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
              <p className="text-base md:text-xl">chita@perevozoff.ru</p>
              <p className="text-primary text-sm md:text-base">
                для юридических лиц
              </p>
            </CardContent>
            <CardFooter className="font-bold flex flex-col items-start">
              <p className="text-base md:text-xl">+7 (395) 278-70-00</p>
              <p className="text-primary text-sm md:text-base">с 9 до 18</p>
            </CardFooter>
          </Card>
          <Card className="bg-[#282A2D] max-w-xl w-full text-white border-none">
            <CardHeader>
              <CardTitle className="font-bold text-lg md:text-2xl">
                Служба клиентского сервиса
              </CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
              <p className="text-base md:text-xl">help@perevozoff.ru</p>
              <p className="text-primary text-sm md:text-base">
                для физических лиц
              </p>
            </CardContent>
            <CardFooter className="font-bold flex flex-col items-start">
              <p className="text-base md:text-xl">+7 (395) 278-70-00</p>
              <p className="text-primary text-sm md:text-base">с 9 до 18</p>
            </CardFooter>
          </Card>
          <Card className="bg-[#282A2D] max-w-xl w-full text-white border-none">
            <CardHeader>
              <CardTitle className="font-bold text-lg md:text-2xl">
                Работа в «Перевоз.off»
              </CardTitle>
            </CardHeader>
            <CardFooter className="font-bold flex flex-col items-start">
              <p className="text-base md:text-xl">+7 (395) 278-70-00</p>
              <p className="text-primary text-sm md:text-base">с 9 до 18</p>
            </CardFooter>
          </Card>
        </div>
        <ContactsMap />
      </div>
    </section>
  );
};

export default Contacts;
