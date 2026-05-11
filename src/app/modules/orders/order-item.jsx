import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import React from "react";
import { MapPin, Clock, Phone, Calendar, Truck } from "lucide-react";
import { BiArrowToRight } from "react-icons/bi";

const OrderItem = ({ order }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Ожидание":
        return "bg-yellow-500/20 text-yellow-400";
      case "Подтвержден":
        return "bg-green-500/20 text-green-400";
      case "Отменен":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Card className="bg-[#282A2D] border-none flex flex-col md:flex-row text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-1 h-fit p-6">
        <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-primary" />
            <CardTitle className="text-xl font-semibold text-primary">
              {order.vehicle.name}
            </CardTitle>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(order.applicationDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatTime(order.submissionTime)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center max-w-md gap-2 flex-1">
            <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
            <div className="text-sm truncate">
              <p className="font-medium text-gray-400 text-xs">Откуда</p>
              <p className="text-white text-wrap">{order.loadingAddress}</p>
            </div>
          </div>

          <BiArrowToRight className="w-4 h-4 text-gray-500 flex-shrink-0" />

          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
            <div className="text-sm truncate">
              <p className="font-medium text-gray-400 text-xs">Куда</p>
              <p className="text-white text-wrap">{order.unloadingAddress}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Время аренды</p>
            <p className="font-medium">{order.duration} часов</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Телефон</p>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{order.phone}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="lg:w-48 flex md:flex-col flex-row flex-wrap gap-5 items-center justify-between border-t md:border-t-0 md:border-l border-gray-600">
        <div className="text-center mb-4">
          <p className="text-gray-400 text-sm mb-1">Стоимость</p>
          <p className="text-2xl font-bold text-green-400">
            {formatPrice(order.totalPrice)} ₽
          </p>
        </div>

        {order.cargoDescription && (
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Груз</p>
            <p className="text-sm font-medium max-w-30 break-words text-wrap">
              {order.cargoDescription}
            </p>
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-gray-400 text-xs">ID заказа</p>
          <p className="text-xs text-gray-500 font-mono">
            #{order.id.slice(0, 8)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
