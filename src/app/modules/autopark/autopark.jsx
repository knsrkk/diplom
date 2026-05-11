import VehicleCardSkeleton from "@/app/shared/ui/vehicle-card-skeleton";
import VehicleCard from "@/app/shared/ui/vehicle-card";
import React, { Suspense } from "react";
import VehicleTypeTabs from "@/app/shared/ui/vehicle-type-tabs";
import { getAllAutopark } from "@/lib/get-autopark";

const TabContent = ({ selectedType }) => {
  return (
    <Suspense
      key={selectedType}
      fallback={
        <div className="flex flex-col space-y-6 items-center">
          {[...Array(3)].map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <AutoparkContent selectedType={selectedType} />
    </Suspense>
  );
};

const AutoparkContent = async ({ selectedType }) => {
  const autopark = await getAllAutopark(selectedType);

  return (
    <div className="flex flex-col space-y-6 items-center">
      {autopark.length > 0 ? (
        autopark.map((item) => <VehicleCard key={item.id} vehicle={item} />)
      ) : (
        <p className="text-white">Транспорт данного типа не найден</p>
      )}
    </div>
  );
};

const Autopark = async ({ searchParams }) => {
  const selectedType = (await searchParams).type;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8 backdrop-blur-sm">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white tracking-wide">
        Автопарк
      </h1>
      <p className="text-white/70 mb-8 max-w-2xl">
        Современный транспорт под любые задачи: от компактных перевозок до спецтехники.
      </p>

      <VehicleTypeTabs selectedType={selectedType} href={"autopark"} />

      <TabContent selectedType={selectedType} />
    </section>
  );
};

export default Autopark;
