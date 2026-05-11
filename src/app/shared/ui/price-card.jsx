"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { CldImage } from "next-cloudinary";
import { Button } from "./button";
import { Info, Truck, Clock, Ruler, Box } from "lucide-react";
import OrderModal from "@/app/modules/order-modal/order-modal";

const PriceCard = ({ vehicle, allVehicles }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    hours: 1,
    price: 0,
    isCustomHour: false,
  });

  const calculatePrice = (hours) => {
    if (vehicle.type === "TANKER") return vehicle.basePrice;
    if (hours === 1) return vehicle.basePrice;
    if (hours === 2) return Math.round(vehicle.basePrice * 1.8);
    if (hours === 3) return Math.round(vehicle.basePrice * 2.5);
    return Math.round(vehicle.basePrice * vehicle.priceCoefficient);
  };

  const handleOrderClick = (hours) => {
    setModalState({
      isOpen: true,
      hours,
      price: calculatePrice(hours),
    });
  };

  const handleCloseModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  return (
    <>
      <Card className="bg-white/6 border border-white/10 text-white w-full md:flex-row hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
        <CardHeader className="max-w-xs w-full">
          <CardTitle className="text-xl font-bold mb-2">
            {vehicle.name}
          </CardTitle>
          <div className="flex flex-wrap gap-3 text-sm text-white/70 mb-4">
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-1" />
              {vehicle.length}x{vehicle.width}x{vehicle.height} м
            </div>
            <div className="flex items-center">
              <Box className="h-4 w-4 mr-1" />
              {vehicle.volume} м³
            </div>
            {vehicle.type !== "TANKER" && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {vehicle.priceCoefficient}x час
              </div>
            )}
          </div>
          <div className="relative w-full group overflow-hidden rounded-lg">
            <CldImage
              src={`${vehicle.image}`}
              alt={vehicle.name}
              width={300}
              height={300}
              className="object-cover transition-transform duration-300 scale-90 group-hover:scale-95"
            />
            <div className="absolute inset-0 bg-black/30 opacity-60 transition-opacity" />
          </div>
        </CardHeader>

        <CardContent>
          {vehicle.description && (
            <div className="flex items-start mb-4 p-3 bg-black/20 border border-white/10 rounded-lg">
              <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-white/75">{vehicle.description}</p>
            </div>
          )}
          <div className="space-y-3">
            {vehicle.type === "TANKER" ? (
              <div className="text-center">
                <p className="text-sm text-white/60 mb-2">
                  Грузоперевозки любой сложности
                </p>
                <Button
                  className="w-full cursor-pointer py-6 text-lg"
                  onClick={() => handleOrderClick(1)}
                >
                  <Truck className="size-7 mr-2" />
                  От {calculatePrice(1)}₽
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-center text-white/60 mb-1">
                  Выберите время аренды:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleOrderClick(1)}
                  >
                    1 час
                    <br />
                    <span className="font-bold">{calculatePrice(1)}₽</span>
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleOrderClick(2)}
                  >
                    2 часа
                    <br />
                    <span className="font-bold">{calculatePrice(2)}₽</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleOrderClick(3)}
                  >
                    3 часа
                    <br />
                    <span className="font-bold">{calculatePrice(3)}₽</span>
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleOrderClick(4)}
                  >
                    Доп. час
                    <br />
                    <span className="font-bold">{calculatePrice(4)}₽</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <OrderModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        vehicle={vehicle}
        hours={modalState.isCustomHour ? null : modalState.hours}
        price={modalState.isCustomHour ? null : modalState.price}
        vehicles={allVehicles}
      />
    </>
  );
};

export default PriceCard;
