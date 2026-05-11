import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  type: z.string("Тип обязателен").min(1),
  description: z.string().min(1, "Описание обязательно"),
  basePrice: z
    .number("Цена должнеа быть числом")
    .min(0, "Цена должна быть положительной"),
  priceCoefficient: z
    .number("Коэффициент должнеа быть числом")
    .min(0.1, "Коэффициент должен быть не менее 0.1"),
  length: z
    .number("Длина должна быть числом")
    .min(0, "Длина должна быть положительной"),
  width: z
    .number("Ширина должна быть числом")
    .min(0, "Ширина должна быть положительной"),
  height: z
    .number("Высота должна быть числом")
    .min(0, "Высота должна быть положительной"),
  volume: z
    .number("Объем должна быть числом")
    .min(0, "Объем должен быть положительным"),
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Изображение обязательно"
    )

    .refine(
      (files) => files instanceof FileList && files[0]?.size <= 5_000_000,
      "Максимальный размер файла 5MB"
    )
    .optional(),
});
