"use client"
import VehicleCard from "@/app/shared/ui/vehicle-card";
import React from "react";

const VehicleList = ({ vehicles }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {vehicles?.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;
