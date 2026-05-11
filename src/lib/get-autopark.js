"use server";
import db from "@/app/shared/prisma/lib/db";

export const getAllAutopark = async (type) => {
  return await db.vehicle.findMany({
    where: type ? { type } : {},
    orderBy: { name: "asc" },
  });
};
