"use client";
import { signUpSchema } from "@/app/shared/prisma/lib/schema";
import { Button } from "@/app/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import { Input } from "@/app/shared/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { onSubmit } from "@/app/shared/prisma/lib/submit-register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmiting = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="max-w-2xl w-full border border-white/15 bg-white/6 backdrop-blur-xl shadow-2xl">
      <CardHeader className="text-white">
        <CardTitle className="text-xl md:text-3xl">
          Добро пожаловать, давайте создадим учетную запись
        </CardTitle>
        <CardDescription className="text-white/75 text-base">
          Создайте учетную запись, чтобы отслеживать свои заказы.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmiting)}
          className="flex space-y-6 flex-col text-white"
        >
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-between w-full">
            <label className="flex flex-col gap-1 md:max-w-72 w-full">
              <span className={errors.name && "text-destructive"}>Имя</span>
              <Input
                {...register("name")}
                className="py-6"
                placeholder="Иван"
                type="text"
              />
              {errors.name && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-1 md:max-w-72 w-full">
              <span className={errors.surname && "text-destructive"}>
                Фамилия
              </span>
              <Input
                {...register("surname")}
                className="py-6"
                placeholder="Иванов"
                type="text"
              />
              {errors.surname && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.surname.message}
                </span>
              )}
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className={errors.email && "text-destructive"}>Email</span>
            <Input
              {...register("email", { required: "Email обязателен" })}
              className="py-6"
              placeholder="example@mail.ru"
              type="email"
            />
            {errors.email && (
              <span className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-1">
            <span className={errors.password && "text-destructive"}>
              Пароль
            </span>
            <Input
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов",
                },
              })}
              className="py-6"
              placeholder="**********"
              type="password"
            />
            {errors.password && (
              <span className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </span>
            )}
          </label>
          <p className="text-white/85 leading-relaxed">
            Продолжая, вы соглашаетесь с условиями предоставления услуг{" "}
            <b className="font-bold text-primary">Перевоз.offs</b> и{" "}
            <strong className="font-bold text-primary">
              политикой конфиденциальности.
            </strong>
          </p>
          <div className="flex flex-col items-end gap-2 mt-5">
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
            <p className="text-end">
              Вы уже зарегистрированы?{" "}
              <Link className="text-primary font-bold" href="/auth/sign-in">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
