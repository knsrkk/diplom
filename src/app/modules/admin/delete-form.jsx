"use client";

import { useState } from "react";
import { Button } from "@/app/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import { deleteVehicle } from "./model/vehicle-actions";

const DeleteForm = ({ vehicles }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedVehicleId) return;

    setIsDeleting(true);
    try {
      await deleteVehicle(selectedVehicleId);
      router.refresh();
      setSelectedVehicleId("");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/6 border border-white/10 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Удаление транспорта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-white/80">Выберите транспорт</label>
            <Select
              value={selectedVehicleId}
              onValueChange={setSelectedVehicleId}
            >
              <SelectTrigger className="bg-[#222931] border-white/15 text-white">
                <SelectValue placeholder="Выберите транспорт" />
              </SelectTrigger>
              <SelectContent className="bg-[#222931] border-white/10 text-white">
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDelete}
            disabled={!selectedVehicleId || isDeleting}
            variant="outline"
            className="w-fit"
          >
            {isDeleting ? "Удаление..." : "Удалить транспорт"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteForm;
