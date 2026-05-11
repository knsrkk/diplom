import { z } from "zod";

export const orderSchema = z.object({
  vehicleId: z.string().min(1, "Выберите транспорт"),
  pickupAddress: z.string().min(1, "Укажите адрес погрузки"),
  deliveryAddress: z.string().min(1, "Укажите адрес выгрузки"),
  phone: z
    .number("Телефон должен быть числом")
    .min(1, "Укажите номер телефона"),
  description: z.string().optional(),
  hours: z
    .number("Время должно быть числом")
    .min(1, "Минимум 1 час")
    .max(24, "Максимум 24 часа"),
  deliveryTime: z.string().min(1, "Укажите время подачи"),
  date: z.date({ required_error: "Выберите дату" }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "Необходимо согласие с условиями"),
});
