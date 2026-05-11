"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/ui/dialog";
import { Button } from "@/app/shared/ui/button";
import { Input } from "@/app/shared/ui/input";
import { Calendar } from "@/app/shared/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { Textarea } from "@/app/shared/ui/textarea";
import { Checkbox } from "@/app/shared/ui/checkbox";
import { Label } from "@/app/shared/ui//label";
import { CalendarIcon, ChevronDownIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/shared/ui/popover";
import { CldImage } from "next-cloudinary";

import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema } from "./lib/schema";
import { calculatePrice } from "./lib/calculate-price";
import { createOrder } from "./model/create-order";
import { useRouter } from "next/navigation";

const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
});

const OrderModal = ({
  isOpen,
  onClose,
  vehicle,
  hours: initialHours,
  price: initialPrice,
  vehicles,
  isCustomHour = false,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicle.id);
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  const [currentAddressField, setCurrentAddressField] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(initialPrice || 0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      vehicleId: vehicle.id,
      pickupAddress: "",
      deliveryAddress: "",
      phone: "",
      description: "",
      hours: initialHours || 1,
      deliveryTime: "",
      date: new Date(),
      agreeToTerms: false,
    },
  });
  const router = useRouter();

  const watchedAgreeToTerms = watch("agreeToTerms");
  const watchedHours = watch("hours");
  const watchedVehicleId = watch("vehicleId");

  const handleAddressSelect = (address) => {
    if (currentAddressField === "pickup") {
      setPickupAddress(address);
      setValue("pickupAddress", address, { shouldValidate: true });
    } else if (currentAddressField === "delivery") {
      setDeliveryAddress(address);
      setValue("deliveryAddress", address, { shouldValidate: true });
    }
    setMapOpen(false);
    setCurrentAddressField(null);
  };

  const openMapForAddress = (field) => {
    setCurrentAddressField(field);
    setMapOpen(true);
  };

  useEffect(() => {
    if (watchedHours && watchedVehicleId) {
      const price = calculatePrice(
        watchedHours,
        watchedVehicleId,
        vehicles,
        vehicle
      );
      setCalculatedPrice(price);
    }
  }, [watchedHours, watchedVehicleId, vehicles]);

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        calculatedPrice,
      };
      await createOrder(formData);
      router.refresh();
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          reset();
          onClose();
        }}
      >
        <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto text-white border-white/20 bg-slate-950/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-wide">Оформление заказа</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between w-full">
              <Label className="flex-col w-full items-start">
                <span className={errors.pickupAddress && "text-destructive"}>
                  Адрес погрузки
                </span>
                <div className="relative w-full">
                  <Input
                    className="py-6 pr-12"
                    placeholder="Выберите на карте"
                    value={pickupAddress}
                    {...register("pickupAddress")}
                    readOnly
                  />
                  <Button
                    type="button"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 text-white/70 hover:text-white"
                    variant="ghost"
                    onClick={() => openMapForAddress("pickup")}
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </Button>
                </div>
                {errors.pickupAddress && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.pickupAddress.message}
                  </span>
                )}
              </Label>

              <Label className="flex-col w-full items-start">
                <span className={errors.deliveryAddress && "text-destructive"}>
                  Адрес выгрузки
                </span>
                <div className="relative w-full">
                  <Input
                    className="py-6 w-full pr-12"
                    placeholder="Выберите на карте"
                    value={deliveryAddress}
                    {...register("deliveryAddress")}
                    readOnly
                  />
                  <Button
                    type="button"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 text-white/70 hover:text-white"
                    variant="ghost"
                    onClick={() => openMapForAddress("delivery")}
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </Button>
                </div>
                {errors.deliveryAddress && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.deliveryAddress.message}
                  </span>
                )}
              </Label>
            </div>

            <Label className="flex-col w-full items-start">
              <span>Выберите транспорт</span>
              <Select
                className="w-full h-auto"
                value={watchedVehicleId}
                onValueChange={(value) => {
                  setSelectedVehicle(value);
                  setValue("vehicleId", value);
                }}
              >
                <SelectTrigger className="w-full h-auto py-6">
                  <SelectValue placeholder="Выберите транспорт" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      <div className="flex items-center gap-2">
                        <CldImage
                          src={`${v.image}`}
                          alt={v.name}
                          width={50}
                          height={50}
                        />
                        <span className="font-medium">{v.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleId && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.vehicleId.message}
                </span>
              )}
            </Label>

            <Label className="flex-col items-start">
              <span className={errors.phone && "text-destructive"}>
                Номер телефона
              </span>
              <Input
                className="py-6"
                type="tel"
                placeholder="7 (395) 278-70-00"
                {...register("phone", { valueAsNumber: true })}
              />
              {errors.phone && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.phone.message}
                </span>
              )}
            </Label>

            <Label className="flex-col items-start">
              <span className={errors.description && "text-destructive"}>
                Описание груза
              </span>
              <Textarea
                className="py-6 max-h-30"
                placeholder="Описание"
                {...register("agreeToTerms")}
                type="text"
                {...register("description")}
              />
              {errors.description && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.description.message}
                </span>
              )}
            </Label>

            <Label className="flex-col items-start">
              <span className={errors.hours && "text-destructive"}>
                Время аренды ч
              </span>
              <Input
                className="py-6"
                placeholder="3 ч"
                type="number"
                max={24}
                defaultValue={initialHours}
                {...register("hours", { valueAsNumber: true })}
              />
              {errors.hours && (
                <span className="mt-1 text-sm text-destructive">
                  {errors.hours.message}
                </span>
              )}
            </Label>

            <div className="flex flex-col md:flex-row items-center gap-5 justify-between w-full">
              <Label className="flex-col relative w-full items-start">
                <span className={errors.deliveryTime && "text-destructive"}>
                  Время подачи
                </span>
                <Input
                  className="py-6 text-center"
                  type="time"
                  {...register("deliveryTime")}
                />
                {errors.deliveryTime && (
                  <span className="mt-1 text-sm text-destructive absolute -bottom-7">
                    {errors.deliveryTime.message}
                  </span>
                )}
              </Label>
              <Label className="flex-col mt-5 md:mt-0 w-full items-start">
                <span>Выберете дату</span>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="py-6 w-full"
                    >
                      <CalendarIcon />
                      {date
                        ? format(date, "PPP", { locale: ru })
                        : "Выберете дату"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 pointer-events-auto rounded-xl border-white/15 bg-slate-900"
                    align="start"
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                          setValue("date", selectedDate);
                          setOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </Label>
            </div>

            <Button
              disabled={isSubmitting}
              className="cursor-pointer w-full mt-5"
              type="submit"
            >
              {isSubmitting
                ? "Отправка..."
                : `Оформить заказ за ${calculatedPrice}₽`}
            </Button>

            <Label className="flex items-start space-x-2">
              <Checkbox
                {...register("agreeToTerms")}
                checked={watchedAgreeToTerms}
                onCheckedChange={(checked) => {
                  setValue("agreeToTerms", checked, { shouldValidate: true });
                }}
              />
              <p className="text-sm">
                Отправляя заявку, даю согласие на обработку персональных данных,
                в соответствии с Политикой обработки персональных данных и
                Пользовательским соглашением, ознакомление с текстом которых
                подтверждаю
              </p>
            </Label>
            {errors.agreeToTerms && (
              <div className="mt-1 text-sm text-destructive">
                {errors.agreeToTerms.message}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="sm:max-w-[800px] h-[50vh] flex flex-col border-white/20 bg-slate-950/95 backdrop-blur-xl">
          <DialogHeader className="h-fit">
            <DialogTitle className="text-white">
              Выберите{" "}
              {currentAddressField === "pickup"
                ? "адрес погрузки"
                : "адрес выгрузки"}{" "}
              на карте
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            <MapPicker onAddressSelect={handleAddressSelect} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderModal;
