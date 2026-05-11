"use client";
import { signInSchema } from "@/app/shared/prisma/lib/schema";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onSubmit } from "@/app/shared/prisma/lib/submit-login";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
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
          Добро пожаловать, введите свои данные
        </CardTitle>
        <CardDescription className="text-white/75 text-base">
          Войдите в учетную запись, чтобы продолжить пользование.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmiting)}
          className="flex space-y-6 flex-col text-white"
        >
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
            <span className={errors.email && "text-destructive"}>Пароль</span>
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
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? "Вход..." : "Войти"}
            </Button>
            <p className="text-end">
              Нет аккаунта?{" "}
              <Link className="text-primary font-bold" href="/auth/sign-up">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
