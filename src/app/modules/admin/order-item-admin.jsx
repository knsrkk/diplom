"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import React, { useState } from "react";
import { MapPin, Clock, Phone, Calendar, Truck, User } from "lucide-react";
import { BiArrowToRight } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "./model/order-actions";

const statusOptions = [
  "Ожидание",
  "Подтвержден",
  "В процессе",
  "Завершен",
  "Отменен",
];

const OrderItemAdmin = ({ order }) => {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="bg-white/6 border border-white/10 flex flex-col md:flex-row text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-1 h-fit p-6">
        <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-xl font-semibold text-primary">
                {order.vehicle.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4 text-white/45" />
                <span className="text-sm text-white/70">
                  {order.user?.name || "Не указано"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Select
              value={order.status}
              onValueChange={handleStatusChange}
              disabled={updating}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs bg-[#222931] border-white/15">
                <SelectValue placeholder="Изменить статус" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(order.applicationDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatTime(order.submissionTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{order.phone}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center max-w-md gap-2 flex-1">
            <MapPin className="w-4 h-4 text-[#D9A41A] flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-white/45 text-xs">Откуда</p>
              <p className="text-white text-wrap">{order.loadingAddress}</p>
            </div>
          </div>

          <BiArrowToRight className="w-4 h-4 text-white/40 flex-shrink-0" />

          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-4 h-4 text-[#D9A41A] flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-white/45 text-xs">Куда</p>
              <p className="text-white text-wrap">{order.unloadingAddress}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div>
            <p className="text-white/45 text-xs">Время аренды</p>
            <p className="font-medium">{order.duration} часов</p>
          </div>
          <div>
            <p className="text-white/45 text-xs">ID пользователя</p>
            <p className="text-xs text-white/40 font-mono">
              #{order.userId?.slice(0, 8) || "N/A"}
            </p>
          </div>
          {order.user?.email && (
            <div>
              <p className="text-white/45 text-xs">Email</p>
              <p className="text-sm text-white/65 max-w-40 break-words text-wrap">
                {order.user?.email}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="lg:w-48 flex md:flex-col flex-row flex-wrap gap-5 items-center justify-between p-6 border-t md:border-t-0 md:border-l border-white/15">
        <div className="text-center mb-4">
          <p className="text-white/45 text-sm mb-1">Стоимость</p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(order.totalPrice)} ₽
          </p>
        </div>

        {order.cargoDescription && (
          <div className="text-center">
            <p className="text-white/45 text-sm mb-1">Груз</p>
            <p className="text-sm font-medium max-w-30 break-words text-wrap">
              {order.cargoDescription}
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-white/45 text-xs">ID заказа</p>
          <p className="text-xs text-white/40 font-mono">
            #{order.id.slice(0, 8)}
          </p>
          <p className="text-white/45 text-xs mt-1">Создан</p>
          <p className="text-xs text-white/40">
            {new Date(order.createdAt).toLocaleDateString("ru-RU")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemAdmin;
