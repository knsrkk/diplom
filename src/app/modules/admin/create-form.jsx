"use client";

import { useForm } from "react-hook-form";
import { vehicleSchema } from "./lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { VehicleType } from "@prisma/client";
import { Textarea } from "@/app/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { useRouter } from "next/navigation";
import { createVehicle } from "./model/vehicle-actions";

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await createVehicle(formData);
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", files, { shouldValidate: true });
    } else {
      setValue("image", null, { shouldValidate: true });
    }
  };

  return (
    <Card className="bg-white/6 max-w-2xl w-full border border-white/10 shadow-xl">
      <CardHeader className="text-white">
        <CardTitle className="text-xl md:text-2xl">
          Добавить новый транспорт
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex space-y-4 flex-col text-white"
        >
          <label className="flex flex-col gap-1">
            <span className={errors.name && "text-destructive"}>Название</span>
            <Input
              {...register("name")}
              className="py-6"
              placeholder="Грузовик Volvo"
            />
            {errors.name && (
              <span className="mt-1 text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className={errors.type && "text-destructive"}>
              Тип транспорта
            </span>
            <Select
              onValueChange={(value) => setValue("type", value)}
              value={watch("type")}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="Выберите тип транспорта" />
              </SelectTrigger>
              <SelectContent className="bg-[#222931] border-white/10 text-white">
                {Object.values(VehicleType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type
                      .split("_")
                      .map(
                        (word) => word.charAt(0) + word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="mt-1 text-sm text-destructive">
                {errors.type.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className={errors.description && "text-destructive"}>
              Описание
            </span>
            <Textarea
              {...register("description")}
              className="py-6 min-h-[100px]"
              placeholder="Описание характеристик транспорта"
            />
            {errors.description && (
              <span className="mt-1 text-sm text-destructive">
                {errors.description.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className={errors.basePrice && "text-destructive"}>
              Базовая цена (₽)
            </span>
            <Input
              {...register("basePrice", { valueAsNumber: true })}
              className="py-6"
              type="number"
              placeholder="10000"
            />
            {errors.basePrice && (
              <span className="mt-1 text-sm text-destructive">
                {errors.basePrice.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className={errors.priceCoefficient && "text-destructive"}>
              Коэффициент цены
            </span>
            <Input
              {...register("priceCoefficient", { valueAsNumber: true })}
              className="py-6"
              type="number"
              step="0.1"
              placeholder="1.0"
            />
            {errors.priceCoefficient && (
              <span className="mt-1 text-sm text-destructive">
                {errors.priceCoefficient.message}
              </span>
            )}
          </label>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col gap-1">
              <span className={errors.length && "text-destructive"}>
                Длина (м)
              </span>
              <Input
                {...register("length", { valueAsNumber: true })}
                className="py-6"
                type="number"
                step="0.1"
                placeholder="5.0"
              />
              {errors.length && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.length.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span className={errors.width && "text-destructive"}>
                Ширина (м)
              </span>
              <Input
                {...register("width", { valueAsNumber: true })}
                className="py-6"
                type="number"
                step="0.1"
                placeholder="2.5"
              />
              {errors.width && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.width.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span className={errors.height && "text-destructive"}>
                Высота (м)
              </span>
              <Input
                {...register("height", { valueAsNumber: true })}
                className="py-6"
                type="number"
                step="0.1"
                placeholder="2.5"
              />
              {errors.height && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.height.message}
                </span>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className={errors.volume && "text-destructive"}>
              Объем (м³)
            </span>
            <Input
              {...register("volume", { valueAsNumber: true })}
              className="py-6"
              type="number"
              step="0.1"
              placeholder="30.0"
            />
            {errors.volume && (
              <span className="mt-1 text-sm text-destructive">
                {errors.volume.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className={errors.image && "text-destructive"}>
              Изображение
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="rounded-xl border border-white/15 bg-[#222931] py-4 px-3 text-white file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#111315]"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-[200px] max-h-[200px] object-contain rounded-lg border border-white/10"
                />
              </div>
            )}
            {errors.image && (
              <span className="mt-1 text-sm text-destructive">
                {errors.image.message}
              </span>
            )}
          </label>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer mt-6"
          >
            {isSubmitting ? "Создание..." : "Создать транспорт"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateForm;
