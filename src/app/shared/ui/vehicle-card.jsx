"use client";
import { IoMdInformationCircle } from "react-icons/io";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "./card";
import {
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenu,
} from "./navigation-menu";
import { cn } from "@/lib/utils";
import { CustomLink } from "./custom-link";

const VehicleCard = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="flex flex-col sm:justify-between sm:flex-row sm:items-center w-full gap-3 h-auto bg-white/6 border border-white/10 text-white backdrop-blur-sm shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="flex w-full max-w-xs items-center justify-center">
        <div className="relative w-full group overflow-hidden rounded-lg">
          <CldImage
            src={`${vehicle.image}`}
            alt={vehicle.name}
            width={300}
            height={300}
            className="object-cover transition-transform duration-500 scale-95 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-black/30 opacity-70 transition-opacity" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row lg:items-center gap-5">
        <div>
          <CardTitle className="flex items-center gap-2 font-bold text-lg md:text-2xl mb-3">
            <p className="max-w-60 lg:max-w-none">{vehicle.name}</p>
            <NavigationMenu>
              <NavigationMenuItem className="list-none">
                <NavigationMenuTrigger className="h-7 p-1 bg-white/10 border border-white/10 rounded-md">
                  <IoMdInformationCircle className="text-lg" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-30 md:w-65 left-0">
                  <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2 flex items-center justify-between max-w-28 w-full text-sm font-medium">
                      <p className="m-0">Длина</p>
                      <div className="flex-1 border-b border-dotted border-black mx-1 h-4"></div>
                      <span>{vehicle.length}м</span>
                    </div>
                    <div className="space-y-2 flex items-center justify-between max-w-28 w-full text-sm font-medium">
                      <p className="m-0">Высота</p>
                      <div className="flex-1 border-b border-dotted border-black mx-1 h-4"></div>
                      <span>{vehicle.height}м</span>
                    </div>
                    <div className="space-y-2 flex items-center justify-between max-w-28 w-full text-sm font-medium">
                      <p className="m-0">Ширина</p>
                      <div className="flex-1 border-b border-dotted border-black mx-1 h-4"></div>
                      <span>{vehicle.width}м</span>
                    </div>
                    <div className="space-y-2 flex items-center justify-between max-w-28 w-full text-sm font-medium">
                      <p className="m-0">Объем</p>
                      <div className="flex-1 border-b border-dotted border-black mx-1 h-4"></div>
                      <span>{vehicle.volume}м</span>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </CardTitle>
          <CardDescription
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "max-w-md cursor-pointer text-white/85 md:text-white/85 md:line-clamp-none md:leading-normal md:cursor-auto",
              !isExpanded &&
                "line-clamp-3 leading-snug text-muted-foreground transition-all duration-300"
            )}
          >
            {vehicle.description}
          </CardDescription>
        </div>
        <CustomLink href={"/price"} className="w-fit">
          Заказать от {vehicle.basePrice}₽
        </CustomLink>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
