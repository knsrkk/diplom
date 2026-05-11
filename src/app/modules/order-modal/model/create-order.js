"use server";
import { auth } from "@/app/shared/prisma/lib/auth";
import db from "@/app/shared/prisma/lib/db";
import { redirect } from "next/navigation";

export const createOrder = async (data) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/sign-in");
  }
  return await db.order.create({
    data: {
      userId: session.user.id,
      vehicleId: data.vehicleId,
      submissionTime: data.deliveryTime,
      phone: String(data.phone),
      duration: data.hours,
      loadingAddress: data.pickupAddress,
      unloadingAddress: data.deliveryAddress,
      cargoDescription: data.description,
      totalPrice: data.calculatedPrice,
      applicationDate: data.date,
    },
  });
};
