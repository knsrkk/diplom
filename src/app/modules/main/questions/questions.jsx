import { Button } from "@/app/shared/ui/button";
import CustomSubTitle from "@/app/shared/ui/custom-sub-title";
import { Input } from "@/app/shared/ui/input";
import React from "react";

const Questions = () => {
  return (
    <section className="px-5 py-16 text-white mt-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm space-y-6">
      <CustomSubTitle text={"ОСТАЛИСЬ ВОПРОСЫ?"} />
      <p className="mt-5 text-white/90">
        Оставьте свои контактные данные, и мы презвоним вам в ближайшее время
      </p>
      <form className="flex flex-wrap items-end gap-3 mt-5">
        <label className="flex flex-col max-w-80 w-full">
          <span className="text-white/80 mb-1">Имя</span>
          <Input className="w-full py-6" placeholder="Иван Иванов" />
        </label>
        <label className="flex flex-col max-w-80 w-full">
          <span className="text-white/80 mb-1">Номер телефона</span>
          <Input className="w-full py-6" placeholder="+7 (xxx) xxx-xx-xx" />
        </label>
        <Button className="cursor-pointer px-10 py-6">Отправить</Button>
      </form>
      <p className="text-sm text-white/60">
        Нажимая на кнопку отправить Вы соглашаетесь на обработку Ваших
        персональных данных компание ООО «Перевоз.off»
      </p>
    </section>
  );
};

export default Questions;
