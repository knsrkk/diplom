import { getRussianVehicleName } from "@/lib/get-russian-vehicle-name";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { VehicleType } from "@prisma/client";
import Link from "next/link";

const VehicleTypeTabs = ({ selectedType, href }) => {
  return (
    <Tabs defaultValue={selectedType || "all"} className="mb-10">
      <TabsList className="flex flex-wrap flex-row items-center bg-transparent gap-2 h-auto p-0">
        <TabsTrigger
          className={"text-white! bg-white/8 border border-white/15 py-4 px-6 rounded-xl data-[state=active]:bg-primary/90 data-[state=active]:text-white hover:bg-white/14 transition-all duration-300"}
          value="all"
          asChild
        >
          <Link href={`/${href}`}>Все</Link>
        </TabsTrigger>
        {Object.values(VehicleType).map((type) => (
          <TabsTrigger
            className={"text-white! bg-white/8 border border-white/15 hover:bg-white/14 transition-all duration-300 py-4 px-6 rounded-xl data-[state=active]:bg-primary/90 data-[state=active]:text-white"}
            key={type}
            value={type}
            asChild
          >
            <Link href={`/${href}?type=${type}`}>
              {getRussianVehicleName(type)}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default VehicleTypeTabs;
